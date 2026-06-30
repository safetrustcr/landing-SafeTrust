import pkg from '@stellar/freighter-api';
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { useState } from "react";

export default function ConnectWalletCTA() {
  const { isConnected, requestAccess } = pkg;

  const [state, setState] = useState<"idle" | "connecting" | "connected">("idle");

  const handleClick = async () => {
    if (state !== "idle") return;
    setState("connecting");
    try {
      const { isConnected: hasFreighter } = await isConnected();
      if (!hasFreighter) {
        setState("idle");
        return;
      }
      const { address, error } = await requestAccess();
      if (error || !address) {
        setState("idle");
        return;
      }
      setState("connected");
    } catch {
      setState("idle");
    }
  };

  const label = {
    idle: "Connect Wallet",
    connecting: "Connecting...",
    connected: "Wallet Connected",
  }[state];

  const LeadingIcon = state === "connected" ? CheckCircle2 : Lock;

  return (
    <div className="connect-wallet-cta">
      <button
        type="button"
        onClick={handleClick}
        disabled={state === "connecting"}
        className="connect-wallet-cta__action connect-wallet-cta__action--primary"
      >
        <span className="connect-wallet-cta__icon" aria-hidden="true">
          <LeadingIcon size={17} strokeWidth={2.2} />
        </span>
        <span>{label}</span>
        <span className="connect-wallet-cta__icon" aria-hidden="true">
          <ArrowRight size={16} strokeWidth={2.2} />
        </span>
      </button>

      <a
        href="#how-it-works"
        className="connect-wallet-cta__action connect-wallet-cta__action--secondary"
      >
        <span>Learn More</span>
        <span className="connect-wallet-cta__icon" aria-hidden="true">
          <ArrowRight size={16} strokeWidth={2.2} />
        </span>
      </a>
    </div>
  );
}
