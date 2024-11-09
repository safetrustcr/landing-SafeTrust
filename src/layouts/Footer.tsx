import React from "react";
import { FaGithub, FaDiscord } from "react-icons/fa";

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => (
  <footer className="bg-custom-dark text-white py-12">
    <div className="max-w-4xl mx-auto text-center space-y-6">
      <div className="text-4xl font-bold">
        Safe<span className="text-orange-500">Trust</span>
      </div>

      <div className="flex justify-center space-x-6 text-3xl">
        <a
          href="https://github.com/safetrustcr"
          className="text-white hover:text-gray-300"
        >
          <FaGithub />
        </a>
        <a
          href="https://discord.com/invite/5wSxRF62cP"
          className="text-white hover:text-gray-300"
        >
          <FaDiscord />
        </a>
      </div>

      <p className="text-sm uppercase tracking-widest">
        Ensuring secure, decentralized property transfers <br /> with smart
        contracts and verified signatures.
      </p>

      <div className="text-1xs text-gray-500">
        Powered by <span className="text-white">Safe</span>
        <span className="text-orange-500">Trust</span>© {currentYear}
      </div>
    </div>
  </footer>
);

export default Footer;
