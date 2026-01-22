"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { useTracker } from "@/hooks/use-analytics";

interface Plan {
  name: string;
  monthly: number;
  yearly: number;
  percentage: string;
  showTransactionText: boolean;
  details: string[];
}

export default function TransactionTiers() {
  const { buttonClick, logEvent } = useTracker();
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [walletError, setWalletError] = useState("");

  const [billingPeriod, setBillingPeriod] =
    useState<"monthly" | "yearly">("monthly");

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
      logEvent("wallet_connect_failed", {
        plan_name: planName,
        reason: "offline",
      });
    } else {
      setWalletError("");
      buttonClick("wallet_connect_button", {
        plan_name: planName,
        location: "pricing_section",
      });
    }
  };

  const getPrice = (plan: Plan) => {
    const isMonthly = billingPeriod === "monthly";
    const price = isMonthly ? plan.monthly : plan.yearly;
    const period = isMonthly ? "monthly" : "annually";

    return (
      <p className="text-3xl font-bold">
        ${price.toLocaleString()}{" "}
        <span className="text-muted-foreground text-xl">/ {period}</span>
      </p>
    );
  };

  return (
    <div id="pricing" className="min-h-screen w-full p-6">
      <Typography variant="h1" className="text-center">
        Transaction <span className="text-primary">Tiers</span>
      </Typography>

      <div className="flex justify-center gap-4 mt-6">
        <span>Monthly</span>
        <Switch
          checked={billingPeriod === "yearly"}
          onCheckedChange={() =>
            setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")
          }
        />
        <span>Yearly</span>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            onClick={() => setSelectedPlan(plan.name)}
            className={`cursor-pointer ${
              selectedPlan === plan.name ? "border-primary" : ""
            }`}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {getPrice(plan)}
              <ul className="mt-4 space-y-2">
                {plan.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <Check className="text-primary" />
                    {detail}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-4"
                onClick={() => handleWalletClick(plan.name)}
              >
                {plan.name === "Enterprise"
                  ? "Contact Sales"
                  : "Connect Wallet"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {walletError && (
        <p className="text-destructive mt-4">{walletError}</p>
      )}
    </div>
  );
}
