// src/components/Hero/EscrowCard.tsx
import { useEffect, useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import "../../styles/escrow-card.css";

type StepState = "done" | "pending" | "idle";

type StepKey = "deposit" | "escrow" | "confirmed";

export default function EscrowCard() {
  const [progress, setProgress] = useState(38);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 38 : p + 1));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const getStepState = (step: StepKey): StepState => {
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

  const getTimelineMeta = (step: StepKey, state: StepState) => {
    if (state === "done") {
      return {
        icon: <CheckCircle size={18} />,
        statusClass: "done",
        subText: "Complete",
      };
    }

    if (state === "pending") {
      if (step === "confirmed") {
        return {
          icon: <CheckCircle size={18} />,
          statusClass: "idle",
          subText: "In progress...",
        };
      }

      return {
        icon: <Clock size={18} />,
        statusClass: "pending",
        subText: "In progress...",
      };
    }

    return {
      icon: <CheckCircle size={18} />,
      statusClass: "idle",
      subText: "",
    };
  };

  const renderTimelineItem = (step: StepKey, title: string) => {
    const state = getStepState(step);
    const { icon, statusClass, subText } = getTimelineMeta(step, state);

    return (
      <div className="timeline-item">
        <span className={`icon ${statusClass}`}>{icon}</span>
        <div>
          <p>{title}</p>
          {subText && <span className="sub">{subText}</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="escrow-card">
      <div className="escrow-header">
        <h3>Live Escrow</h3>
        <span className="status-active">● Active</span>
      </div>

      <p className="label">Deposit Amount</p>
      <p className="amount">
        $2,500 <span className="currency">USDC</span>
      </p>

      <div className="progress-section">
        <div className="progress-label">
          <span>Confirmation Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="timeline">
        <p className="timeline-label">Confirmation Timeline</p>
        {renderTimelineItem("deposit", "Deposit Sent")}
        {renderTimelineItem("escrow", "In Escrow")}
        {renderTimelineItem("confirmed", "Confirmed")}
      </div>

      <div className="footer">
        <span>🌐 Stellar Mainnet</span>
      </div>
    </div>
  );
}