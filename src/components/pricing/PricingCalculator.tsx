import { useState } from "react"
import { PRICING_TIERS } from "@/data/pricing-tiers"
import { calculatePrice } from "@/lib/pricing-calculations"
import VolumeSlider from "./VolumeSlider"
import TierComparison from "./TierComparison"

export default function PricingCalculator() {
  const [volume, setVolume] = useState(10000)
  const [tierId, setTierId] = useState("starter")
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly")

  const tier = PRICING_TIERS.find(t => t.id === tierId)!
  const price = calculatePrice(volume, tier, billing)

  return (
    <div className="space-y-6">
      <VolumeSlider value={volume} onChange={setVolume} />

      <div className="flex gap-4">
        <button onClick={() => setBilling("monthly")}>Monthly</button>
        <button onClick={() => setBilling("annual")}>Annual (10% off)</button>
      </div>

      <TierComparison
        tiers={PRICING_TIERS}
        selected={tierId}
        onSelect={setTierId}
      />

      <p className="text-xl font-bold">
        Estimated Cost: ${price} / {billing}
      </p>

      {tierId === "enterprise" && (
        <a href="#contact" className="underline text-blue-600">
          Contact Sales
        </a>
      )}
    </div>
  )
}
