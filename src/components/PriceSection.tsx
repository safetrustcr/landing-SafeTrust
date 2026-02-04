import PricingCalculator from "./pricing/PricingCalculator";

export default function PriceSection() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Pricing</h2>
        <PricingCalculator />
      </div>
    </section>
  );
}
