import { Card, CardContent } from "@/components/ui/card";
import { Globe, ShieldCheck, DollarSign, Clock, Brain, Link2 } from "lucide-react";

const features = [
  {
    icon: <Globe size={28} className="text-primary" />, 
    title: "Cross-Chain Compatibility",
    description: "Whether you're using Ethereum, Stellar, or other blockchain networks, SafeTrust works seamlessly across multiple chains, ensuring maximum flexibility for your transactions.",
  },
  {
    icon: <ShieldCheck size={28} className="text-primary" />, 
    title: "Secure Escrow System",
    description: "Create and manage secure deposits with our advanced escrow system. Tailor SafeTrust to fit your unique transaction requirements and preferences.",
  },
  {
    icon: <DollarSign size={28} className="text-primary" />, 
    title: "Asset Protection",
    description: "Rest easy knowing your assets are securely stored with blue-chip grade security protocols and multi-signature protection.",
  },
  {
    icon: <Clock size={28} className="text-primary" />, 
    title: "Real-Time Settlement",
    description: "Experience instant transaction settlements with our advanced blockchain infrastructure, ensuring quick and secure transfers.",
  },
  {
    icon: <Brain size={28} className="text-primary" />, 
    title: "Smart Contracts",
    description: "Our AI-powered smart contracts automatically handle complex transactions, making it easy to set conditions and execute trades safely.",
  },
  {
    icon: <Link2 size={28} className="text-primary" />, 
    title: "DeFi Integration",
    description: "Connect with popular DeFi protocols and enhance your trading capabilities while maintaining security and trust.",
  },
];

export default function Discover() {
  return (
    <div className="bg-background transition-colors duration-300">
      <section className="text-center pt-16 px-6 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5 pointer-events-none transition-colors duration-300"></div>
        <div className="absolute -left-20 top-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
        <div className="absolute -right-20 top-40 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
        
        <h2 className="text-4xl text-foreground font-bold relative z-10 transition-colors duration-300">
          Discover the Power of <span className="text-primary">SafeTrust</span>
        </h2>
        <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto relative z-10 transition-colors duration-300">
          SafeTrust is engineered with cutting-edge blockchain technology designed to revolutionize
          the way you handle P2P transactions, secure deposits, and manage digital assets.
        </p>
      </section>

      <section className="py-16 px-6 md:px-12 text-foreground relative transition-colors duration-300">
        {/* Additional subtle glow effects */}
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
        <div className="absolute bottom-1/4 right-1/3 w-52 h-52 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
        
        <div className="mt-12 space-y-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-6">
            {features.slice(0, 2).map((feature, index) => (
              <Card
                key={index}
                className="min-h-[176px] bg-card border-border shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-primary/20 hover:scale-105 hover:border-primary/30"
                aria-label={feature.title}
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <div className="w-6 h-6 rounded-full bg-primary/10"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.slice(2).map((feature, index) => (
              <Card
                key={index}
                className="min-h-[144px] bg-card border-border shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-primary/20 hover:scale-105 hover:border-primary/30"
                aria-label={feature.title}
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <div className="w-4 h-4 rounded-full bg-primary/10"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}