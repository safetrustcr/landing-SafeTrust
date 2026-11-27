import { ArrowRight } from "lucide-react";
import ConnectWalletButton from "./ConnectWalletButton";

export default function ConnectWalletCTA() {
  return (
    <div className="connect-wallet-cta">
      <ConnectWalletButton
        buttonClassName="connect-wallet-cta__action connect-wallet-cta__action--primary"
        controlClassName="connect-wallet-cta__control"
        installClassName="connect-wallet-cta__action connect-wallet-cta__action--secondary connect-wallet-cta__install"
        errorClassName="connect-wallet-cta__error"
        icon="lock"
      />

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
