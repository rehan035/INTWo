import { useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import type { DivisionProduct } from '../data/catalog';
import { ResilientImage } from './ResilientImage';
import type { DivisionId, MaterialTierId } from '../utils/rfq';

interface SpecModalProps {
  division: DivisionProduct | null;
  onClose: () => void;
  onConfigure: (divisionId: DivisionId, materialTier: MaterialTierId) => void;
}

export function SpecModal({ division, onClose, onConfigure }: SpecModalProps) {
  useEffect(() => {
    if (!division) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [division, onClose]);

  if (!division) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="spec-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#101010] border border-[#363636] text-[#FFFFFF]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#101010] border-b border-[#262626]">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#A8FF00]">
              {division.indexLabel}. {division.categoryTag}
            </p>
            <h2
              id="spec-modal-title"
              className="font-display-heading text-2xl sm:text-3xl font-bold uppercase text-[#FFFFFF]"
            >
              {division.title} — Technical Sheet
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close specification sheet"
            onClick={onClose}
            className="w-10 h-10 inline-flex items-center justify-center border border-[#262626] bg-[#161616] hover:border-[#A8FF00] text-[#FFFFFF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            <div className="sm:col-span-5 aspect-video sm:aspect-[4/3] bg-[#080808] border border-[#262626] overflow-hidden">
              <ResilientImage
                src={division.image}
                alt={division.imageAlt}
                fallbackTitle={division.title}
              />
            </div>

            <div className="sm:col-span-7 space-y-3">
              <p className="text-sm text-[#b4b8b4] leading-relaxed">{division.summary}</p>
              <dl className="grid grid-cols-2 gap-3 pt-2 border-t border-[#262626] text-xs">
                <div>
                  <dt className="text-[#7c827c] uppercase">Indicative FOB</dt>
                  <dd className="mt-0.5 font-mono text-[#A8FF00] tabular-nums">
                    {division.detailedSpecs.fobRange}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#7c827c] uppercase">Sample / Bulk Lead</dt>
                  <dd className="mt-0.5 font-mono text-[#FFFFFF] tabular-nums">
                    {division.detailedSpecs.sampleLeadTime} / {division.detailedSpecs.bulkLeadTime}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[#7c827c] uppercase">HS Tariff Classification</dt>
                  <dd className="mt-0.5 font-mono text-[#FFFFFF]">{division.detailedSpecs.hsCode}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Customization Capabilities */}
          <div className="border-t border-[#262626] pt-5">
            <h3 className="font-display-heading text-lg font-bold uppercase tracking-wide text-[#FFFFFF] mb-3">
              OEM Customization Capabilities
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {division.detailedSpecs.customizationOptions.map((opt) => (
                <li key={opt} className="flex items-start gap-2 text-sm text-[#b4b8b4]">
                  <Check className="w-4 h-4 text-[#A8FF00] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{opt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sizing Matrix */}
          <div className="border-t border-[#262626] pt-5">
            <h3 className="font-display-heading text-lg font-bold uppercase tracking-wide text-[#FFFFFF] mb-3">
              Standard Production Sizing Matrix
            </h3>
            <div className="overflow-x-auto border border-[#262626]">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#161616] border-b border-[#262626] font-mono text-xs uppercase text-[#b4b8b4]">
                    <th className="py-2.5 px-4">Size</th>
                    <th className="py-2.5 px-4">Category</th>
                    <th className="py-2.5 px-4">Reference Spec</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262626]">
                  {division.detailedSpecs.sizingMatrix.map((row) => (
                    <tr key={row.size} className="bg-[#080808]">
                      <td className="py-2.5 px-4 font-mono text-[#FFFFFF] tabular-nums">
                        {row.size}
                      </td>
                      <td className="py-2.5 px-4 text-[#b4b8b4]">{row.target}</td>
                      <td className="py-2.5 px-4 font-mono text-[#A8FF00] tabular-nums">
                        {row.measurement}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#262626] flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-[#161616] hover:bg-[#202020] border border-[#262626] text-sm font-medium text-[#FFFFFF] transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onConfigure(division.id, division.defaultMaterialTier);
                onClose();
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#A8FF00] hover:bg-[#beff3d] text-[#080808] font-display-heading text-base font-bold uppercase tracking-wider transition-colors"
            >
              <span>Configure in Quote Desk</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
