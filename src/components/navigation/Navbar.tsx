
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import HamburgerButton from '@/components/ui/hamburger-button';
import MobileMenu from './MobileMenu';
import NavigationLink from './NavigationLink';
import { useActiveSection } from '@/hooks/use-active-section';
import { ThemeToggle } from '../theme-toggle';
import WalletModal from '../wallet/WalletModal';
import { useWallet } from '../../hooks/use-wallet';
import {
  Wallet,
  CheckCircle,
  Globe,
  ChevronDown,
  Copy,
  LogOut,
  Loader2
} from 'lucide-react';

const navigationItems = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/icons", label: "Icons" },
  { href: "#support", label: "Support" },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<
    "mobile" | "tablet" | "laptop" | "desktop"
  >("laptop");
  const [isClient, setIsClient] = useState(false);
  const { activeSection, setActiveSection } = useActiveSection(
    navigationItems[0].href
  );

  // Wallet connection state
  const {
    isConnected,
    isConnecting,
    account,
    chainId,
    error,
    disconnect,
    supportedNetworks
  } = useWallet();

  // Debug wallet state changes in navbar
  useEffect(() => {
    console.log('[Navbar] Wallet state changed:', {
      isConnected,
      isConnecting,
      account,
      error
    });
  }, [isConnected, isConnecting, account, error]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openWalletModal = () => {
    console.log('[Navbar] Opening wallet modal');
    setIsWalletModalOpen(true);
    setIsWalletDropdownOpen(false);
  };

  const closeWalletModal = () => {
    console.log('[Navbar] Closing wallet modal');
    setIsWalletModalOpen(false);
  };

  const handleDisconnect = async () => {
    console.log('[Navbar] Disconnect initiated');
    try {
      await disconnect();
      setIsWalletDropdownOpen(false);
      console.log('[Navbar] Disconnect completed');
    } catch (error) {
      console.error('[Navbar] Disconnect failed:', error);
    }
  };

  const copyAddress = async () => {
    if (account) {
      try {
        await navigator.clipboard.writeText(account);
        console.log('[Navbar] Address copied to clipboard');
        setIsWalletDropdownOpen(false);
        // You could show a toast notification here
      } catch (error) {
        console.error('[Navbar] Failed to copy address:', error);
      }
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getCurrentNetwork = () => {
    return chainId ? supportedNetworks[chainId] : null;
  };

  // Detect screen size - only on client side
  useEffect(() => {
    setIsClient(true);
    const checkScreenSize = () => {
      if (window.innerWidth >= 1920) {
        setScreenSize("desktop");
      } else if (window.innerWidth >= 1366) {
        setScreenSize("laptop");
      } else if (window.innerWidth >= 768) {
        setScreenSize("tablet");
      } else if (window.innerWidth >= 320) {
        setScreenSize("mobile");
      } else {
        setScreenSize("mobile");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isWalletDropdownOpen) {
        setIsWalletDropdownOpen(false);
      }
    };

    if (isWalletDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isWalletDropdownOpen]);

  // Wallet connection indicator component
  const WalletIndicator = ({ isMobile = false }: { isMobile?: boolean }) => {
    // Connecting state
    if (isConnecting) {
      return (
        <motion.button
          disabled
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg border border-yellow-200 dark:border-yellow-700
            bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300
            cursor-not-allowed opacity-75 transition-all duration-200
            ${isMobile ? 'text-sm' : ''}
          `}
        >
          <Loader2 className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} animate-spin`} />
          <span className="font-medium">Connecting...</span>
        </motion.button>
      );
    }

    // Connected state
    if (isConnected && account) {
      return (
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsWalletDropdownOpen(!isWalletDropdownOpen);
            }}
            className={`
              flex items-center gap-3 px-4 py-2 rounded-lg border border-green-200 dark:border-green-700
              bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300
              hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
              ${isMobile ? 'text-sm' : ''}
            `}
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <CheckCircle className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-green-600 dark:text-green-400`} />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className="font-medium">
                {formatAddress(account)}
              </span>
            </div>
            <ChevronDown className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} transition-transform ${isWalletDropdownOpen ? 'rotate-180' : ''}`} />
          </motion.button>

          {/* Dropdown menu */}
          {isWalletDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`
                absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700
                z-50 overflow-hidden
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Wallet Connected
                  </span>
                </div>
              </div>

              {/* Account info */}
              <div className="p-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Address
                    </span>
                    <button
                      onClick={copyAddress}
                      className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                  </div>
                  <p className="text-sm font-mono text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2 break-all">
                    {account}
                  </p>
                </div>

                {/* Network info */}
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                    Network
                  </span>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {getCurrentNetwork()?.chainName || `Chain ID: ${chainId}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                <button
                  onClick={openWalletModal}
                  className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Manage
                </button>
                <button
                  onClick={handleDisconnect}
                  className="flex items-center gap-1 px-3 py-2 text-sm border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect
                </button>
              </div>
            </motion.div>
          )}
        </div>
      );
    }

    // Disconnected state
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          onClick={openWalletModal}
          className={`
            border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 
            hover:bg-blue-600/10 dark:hover:bg-blue-400/10 hover:text-blue-700 dark:hover:text-blue-300 
            focus:outline-none focus:bg-blue-600/10 dark:focus:bg-blue-400/10 focus:text-blue-700 dark:focus:text-blue-300 
            focus:border-blue-500 dark:focus:border-blue-300 focus:shadow-lg focus:shadow-blue-500/25 dark:focus:shadow-blue-400/25 
            transition-all duration-300 flex items-center gap-2
            ${isMobile ? 'text-sm px-3 py-2' : ''}
          `}
        >
          <Wallet className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
          Connect Wallet
        </Button>
      </motion.div>
    );
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between px-4 py-4 relative z-10 laptop:container laptop:mx-auto bg-background/80 backdrop-blur-md border-b border-border/50 transition-colors duration-300">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent transition-colors duration-300">
            SafeTrust
          </span>
        </motion.div>

        {/* Desktop Navigation - Full navigation for laptop and above */}
        <div className="hidden laptop:flex items-center gap-6">
          {navigationItems.map((item) => (
            <NavigationLink
              key={item.href}
              href={item.href}
              onClick={() => setActiveSection(item.href)}
              className="text-foreground/80 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
            >
              {item.label}
            </NavigationLink>
          ))}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <WalletIndicator />
          </div>
        </div>

        {/* Tablet Navigation */}
        <div className="hidden tablet:flex laptop:hidden items-center gap-3">
          <ThemeToggle />
          <WalletIndicator isMobile />
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>

        {/* Mobile Navigation */}
        <div className="tablet:hidden flex items-center gap-3">
          <ThemeToggle />
          <WalletIndicator isMobile />
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>
      </nav>

      {/* Mobile Menu - Only show for mobile and tablet */}
      {isClient && (screenSize === "mobile" || screenSize === "tablet") && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          isTablet={screenSize === 'tablet'}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}

      {/* Wallet Modal */}
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={closeWalletModal} 
      />
    </>
  );
};

export default Navbar;
