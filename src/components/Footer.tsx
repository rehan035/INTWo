import { MessageSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#080808] text-[#b4b8b4]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#262626]">
          {/* Brand Column with supplied transparent PNG logo */}
          <div className="md:col-span-4 space-y-4">
            <a href="#hero" aria-label="INTWO SPORTS Top" className="inline-block py-1 bg-transparent">
              <img
                src="/assets/aistudio/image_68e9532c.png"
                alt="INTWO SPORTS"
                referrerPolicy="no-referrer"
                className="h-[48px] md:h-[58px] w-auto object-contain bg-transparent"
              />
            </a>

            <p className="text-sm leading-relaxed max-w-sm">
              International performance gear and technical OEM manufacturing for goalkeepers, football clubs, and global sporting goods brands.
            </p>

            <div className="text-xs font-mono text-[#FFFFFF]">
              <span>Sialkot Export Desk</span>
              <span className="mx-2 text-[#7c827c]">·</span>
              <a
                href="https://wa.me/923005167080"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A8FF00] hover:underline"
              >
                +92 300 5167080
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-display-heading text-base font-bold uppercase tracking-wider text-[#FFFFFF] mb-3">
                Divisions
              </h3>
              <ul className="space-y-2 text-xs font-mono">
                <li>
                  <a href="#gloves" className="hover:text-[#A8FF00] transition-colors">
                    Goalkeeper Gloves
                  </a>
                </li>
                <li>
                  <a href="#uniforms" className="hover:text-[#A8FF00] transition-colors">
                    GK Uniforms &amp; Armor
                  </a>
                </li>
                <li>
                  <a href="#teamwear" className="hover:text-[#A8FF00] transition-colors">
                    Football Uniforms
                  </a>
                </li>
                <li>
                  <a href="#bags" className="hover:text-[#A8FF00] transition-colors">
                    Kit &amp; Gear Bags
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display-heading text-base font-bold uppercase tracking-wider text-[#FFFFFF] mb-3">
                OEM Operations
              </h3>
              <ul className="space-y-2 text-xs font-mono">
                <li>
                  <a href="#latex-engineering" className="hover:text-[#A8FF00] transition-colors">
                    German Latex Matrix
                  </a>
                </li>
                <li>
                  <a href="#oem" className="hover:text-[#A8FF00] transition-colors">
                    5-Step OEM Pipeline
                  </a>
                </li>
                <li>
                  <a href="#oem" className="hover:text-[#A8FF00] transition-colors">
                    ISO 9001:2015 &amp; SCCI
                  </a>
                </li>
                <li>
                  <a href="#rfq-desk" className="hover:text-[#A8FF00] transition-colors">
                    Request FOB Quote
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Customs & Tariff Classifications */}
          <div className="md:col-span-4 flex flex-col justify-between gap-4">
            <div>
              <h3 className="font-display-heading text-base font-bold uppercase tracking-wider text-[#FFFFFF] mb-3">
                Customs HS Classifications
              </h3>
              <ul className="space-y-1.5 text-xs font-mono text-[#7c827c] tabular-nums">
                <li>HS 4015.19 · Vulcanized Rubber / Latex Gloves</li>
                <li>HS 6116.10 · Padded Impact Textiles &amp; Armor</li>
                <li>HS 4202.92 · Ballistic Nylon Team Luggage</li>
              </ul>
            </div>

            <div>
              <a
                href="https://wa.me/923005167080?text=Hello%20INTWO%20SPORTS,%20I%20would%20like%20to%20discuss%20OEM%20manufacturing."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#101010] hover:bg-[#161616] border border-[#262626] hover:border-[#A8FF00] text-xs font-mono text-[#FFFFFF] transition-all duration-150 hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 text-[#A8FF00]" aria-hidden="true" />
                <span>WhatsApp Direct: +92 300 5167080</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Copyright Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#7c827c]">
          <p>
            © 2026 INTWO SPORTS (Private) Limited. Dewana Wala Chowk, Akbarabad, Sialkot, Pakistan (32.4945° N, 74.5229° E).
          </p>
          <p className="font-mono text-[#b4b8b4]">
            Engineered to International Match Standards
          </p>
        </div>
      </div>
    </footer>
  );
}
