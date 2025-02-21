"use client";

export default function TestimonialSection() {
    return (
      <section className="bg-black py-16">
        <div className="container mx-auto px-4">
          {/* Sponsor Logos */}
          <div className="flex flex-wrap items-center justify-center gap-12 mb-16">
            <div className="flex items-center space-x-12 opacity-70 hover:opacity-100 transition-opacity">
              {/* OnlyDust Logo */}
              <img src="/placeholder.svg?height=40&width=160" alt="OnlyDust" className="h-10 w-auto" />
              {/* Stellar Logo */}
              <img src="/placeholder.svg?height=40&width=160" alt="Stellar" className="h-10 w-auto" />
              {/* Dojo Coding Logo */}
              <img src="/placeholder.svg?height=40&width=160" alt="Dojo Coding" className="h-10 w-auto" />
            </div>
          </div>
  
          {/* Testimonial */}
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="relative">
              <div className="text-4xl font-medium leading-tight text-white mb-8">
                <span className="text-primary">"</span>
                SafeTrust's secure deposit system and blockchain technology have revolutionized how we handle P2P
                transactions. Their blue-chip security standards give us complete peace of mind.
                <span className="text-primary">"</span>
              </div>
              <footer className="text-gray-400">
                <div className="font-medium">Alex Chen</div>
                <div className="text-sm">Blockchain Solutions Architect</div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    )
  }