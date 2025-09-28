import * as React from "react"

export function Footer() {
  return (
    <footer className="bg-background text-foreground py-12 relative overflow-hidden border-t border-border transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none transition-colors duration-300"></div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header area with logo and social media */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="bg-blue-600 w-8 h-8 rounded mr-3"></div>
            <span className="text-2xl font-bold">SafeTrust</span>
          </div>
        </div>

        {/* Newsletter & Social Media */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-x-4 gap-y-8 mb-12">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-6 h-6 rounded mr-2 flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">
                SafeTrust
              </span>
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-card border-border rounded-md w-full text-muted-foreground pl-4 backdrop-blur-sm focus:border-primary focus:ring-primary/20 transition-colors duration-300"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 mt-2 sm:mt-0 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            {/* Twitter */}
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733..." />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14..." />
              </svg>
            </a>
            {/* GitHub */}
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302..." />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
              </svg>
            </a>
          </div>
        </div>

        {/* Main footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors duration-200">About</a></li>
              <li><a href="/features" className="text-muted-foreground hover:text-primary transition-colors duration-200">Features</a></li>
              <li><a href="/pricing" className="text-muted-foreground hover:text-primary transition-colors duration-200">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li><a href="/team" className="text-muted-foreground hover:text-primary transition-colors duration-200">Team</a></li>
              <li><a href="/careers" className="text-muted-foreground hover:text-primary transition-colors duration-200">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-muted-foreground hover:text-primary transition-colors duration-200">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-12 text-center">
          <p className="text-gray-400">© 2025 SafeTrust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
