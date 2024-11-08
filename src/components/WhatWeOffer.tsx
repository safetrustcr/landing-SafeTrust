import React from 'react'

interface Service {
  title: string
  description: string
  icon: string
}

const WhatWeOffer: React.FC = () => {
  const services: Service[] = [
    {
      title: 'Deposit Protection',
      description:
        'Your funds are securely held using blockchain-based escrow, released only when all conditions are fulfilled.',
      icon: '🔒'
    },
    {
      title: 'Verified Agreements',
      description:
        'Blockchain verification for all agreements ensures security and trust, removing the need for intermediaries.',
      icon: '🖊️'
    },
    {
      title: 'Smart Contract Automation',
      description:
        'Automated transactions through smart contracts streamline processes, eliminating manual handling and reducing disputes.',
      icon: '⚙️'
    }
  ]

  return (
    <section id="services" className="bg-custom-dark text-white px-8 md:px-16 py-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">What We Offer</h2>
        <p className="text-lg text-gray-200 mb-12">
          Discover how SafeTrust provides a secure, decentralized, and transparent platform for P2P transactions. <br />
          Our services protect your assets, establish trust, and automate processes, making every transaction reliable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-8 text-center border border-gray-200"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-black text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeOffer
