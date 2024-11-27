import Stripe from "stripe";
import { Resource } from "sst";
import { Util } from "@sst-template/core/util";
import { Billing } from "@sst-template/core/billing";

export const main = Util.handler(async (event) => {
  const { storage, source } = JSON.parse(event.body || "{}");
  const amount = Billing.compute(storage);
  const description = "Scratch charge";

  const stripe = new Stripe(
    // Load our secret key
    Resource.StripeSecretKey.value,
    { apiVersion: "2024-06-20" }
  );
  console.log("Stripe Secret Key:", Resource.StripeSecretKey.value);


  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });

  return JSON.stringify({ status: true });
});