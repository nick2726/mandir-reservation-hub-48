import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Service registry - configure your external microservice URLs here
const SERVICE_REGISTRY: Record<string, string> = {
  // Add your microservice URLs as secrets and reference them here
  // Example: "booking-service": Deno.env.get("BOOKING_SERVICE_URL") || "",
  // Example: "notification-service": Deno.env.get("NOTIFICATION_SERVICE_URL") || "",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify JWT first
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);

    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request
    const url = new URL(req.url);
    const body = req.method !== "GET" ? await req.text() : null;

    // Extract service and path from query params
    const service = url.searchParams.get("service");
    const path = url.searchParams.get("path") || "/";

    if (!service) {
      return new Response(
        JSON.stringify({
          error: "Missing 'service' query parameter",
          available_services: Object.keys(SERVICE_REGISTRY),
          usage: "?service=booking-service&path=/api/bookings",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const serviceUrl = SERVICE_REGISTRY[service];
    if (!serviceUrl) {
      return new Response(
        JSON.stringify({
          error: `Service '${service}' not found in registry`,
          available_services: Object.keys(SERVICE_REGISTRY),
        }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Forward request to microservice
    const targetUrl = `${serviceUrl}${path}`;
    const forwardHeaders: Record<string, string> = {
      "Content-Type": req.headers.get("Content-Type") || "application/json",
      "X-User-Id": claimsData.claims.sub,
      "X-User-Email": claimsData.claims.email || "",
      "X-Forwarded-For": req.headers.get("X-Forwarded-For") || "",
    };

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: forwardHeaders,
      body: body,
    });

    const responseBody = await response.text();

    // Log event for observability
    const serviceRoleClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await serviceRoleClient.from("events").insert({
      event_type: "api_gateway_request",
      source: service,
      payload: {
        method: req.method,
        path,
        status: response.status,
        user_id: claimsData.claims.sub,
      },
    });

    return new Response(responseBody, {
      status: response.status,
      headers: { ...corsHeaders, "Content-Type": response.headers.get("Content-Type") || "application/json" },
    });
  } catch (error) {
    console.error("API Gateway error:", error);
    return new Response(
      JSON.stringify({ error: "Gateway error", message: error.message }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
