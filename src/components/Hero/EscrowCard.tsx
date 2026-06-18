"use client";

import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";

type StepState = "done" | "pending" | "idle";

export function EscrowCard() {
  const [progress, setProgress] = useState(38);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (progress < 100) {
      timer = setTimeout(() => {
        setProgress((prev) => prev + 1);
      }, 150);
    } else {
      timer = setTimeout(() => {
        setProgress(38);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [progress]);

  const getStepState = (step: "deposit" | "escrow" | "confirmed"): StepState => {
    if (step === "deposit") {
      return progress <= 33 ? "pending" : "done";
    }
    if (step === "escrow") {
      if (progress <= 33) return "idle";
      return progress <= 66 ? "pending" : "done";
    }
    if (step === "confirmed") {
      if (progress <= 66) return "idle";
      return progress <= 99 ? "pending" : "done";
    }
    return "idle";
  };

  const renderTimelineItem = (
    step: "deposit" | "escrow" | "confirmed",
    title: string,
    doneLabel: string,
    pendingLabel: string,
    idleLabel: string
  ) => {
    const state = getStepState(step);

    let icon = "○";
    let iconClass = "text-slate-600";
    let textClass = "text-slate-500";
    let label = idleLabel;

    if (state === "done") {
      icon = "✓";
      iconClass = "text-emerald-400 font-bold";
      textClass = "text-slate-200";
      label = doneLabel;
    } else if (state === "pending") {
      icon = "◐";
      iconClass = "text-amber-400 font-bold animate-pulse";
      textClass = "text-slate-200 font-medium";
      label = pendingLabel;
    }

    return (
      <div className="flex items-start gap-4 py-2.5">
        <span className={`text-lg leading-none select-none w-5 text-center ${iconClass}`}>
          {icon}
        </span>
        <div className="flex flex-col gap-0.5">
          <span className={`text-sm transition-colors duration-300 ${textClass}`}>
            {title}
          </span>
          <span className="text-xs text-slate-400">
            {label}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[360px] rounded-3xl bg-slate-950/95 border border-slate-800/80 p-6 shadow-2xl backdrop-blur-xl text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Live Escrow
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Active
        </div>
      </div>

      {/* Deposit Amount */}
      <div className="mb-6">
        <span className="text-xs text-slate-400 block mb-1">
          Deposit Amount
        </span>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold tracking-tight text-white">
            $2,500
          </span>
          <span className="text-xs font-semibold text-slate-400 ml-1.5">
            USDC
          </span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Confirmation Progress</span>
          <span className="font-semibold text-purple-400">{progress}%</span>
        </div>
        <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-purple-500 h-1.5 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timeline Divider */}
      <div className="h-[1px] bg-slate-800/60 my-5" />

      {/* Timeline Section */}
      <div className="mb-6">
        <span className="text-xs text-slate-400 block mb-3">
          Confirmation Timeline
        </span>
        <div className="flex flex-col gap-1">
          {renderTimelineItem(
            "deposit",
            "Deposit Sent",
            "Complete",
            "Sending deposit...",
            "Waiting..."
          )}
          {renderTimelineItem(
            "escrow",
            "In Escrow",
            "Complete",
            "In progress...",
            "Pending"
          )}
          {renderTimelineItem(
            "confirmed",
            "Confirmed",
            "Complete",
            "Confirming...",
            "Idle"
          )}
        </div>
      </div>

      {/* Stellar Network Footer */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mt-2 border-t border-slate-800/40 pt-4">
        <Globe className="w-3.5 h-3.5 text-blue-400" />
        <span>Stellar Mainnet</span>
      </div>
    </div>
  );
}

export default EscrowCard;
