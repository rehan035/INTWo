import { useState, type FormEvent } from 'react';
import { Check, Copy, ExternalLink, MessageSquare, Plane, ShieldCheck, Send } from 'lucide-react';
import {
  calculateFobEstimate,
  createConfirmedRfqDossier,
  DIVISION_PRICING,
  MATERIAL_TIERS,
  QUANTITY_TIERS,
  validateRfqInput,
  type ConfirmedRfqDossier,
  type DivisionId,
  type MaterialTierId,
  type QuantityTierId,
  type RfqFormInput,
  type RfqValidationErrors,
} from '../utils/rfq';

interface RfqSectionProps {
  formInput: RfqFormInput;
  onChangeFormInput: (updater: (prev: RfqFormInput) => RfqFormInput) => void;
  confirmedDossier: ConfirmedRfqDossier | null;
  onConfirmDossier: (dossier: ConfirmedRfqDossier | null) => void;
}

const DIVISION_IDS: DivisionId[] = ['gloves', 'uniforms', 'teamwear', 'bags'];

export function RfqSection({
  formInput,
  onChangeFormInput,
  confirmedDossier,
  onConfirmDossier,
}: RfqSectionProps) {
  const [errors, setErrors] = useState<RfqValidationErrors>({});
  const [copied, setCopied] = useState(false);

  const liveEstimate = calculateFobEstimate(
    formInput.divisions,
    formInput.quantityTier,
    formInput.materialTier
  );

  const toggleDivision = (divisionId: DivisionId) => {
    setErrors((prev) => ({ ...prev, divisions: undefined }));
    onChangeFormInput((prev) => {
      const exists = prev.divisions.includes(divisionId);
      const nextDivisions = exists
        ? prev.divisions.filter((id) => id !== divisionId)
        : [...prev.divisions, divisionId];
      return { ...prev, divisions: nextDivisions };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateRfqInput(formInput);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const dossier = createConfirmedRfqDossier(formInput);
    onConfirmDossier(dossier);
  };

  const handleCopySummary = async () => {
    if (!confirmedDossier) return;
    try {
      await navigator.clipboard.writeText(confirmedDossier.summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="rfq-desk"
      className="scroll-mt-24 py-16 md:py-24 border-b border-[#262626] bg-[#101010]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Live FOB Estimate & Trade Assurances */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#A8FF00] mb-2">
                Direct Factory Quotation Desk
              </p>
              <h2 className="font-display-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#FFFFFF]">
                Request OEM FOB Pricing &amp; Sample Order
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#b4b8b4] leading-relaxed">
                Configure your product mix and volume tier to see an instant indicative FOB estimate, then dispatch your specifications directly to our Sialkot engineering desk.
              </p>
            </div>

            {/* Live Estimate Readout Box */}
            <div
              data-testid="live-fob-estimate"
              className="bg-[#080808] border border-[#262626] p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                <span className="font-mono text-xs uppercase text-[#A8FF00]">
                  Live Indicative FOB Estimate
                </span>
                <span className="font-mono text-xs text-[#7c827c] tabular-nums">
                  {formInput.divisions.length} division{formInput.divisions.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-[#7c827c] uppercase">Est. Unit Range</div>
                  <div className="mt-1 font-display-heading text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
                    ${liveEstimate.unitRangeUsd[0].toFixed(2)} – ${liveEstimate.unitRangeUsd[1].toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7c827c] uppercase">
                    Est. Batch (~{liveEstimate.estimatedUnits} units)
                  </div>
                  <div className="mt-1 font-display-heading text-2xl sm:text-3xl font-bold text-[#A8FF00] tabular-nums">
                    ${liveEstimate.totalRangeUsd[0].toLocaleString()} – ${liveEstimate.totalRangeUsd[1].toLocaleString()}
                  </div>
                </div>
              </div>

              <dl className="pt-4 border-t border-[#262626] space-y-2 text-xs">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#7c827c]">Sample Prototyping</dt>
                  <dd className="font-mono text-[#FFFFFF] tabular-nums">
                    {liveEstimate.sampleDays}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#7c827c]">Bulk Production Window</dt>
                  <dd className="font-mono text-[#FFFFFF] tabular-nums">
                    {liveEstimate.leadTimeDays[0]}–{liveEstimate.leadTimeDays[1]} business days
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#7c827c]">Recommended Freight</dt>
                  <dd className="text-[#b4b8b4] text-right">{liveEstimate.recommendedFreight}</dd>
                </div>
              </dl>
            </div>

            {/* Trade Assurances */}
            <div className="space-y-3">
              <div className="flex items-start gap-3.5 p-4 bg-[#080808] border border-[#262626]">
                <ShieldCheck className="w-5 h-5 text-[#A8FF00] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-sm font-semibold text-[#FFFFFF]">
                    NDA &amp; Proprietary Tooling Protection
                  </div>
                  <p className="text-xs text-[#b4b8b4] mt-1 leading-relaxed">
                    Custom 3D rubber moulds, pantone recipes, and private-label artwork stay exclusive to your brand.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-[#080808] border border-[#262626]">
                <Plane className="w-5 h-5 text-[#A8FF00] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-sm font-semibold text-[#FFFFFF]">
                    Door-to-Door Global Express
                  </div>
                  <p className="text-xs text-[#b4b8b4] mt-1 leading-relaxed">
                    Daily air dispatches via DHL Express and FedEx Priority, plus full export clearance from Sialkot Dry Port.
                  </p>
                </div>
              </div>
            </div>

            {/* Prominent Instant WhatsApp Enquiry Card */}
            <div className="p-5 bg-[#080808] border border-[#A8FF00]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs uppercase text-[#A8FF00]">
                  Urgent Factory Enquiry
                </div>
                <div className="text-sm font-semibold text-[#FFFFFF] mt-1">
                  Speak directly with Sialkot OEM Production
                </div>
              </div>
              <a
                href="https://wa.me/923005167080?text=Hello%20INTWO%20SPORTS,%20I%20have%20an%20urgent%20OEM%20sports%20gear%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#A8FF00] hover:bg-[#beff3d] text-[#080808] font-display-heading text-base font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp Now</span>
              </a>
            </div>
          </div>

          {/* Right Column: Validated RFQ Form or Confirmed Dossier */}
          <div className="lg:col-span-7 bg-[#080808] border border-[#262626] p-6 sm:p-8">
            {confirmedDossier ? (
              <div data-testid="confirmed-rfq-dossier" className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#262626]">
                  <div>
                    <p className="font-mono text-xs uppercase text-[#A8FF00]">
                      Specification Dossier Ready
                    </p>
                    <h3 className="mt-1 font-display-heading text-3xl font-bold uppercase text-[#FFFFFF]">
                      RFQ Reference: {confirmedDossier.referenceId}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onConfirmDossier(null)}
                    className="px-4 py-2 bg-[#161616] hover:bg-[#202020] border border-[#262626] text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] transition-colors"
                  >
                    Edit Specifications
                  </button>
                </div>

                <p className="text-sm text-[#b4b8b4] leading-relaxed">
                  Your structured OEM specification dossier has been compiled. Dispatch it directly to our senior production desk on WhatsApp or copy the technical brief for your procurement records.
                </p>

                <pre className="p-4 bg-[#101010] border border-[#262626] font-mono text-xs text-[#FFFFFF] whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {confirmedDossier.summaryText}
                </pre>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={confirmedDossier.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[220px] inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#A8FF00] hover:bg-[#beff3d] text-[#080808] font-display-heading text-lg font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-y-0.5"
                  >
                    <span>Send Dossier via WhatsApp</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#161616] hover:bg-[#202020] border border-[#262626] text-sm font-semibold text-[#FFFFFF] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#A8FF00]" aria-hidden="true" />
                        <span>Copied Summary</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#A8FF00]" aria-hidden="true" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="pb-4 border-b border-[#262626] flex items-center justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase text-[#A8FF00]">Step 01 of 02</p>
                    <h3 className="font-display-heading text-2xl font-bold uppercase text-[#FFFFFF] mt-0.5">
                      Product Specifications
                    </h3>
                  </div>
                  <span className="text-xs text-[#7c827c]">* Required fields</span>
                </div>

                {Object.keys(errors).length > 0 && (
                  <div
                    role="alert"
                    className="p-3.5 bg-[#2a1214] border border-[#933037] text-xs text-[#ffdad6]"
                  >
                    Please review the highlighted fields before generating your factory quotation dossier.
                  </div>
                )}

                {/* Divisions Multi-Select */}
                <fieldset>
                  <legend className="block text-xs font-mono uppercase text-[#b4b8b4] mb-2.5">
                    Select Equipment Divisions *
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DIVISION_IDS.map((divisionId) => {
                      const checked = formInput.divisions.includes(divisionId);
                      return (
                        <label
                          key={divisionId}
                          className={`flex items-center gap-3 p-3.5 border cursor-pointer transition-colors ${
                            checked
                              ? 'bg-[#161616] border-[#A8FF00]'
                              : 'bg-[#101010] border-[#262626] hover:border-[#363636]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            name="divisions"
                            value={divisionId}
                            checked={checked}
                            onChange={() => toggleDivision(divisionId)}
                            className="w-4 h-4 accent-[#A8FF00] bg-[#080808] border-[#363636]"
                          />
                          <span className="text-sm font-medium text-[#FFFFFF]">
                            {DIVISION_PRICING[divisionId].label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.divisions && (
                    <p className="mt-1.5 text-xs text-[#ff8b8b]">{errors.divisions}</p>
                  )}
                </fieldset>

                {/* Volume & Material Selects */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quantity-tier"
                      className="block text-xs font-mono uppercase text-[#b4b8b4] mb-2"
                    >
                      Estimated Quantity Tier *
                    </label>
                    <select
                      id="quantity-tier"
                      value={formInput.quantityTier}
                      onChange={(e) =>
                        onChangeFormInput((prev) => ({
                          ...prev,
                          quantityTier: e.target.value as QuantityTierId,
                        }))
                      }
                      className="w-full bg-[#101010] border border-[#262626] focus:border-[#A8FF00] focus:outline-none text-sm text-[#FFFFFF] px-3.5 py-2.5"
                    >
                      {(Object.keys(QUANTITY_TIERS) as QuantityTierId[]).map((key) => (
                        <option key={key} value={key}>
                          {QUANTITY_TIERS[key].label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="material-tier"
                      className="block text-xs font-mono uppercase text-[#b4b8b4] mb-2"
                    >
                      Latex / Material Preference
                    </label>
                    <select
                      id="material-tier"
                      value={formInput.materialTier}
                      onChange={(e) =>
                        onChangeFormInput((prev) => ({
                          ...prev,
                          materialTier: e.target.value as MaterialTierId,
                        }))
                      }
                      className="w-full bg-[#101010] border border-[#262626] focus:border-[#A8FF00] focus:outline-none text-sm text-[#FFFFFF] px-3.5 py-2.5"
                    >
                      {(Object.keys(MATERIAL_TIERS) as MaterialTierId[]).map((key) => (
                        <option key={key} value={key}>
                          {MATERIAL_TIERS[key].label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Company & Destination */}
                <div className="pt-4 border-t border-[#262626]">
                  <p className="font-mono text-xs uppercase text-[#A8FF00]">Step 02 of 02</p>
                  <h3 className="font-display-heading text-2xl font-bold uppercase text-[#FFFFFF] mt-0.5">
                    Company &amp; Destination
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="brand-name"
                      className="block text-xs font-mono uppercase text-[#b4b8b4] mb-1.5"
                    >
                      Brand / Club / Company Name *
                    </label>
                    <input
                      id="brand-name"
                      type="text"
                      required
                      aria-invalid={Boolean(errors.brandName)}
                      value={formInput.brandName}
                      onChange={(e) => {
                        setErrors((prev) => ({ ...prev, brandName: undefined }));
                        onChangeFormInput((prev) => ({ ...prev, brandName: e.target.value }));
                      }}
                      placeholder="e.g. Apex Goalkeeping UK"
                      className="w-full bg-[#101010] border border-[#262626] focus:border-[#A8FF00] focus:outline-none text-sm text-[#FFFFFF] placeholder:text-[#666b66] px-3.5 py-2.5"
                    />
                    {errors.brandName && (
                      <p className="mt-1 text-xs text-[#ff8b8b]">{errors.brandName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="destination-country"
                      className="block text-xs font-mono uppercase text-[#b4b8b4] mb-1.5"
                    >
                      Destination City / Country *
                    </label>
                    <input
                      id="destination-country"
                      type="text"
                      required
                      aria-invalid={Boolean(errors.destinationCountry)}
                      value={formInput.destinationCountry}
                      onChange={(e) => {
                        setErrors((prev) => ({ ...prev, destinationCountry: undefined }));
                        onChangeFormInput((prev) => ({
                          ...prev,
                          destinationCountry: e.target.value,
                        }));
                      }}
                      placeholder="e.g. Manchester, United Kingdom"
                      className="w-full bg-[#101010] border border-[#262626] focus:border-[#A8FF00] focus:outline-none text-sm text-[#FFFFFF] placeholder:text-[#666b66] px-3.5 py-2.5"
                    />
                    {errors.destinationCountry && (
                      <p className="mt-1 text-xs text-[#ff8b8b]">{errors.destinationCountry}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase text-[#b4b8b4] mb-1.5"
                    >
                      Contact Person *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      aria-invalid={Boolean(errors.contactName)}
                      value={formInput.contactName}
                      onChange={(e) => {
                        setErrors((prev) => ({ ...prev, contactName: undefined }));
                        onChangeFormInput((prev) => ({ ...prev, contactName: e.target.value }));
                      }}
                      placeholder="Full name"
                      className="w-full bg-[#101010] border border-[#262626] focus:border-[#A8FF00] focus:outline-none text-sm text-[#FFFFFF] placeholder:text-[#666b66] px-3.5 py-2.5"
                    />
                    {errors.contactName && (
                      <p className="mt-1 text-xs text-[#ff8b8b]">{errors.contactName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="whatsapp-number"
                      className="block text-xs font-mono uppercase text-[#b4b8b4] mb-1.5"
                    >
                      WhatsApp / Phone *
                    </label>
                    <input
                      id="whatsapp-number"
                      type="tel"
                      required
                      aria-invalid={Boolean(errors.whatsappOrPhone)}
                      value={formInput.whatsappOrPhone}
                      onChange={(e) => {
                        setErrors((prev) => ({ ...prev, whatsappOrPhone: undefined }));
                        onChangeFormInput((prev) => ({
                          ...prev,
                          whatsappOrPhone: e.target.value,
                        }));
                      }}
                      placeholder="+44 7911 123456"
                      className="w-full bg-[#101010] border border-[#262626] focus:border-[#A8FF00] focus:outline-none text-sm text-[#FFFFFF] placeholder:text-[#666b66] px-3.5 py-2.5"
                    />
                    {errors.whatsappOrPhone && (
                      <p className="mt-1 text-xs text-[#ff8b8b]">{errors.whatsappOrPhone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase text-[#b4b8b4] mb-1.5"
                    >
                      Business Email (Optional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      aria-invalid={Boolean(errors.email)}
                      value={formInput.email}
                      onChange={(e) => {
                        setErrors((prev) => ({ ...prev, email: undefined }));
                        onChangeFormInput((prev) => ({ ...prev, email: e.target.value }));
                      }}
                      placeholder="buyer@club.com"
                      className="w-full bg-[#101010] border border-[#262626] focus:border-[#A8FF00] focus:outline-none text-sm text-[#FFFFFF] placeholder:text-[#666b66] px-3.5 py-2.5"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-[#ff8b8b]">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="project-notes"
                    className="block text-xs font-mono uppercase text-[#b4b8b4] mb-1.5"
                  >
                    Technical Specifications &amp; Custom Notes
                  </label>
                  <textarea
                    id="project-notes"
                    rows={3}
                    value={formInput.projectNotes}
                    onChange={(e) =>
                      onChangeFormInput((prev) => ({ ...prev, projectNotes: e.target.value }))
                    }
                    placeholder="Specify logo placement, removable finger spines, custom glove pouches, or target delivery window..."
                    className="w-full bg-[#101010] border border-[#262626] focus:border-[#A8FF00] focus:outline-none text-sm text-[#FFFFFF] placeholder:text-[#666b66] px-3.5 py-2.5"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-[#A8FF00] hover:bg-[#beff3d] text-[#080808] font-display-heading text-lg font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2.5"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Generate Factory FOB Quotation Dossier</span>
                  </button>
                  <p className="mt-2.5 text-center text-xs text-[#7c827c]">
                    Official OEM response from our Sialkot export desk within 12 business hours.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
