// src/components/Hero/EscrowCard.tsx
import { useEffect, useState } from "react";
import "../../styles/escrow-card.css";

export default function EscrowCard() {
  const [progress, setProgress] = useState(38);

  // TODO: wire in Batch N - replace with real escrow state from backend
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 38 : p + 1));
    }, 150);
    return () => clearInterval(interval);
  }, []);

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
        <div className="timeline-item">
          <span className="icon done">✓</span>
          <div>
            <p>Deposit Sent</p>
            <span className="sub">Complete</span>
          </div>
        </div>
        <div className="timeline-item">
          <span className="icon pending">◐</span>
          <div>
            <p>In Escrow</p>
            <span className="sub">In progress...</span>
          </div>
        </div>
        <div className="timeline-item">
          <span className="icon idle">○</span>
          <div>
            <p>Confirmed</p>
          </div>
        </div>
      </div>

      <div className="footer">
        <span>🌐 Stellar Mainnet</span>
      </div>
    </div>
  );
}