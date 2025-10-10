import { useState, useEffect, useCallback, useRef } from 'react';
import { WalletConnectionState, WalletProvider, NetworkConfig, WalletError } from '../types/wallet';
import { 
  WALLET_PROVIDERS, 
  SUPPORTED_NETWORKS, 
  DEFAULT_CHAIN_ID, 
  WALLET_ERRORS,
  isWalletInstalled,
  generateDeepLink,
  isMobile 
} from '../lib/wallet-config';

declare global {
  interface Window {
    ethereum?: any;
    coinbaseWalletExtension?: any;
  }
}

export const useWallet = () => {
  const [state, setState] = useState<WalletConnectionState>({
    isConnecting: false,
    isConnected: false,
    account: undefined,
    chainId: undefined,
    provider: undefined,
    error: undefined,
  });

  const connectionTimeoutRef = useRef<NodeJS.Timeout>();
  const providerRef = useRef<any>();
  const isInitialized = useRef(false);
  const connectionAttemptRef = useRef<string | null>(null);

  // Debug function to log state changes
  const debugLog = (action: string, data?: any) => {
    console.log(`[WalletHook] ${action}:`, {
      isConnected: state.isConnected,
      isConnecting: state.isConnecting,
      account: state.account,
      error: state.error,
      timestamp: new Date().toISOString(),
      ...data
    });
  };

  // Force update state and log changes
  const updateState = useCallback((newState: Partial<WalletConnectionState>, action: string) => {
    setState(prevState => {
      const updatedState = { ...prevState, ...newState };
      console.log(`[WalletHook] State Update - ${action}:`, {
        previous: prevState,
        new: updatedState,
        timestamp: new Date().toISOString()
      });
      return updatedState;
    });
  }, []);

  // Clear any ongoing connection timeout
  const clearConnectionTimeout = useCallback(() => {
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
      connectionTimeoutRef.current = undefined;
    }
  }, []);

  // Initialize wallet connection state
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
  }, [clearConnectionTimeout]);

  const checkExistingConnection = async () => {
    try {
      console.log('[WalletHook] Checking existing connection...');

      if (typeof window === 'undefined') {
        console.log('[WalletHook] Window is undefined (SSR)');
        return;
      }

      // Wait a bit for ethereum provider to be injected
      await new Promise(resolve => setTimeout(resolve, 100));

      if (!window.ethereum) {
        console.log('[WalletHook] No ethereum provider found');
        return;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_accounts',
        timeout: 5000 // 5 second timeout for checking accounts
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
        error: undefined, // Don't show error for existing connection check
      }, 'EXISTING_CONNECTION_ERROR');
    }
  };

  const setupEventListeners = () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      console.log('[WalletHook] No ethereum provider for event listeners');
      return;
    }

    console.log('[WalletHook] Setting up event listeners');

    // Remove existing listeners first
    cleanupEventListeners();

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('disconnect', handleDisconnect);
  };

  const cleanupEventListeners = () => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    console.log('[WalletHook] Cleaning up event listeners');

    try {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
      window.ethereum.removeListener('disconnect', handleDisconnect);
    } catch (error) {
      console.warn('[WalletHook] Error cleaning up event listeners:', error);
    }
  };

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

      // Prevent multiple simultaneous connections
      if (connectionAttemptRef.current) {
        console.log('[WalletHook] Connection already in progress:', connectionAttemptRef.current);
        return;
      }

      connectionAttemptRef.current = walletId;

      // Clear any previous errors and set connecting state
      updateState({ 
        isConnecting: true, 
        error: undefined 
      }, 'CONNECTION_STARTED');

      const walletProvider = WALLET_PROVIDERS.find(w => w.id === walletId);
      if (!walletProvider) {
        throw new Error('Wallet provider not found');
      }

      // Handle different wallet types
      if (walletId === 'walletconnect') {
        await connectWalletConnect();
        return;
      }

      // For MetaMask and other browser wallets
      if (walletProvider.type === 'browser') {

        // Check if wallet is installed
        if (!isWalletInstalled(walletId)) {
          if (isMobile() && walletProvider.deepLink) {
            await connectMobileWallet(walletProvider);
            return;
          } else {
            throw new Error(WALLET_ERRORS.INSTALLATION_REQUIRED);
          }
        }

        // Get the provider
        const provider = await getProvider(walletId);
        if (!provider) {
          throw new Error(`${walletProvider.name} provider not found. Please ensure the wallet is installed and enabled.`);
        }

        // Set connection timeout (increased to 60 seconds for MetaMask)
        connectionTimeoutRef.current = setTimeout(() => {
          console.log('[WalletHook] Connection timeout reached');
          connectionAttemptRef.current = null;
          updateState({
            isConnecting: false,
            error: 'Connection timeout. Please check if MetaMask is unlocked and try again.',
          }, 'CONNECTION_TIMEOUT');
        }, 60000); // 60 seconds timeout

        console.log(`[WalletHook] Requesting accounts from ${walletProvider.name}...`);

        // Request account access with better error handling
        let accounts;
        try {
          accounts = await provider.request({
            method: 'eth_requestAccounts',
          });
        } catch (requestError: any) {
          console.error('[WalletHook] Error requesting accounts:', requestError);

          // Handle specific MetaMask errors
          if (requestError.code === 4001) {
            throw new Error('Connection rejected by user. Please try again.');
          } else if (requestError.code === -32002) {
            throw new Error('MetaMask is already processing a connection request. Please check MetaMask and try again.');
          } else if (requestError.code === -32603) {
            throw new Error('MetaMask internal error. Please refresh the page and try again.');
          } else {
            throw new Error(`Connection failed: ${requestError.message || 'Unknown error'}`);
          }
        }

        if (!accounts || accounts.length === 0) {
          throw new Error('No accounts found. Please ensure your wallet is unlocked.');
        }

        // Get chain ID
        const chainId = await provider.request({ method: 'eth_chainId' });

        // Clear timeout and update state
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

    } catch (error: any) {
      console.error('[WalletHook] Wallet connection failed:', error);

      clearConnectionTimeout();
      connectionAttemptRef.current = null;

      let errorMessage = error.message || 'Connection failed';

      // Clean up generic error messages
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

  const getProvider = async (walletId: string): Promise<any> => {
    if (typeof window === 'undefined') return null;

    // Wait for provider to be available
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

      // Wait 100ms before trying again
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

      // Open wallet app
      window.location.href = deepLink;

      // Set a longer timeout for mobile connections
      connectionTimeoutRef.current = setTimeout(() => {
        connectionAttemptRef.current = null;
        updateState({
          isConnecting: false,
          error: 'Mobile connection timeout. Please ensure the wallet app is installed and try again.',
        }, 'MOBILE_CONNECTION_TIMEOUT');
      }, 120000); // 2 minutes for mobile

      // Wait for user to return from wallet app
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
        } catch (error) {
          // Continue checking
        }
      }, 1000);

    } catch (error) {
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

      // Clean up provider connection if needed
      if (providerRef.current?.disconnect) {
        await providerRef.current.disconnect();
      }

      // Force state cleanup
      handleDisconnect();

      console.log('[WalletHook] Manual disconnect completed');
    } catch (error) {
      console.error('[WalletHook] Error during manual disconnect:', error);
      // Force disconnect on error
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

      // Try to switch to the network
      await providerRef.current.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      // If network doesn't exist, add it
      if (error.code === 4902) {
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

  // Retry connection function
  const retryConnection = useCallback(() => {
    if (connectionAttemptRef.current) {
      console.log('[WalletHook] Retrying connection to:', connectionAttemptRef.current);
      const walletId = connectionAttemptRef.current;
      connectionAttemptRef.current = null;
      connectWallet(walletId);
    }
  }, []);

  // Debug effect to log all state changes
  useEffect(() => {
    debugLog('STATE_CHANGED');
  }, [state.isConnected, state.isConnecting, state.account, state.error]);

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