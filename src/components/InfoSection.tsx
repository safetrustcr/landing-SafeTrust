import React from "react";

const InfoSection: React.FC = () => {
  return (
    <section id="info" className="bg-white text-black px-16 py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">
            P2P transactions redefined <br /> with blockchain technology.
          </h2>
        </div>

        <div className="text-lg leading-relaxed">
          <p>
            SafeTrust uses blockchain and smart contracts to provide a
            decentralized, secure, and transparent platform for peer-to-peer
            transactions. Whether for rentals or other exchanges, our system
            ensures deposits and payments are protected and visible on the
            blockchain, building trust between users.
          </p>
          <p className="mt-6">
            By automating processes with smart contracts, SafeTrust holds funds
            in secure escrow until all terms are met. Once obligations are
            fulfilled, assets are released securely, creating a fair and
            dependable P2P transaction experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
