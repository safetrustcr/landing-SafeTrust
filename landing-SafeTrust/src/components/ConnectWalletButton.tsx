import { ArrowRight, Lock, Wallet } from "lucide-react";
import useFreighter from "./useFreighter";

interface ConnectWalletButtonProps {
  buttonClassName: string;
  controlClassName?: string;
  icon?: "lock" | "wallet" | "none";
  installClassName?: string;
  errorClassName?: string;
  label?: string;
}

function shortenAddress(address: string): string {
  return address.length > 10
    ? `${address.slice(0, 4)}…${address.slice(-3)}`
    : address;
}

export default function ConnectWalletButton({
  buttonClassName,
  controlClassName,
  icon = "wallet",
  installClassName,
  errorClassName,
  label = "Connect Wallet",
}: ConnectWalletButtonProps) {
  const { status, address, error, connect } = useFreighter();
  const LeadingIcon = icon === "lock" ? Lock : Wallet;

  return (
    <div className={controlClassName ?? "wallet-connect-control"}>
      <button
        type="button"
        className={buttonClassName}
        onClick={connect}
        disabled={status === "connecting"}
        aria-live="polite"
      >
        {icon !== "none" && (
          <span className="wallet-connect-button__icon" aria-hidden="true">
            <LeadingIcon size={18} strokeWidth={2.2} />
          </span>
        )}
        <span>
          {status === "connecting"
            ? "Connecting..."
            : status === "connected" && address
              ? shortenAddress(address)
              : label}
        </span>
        <span className="wallet-connect-button__icon" aria-hidden="true">
          <ArrowRight size={16} strokeWidth={2.2} />
        </span>
      </button>

      {status === "unavailable" && (
        <a
          href="https://www.freighter.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={installClassName}
        >
          Install Freighter
        </a>
      )}
      {error && (
        <span className={errorClassName} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
