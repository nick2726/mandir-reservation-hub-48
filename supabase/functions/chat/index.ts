const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the official Babadham (Baba Baidyanath Dham) Temple Assistant. You help devotees with temple information, pass booking guidance, and spiritual queries.

## Temple Knowledge Base (RAG Context)

### About Baba Baidyanath Dham
- One of the 12 Jyotirlingas, located in Deoghar, Jharkhand, India
- Dedicated to Lord Shiva (Baba Baidyanath)
- According to legend, Ravana performed penance here and was blessed with the sacred Shivalinga
- The temple complex has 22 temples in total
- It is a major pilgrimage destination, especially during Shravan month (July-August)

### Temple Timings
- Temple opens at 4:00 AM and closes at 11:00 PM
- Mangal Aarti: 4:00 AM
- Bhog Aarti: 12:00 PM (noon)
- Sandhya Aarti: 7:00 PM
- Shringar Aarti: 8:00 PM

### Pass Types & Booking
- **Standard Pass**: ₹100 per person – General darshan queue
- **VIP Pass**: ₹500-600 per person – Priority entry, shorter wait times
- **Premium Pass**: Higher tier with special access to inner sanctum
- Booking requires: Full name, email, phone, state, city, priest/panda name, token number, and ID proof
- Additional members need: Name, age, sex, and ID proof details
- Payment methods: Credit/Debit Card, UPI, Net Banking, Cash on Delivery

### How to Book
1. Go to the Passes page and select your preferred date and pass type
2. Fill in visitor information (you must be signed in)
3. Add additional member details if booking for multiple people
4. Proceed to payment and complete the transaction
5. Download your pass from the confirmation page

### Important Rules
- You must sign in / create an account before booking
- Carry a valid government ID proof during your visit
- Arrive at least 30 minutes before your scheduled darshan time
- Follow temple dress code: modest, traditional attire preferred
- Photography is NOT allowed inside the main temple

### Nearby Attractions
- Naulakha Temple (dedicated to Radha-Krishna)
- Tapovan Hills and Caves
- Trikuta Parvat (Trikut Hill)
- Basukinath Temple (about 42 km away)
- Satsang Ashram

### Travel Information
- Nearest Railway Station: Jasidih Junction (7 km)
- Nearest Airport: Deoghar Airport (5 km), Ranchi Airport (280 km)
- Well connected by road from Kolkata, Patna, and Ranchi

## Response Guidelines
- Be warm, respectful, and use occasional Hindi/Sanskrit greetings (Namaste, Har Har Mahadev, etc.)
- Keep responses concise but helpful
- If asked about booking, guide users to sign in first, then visit the Passes page
- For questions outside temple scope, politely redirect to temple-related topics
- Use markdown formatting for lists and emphasis when helpful
- Always be accurate with timings, prices, and procedures`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings > Workspace > Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
