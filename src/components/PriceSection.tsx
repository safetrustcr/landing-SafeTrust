"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Typography } from "@/components/ui/typography";

interface Plan {
  name: string;
  monthly: number;
  yearly: number;
  percentage: string;
  showTransactionText: boolean;
  details: string[];
}

export default function TransactionTiers() {
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [walletError, setWalletError] = useState("");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  useEffect(() => {
    const storedPeriod = localStorage.getItem("billingPeriod") as
      | "monthly"
      | "yearly"
      | null;
    if (storedPeriod) setBillingPeriod(storedPeriod);
  }, []);

  useEffect(() => {
    localStorage.setItem("billingPeriod", billingPeriod);
  }, [billingPeriod]);

  const plans: Plan[] = [
    {
      name: "Basic",
      monthly: 60,
      yearly: 720,
      percentage: "0.5%",
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
      monthly: 180,
      yearly: 2160,
      percentage: "0.3%",
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
      monthly: 300,
      yearly: 3600,
      percentage: "Custom",
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

  const getPrice = (plan: Plan) => {
    const isMonthly = billingPeriod === "monthly";
    const price = isMonthly ? plan.monthly : plan.yearly;
    const period = isMonthly ? "monthly" : "annually";

    return (
      <div className="transition-all duration-500 ease-in-out transform">
        <p className="text-3xl font-bold text-white transition-all duration-500 ease-in-out">
          <span
            key={`${plan.name}-${billingPeriod}-price`}
            className="inline-block transition-all duration-500 ease-in-out transform"
          >
            ${price.toLocaleString()}
          </span>{" "}
          <span
            key={`${plan.name}-${billingPeriod}-period`}
            className="text-xl font-semibold text-gray-400 inline-block transition-all duration-500 ease-in-out transform"
          >
            / {period}
          </span>
        </p>
      </div>
    );
  };

  return (
    <div id="pricing" className="min-h-screen w-full bg-[#0a0a15] text-white flex flex-col items-center p-6 sm:p-8 lg:p-12 m-0 pb-0 relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out forwards;
        }

        .price-transition {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-indigo-800/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/5 pointer-events-none"></div>

      <Typography
        variant="h1"
        className="text-4xl font-bold text-center relative z-10"
      >
        Transaction <span className="text-blue-600">Tiers</span>
      </Typography>
      <Typography
        variant="p"
        className="text-gray-400 text-center mt-8 relative z-10"
      >
        Choose the perfect plan for your transaction needs with our transparent
        fee structure.
      </Typography>

      {/* Billing Toggle */}
      <div className="relative flex items-center gap-3 sm:gap-6 mt-10">
        <span className="text-gray-300 text-sm sm:text-base">Monthly</span>
        <Switch
          checked={billingPeriod === "yearly"}
          onCheckedChange={() =>
            setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")
          }
        />
        <span className="text-gray-300 text-sm sm:text-base">Yearly</span>
        <div className="relative ml-2">
          <Badge
            className={`bg-blue-950/70 text-blue-500 px-2 py-1 rounded-full text-xs transition-all duration-500 ease-in-out transform ${
              billingPeriod === "yearly"
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-95 translate-x-2"
            }`}
          >
            Save 20%
          </Badge>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-5xl relative z-10">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            onClick={() => setSelectedPlan(plan.name)}
            className={`relative text-white bg-blue-950/30 backdrop-blur-md p-6 md:p-4 border flex flex-col justify-between h-[450px] md:h-[400px] cursor-pointer transition-all duration-300 ease-in-out hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/20 ${
              selectedPlan === plan.name
                ? "border-blue-600"
                : "border-blue-900/20"
            }`}
          >
            <div
              className={`absolute top-[-10px] right-4 transition-all duration-500 ease-in-out transform ${
                plan.name === "Pro"
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-2"
              }`}
            >
              {plan.name === "Pro" && (
                <Badge className="bg-blue-600 text-white px-3 py-1 md:px-2 md:py-0.5 rounded-md text-sm md:text-xs">
                  Popular
                </Badge>
              )}
            </div>
            <CardHeader className="md:pb-3">
              <CardTitle className="transition-all duration-500 ease-in-out md:text-md text-gray-200">
                {plan.name}
              </CardTitle>
              {plan.showTransactionText ? (
                <div className="flex items-baseline gap-2 transition-all duration-500 ease-in-out">
                  <p className="text-gray-200 text-3xl md:text-[28px] font-semibold transition-all duration-500 ease-in-out">
                    {plan.percentage}
                  </p>
                  <span className="text-sm md:text-xs text-gray-400 transition-all duration-500 ease-in-out">
                    / transaction
                  </span>
                </div>
              ) : (
                <p className="text-gray-200 text-3xl md:text-2xl font-semibold transition-all duration-500 ease-in-out">
                  Custom
                </p>
              )}
            </CardHeader>
            <CardContent className="flex flex-col flex-grow md:py-3">
              <ul className="space-y-2 md:space-y-1.5 text-white text-sm md:text-[13px] xl:text-[15px] mb-6 md:mb-4">
                {plan.details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 transition-all duration-500 ease-in-out transform opacity-100"
                  >
                    <Check className="text-blue-600 flex-shrink-0 transition-all duration-300 ease-in-out md:w-4 md:h-4" />
                    <span className="transition-all duration-500 ease-in-out">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <div className="overflow-hidden transition-all duration-500 ease-in-out">
                  <div
                    key={`price-${plan.name}-${billingPeriod}`}
                    className="animate-fade-in md:text-sm"
                  >
                    {getPrice(plan)}
                  </div>
                </div>
              </div>
            </CardContent>
            <Button
              className="w-full bg-blue-600 text-white hover:bg-blue-800 transition-all duration-300 mt-4 md:mt-2 md:py-2 md:text-sm"
              onClick={() => handleWalletClick(plan.name)}
            >
              {plan.name === "Enterprise" ? "Contact Sales" : "Connect Wallet"}
            </Button>
          </Card>
        ))}
      </div>

      {walletError && (
        <p className="text-red-500 mt-4 relative z-10 transition-all duration-300">
          {walletError}
        </p>
      )}
    </div>
  );
}
