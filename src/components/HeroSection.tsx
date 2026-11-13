import { useState } from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { GLOVE_CUTS, HERO_MEDIA } from '../data/catalog';
import { ResilientImage } from './ResilientImage';
import type { DivisionId, MaterialTierId } from '../utils/rfq';

interface HeroSectionProps {
  onConfigureProduct: (division: DivisionId, materialTier: MaterialTierId, note?: string) => void;
}

const KPI_METRICS = [
  { value: '50 Pairs', label: 'Minimum Order (MOQ)' },
  { value: '4.0 mm', label: 'German Contact Latex' },
  { value: 'Sizes 4–11', label: 'Youth to Pro Match' },
  { value: '7–10 Days', label: 'Sample Prototyping' },
];

export function HeroSection({ onConfigureProduct }: HeroSectionProps) {
  const [selectedCutId, setSelectedCutId] = useState<'hybrid' | 'negative' | 'roll'>('hybrid');
  const activeCut = GLOVE_CUTS.find((c) => c.id === selectedCutId) || GLOVE_CUTS[2];

  return (
    <section
      id="hero"
      className="scroll-mt-24 border-b border-[#262626] bg-[#080808] pt-10 pb-14 md:pt-14 md:pb-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* 2-Column Balanced Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Core Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-7">
            <div className="space-y-5">
              <p className="text-xs font-medium tracking-wider uppercase text-[#A8FF00]">
                Pro Match Tested · Sialkot OEM Facility · ISO 9001:2015
              </p>

              <h1
                className="font-display-heading font-extrabold uppercase tracking-tight text-[#FFFFFF] leading-[0.96]"
                style={{ fontSize: 'clamp(2.75rem, 5vw, 4.75rem)' }}
              >
                Engineered for <span className="text-[#A8FF00]">Elite Saves.</span> Crafted in Sialkot.
              </h1>

              <p className="text-base md:text-lg text-[#b4b8b4] leading-relaxed max-w-[60ch]">
                INTWO SPORTS is an international athletic gearmaker and private-label OEM factory. We build pro-grade German contact latex goalkeeper gloves, impact-armored uniforms, sublimated football kits, and 1680D ballistic team bags for clubs and brands worldwide.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#rfq-desk"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#A8FF00] hover:bg-[#beff3d] text-[#080808] font-display-heading text-lg font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                <span>Get Factory FOB Quote</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>

              <a
                href="https://wa.me/923005167080?text=Hello%20INTWO%20SPORTS,%20I%20would%20like%20an%20OEM%20factory%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#101010] hover:bg-[#161616] border border-[#262626] hover:border-[#A8FF00] text-[#FFFFFF] font-display-heading text-lg font-semibold uppercase tracking-wider transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#A8FF00]"
              >
                <MessageSquare className="w-4 h-4 text-[#A8FF00]" aria-hidden="true" />
                <span>WhatsApp Enquiry: +92 300 5167080</span>
              </a>
            </div>

            <div className="pt-4 border-t border-[#262626] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#b4b8b4]">
              <span>Custom 3D Mould Tooling</span>
              <span aria-hidden="true">·</span>
              <span>AQL 1.5 Final Audit</span>
              <span aria-hidden="true">·</span>
              <span>DHL &amp; FedEx Worldwide Dispatch</span>
            </div>
          </div>

          {/* Right Column: Interactive Flagship Product Showcase */}
          <div className="lg:col-span-5 flex flex-col bg-[#101010] border border-[#262626] transition-colors duration-200 hover:border-[#363636]">
            <div className="px-5 py-3.5 border-b border-[#262626] flex items-center justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FFFFFF]">
                Predator-X1 Pro Match
              </span>
              <span className="font-mono text-xs text-[#A8FF00]">
                4.0mm DE-Latex
              </span>
            </div>

            <div className="group relative aspect-[4/3] w-full bg-[#080808] overflow-hidden">
              <ResilientImage
                src={HERO_MEDIA.glovesImage}
                alt="INTWO SPORTS Predator-X1 Pro Match goalkeeper gloves with 4mm white German contact latex palm and 3D lime silicone backhand"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                fallbackTitle="Predator-X1 Pro Match"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#080808]/90 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#FFFFFF]">
                <span>{activeCut.name}</span>
                <span className="text-[#A8FF00]">EN 16027 · 98.4% Impact</span>
              </div>
            </div>

            {/* Interactive Cut Preview Selector */}
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#b4b8b4]">
                    Select Cut Architecture
                  </span>
                  <span className="font-mono text-xs text-[#b4b8b4]">{activeCut.seamType}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#080808] border border-[#262626]">
                  {(['hybrid', 'negative', 'roll'] as const).map((cutId) => {
                    const isActive = selectedCutId === cutId;
                    const label =
                      cutId === 'hybrid'
                        ? 'Hybrid Pro'
                        : cutId === 'negative'
                          ? 'Negative Cut'
                          : 'Roll Finger';
                    return (
                      <button
                        key={cutId}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setSelectedCutId(cutId)}
                        className={`py-2 px-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap ${
                          isActive
                            ? 'bg-[#A8FF00] text-[#080808]'
                            : 'text-[#b4b8b4] hover:text-[#FFFFFF]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-[#b4b8b4] leading-relaxed">
                  {activeCut.ballContact} — {activeCut.idealFor}.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  onConfigureProduct(
                    'gloves',
                    'contact-4mm',
                    `Flagship Predator-X1 configuration: ${activeCut.name} with 4.0mm German Contact Latex and custom 3D silicone backhand.`
                  )
                }
                className="w-full py-2.5 px-4 bg-[#161616] hover:bg-[#202020] border border-[#262626] hover:border-[#A8FF00] text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] transition-colors duration-150 text-center"
              >
                Load {activeCut.name} into Quote Desk
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Manufacturing KPI Strip */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 border border-[#262626] bg-[#101010] divide-y lg:divide-y-0 lg:divide-x divide-[#262626]">
          {KPI_METRICS.map((metric) => (
            <div key={metric.label} className="p-5 sm:p-6">
              <div className="font-display-heading text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
                {metric.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-[#b4b8b4]">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
