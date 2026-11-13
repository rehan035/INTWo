import { useState } from 'react';
import { GLOVE_CUTS, LATEX_FORMULATIONS } from '../data/catalog';

type TurfFilter = 'all' | 'natural' | 'wet' | 'artificial';

const TURF_FILTERS: Array<{ id: TurfFilter; label: string }> = [
  { id: 'all', label: 'All Surfaces' },
  { id: 'natural', label: 'Natural Grass' },
  { id: 'wet', label: 'Wet & Rain' },
  { id: 'artificial', label: 'Artificial 3G/4G' },
];

export function LatexEngineeringSection() {
  const [turfFilter, setTurfFilter] = useState<TurfFilter>('all');
  const [activeCutId, setActiveCutId] = useState<'negative' | 'roll' | 'hybrid' | 'flat'>('negative');

  const filteredFormulations =
    turfFilter === 'all'
      ? LATEX_FORMULATIONS
      : LATEX_FORMULATIONS.filter((item) => item.turfTags.includes(turfFilter));

  const activeCut = GLOVE_CUTS.find((cut) => cut.id === activeCutId) || GLOVE_CUTS[0];

  return (
    <section
      id="latex-engineering"
      className="scroll-mt-24 py-16 md:py-24 border-b border-[#262626] bg-[#101010]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#A8FF00] mb-2">
              Material Engineering
            </p>
            <h2 className="font-display-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#FFFFFF]">
              German Latex Formulation Matrix
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#b4b8b4] max-w-xl leading-relaxed">
            Imported directly from certified German chemical processors in Bremen and Memmingen, then vulcanized and die-cut in Sialkot to match pro pitch conditions.
          </p>
        </div>

        {/* Turf Filter Buttons */}
        <div
          role="group"
          aria-label="Filter Latex by Pitch Surface"
          className="flex flex-wrap items-center gap-2 mb-6"
        >
          {TURF_FILTERS.map((filter) => {
            const isSelected = turfFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setTurfFilter(filter.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-150 border whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#A8FF00] text-[#080808] border-[#A8FF00] font-semibold'
                    : 'bg-[#080808] text-[#b4b8b4] border-[#262626] hover:text-[#FFFFFF] hover:border-[#363636]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Mobile Stacked Formulation Cards (< md) */}
        <div className="md:hidden space-y-4">
          {filteredFormulations.map((row) => (
            <div
              key={row.id}
              className="bg-[#080808] border border-[#262626] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3 border-b border-[#262626] pb-3">
                <div>
                  <div className="font-semibold text-[#FFFFFF]">{row.name}</div>
                  <div className="text-xs text-[#7c827c] mt-0.5">{row.subtitle}</div>
                </div>
                <span className="font-mono text-xs text-[#A8FF00] tabular-nums shrink-0">
                  {row.thickness}
                </span>
              </div>

              <dl className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <dt className="text-[#7c827c] uppercase">Dry Grip</dt>
                  <dd className="mt-0.5 font-mono text-[#FFFFFF] tabular-nums">
                    {row.dryGrip.toFixed(1)} / 10
                  </dd>
                </div>
                <div>
                  <dt className="text-[#7c827c] uppercase">Wet Grip</dt>
                  <dd className="mt-0.5 font-mono text-[#FFFFFF] tabular-nums">
                    {row.wetGrip.toFixed(1)} / 10
                  </dd>
                </div>
                <div>
                  <dt className="text-[#7c827c] uppercase">Durability</dt>
                  <dd className="mt-0.5 font-mono text-[#b4b8b4] tabular-nums">
                    {row.durability.toFixed(1)} / 10
                  </dd>
                </div>
              </dl>

              <div className="pt-2 border-t border-[#262626] text-xs text-[#b4b8b4]">
                Surface: <span className="text-[#FFFFFF]">{row.recommendedTurf}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Latex Comparison Table (>= md) */}
        <div className="hidden md:block overflow-x-auto border border-[#262626] bg-[#080808]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#161616] border-b border-[#262626] font-mono text-xs uppercase text-[#b4b8b4]">
                <th className="py-3.5 px-4">Formulation</th>
                <th className="py-3.5 px-4">Thickness</th>
                <th className="py-3.5 px-4">Dry Grip</th>
                <th className="py-3.5 px-4">Wet Grip</th>
                <th className="py-3.5 px-4">Durability</th>
                <th className="py-3.5 px-4">Recommended Surface</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626] text-sm">
              {filteredFormulations.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#101010] transition-colors duration-150"
                >
                  <td className="py-4 px-4">
                    <div className="font-semibold text-[#FFFFFF]">{row.name}</div>
                    <div className="text-xs text-[#7c827c] mt-0.5">{row.subtitle}</div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-[#A8FF00] tabular-nums whitespace-nowrap">
                    {row.thickness}
                  </td>
                  <td className="py-4 px-4 font-mono text-[#FFFFFF] tabular-nums whitespace-nowrap">
                    {row.dryGrip.toFixed(1)} / 10
                  </td>
                  <td className="py-4 px-4 font-mono text-[#FFFFFF] tabular-nums whitespace-nowrap">
                    {row.wetGrip.toFixed(1)} / 10
                  </td>
                  <td className="py-4 px-4 font-mono text-[#b4b8b4] tabular-nums whitespace-nowrap">
                    {row.durability.toFixed(1)} / 10
                  </td>
                  <td className="py-4 px-4 text-[#b4b8b4]">{row.recommendedTurf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Interactive Glove Cut Geometry Explorer */}
        <div className="mt-12 pt-10 border-t border-[#262626]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display-heading text-2xl sm:text-3xl font-bold uppercase text-[#FFFFFF]">
                Glove Cut Geometries
              </h3>
              <p className="text-sm text-[#b4b8b4] mt-1">
                Inspect seam engineering and fit profiles available across all OEM glove tooling.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 4 Interactive Cut Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GLOVE_CUTS.map((cut) => {
                const isSelected = cut.id === activeCutId;
                return (
                  <button
                    key={cut.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveCutId(cut.id)}
                    className={`text-left p-5 border transition-all duration-150 hover:-translate-y-0.5 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#161616] border-[#A8FF00]'
                        : 'bg-[#080808] border-[#262626] hover:border-[#363636]'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-xs uppercase text-[#A8FF00]">
                        {cut.code}
                      </div>
                      <div className="mt-1.5 font-display-heading text-xl font-bold uppercase text-[#FFFFFF]">
                        {cut.name}
                      </div>
                      <p className="mt-2 text-xs text-[#b4b8b4] leading-relaxed">
                        {cut.seamType} · {cut.fitProfile}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Cut Detail Readout */}
            <div className="lg:col-span-5 bg-[#080808] border border-[#262626] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#262626]">
                  <span className="font-mono text-xs uppercase text-[#A8FF00]">
                    Active Cut Specification
                  </span>
                  <span className="font-mono text-xs text-[#7c827c]">{activeCut.code}</span>
                </div>

                <h4 className="mt-4 font-display-heading text-3xl font-bold uppercase text-[#FFFFFF]">
                  {activeCut.name}
                </h4>

                <p className="mt-3 text-sm text-[#b4b8b4] leading-relaxed">
                  {activeCut.description}
                </p>
              </div>

              <dl className="mt-6 pt-4 border-t border-[#262626] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <dt className="uppercase tracking-wider text-[#7c827c]">Ball Contact</dt>
                  <dd className="mt-1 font-medium text-[#FFFFFF]">{activeCut.ballContact}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-wider text-[#7c827c]">Recommended Keeper</dt>
                  <dd className="mt-1 font-medium text-[#A8FF00]">{activeCut.idealFor}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
