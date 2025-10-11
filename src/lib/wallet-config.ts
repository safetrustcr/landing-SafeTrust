import { WalletProvider, NetworkConfig } from '../types/wallet';

// Supported Networks
export const SUPPORTED_NETWORKS: Record<number, NetworkConfig> = {
  1: {
    chainId: 1,
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_KEY'],
    blockExplorerUrls: ['https://etherscan.io'],
    iconUrls: ['https://ethereum.org/static/ethereum-logo.png'],
  },
  137: {
    chainId: 137,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com'],
    iconUrls: ['https://polygon.technology/wp-content/uploads/2021/07/polygon-logo.png'],
  },
  56: {
    chainId: 56,
    chainName: 'BSC Mainnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  }
};

export const DEFAULT_CHAIN_ID = 1;

// Wallet Providers Configuration
export const WALLET_PROVIDERS: WalletProvider[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '/icons/metamask.svg',
    description: 'Connect using MetaMask wallet',
    type: 'browser',
    deepLink: {
      native: 'metamask://dapp/',
      universal: 'https://metamask.app.link/dapp/',
    },
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '/icons/walletconnect.svg',
    description: 'Scan with WalletConnect to connect',
    type: 'walletconnect',
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: '/icons/coinbase.svg',
    description: 'Connect using Coinbase Wallet',
    type: 'browser',
    deepLink: {
      native: 'cbwallet://dapp',
      universal: 'https://go.cb-w.com/dapp',
    },
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    icon: '/icons/trust.svg',
    description: 'Connect using Trust Wallet',
    type: 'mobile',
    deepLink: {
      native: 'trust://open_url?coin_id=60&url=',
    },
  },
];

// Error Messages
export const WALLET_ERRORS = {
  USER_REJECTED: 'User rejected the connection request',
  ALREADY_PENDING: 'A connection request is already pending',
  UNAUTHORIZED: 'Unauthorized',
  UNSUPPORTED_METHOD: 'The requested method is not supported',
  DISCONNECTED: 'The provider is disconnected from all chains',
  CHAIN_DISCONNECTED: 'The provider is not connected to the requested chain',
  NETWORK_NOT_SUPPORTED: 'Network not supported',
  INSTALLATION_REQUIRED: 'Wallet extension not detected. Please install it first.',
  MOBILE_LINK_FAILED: 'Failed to open wallet app',
} as const;

// Mobile detection
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
};

// Check if wallet is installed
export const isWalletInstalled = (walletId: string): boolean => {
  if (typeof window === 'undefined') return false;

  switch (walletId) {
    case 'metamask':
      return !!(window as any).ethereum?.isMetaMask;
    case 'coinbase':
      return !!(window as any).ethereum?.isCoinbaseWallet || !!(window as any).coinbaseWalletExtension;
    default:
      return false;
  }
};

// Generate deep link URL
export const generateDeepLink = (provider: WalletProvider, dappUrl?: string): string => {
  if (!provider.deepLink) return '';

  const url = dappUrl || window.location.href;
  const encodedUrl = encodeURIComponent(url);

  if (isMobile()) {
    return provider.deepLink.universal 
      ? `${provider.deepLink.universal}?uri=${encodedUrl}`
      : `${provider.deepLink.native}${encodedUrl}`;
  }

  return provider.deepLink.native + encodedUrl;
};