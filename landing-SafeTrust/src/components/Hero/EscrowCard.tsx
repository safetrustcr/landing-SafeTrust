// src/components/Hero/EscrowCard.tsx
import { useEffect, useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import "../../styles/escrow-card.css";
import GlassSurface from "../GlassSurface/GlassSurface.jsx";

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
    <GlassSurface
      className="escrow-glass"
      width="100%"
      height="auto"
      borderRadius={16}
      backgroundOpacity={0.4}
      brightness={55}
      opacity={0.9}
      blur={10}
      displace={0.4}
      distortionScale={-120}
      saturation={1.4}
    >
    <div className="escrow-card">
      <div className="escrow-header">
        <h3>Booking Escrow</h3>
        <span className="status-active">● Active</span>
      </div>

      <p className="label">Rent + deposit · Casa Níspero, 3 nights</p>
      <p className="amount">
        $430 <span className="currency">USDC</span>
      </p>

      <div className="progress-section">
        <div className="progress-label">
          <span>Booking progress</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="timeline">
        <p className="timeline-label">Booking timeline</p>
        {renderTimelineItem("deposit", "Guest paid")}
        {renderTimelineItem("escrow", "Held in escrow")}
        {renderTimelineItem("confirmed", "Check-in confirmed")}
      </div>

      <div className="footer">
        <span>🌐 Stellar</span>
      </div>
    </div>
    </GlassSurface>
  );
}