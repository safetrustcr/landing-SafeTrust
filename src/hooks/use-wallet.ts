import { useState, useEffect, useCallback, useRef } from 'react';
import { WalletConnectionState, WalletProvider } from '../types/wallet';
import {
  WALLET_PROVIDERS,
  SUPPORTED_NETWORKS,
  WALLET_ERRORS,
  isWalletInstalled,
  generateDeepLink,
  isMobile
} from '../lib/wallet-config';

declare global {
  interface Window {
    ethereum?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    coinbaseWalletExtension?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

// Global state store for synchronous updates across all hook instances
let globalWalletState: WalletConnectionState = {
  isConnecting: false,
  isConnected: false,
  account: undefined,
  chainId: undefined,
  provider: undefined,
  error: undefined,
};

// Listeners for state changes
const stateListeners = new Set<(state: WalletConnectionState) => void>();

const notifyStateChange = (newState: WalletConnectionState) => {
  globalWalletState = newState;
  stateListeners.forEach(listener => listener(newState));
};

const subscribeToStateChanges = (listener: (state: WalletConnectionState) => void) => {
  stateListeners.add(listener);
  return () => {
    stateListeners.delete(listener);
  };
};

export const useWallet = () => {
  const [state, setState] = useState<WalletConnectionState>(globalWalletState);
  
  const connectionTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const providerRef = useRef<any>(undefined); // eslint-disable-line @typescript-eslint/no-explicit-any
  const isInitialized = useRef(false);
  const connectionAttemptRef = useRef<string | null>(null);

  // Subscribe to global state changes
  useEffect(() => {
    const unsubscribe = subscribeToStateChanges((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, []);

  const updateState = useCallback((newState: Partial<WalletConnectionState>, action: string) => {
    const updatedState = { ...globalWalletState, ...newState };
    console.log(`[WalletHook] State Update - ${action}:`, {
      previous: globalWalletState,
      new: updatedState,
      timestamp: new Date().toISOString()
    });
    notifyStateChange(updatedState);
  }, []);

  const clearConnectionTimeout = useCallback(() => {
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
      connectionTimeoutRef.current = undefined;
    }
  }, []);  

  useEffect(() => {
    if (!isInitialized.current) {
      console.log('[WalletHook] Initializing...');
      isInitialized.current = true;
      checkExistingConnection();
      setupEventListeners();
    }

    return () => {
      clearConnectionTimeout();
      cleanupEventListeners();
    };
  }, [clearConnectionTimeout]); // eslint-disable-line react-hooks/exhaustive-deps

  const checkExistingConnection = useCallback(async () => {
    try {
      console.log('[WalletHook] Checking existing connection...');

      if (typeof window === 'undefined') {
        console.log('[WalletHook] Window is undefined (SSR)');
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 100));

      if (!window.ethereum) {
        console.log('[WalletHook] No ethereum provider found');
        return;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_accounts',
        timeout: 5000
      });

      console.log('[WalletHook] Existing accounts check:', accounts);

      if (accounts && accounts.length > 0) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        providerRef.current = window.ethereum;
        updateState({
          isConnected: true,
          account: accounts[0],
          chainId: parseInt(chainId, 16),
          provider: window.ethereum,
          error: undefined,
        }, 'EXISTING_CONNECTION_FOUND');
      } else {
        updateState({
          isConnected: false,
          account: undefined,
          chainId: undefined,
          provider: undefined,
        }, 'NO_EXISTING_CONNECTION');
      }
    } catch (error) {
      console.error('[WalletHook] Error checking existing connection:', error);
      updateState({
        isConnected: false,
        error: undefined,
      }, 'EXISTING_CONNECTION_ERROR');
    }
  }, [updateState]);

  const setupEventListeners = useCallback(() => {
    if (typeof window === 'undefined' || !window.ethereum) {
      console.log('[WalletHook] No ethereum provider for event listeners');
      return;
    }

    console.log('[WalletHook] Setting up event listeners');

    cleanupEventListeners();

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('disconnect', handleDisconnect);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const cleanupEventListeners = useCallback(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    console.log('[WalletHook] Cleaning up event listeners');

    try {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
      window.ethereum.removeListener('disconnect', handleDisconnect);
    } catch (error) {
      console.warn('[WalletHook] Error cleaning up event listeners:', error);
    }
  }, []);

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    console.log('[WalletHook] Accounts changed:', accounts);

    if (accounts.length === 0) {
      handleDisconnect();
    } else {
      updateState({
        account: accounts[0],
        error: undefined,
      }, 'ACCOUNTS_CHANGED');
    }
  }, [updateState]);

  const handleChainChanged = useCallback((chainId: string) => {
    console.log('[WalletHook] Chain changed:', chainId);

    updateState({
      chainId: parseInt(chainId, 16),
      error: undefined,
    }, 'CHAIN_CHANGED');
  }, [updateState]);

  const handleDisconnect = useCallback(() => {
    console.log('[WalletHook] Handling disconnect');

    clearConnectionTimeout();
    connectionAttemptRef.current = null;
    providerRef.current = undefined;

    updateState({
      isConnecting: false,
      isConnected: false,
      account: undefined,
      chainId: undefined,
      provider: undefined,
      error: undefined,
    }, 'DISCONNECTED');
  }, [updateState, clearConnectionTimeout]);

  const connectWallet = async (walletId: string): Promise<void> => {
    try {
      console.log(`[WalletHook] Connecting to wallet: ${walletId}`);

      if (connectionAttemptRef.current) {
        console.log('[WalletHook] Connection already in progress:', connectionAttemptRef.current);
        return;
      }

      connectionAttemptRef.current = walletId;

      updateState({ 
        isConnecting: true, 
        error: undefined 
      }, 'CONNECTION_STARTED');

      const walletProvider = WALLET_PROVIDERS.find(w => w.id === walletId);
      if (!walletProvider) {
        throw new Error('Wallet provider not found');
      }

      if (walletId === 'walletconnect') {
        await connectWalletConnect();
        return;
      }

      if (walletProvider.type === 'browser') {
        if (!isWalletInstalled(walletId)) {
          if (isMobile() && walletProvider.deepLink) {
            await connectMobileWallet(walletProvider);
            return;
          } else {
            throw new Error(WALLET_ERRORS.INSTALLATION_REQUIRED);
          }
        }

        const provider = await getProvider(walletId);
        if (!provider) {
          throw new Error(`${walletProvider.name} provider not found. Please ensure the wallet is installed and enabled.`);
        }

        connectionTimeoutRef.current = setTimeout(() => {
          console.log('[WalletHook] Connection timeout reached');
          connectionAttemptRef.current = null;
          updateState({
            isConnecting: false,
            error: 'Connection timeout. Please check if MetaMask is unlocked and try again.',
          }, 'CONNECTION_TIMEOUT');
        }, 60000);

        console.log(`[WalletHook] Requesting accounts from ${walletProvider.name}...`);

        let accounts;
        try {
          accounts = await provider.request({
            method: 'eth_requestAccounts',
          });
        } catch (requestError: unknown) {
          console.error('[WalletHook] Error requesting accounts:', requestError);

          const error = requestError as any; // eslint-disable-line @typescript-eslint/no-explicit-any
          if (error.code === 4001) {
            throw new Error('Connection rejected by user. Please try again.');
          } else if (error.code === -32002) {
            throw new Error('MetaMask is already processing a connection request. Please check MetaMask and try again.');
          } else if (error.code === -32603) {
            throw new Error('MetaMask internal error. Please refresh the page and try again.');
          } else {
            throw new Error(`Connection failed: ${error.message || 'Unknown error'}`);
          }
        }

        if (!accounts || accounts.length === 0) {
          throw new Error('No accounts found. Please ensure your wallet is unlocked.');
        }

        const chainId = await provider.request({ method: 'eth_chainId' });

        clearConnectionTimeout();
        connectionAttemptRef.current = null;
        providerRef.current = provider;

        updateState({
          isConnecting: false,
          isConnected: true,
          account: accounts[0],
          chainId: parseInt(chainId, 16),
          provider,
          error: undefined,
        }, 'CONNECTION_SUCCESS');

        console.log('[WalletHook] Wallet connected successfully:', accounts[0]);
      }
    } catch (error: unknown) {
      console.error('[WalletHook] Wallet connection failed:', error);

      clearConnectionTimeout();
      connectionAttemptRef.current = null;

      const err = error as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      let errorMessage = err.message || 'Connection failed';

      if (errorMessage.includes('User rejected')) {
        errorMessage = 'Connection rejected by user. Please try again.';
      } else if (errorMessage.includes('already pending')) {
        errorMessage = 'A connection request is already pending in MetaMask. Please check MetaMask and try again.';
      } else if (errorMessage.includes('timeout')) {
        errorMessage = 'Connection timeout. Please ensure MetaMask is unlocked and try again.';
      }

      updateState({
        isConnecting: false,
        isConnected: false,
        error: errorMessage,
      }, 'CONNECTION_FAILED');
    }
  };

  const getProvider = async (walletId: string): Promise<any> => { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (typeof window === 'undefined') return null;

    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      switch (walletId) {
        case 'metamask':
          if (window.ethereum?.isMetaMask) {
            return window.ethereum;
          }
          break;
        case 'coinbase':
          if (window.ethereum?.isCoinbaseWallet || window.coinbaseWalletExtension) {
            return window.ethereum?.isCoinbaseWallet ? window.ethereum : window.coinbaseWalletExtension;
          }
          break;
        default:
          if (window.ethereum) {
            return window.ethereum;
          }
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }

    return null;
  };

  const connectMobileWallet = async (walletProvider: WalletProvider): Promise<void> => {
    try {
      const deepLink = generateDeepLink(walletProvider);

      if (!deepLink) {
        throw new Error('Deep link not available for this wallet');
      }

      console.log('[WalletHook] Opening mobile wallet:', deepLink);

      window.location.href = deepLink;

      connectionTimeoutRef.current = setTimeout(() => {
        connectionAttemptRef.current = null;
        updateState({
          isConnecting: false,
          error: 'Mobile connection timeout. Please ensure the wallet app is installed and try again.',
        }, 'MOBILE_CONNECTION_TIMEOUT');
      }, 120000);

      const checkConnection = setInterval(async () => {
        try {
          if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts && accounts.length > 0) {
              clearInterval(checkConnection);
              clearConnectionTimeout();
              connectionAttemptRef.current = null;

              const chainId = await window.ethereum.request({ method: 'eth_chainId' });

              updateState({
                isConnecting: false,
                isConnected: true,
                account: accounts[0],
                chainId: parseInt(chainId, 16),
                provider: window.ethereum,
                error: undefined,
              }, 'MOBILE_CONNECTION_SUCCESS');
            }
          }
        } catch {
          // Continue checking
        }
      }, 1000);
    } catch {
      connectionAttemptRef.current = null;
      updateState({
        isConnecting: false,
        error: 'Failed to open mobile wallet. Please ensure the app is installed.',
      }, 'MOBILE_CONNECTION_FAILED');
    }
  };

  const connectWalletConnect = async (): Promise<void> => {
    connectionAttemptRef.current = null;
    updateState({
      isConnecting: false,
      error: 'WalletConnect integration coming soon',
    }, 'WALLETCONNECT_NOT_IMPLEMENTED');
  };

  const disconnect = useCallback(async (): Promise<void> => {
    try {
      console.log('[WalletHook] Manual disconnect initiated');

      if (providerRef.current?.disconnect) {
        await providerRef.current.disconnect();
      }

      handleDisconnect();

      console.log('[WalletHook] Manual disconnect completed');
    } catch (error) {
      console.error('[WalletHook] Error during manual disconnect:', error);
      handleDisconnect();
    }
  }, [handleDisconnect]);

  const switchNetwork = async (chainId: number): Promise<void> => {
    if (!providerRef.current) {
      throw new Error('No wallet connected');
    }

    const network = SUPPORTED_NETWORKS[chainId];
    if (!network) {
      throw new Error(WALLET_ERRORS.NETWORK_NOT_SUPPORTED);
    }

    try {
      updateState({ error: undefined }, 'NETWORK_SWITCH_STARTED');

      await providerRef.current.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: unknown) {
      const err = error as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      if (err.code === 4902) {
        try {
          await providerRef.current.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: network.chainName,
                nativeCurrency: network.nativeCurrency,
                rpcUrls: network.rpcUrls,
                blockExplorerUrls: network.blockExplorerUrls,
              },
            ],
          });
        } catch (addError) {
          updateState({
            error: 'Failed to add network',
          }, 'NETWORK_ADD_FAILED');
          throw addError;
        }
      } else {
        updateState({
          error: 'Failed to switch network',
        }, 'NETWORK_SWITCH_FAILED');
        throw error;
      }
    }
  };

  const retryConnection = useCallback(() => {
    if (connectionAttemptRef.current) {
      console.log('[WalletHook] Retrying connection to:', connectionAttemptRef.current);
      const walletId = connectionAttemptRef.current;
      connectionAttemptRef.current = null;
      connectWallet(walletId);
    }
  }, []);

  return {
    ...state,
    connectWallet,
    disconnect,
    switchNetwork,
    retryConnection,
    supportedNetworks: SUPPORTED_NETWORKS,
    walletProviders: WALLET_PROVIDERS,
  };
};