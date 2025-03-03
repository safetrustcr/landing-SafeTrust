"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Typography } from "@/components/ui/typography";

export default function TransactionTiers() {
  const [yearly, setYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [walletError, setWalletError] = useState("");

  const plans = [
    {
      name: "Basic",
      price: "0.5%",
      showTransactionText: true,
      details: [
        "Up to $10k transactions",
        "Basic escrow service",
        "Standard security",
        "24/7 support",
      ],
    },
    {
      name: "Pro",
      price: "0.3%",
      showTransactionText: true,
      details: [
        "Up to $100k transactions",
        "Advanced escrow options",
        "Multi-signature security",
        "Priority support",
        "Custom transaction rules",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      showTransactionText: false,
      details: [
        "Unlimited transaction volume",
        "Custom escrow solutions",
        "Advanced security features",
        "Dedicated account manager",
        "API access",
      ],
    },
  ];

  const handleWalletClick = (planName: string) => {
    if (!navigator.onLine) {
      setWalletError(
        "Error: Unable to connect. Please check your internet connection."
      );
    } else {
      setWalletError("");
      console.log(`Wallet connected for ${planName}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a15] text-white flex flex-col items-center p-6 sm:p-8 lg:p-12 m-0 pb-0 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-indigo-800/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/5 pointer-events-none"></div>
      
      <Typography variant="h1" className="text-4xl font-bold text-center relative z-10">
        Transaction <span className="text-blue-600">Tiers</span>
      </Typography>
      <Typography variant="p" className="text-gray-400 text-center mt-8 relative z-10">
        Choose the perfect plan for your transaction needs with our transparent
        fee structure.
      </Typography>

      {/* Billing Toggle */}
      <div className="flex items-center gap-6 mt-10 relative z-10">
        <span className="text-white">Monthly</span>
        <Switch checked={yearly} onCheckedChange={setYearly} />
        <span className="text-white">Yearly</span>
        <Badge className="bg-blue-950 text-blue-600 px-2 py-1 rounded-md">
          Save 25%
        </Badge>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 w-full max-w-5xl relative z-10">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            onClick={() => setSelectedPlan(plan.name)}
            className={`relative text-white bg-blue-950/30 backdrop-blur-md p-6 border flex flex-col justify-between h-[380px] cursor-pointer transition-all hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/20 ${
              selectedPlan === plan.name
                ? "border-blue-600"
                : "border-blue-900/20"
            }`}
          >
            {plan.name === "Pro" && (
              <Badge className="absolute top-[-10px] right-4 bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-3"></div>
              <p className="text-3xl text-white font-bold">
                {plan.price}{" "}
                {plan.showTransactionText && (
                  <span className="text-lg text-gray-400">/ transaction</span>
                )}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-white text-sm">
                {plan.details.map((detail, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="text-blue-600" /> {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
            <Button
              className="w-full bg-blue-600 text-white hover:bg-blue-800 transition-all"
              onClick={() => handleWalletClick(plan.name)}
            >
              {plan.name === "Enterprise" ? "Contact Sales" : "Connect Wallet"}
            </Button>
          </Card>
        ))}
      </div>

      {walletError && <p className="text-red-500 mt-4 relative z-10">{walletError}</p>}
    </div>
  );
}