import { Card, CardContent } from "@/components/ui/card";
import { Globe, ShieldCheck, DollarSign, Clock, Brain, Link2 } from "lucide-react";

const features = [
  {
    icon: <Globe size={28} className="text-blue-600 dark:text-blue-400" />, 
    title: "Cross-Chain Compatibility",
    description: "Whether you're using Ethereum, Stellar, or other blockchain networks, SafeTrust works seamlessly across multiple chains, ensuring maximum flexibility for your transactions.",
  },
  {
    icon: <ShieldCheck size={28} className="text-blue-600 dark:text-blue-400" />, 
    title: "Secure Escrow System",
    description: "Create and manage secure deposits with our advanced escrow system. Tailor SafeTrust to fit your unique transaction requirements and preferences.",
  },
  {
    icon: <DollarSign size={28} className="text-blue-600 dark:text-blue-400" />, 
    title: "Asset Protection",
    description: "Rest easy knowing your assets are securely stored with blue-chip grade security protocols and multi-signature protection.",
  },
  {
    icon: <Clock size={28} className="text-blue-600 dark:text-blue-400" />, 
    title: "Real-Time Settlement",
    description: "Experience instant transaction settlements with our advanced blockchain infrastructure, ensuring quick and secure transfers.",
  },
  {
    icon: <Brain size={28} className="text-blue-600 dark:text-blue-400" />, 
    title: "Smart Contracts",
    description: "Our AI-powered smart contracts automatically handle complex transactions, making it easy to set conditions and execute trades safely.",
  },
  {
    icon: <Link2 size={28} className="text-blue-600 dark:text-blue-400" />, 
    title: "DeFi Integration",
    description: "Connect with popular DeFi protocols and enhance your trading capabilities while maintaining security and trust.",
  },
];

export default function Discover() {
  return (
    <div className="dark">
      <section className="text-center dark:bg-black pt-16 px-6">
        <h2 className="text-4xl dark:text-white font-bold">
          Discover the Power of <span className="text-blue-600 dark:text-blue-400">SafeTrust</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
          SafeTrust is engineered with cutting-edge blockchain technology designed to revolutionize
          the way you handle P2P transactions, secure deposits, and manage digital assets.
        </p>
      </section>

      <section className="py-16 px-6 md:px-12 bg-white dark:bg-black text-black dark:text-white">
        <div className="mt-12 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {features.slice(0, 2).map((feature, index) => (
              <Card
                key={index}
                className="min-h-[176px] bg-gray-100 dark:bg-black rounded-xl dark:border dark:border-gray-700 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                aria-label={feature.title}
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.slice(2).map((feature, index) => (
              <Card
                key={index}
                className="min-h-[144px] bg-gray-100 dark:bg-black rounded-xl dark:border dark:border-gray-700 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                aria-label={feature.title}
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
