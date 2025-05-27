
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUBSCRIPTION_PLANS = {
  "family_essentials": { price: 2900, name: "Family Essentials" },
  "family_premium": { price: 4900, name: "Family Premium" },
  "pro_essentials": { price: 9900, name: "Pro Essentials" },
  "pro_elevate": { price: 19900, name: "Pro Elevate" },
  "pro_pinnacle": { price: 79900, name: "Pro Pinnacle" },
  "enterprise": { price: 299900, name: "Enterprise" }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2023-10-16",
  });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !user) throw new Error("Authentication failed");

    const { action, ...payload } = await req.json();

    switch (action) {
      case "create_subscription":
        // Get or create Stripe customer
        let { data: customerData } = await supabaseClient
          .from("stripe_customers")
          .select("stripe_customer_id")
          .eq("user_id", user.id)
          .single();

        let customerId;
        if (!customerData) {
          const customer = await stripe.customers.create({
            email: user.email,
            metadata: { user_id: user.id }
          });
          customerId = customer.id;

          await supabaseClient
            .from("stripe_customers")
            .insert({
              user_id: user.id,
              stripe_customer_id: customerId
            });
        } else {
          customerId = customerData.stripe_customer_id;
        }

        // Create checkout session
        const plan = SUBSCRIPTION_PLANS[payload.plan];
        if (!plan) throw new Error("Invalid subscription plan");

        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ["card"],
          line_items: [{
            price_data: {
              currency: "usd",
              product_data: {
                name: plan.name,
              },
              unit_amount: plan.price,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          }],
          mode: "subscription",
          subscription_data: {
            trial_period_days: 30,
          },
          success_url: `${req.headers.get("origin")}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.get("origin")}/pricing`,
        });

        return new Response(JSON.stringify({ checkout_url: session.url }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });

      case "process_placement_fee":
        const { monthly_rent, placement_id } = payload;
        const placementFee = monthly_rent; // 100% of first month's rent
        const agentCommission = placementFee * 0.8; // 80% to agent
        const hpaRevenue = placementFee * 0.2; // 20% to HPA

        // Create payment intent for placement fee
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(placementFee * 100), // Convert to cents
          currency: "usd",
          metadata: {
            placement_id,
            agent_commission: agentCommission.toString(),
            hpa_revenue: hpaRevenue.toString()
          }
        });

        // Store payment record
        await supabaseClient
          .from("payments")
          .insert({
            user_id: user.id,
            stripe_payment_intent_id: paymentIntent.id,
            amount: placementFee,
            payment_type: "placement_fee",
            status: "pending",
            metadata: {
              placement_id,
              agent_commission,
              hpa_revenue
            }
          });

        return new Response(JSON.stringify({ 
          client_secret: paymentIntent.client_secret,
          payment_intent_id: paymentIntent.id 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });

      case "create_agent_payout":
        const { agent_id, commission_amount } = payload;
        
        // Get agent's Stripe Connect account
        const { data: agentData } = await supabaseClient
          .from("users")
          .select("stripe_connect_account_id")
          .eq("id", agent_id)
          .single();

        if (!agentData?.stripe_connect_account_id) {
          throw new Error("Agent must have a connected Stripe account");
        }

        // Create transfer to agent
        const transfer = await stripe.transfers.create({
          amount: Math.round(commission_amount * 100),
          currency: "usd",
          destination: agentData.stripe_connect_account_id,
        });

        // Record payout
        await supabaseClient
          .from("payments")
          .insert({
            user_id: agent_id,
            amount: commission_amount,
            payment_type: "commission_payout",
            status: "completed",
            metadata: {
              stripe_transfer_id: transfer.id
            }
          });

        return new Response(JSON.stringify({ transfer_id: transfer.id }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });

      default:
        throw new Error("Invalid action");
    }
  } catch (error) {
    console.error("Payment service error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
