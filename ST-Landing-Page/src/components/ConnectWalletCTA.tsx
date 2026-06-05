import { useCallback, useEffect, useRef, useState } from 'react';

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

type ProviderRpcError = {
  code?: number | string;
  message?: string;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

function walletErrorMessage(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'code' in err) {
    const code = (err as ProviderRpcError).code;
    if (code === 4001 || code === '4001') {
      return 'Connection rejected. Please try again.';
    }
  }
  if (err instanceof Error) {
    return err.message;
  }
  return 'Connection failed';
}

export default function ConnectWalletCTA() {
  const [modalOpen, setModalOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const walletButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!modalOpen) {
      return;
    }

    walletButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [modalOpen]);

  const connectMetaMask = useCallback(async () => {
    setConnecting(true);
    setError(null);

    try {
      if (!window.ethereum) {
        window.open('https://metamask.io/download/', '_blank', 'noopener,noreferrer');
        return;
      }

      const accounts = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[];

      if (!accounts?.length) {
        setError('No accounts returned. Unlock your wallet and try again.');
        return;
      }

      setAccount(accounts[0]);
      setModalOpen(false);
    } catch (err) {
      setError(walletErrorMessage(err));
    } finally {
      setConnecting(false);
    }
  }, []);

  if (account) {
    const short = `${account.slice(0, 6)}…${account.slice(-4)}`;
    return (
      <button type="button" className="connect-wallet-btn" disabled>
        <WalletIcon />
        Connected {short}
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        className="connect-wallet-btn"
        onClick={() => setModalOpen(true)}
        disabled={connecting}
      >
        <WalletIcon />
        {connecting ? 'Connecting…' : 'Connect wallet'}
        <span aria-hidden="true">→</span>
      </button>

      {modalOpen && (
        <div
          className="connect-wallet-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wallet-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="connect-wallet-modal">
            <h3 id="wallet-modal-title">Connect your wallet</h3>
            <p>Choose a wallet to connect to SafeTrust.</p>
            {error && <p className="connect-wallet-modal__error">{error}</p>}
            <div className="connect-wallet-modal__actions">
              <button
                ref={walletButtonRef}
                type="button"
                className="connect-wallet-modal__wallet"
                onClick={connectMetaMask}
                disabled={connecting}
              >
                MetaMask
              </button>
            </div>
            <button
              type="button"
              className="connect-wallet-modal__close"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function WalletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 7H18V6C18 4.34 16.66 3 15 3H5C3.34 3 2 4.34 2 6V18C2 19.66 3.34 21 5 21H19C20.66 21 22 19.66 22 18V10C22 8.34 20.66 7 19 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M2 9H18V6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}
