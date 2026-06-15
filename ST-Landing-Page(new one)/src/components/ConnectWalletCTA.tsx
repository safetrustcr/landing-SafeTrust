import { useState } from "react";

export default function ConnectWalletCTA() {
  const [state, setState] = useState<"idle" | "connecting" | "connected">("idle");

  const handleClick = async () => {
    if (state !== "idle") return;
    setState("connecting");
    // TODO: wire up Freighter wallet connection
    setState("connected");
  };

  const label = {
    idle: "Connect Wallet",
    connecting: "Connecting...",
    connected: "Wallet Connected",
  }[state];

  return (
    <div className="cta-row">
      <button onClick={handleClick} disabled={state === "connecting"} className={`connect-btn ${state}`}>
        🔒 {label} →
      </button>
      <a href="#how-it-works" className="learn-more-btn">Learn More →</a>
    </div>
  );
}