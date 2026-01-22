import { PricingTier } from "@/data/pricing-tiers"

export function calculatePrice(
  volume: number,
  tier: PricingTier,
  billing: "monthly" | "annual"
) {
  const base = volume * tier.pricePerTx
  const discount = billing === "annual" ? 0.9 : 1
  return Number((base * discount).toFixed(2))
}
