import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Event handlers - add your business logic here
const EVENT_HANDLERS: Record<string, (payload: any, supabase: any) => Promise<any>> = {
  "booking.created": async (payload, supabase) => {
    console.log("Processing booking.created event:", payload);
    // Example: Send notification, update analytics, etc.
    return { processed: true, action: "booking_notification_sent" };
  },
  "booking.cancelled": async (payload, supabase) => {
    console.log("Processing booking.cancelled event:", payload);
    return { processed: true, action: "booking_cancellation_processed" };
  },
  "payment.completed": async (payload, supabase) => {
    console.log("Processing payment.completed event:", payload);
    return { processed: true, action: "payment_confirmation_sent" };
  },
  "user.registered": async (payload, supabase) => {
    console.log("Processing user.registered event:", payload);
    return { processed: true, action: "welcome_email_queued" };
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    const { event_type, payload, source } = body;

    if (!event_type) {
      return new Response(
        JSON.stringify({
          error: "Missing event_type",
          supported_events: Object.keys(EVENT_HANDLERS),
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Store event in database
    const { data: event, error: insertError } = await supabase
      .from("events")
      .insert({
        event_type,
        payload: payload || {},
        source: source || "webhook",
        status: "processing",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Failed to store event:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to store event" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Process event
    let result = { processed: false, action: "no_handler" };
    const handler = EVENT_HANDLERS[event_type];

    if (handler) {
      try {
        result = await handler(payload, supabase);
        // Mark as completed
        await supabase
          .from("events")
          .update({ status: "completed", processed_at: new Date().toISOString() })
          .eq("id", event.id);
      } catch (handlerError) {
        console.error(`Handler error for ${event_type}:`, handlerError);
        await supabase
          .from("events")
          .update({ status: "failed", processed_at: new Date().toISOString() })
          .eq("id", event.id);
        result = { processed: false, action: `error: ${handlerError.message}` };
      }
    } else {
      // No handler, mark as completed (unhandled event types are logged but not processed)
      await supabase
        .from("events")
        .update({ status: "completed", processed_at: new Date().toISOString() })
        .eq("id", event.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        event_id: event.id,
        event_type,
        result,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Webhook processor error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
