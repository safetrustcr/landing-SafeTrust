import { PricingTier } from "@/data/pricing-tiers"

type Props = {
  tiers: PricingTier[]
  selected: string
  onSelect: (id: string) => void
}

export default function TierComparison({ tiers, selected, onSelect }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {tiers.map((tier) => (
        <button
          key={tier.id}
          onClick={() => onSelect(tier.id)}
          className={`border rounded-lg p-4 text-left ${
            selected === tier.id ? "border-blue-600" : "border-gray-300"
          }`}
        >
          <h3 className="font-semibold">{tier.name}</h3>
          <p className="text-sm text-gray-500">{tier.description}</p>
          <p className="mt-2 font-bold">${tier.pricePerTx}/tx</p>
        </button>
      ))}
    </div>
  )
}
