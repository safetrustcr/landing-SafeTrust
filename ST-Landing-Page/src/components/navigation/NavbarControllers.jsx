import React, { useState, useEffect } from "react";
import { Sun, Moon, Wallet, Menu, X } from "lucide-react";

export default function NavbarControllers() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync theme status safely with target DOM tree
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <>
      {/* Desktop Controls Group */}
      <div className="nav-controls-desktop">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle display theme color format"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="connect-wallet-btn">
          <Wallet size={16} />
          <span>Connect wallet</span>
        </button>
      </div>

      {/* Mobile Right Action Sidebar Options */}
      <div className="nav-controls-mobile">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle display theme color format"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="hamburger-toggle-menu"
          aria-label="Toggle responsive navigation portal drawer link array"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Responsive Overlay Container Box */}
      {isMobileMenuOpen && (
        <div className="mobile-navigation-drawer-portal">
          <nav className="mobile-drawer-links-stack">
            <a
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-link active"
            >
              How it works
            </a>
            <a
              href="#security"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-link"
            >
              Security
            </a>
            <a
              href="#pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-link"
            >
              Pricing
            </a>
            <a
              href="/docs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-link"
            >
              Docs
            </a>

            <div className="mobile-drawer-footer-actions">
              <button className="connect-wallet-btn dynamic-fullwidth-modifier">
                <Wallet size={16} />
                <span>Connect wallet</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
