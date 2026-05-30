"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import styles from "@/styles/hero.module.css";

interface TimelineStep {
  id: string;
  label: string;
  status: "pending" | "active" | "completed";
  icon: React.ReactNode;
}

export function EscrowCard() {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  // Simulate progressive loading/payment confirmation
  useEffect(() => {
    if (prefersReducedMotion) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // Reset and loop
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [prefersReducedMotion]);

  // Update current step based on progress
  useEffect(() => {
    if (progress < 33) {
      setCurrentStep(0);
    } else if (progress < 66) {
      setCurrentStep(1);
    } else {
      setCurrentStep(2);
    }
  }, [progress]);

  const timelineSteps: TimelineStep[] = [
    {
      id: "deposit",
      label: "Deposit Sent",
      status: currentStep >= 0 ? (currentStep > 0 ? "completed" : "active") : "pending",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      id: "escrow",
      label: "In Escrow",
      status: currentStep >= 1 ? (currentStep > 1 ? "completed" : "active") : "pending",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: "confirmed",
      label: "Confirmed",
      status: currentStep >= 2 ? "completed" : "pending",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
      },
    },
  };

  const getStatusColor = (status: "pending" | "active" | "completed") => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "active":
        return "text-blue-500";
      default:
        return "text-gray-400";
    }
  };

  const getStatusBgColor = (status: "pending" | "active" | "completed") => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900/30";
      case "active":
        return "bg-blue-100 dark:bg-blue-900/30";
      default:
        return "bg-gray-100 dark:bg-gray-800/30";
    }
  };

  return (
    <motion.div
      className={styles.escrowCard}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Live Escrow</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-green-600 dark:text-green-400">
            Active
          </span>
        </div>
      </div>

      {/* Deposit Amount */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-sm text-muted-foreground mb-2">Deposit Amount</div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">$2,500</span>
          <span className="text-sm text-muted-foreground">USDC</span>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">
            Confirmation Progress
          </span>
          <span className="text-xs font-medium text-foreground">{progress}%</span>
        </div>
        <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-xs font-medium text-muted-foreground mb-4">
          Confirmation Timeline
        </div>

        <div className="space-y-3">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              {/* Status Icon */}
              <motion.div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getStatusBgColor(
                  step.status
                )} ${getStatusColor(step.status)}`}
                animate={
                  step.status === "active" && !prefersReducedMotion
                    ? {
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                {step.icon}
              </motion.div>

              {/* Step Label */}
              <div className="flex-1 pt-1">
                <div className="text-sm font-medium text-foreground">
                  {step.label}
                </div>
                {step.status === "completed" && (
                  <div className="text-xs text-green-600 dark:text-green-400">
                    ✓ Complete
                  </div>
                )}
                {step.status === "active" && (
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    In progress...
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer Badge */}
      <motion.div
        className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>🌐 Stellar Mainnet</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
