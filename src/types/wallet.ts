export interface WalletProvider {
  id: string;
  name: string;
  icon: string;
  description?: string;
  installed?: boolean;
  downloadUrl?: string;
  deepLink?: {
    native: string;
    universal?: string;
  };
  type: 'browser' | 'mobile' | 'hardware' | 'walletconnect';
}

export interface WalletConnectionState {
  isConnecting: boolean;
  isConnected: boolean;
  account?: string;
  chainId?: number;
  provider?: EthereumProvider;
  error?: string;
}

export interface NetworkConfig {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[];
}

export interface WalletError {
  code: number;
  message: string;
  details?: string;
}

export type WalletEventType = 
  | 'connect'
  | 'disconnect' 
  | 'accountsChanged'
  | 'chainChanged'
  | 'error';

export interface WalletEvent {
  type: WalletEventType;
  data?: unknown;
  error?: WalletError;
}

export interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  disconnect?: () => Promise<void>;
}