import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#gloves', label: 'Gloves' },
  { href: '#uniforms', label: 'GK Uniforms' },
  { href: '#teamwear', label: 'Football Kits' },
  { href: '#bags', label: 'Kit Bags' },
  { href: '#oem', label: 'OEM Factory' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080808]/95 backdrop-blur-md border-b border-[#262626]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-2 flex items-center justify-between gap-8">
        {/* Zone 1: Supplied transparent INTWO SPORTS logo without background box */}
        <a
          href="#hero"
          aria-label="INTWO SPORTS Home"
          className="inline-flex items-center py-1 pr-2 shrink-0 bg-transparent focus-visible:outline-2 focus-visible:outline-[#A8FF00] focus-visible:outline-offset-4"
        >
          <img
            src="/assets/aistudio/image_68e9532c.png"
            alt="INTWO SPORTS"
            referrerPolicy="no-referrer"
            className="h-[48px] md:h-[65px] w-auto object-contain bg-transparent transition-transform duration-200 hover:scale-[1.02]"
          />
        </a>

        {/* Zone 2: Concise single-line nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#b4b8b4] hover:text-[#FFFFFF] border-b-2 border-transparent hover:border-[#A8FF00] py-1.5 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#A8FF00] focus-visible:outline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA + mobile drawer toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#rfq-desk"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-[#A8FF00] hover:bg-[#beff3d] text-[#080808] font-display-heading text-base font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Request Quote
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-[#FFFFFF] border border-[#262626] bg-[#101010] hover:border-[#A8FF00] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#A8FF00]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile Navigation"
          className="lg:hidden bg-[#101010] border-t border-[#262626] px-4 py-5 space-y-2"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 px-3 text-base font-medium text-[#FFFFFF] hover:bg-[#161616] hover:text-[#A8FF00] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#262626] flex flex-col gap-2.5">
            <a
              href="#rfq-desk"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-3 bg-[#A8FF00] text-[#080808] font-display-heading text-base font-bold uppercase tracking-wider"
            >
              Request Quote
            </a>
            <a
              href="https://wa.me/923005167080?text=Hello%20INTWO%20SPORTS,%20I%20need%20OEM%20sports%20gear%20pricing."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-3 bg-[#080808] border border-[#262626] text-[#FFFFFF] font-display-heading text-base font-semibold uppercase tracking-wider"
            >
              WhatsApp Enquiry: +92 300 5167080
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
