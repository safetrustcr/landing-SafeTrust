import { Button } from "../components/ui/button";
import { Wallet } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-black py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Unlock the Full Potential of{" "}
              <span className="text-primary">SafeTrust</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto lg:mx-0">
              Ready to streamline your P2P transactions? Join SafeTrust today
              and experience the power of secure, trustless trading with
              blue-chip grade protection.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600 text-white px-8 py-6 text-lg flex items-center gap-2 mx-auto lg:mx-0"
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </Button>
          </div>
          <div className="hidden lg:grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-primary/20 p-4 transform transition-transform hover:scale-105"
                style={{
                  animation: `float 3s ease-in-out infinite ${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
}
