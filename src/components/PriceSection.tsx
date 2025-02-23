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
      setWalletError("Error: Unable to connect. Please check your internet connection.");
    } else {
      setWalletError("");
      console.log(`Wallet connected for ${planName}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center p-6 sm:p-8 lg:p-12 m-0 pb-0">
      <Typography variant="h1" className="text-4xl font-bold text-center">
        Transaction <span className="text-[#4C6FFF]">Tiers</span>
      </Typography>
      <Typography variant="p" className="text-gray-400 text-center mt-8">
        Choose the perfect plan for your transaction needs with our transparent fee structure.
      </Typography>

      {/* Billing Toggle */}
      <div className="flex items-center gap-6 mt-10">
        <span className="text-gray-300">Monthly</span>
        <Switch
          checked={yearly}
          onCheckedChange={setYearly}
        />
        <span className="text-gray-300">Yearly</span>
        <Badge className="bg-[#0A0F22] text-[#4C6FFF] px-2 py-1 rounded-md">Save 25%</Badge>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 w-full max-w-5xl">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            onClick={() => setSelectedPlan(plan.name)}
            className={`relative bg-[rgba(17,19,26,0.7)] backdrop-blur-md p-6 border flex flex-col justify-between h-[380px] cursor-pointer transition-all hover:border-[#4C6FFF] ${
              selectedPlan === plan.name ? "border-[#4C6FFF]" : "border-gray-700"
            }`}
          >
            {plan.name === "Pro" && (
              <Badge className="absolute top-[-10px] right-4 bg-[#4C6FFF] text-white px-3 py-1 rounded-md text-sm">
                Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className='mt-3'></div>
              <p className="text-3xl font-bold">
                {plan.price} {plan.showTransactionText && <span className="text-lg text-gray-400">/ transaction</span>}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-300 text-sm">
                {plan.details.map((detail, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="text-[#4C6FFF]" /> {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
            <Button
              className="w-full mt-6 bg-[#4C6FFF] text-white hover:bg-[#3A50CC] transition-all"
              onClick={() => handleWalletClick(plan.name)}
            >
              {plan.name === "Enterprise" ? "Contact Sales" : "Connect Wallet"}
            </Button>
          </Card>
        ))}
      </div>

      {walletError && <p className="text-red-500 mt-4">{walletError}</p>}
    </div>
  );
}
