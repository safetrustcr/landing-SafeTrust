export type PricingTier = {
  id: string
  name: string
  pricePerTx: number
  description: string
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    pricePerTx: 0.05,
    description: "For small teams getting started"
  },
  {
    id: "pro",
    name: "Pro",
    pricePerTx: 0.03,
    description: "For growing businesses"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    pricePerTx: 0.01,
    description: "Custom pricing at scale"
  }
]
