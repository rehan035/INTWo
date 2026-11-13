import { useState } from 'react';
import { ArrowRight, FileText, MessageSquare } from 'lucide-react';
import { DIVISIONS, type DivisionProduct } from '../data/catalog';
import { ResilientImage } from './ResilientImage';
import type { DivisionId, MaterialTierId } from '../utils/rfq';

interface DivisionsSectionProps {
  onConfigureProduct: (division: DivisionId, materialTier: MaterialTierId) => void;
  onInspectSpec: (division: DivisionProduct) => void;
}

const FILTER_OPTIONS: Array<{ id: 'all' | DivisionId; label: string }> = [
  { id: 'all', label: 'All Divisions' },
  { id: 'gloves', label: 'Goalkeeper Gloves' },
  { id: 'uniforms', label: 'GK Uniforms' },
  { id: 'teamwear', label: 'Football Uniforms' },
  { id: 'bags', label: 'Kit Bags' },
];

export function DivisionsSection({
  onConfigureProduct,
  onInspectSpec,
}: DivisionsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | DivisionId>('all');

  const visibleDivisions =
    activeFilter === 'all'
      ? DIVISIONS
      : DIVISIONS.filter((division) => division.id === activeFilter);

  return (
    <section
      id="divisions"
      className="scroll-mt-24 py-16 md:py-24 border-b border-[#262626] bg-[#080808]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#A8FF00] mb-2">
              Core Manufacturing Capabilities
            </p>
            <h2 className="font-display-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#FFFFFF]">
              Equipment Divisions &amp; OEM Catalog
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#b4b8b4] max-w-md leading-relaxed">
            Dedicated production lines for goalkeeper gloves, padded goalkeeper uniforms, football kits, and heavy ballistic kit bags.
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          role="group"
          aria-label="Filter Equipment Divisions"
          className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-[#262626]"
        >
          {FILTER_OPTIONS.map((option) => {
            const isSelected = activeFilter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveFilter(option.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-150 border whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#A8FF00] text-[#080808] border-[#A8FF00] font-semibold'
                    : 'bg-[#101010] text-[#b4b8b4] border-[#262626] hover:text-[#FFFFFF] hover:border-[#363636]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-xs text-[#7c827c] tabular-nums">
            Showing {visibleDivisions.length} of {DIVISIONS.length} divisions
          </span>
        </div>

        {/* Dedicated Division Cards Grid */}
        <div
          data-testid="divisions-grid"
          className={
            visibleDivisions.length === 1
              ? 'grid grid-cols-1 gap-8'
              : 'grid grid-cols-1 md:grid-cols-2 gap-8'
          }
        >
          {visibleDivisions.map((division) => {
            const whatsappHref = `https://wa.me/923005167080?text=${encodeURIComponent(
              `Hello INTWO SPORTS, I would like OEM factory pricing for ${division.title}.`
            )}`;

            return (
              <article
                key={division.id}
                id={division.id}
                className={`group scroll-mt-24 bg-[#101010] border border-[#262626] hover:border-[#A8FF00]/60 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between ${
                  visibleDivisions.length === 1 ? 'lg:grid lg:grid-cols-12' : ''
                }`}
              >
                {/* Image Area */}
                <div
                  className={`relative bg-[#080808] overflow-hidden ${
                    visibleDivisions.length === 1
                      ? 'lg:col-span-6 aspect-video lg:aspect-auto lg:h-full'
                      : 'aspect-video'
                  }`}
                >
                  <ResilientImage
                    src={division.image}
                    alt={division.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    fallbackTitle={division.title}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#080808]/90 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 font-mono text-xs text-[#A8FF00]">
                    {division.highlightBadge}
                  </div>
                </div>

                {/* Content Area */}
                <div
                  className={`p-6 sm:p-7 flex flex-col justify-between gap-6 ${
                    visibleDivisions.length === 1 ? 'lg:col-span-6' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#b4b8b4] mb-2">
                      <span className="font-mono text-[#A8FF00]">{division.indexLabel}.</span>
                      <span aria-hidden="true">·</span>
                      <span className="uppercase tracking-wider">{division.categoryTag}</span>
                    </div>

                    <h3 className="font-display-heading text-2xl sm:text-3xl font-bold uppercase text-[#FFFFFF]">
                      {division.title}
                    </h3>

                    <p className="mt-3 text-sm text-[#b4b8b4] leading-relaxed">
                      {division.summary}
                    </p>

                    {/* Hairline 2x2 Spec Matrix */}
                    <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 pt-5 border-t border-[#262626]">
                      {division.specs.map((spec) => (
                        <div key={spec.label}>
                          <dt className="text-[11px] uppercase tracking-wider text-[#7c827c]">
                            {spec.label}
                          </dt>
                          <dd className="mt-1 text-xs sm:text-sm font-medium text-[#FFFFFF] tabular-nums">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#262626] flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        onConfigureProduct(division.id, division.defaultMaterialTier)
                      }
                      className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#A8FF00] hover:bg-[#beff3d] text-[#080808] font-display-heading text-base font-bold uppercase tracking-wider transition-colors duration-150 whitespace-nowrap"
                    >
                      <span>Configure in Quote Desk</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onInspectSpec(division)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#161616] hover:bg-[#202020] border border-[#262626] hover:border-[#363636] text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] transition-colors duration-150 whitespace-nowrap"
                    >
                      <FileText className="w-4 h-4 text-[#A8FF00]" aria-hidden="true" />
                      <span>View Spec Sheet</span>
                    </button>

                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp enquiry for ${division.title}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-[#080808] hover:bg-[#161616] border border-[#262626] hover:border-[#A8FF00] text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] transition-colors duration-150 whitespace-nowrap"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#A8FF00]" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
