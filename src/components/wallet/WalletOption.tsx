import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Download, Smartphone, AlertCircle, RefreshCw } from 'lucide-react';
import { WalletProvider } from '../../types/wallet';
import { isWalletInstalled, isMobile } from '../../lib/wallet-config';

interface WalletOptionProps {
  wallet: WalletProvider;
  onConnect: (walletId: string) => void;
  onRetry?: () => void;
  isConnecting: boolean;
  connectingWalletId?: string;
  error?: string;
}

const WalletOption: React.FC<WalletOptionProps> = ({
  wallet,
  onConnect,
  onRetry,
  isConnecting,
  connectingWalletId,
  error,
}) => {
  const installed = isWalletInstalled(wallet.id);
  const mobile = isMobile();
  const isCurrentlyConnecting = isConnecting && connectingWalletId === wallet.id;
  const hasError = error && connectingWalletId === wallet.id;

  // Determine what action to show
  const getWalletStatus = () => {
    if (wallet.type === 'walletconnect') {
      return { action: 'connect', canConnect: true, statusText: 'Scan QR Code' };
    }

    if (mobile && wallet.deepLink) {
      return { action: 'deeplink', canConnect: true, statusText: 'Open App' };
    }

    if (wallet.type === 'browser' && !installed) {
      return { action: 'install', canConnect: false, statusText: 'Install Required' };
    }

    return { action: 'connect', canConnect: true, statusText: 'Connect' };
  };

  const { action, canConnect, statusText } = getWalletStatus();

  const handleClick = () => {
    if (!canConnect || isCurrentlyConnecting) return;

    if (action === 'install' && wallet.downloadUrl) {
      window.open(wallet.downloadUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    console.log(`[WalletOption] Connecting to ${wallet.name}`);
    onConnect(wallet.id);
  };

  const handleRetry = () => {
    if (onRetry) {
      console.log(`[WalletOption] Retrying connection to ${wallet.name}`);
      onRetry();
    } else {
      handleClick();
    }
  };

  const getIcon = () => {
    // In a real implementation, you'd import SVG icons or use an icon library
    const iconMap: Record<string, string> = {
      metamask: '🦊',
      coinbase: '🔷', 
      walletconnect: '🔗',
      trust: '🛡️',
    };

    return iconMap[wallet.id] || '👛';
  };

  const getStatusColor = () => {
    if (hasError) return 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20';
    if (isCurrentlyConnecting) return 'border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20';
    if (canConnect) return 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20';
    return 'border-gray-200 dark:border-gray-700 opacity-60';
  };

  return (
    <motion.div
      whileHover={canConnect && !isCurrentlyConnecting ? { scale: 1.02, y: -2 } : {}}
      whileTap={canConnect && !isCurrentlyConnecting ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      className={`
        w-full p-4 rounded-xl border-2 transition-all duration-200
        text-left flex flex-col gap-3 relative overflow-hidden
        ${getStatusColor()}
        ${canConnect && !isCurrentlyConnecting ? 'cursor-pointer' : 'cursor-not-allowed'}
      `}
    >
      {/* Loading spinner overlay */}
      {isCurrentlyConnecting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full"
          />
        </motion.div>
      )}

      {/* Main wallet info */}
      <div className="flex items-center gap-4">
        {/* Wallet Icon */}
        <div className={`
          flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl
          ${canConnect 
            ? 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-800' 
            : 'bg-gray-100 dark:bg-gray-700'
          }
          transition-colors duration-200
        `}>
          {wallet.icon ? (
            <img 
              src={wallet.icon} 
              alt={`${wallet.name} icon`}
              className="w-8 h-8"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.textContent = getIcon();
              }}
            />
          ) : (
            <span>{getIcon()}</span>
          )}
        </div>

        {/* Wallet Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {wallet.name}
            </h3>

            {/* Status indicators */}
            {wallet.type === 'mobile' && (
              <Smartphone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}

            {!installed && wallet.type === 'browser' && (
              <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            )}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {wallet.description || `Connect using ${wallet.name}`}
          </p>
        </div>

        {/* Action Icon */}
        <div className="flex-shrink-0">
          {isCurrentlyConnecting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"
            />
          ) : action === 'install' ? (
            <Download className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
          ) : action === 'deeplink' ? (
            <ExternalLink className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
          ) : (
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 2 }}
              className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-l-0 border-b-0 rotate-45 transform hover:border-blue-600 transition-colors"
            />
          )}
        </div>
      </div>

      {/* Error message and retry button */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-red-200 dark:border-red-800 pt-3"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                {error}
              </p>
              <button
                onClick={handleRetry}
                className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Try Again
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Connection status text */}
      {!hasError && (
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {isCurrentlyConnecting ? 'Connecting...' : statusText}
        </div>
      )}

      {/* Click handler */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={hasError ? handleRetry : handleClick}
        style={{ zIndex: isCurrentlyConnecting ? 0 : 5 }}
      />
    </motion.div>
  );
};

export default WalletOption;