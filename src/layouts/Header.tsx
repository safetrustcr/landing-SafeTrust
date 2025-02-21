'use client'

import React, { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import useMetaMask from '../hooks/useWallet'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  const { account, connectWallet } = useMetaMask()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-4 py-4 md:px-8 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
        <span className="text-2xl font-semibold text-white">SafeTrust</span>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          ☰
        </button>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <Link
          to="features"
          smooth={true}
          duration={800}
          className="text-gray-300 hover:text-white transition cursor-pointer"
        >
          Features
        </Link>
        <Link
          to="pricing"
          smooth={true}
          duration={800}
          className="text-gray-300 hover:text-white transition cursor-pointer"
        >
          Pricing
        </Link>
        <Link
          to="support"
          smooth={true}
          duration={800}
          className="text-gray-300 hover:text-white transition cursor-pointer"
        >
          Support
        </Link>

        {account ? (
          <a
            href={`https://etherscan.io/address/${account}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button nav-button btn-sm mx-4"
          >
            <button className="bg-custom-dark text-white py-2 px-4 rounded-md transition">
              {`${account.slice(0, 6)}...${account.slice(-4)}`}
            </button>
          </a>
        ) : (
          <button
            className="bg-custom-dark hover:bg-slate-950 text-white py-2 px-4 rounded-md transition"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-40 flex justify-center items-center"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 p-8 rounded-xl flex flex-col items-center space-y-6"
          >
            <Link
              to="features"
              smooth={true}
              duration={800}
              className="text-gray-300 hover:text-white transition text-xl"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="pricing"
              smooth={true}
              duration={800}
              className="text-gray-300 hover:text-white transition text-xl"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="support"
              smooth={true}
              duration={800}
              className="text-gray-300 hover:text-white transition text-xl"
              onClick={() => setIsOpen(false)}
            >
              Support
            </Link>

            {account ? (
              <a
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button nav-button btn-sm mx-4"
              >
                <button className="bg-custom-dark text-white py-2 px-4 rounded-md transition">
                  {`${account.slice(0, 6)}...${account.slice(-4)}`}
                </button>
              </a>
            ) : (
              <button
                className="bg-custom-dark hover:bg-slate-950 text-white py-2 px-4 rounded-md transition"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.header>
  )
}

export default Header