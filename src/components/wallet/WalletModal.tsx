import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Network,
  Smartphone,
  Globe,
  X,
  Info
} from 'lucide-react';
import Modal from '../ui/modal';
import WalletOption from './WalletOption';
import { useWallet } from '../../hooks/use-wallet';
import { WalletProvider } from '../../types/wallet';
import { isMobile } from '../../lib/wallet-config';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const {
    isConnecting,
    isConnected,
    account,
    chainId,
    error,
    connectWallet,
    disconnect,
    switchNetwork,
    retryConnection,
    supportedNetworks,
    walletProviders,
  } = useWallet();

  const [connectingWalletId, setConnectingWalletId] = useState<string>();
  const [showNetworkSelector, setShowNetworkSelector] = useState(false);
  const [lastAttemptedWallet, setLastAttemptedWallet] = useState<string>();
  const mobile = isMobile();

  useEffect(() => {
    if (isOpen) {
      setConnectingWalletId(undefined);
      setShowNetworkSelector(false);
      setLastAttemptedWallet(undefined);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isConnecting && connectingWalletId) {
      setLastAttemptedWallet(connectingWalletId);
    } else if (!isConnecting) {
      setConnectingWalletId(undefined);
    }
  }, [isConnecting, connectingWalletId]);

  useEffect(() => {
    if (isConnected && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isConnected, isOpen, onClose]);

  const handleConnect = async (walletId: string) => {
    console.log(`[WalletModal] Connecting to ${walletId}`);
    setConnectingWalletId(walletId);
    setLastAttemptedWallet(walletId);
    try {
      await connectWallet(walletId);
    } catch (err) {
      console.error(`[WalletModal] Connection to ${walletId} failed:`, err);
    }
  };

  const handleRetry = () => {
    console.log('[WalletModal] Retrying connection');
    if (retryConnection) {
      retryConnection();
    } else if (lastAttemptedWallet) {
      handleConnect(lastAttemptedWallet);
    }
  };

  const handleSwitchNetwork = async (newChainId: number) => {
    try {
      await switchNetwork(newChainId);
      setShowNetworkSelector(false);
    } catch (err) {
      console.error('[WalletModal] Network switch failed:', err);
    }
  };

  const getCurrentNetwork = () => {
    return chainId ? supportedNetworks[chainId] : null;
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getAvailableWallets = (): WalletProvider[] => {
    return walletProviders.filter(wallet => {
      if (mobile) {
        return wallet.deepLink || wallet.type === 'walletconnect';
      }
      return true;
    });
  };

  const renderWalletList = () => (
    <div className="p-6 space-y-4">
      <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
          <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Connect Your Wallet
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choose your preferred wallet to connect to the application
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                Connection Failed
              </p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                {error}
              </p>
              {lastAttemptedWallet && (
                <button
                  onClick={handleRetry}
                  className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry Connection
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {mobile && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                Mobile Device Detected
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Tapping a wallet will open its mobile app. Ensure you have the wallet app installed before connecting.
              </p>
            </div>
          </div>
        </div>
      )}

      {!mobile && error && error.includes('timeout') && (
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                Connection Tips
              </p>
              <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
                <li>• Make sure MetaMask is unlocked</li>
                <li>• Check if MetaMask is already processing another request</li>
                <li>• Try refreshing the page if the issue persists</li>
                <li>• Ensure you're not using an incognito/private window</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {getAvailableWallets().map((wallet) => (
          <WalletOption
            key={wallet.id}
            wallet={wallet}
            onConnect={handleConnect}
            onRetry={wallet.id === lastAttemptedWallet ? handleRetry : undefined}
            isConnecting={isConnecting}
            connectingWalletId={connectingWalletId}
            error={connectingWalletId === wallet.id || lastAttemptedWallet === wallet.id ? error : undefined}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              Security Notice
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Only connect wallets you trust. Never share your private keys or seed phrase with anyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConnectedState = () => (
    <div className="p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-6"
      >
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </motion.div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Wallet Connected Successfully!
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your wallet has been connected and is ready to use
        </p>
      </motion.div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Connected Account
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(account || '')}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Copy Address
            </button>
          </div>
          <p className="text-sm text-gray-900 dark:text-white font-mono break-all">
            {account ? formatAddress(account) : 'N/A'}
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Network
            </span>
            <button
              onClick={() => setShowNetworkSelector(true)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <Network className="w-3 h-3" />
              Switch
            </button>
          </div>
          <p className="text-sm text-gray-900 dark:text-white">
            {getCurrentNetwork()?.chainName || `Chain ID: ${chainId}`}
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Continue
        </button>
        <button
          onClick={disconnect}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Disconnect
        </button>
      </div>
    </div>
  );

  const renderNetworkSelector = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Switch Network
        </h3>
        <button
          onClick={() => setShowNetworkSelector(false)}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {Object.values(supportedNetworks).map((network) => (
          <button
            key={network.chainId}
            onClick={() => handleSwitchNetwork(network.chainId)}
            className={`
              w-full p-4 rounded-lg border text-left flex items-center gap-4 transition-all
              ${chainId === network.chainId
                ? 'border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }
            `}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white">
                {network.chainName}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {network.nativeCurrency.symbol}
              </p>
            </div>
            {chainId === network.chainId && (
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="md"
      showCloseButton={!isConnecting}
      closeOnOverlayClick={!isConnecting}
      className="overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {isConnected ? (
          <motion.div
            key="connected"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {showNetworkSelector ? renderNetworkSelector() : renderConnectedState()}
          </motion.div>
        ) : (
          <motion.div
            key="connect"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {renderWalletList()}
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default WalletModal;