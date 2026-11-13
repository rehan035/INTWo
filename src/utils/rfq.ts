export type DivisionId =
  | 'gloves'
  | 'uniforms'
  | 'teamwear'
  | 'bags';

export type QuantityTierId =
  | '50-100'
  | '100-300'
  | '500-1000'
  | '1000+';

export type MaterialTierId =
  | 'contact-4mm'
  | 'giga-4mm'
  | 'aqua-4mm'
  | 'apparel-bags-only';

export interface RfqFormInput {
  divisions: DivisionId[];
  quantityTier: QuantityTierId;
  materialTier: MaterialTierId;
  brandName: string;
  destinationCountry: string;
  contactName: string;
  whatsappOrPhone: string;
  email: string;
  projectNotes: string;
}

export interface RfqValidationErrors {
  divisions?: string;
  brandName?: string;
  destinationCountry?: string;
  contactName?: string;
  whatsappOrPhone?: string;
  email?: string;
}

export interface FobEstimate {
  unitRangeUsd: [number, number];
  totalRangeUsd: [number, number];
  estimatedUnits: number;
  leadTimeDays: [number, number];
  sampleDays: string;
  recommendedFreight: string;
  divisionLabels: string[];
}

export interface ConfirmedRfqDossier {
  referenceId: string;
  submittedAtIso: string;
  input: RfqFormInput;
  estimate: FobEstimate;
  whatsappUrl: string;
  summaryText: string;
}

export const DIVISION_PRICING: Record<
  DivisionId,
  { label: string; baseMinUsd: number; baseMaxUsd: number }
> = {
  gloves: { label: 'Goalkeeper Gloves (Match/Pro)', baseMinUsd: 13.5, baseMaxUsd: 18.0 },
  uniforms: { label: 'GK Uniforms & Armor', baseMinUsd: 21.0, baseMaxUsd: 28.5 },
  teamwear: { label: 'Football Kits & Squad Teamwear', baseMinUsd: 14.0, baseMaxUsd: 19.5 },
  bags: { label: 'Ballistic Kit & Gear Bags', baseMinUsd: 17.5, baseMaxUsd: 26.0 },
};

export const QUANTITY_TIERS: Record<
  QuantityTierId,
  { label: string; midpointUnits: number; discountFactor: number; leadDays: [number, number]; freight: string }
> = {
  '50-100': {
    label: '50 – 100 Units (Low MOQ Tier)',
    midpointUnits: 75,
    discountFactor: 1.0,
    leadDays: [18, 22],
    freight: 'DHL Express / FedEx Priority Air',
  },
  '100-300': {
    label: '100 – 300 Units (Standard OEM)',
    midpointUnits: 200,
    discountFactor: 0.9,
    leadDays: [20, 25],
    freight: 'Air Cargo Priority (Sialkot Intl / LHE)',
  },
  '500-1000': {
    label: '500 – 1,000 Units (Brand Tier)',
    midpointUnits: 750,
    discountFactor: 0.8,
    leadDays: [25, 32],
    freight: 'Consolidated Air / LCL Sea FOB Karachi',
  },
  '1000+': {
    label: '1,000+ Units (Distributor Container)',
    midpointUnits: 1200,
    discountFactor: 0.72,
    leadDays: [30, 40],
    freight: 'FCL Sea Freight / Split Air Dispatch',
  },
};

export const MATERIAL_TIERS: Record<
  MaterialTierId,
  { label: string; surchargeUsd: number }
> = {
  'contact-4mm': { label: 'German Contact Latex 4.0mm (Match Tier)', surchargeUsd: 2.5 },
  'giga-4mm': { label: 'German Giga Grip 4.0mm (Pro Standard)', surchargeUsd: 1.5 },
  'aqua-4mm': { label: 'Aqua Hydro-Block 4.0mm (Wet Pitch)', surchargeUsd: 2.0 },
  'apparel-bags-only': { label: 'Sublimation Mesh / 1680D Ballistic Spec', surchargeUsd: 0 },
};

export function calculateFobEstimate(
  divisions: DivisionId[],
  quantityTier: QuantityTierId,
  materialTier: MaterialTierId
): FobEstimate {
  const tier = QUANTITY_TIERS[quantityTier];
  const material = MATERIAL_TIERS[materialTier];
  const activeDivisions = divisions.length > 0 ? divisions : (['gloves'] as DivisionId[]);

  const avgMin =
    activeDivisions.reduce((sum, id) => sum + DIVISION_PRICING[id].baseMinUsd, 0) /
    activeDivisions.length;
  const avgMax =
    activeDivisions.reduce((sum, id) => sum + DIVISION_PRICING[id].baseMaxUsd, 0) /
    activeDivisions.length;

  const latexBonus = activeDivisions.includes('gloves') ? material.surchargeUsd : 0;

  const unitMin = Number(((avgMin + latexBonus) * tier.discountFactor).toFixed(2));
  const unitMax = Number(((avgMax + latexBonus) * tier.discountFactor).toFixed(2));

  return {
    unitRangeUsd: [unitMin, unitMax],
    totalRangeUsd: [
      Math.round(unitMin * tier.midpointUnits),
      Math.round(unitMax * tier.midpointUnits),
    ],
    estimatedUnits: tier.midpointUnits,
    leadTimeDays: tier.leadDays,
    sampleDays: '7–10 business days',
    recommendedFreight: tier.freight,
    divisionLabels: activeDivisions.map((id) => DIVISION_PRICING[id].label),
  };
}

export function validateRfqInput(input: RfqFormInput): RfqValidationErrors {
  const errors: RfqValidationErrors = {};

  if (!input.divisions || input.divisions.length === 0) {
    errors.divisions = 'Select at least one equipment division.';
  }
  if (!input.brandName || input.brandName.trim().length < 2) {
    errors.brandName = 'Enter your brand, club, or company name.';
  }
  if (!input.destinationCountry || input.destinationCountry.trim().length < 2) {
    errors.destinationCountry = 'Enter your destination city or country.';
  }
  if (!input.contactName || input.contactName.trim().length < 2) {
    errors.contactName = 'Enter a primary contact person name.';
  }

  const cleanPhone = (input.whatsappOrPhone || '').replace(/[\s\-().]/g, '');
  if (!/^\+?\d{7,16}$/.test(cleanPhone)) {
    errors.whatsappOrPhone = 'Enter a valid international phone or WhatsApp number (7–16 digits).';
  }

  if (input.email && input.email.trim().length > 0) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.email.trim())) {
      errors.email = 'Enter a valid business email address or leave blank.';
    }
  }

  return errors;
}

export function generateRfqReference(brandName: string, now: Date = new Date()): string {
  const prefix = brandName
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 4)
    .padEnd(4, 'X');
  const yy = String(now.getUTCFullYear()).slice(-2);
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(now.getUTCDate()).padStart(2, '0');
  const seq = String(now.getUTCHours() * 100 + now.getUTCMinutes()).padStart(4, '0');
  return `INTWO-${prefix}-${yy}${mm}${dd}-${seq}`;
}

export function formatSpecSummary(
  referenceId: string,
  input: RfqFormInput,
  estimate: FobEstimate
): string {
  const lines = [
    `INTWO SPORTS OEM RFQ (${referenceId})`,
    `Brand / Club: ${input.brandName.trim()}`,
    `Contact: ${input.contactName.trim()} (${input.whatsappOrPhone.trim()})`,
    ...(input.email.trim() ? [`Email: ${input.email.trim()}`] : []),
    `Destination: ${input.destinationCountry.trim()}`,
    `Divisions: ${estimate.divisionLabels.join(', ')}`,
    `Volume Tier: ${QUANTITY_TIERS[input.quantityTier].label}`,
    `Material Spec: ${MATERIAL_TIERS[input.materialTier].label}`,
    `Est. FOB Unit Range: $${estimate.unitRangeUsd[0].toFixed(2)} – $${estimate.unitRangeUsd[1].toFixed(2)} USD`,
    `Est. Production Lead Time: ${estimate.leadTimeDays[0]}–${estimate.leadTimeDays[1]} days`,
    `Freight: ${estimate.recommendedFreight}`,
    ...(input.projectNotes.trim() ? [`Notes: ${input.projectNotes.trim()}`] : []),
  ];
  return lines.join('\n');
}

export function buildWhatsAppInquiryUrl(summaryText: string): string {
  return `https://wa.me/923005167080?text=${encodeURIComponent(summaryText)}`;
}

export function createConfirmedRfqDossier(
  input: RfqFormInput,
  now: Date = new Date()
): ConfirmedRfqDossier {
  const referenceId = generateRfqReference(input.brandName, now);
  const estimate = calculateFobEstimate(
    input.divisions,
    input.quantityTier,
    input.materialTier
  );
  const summaryText = formatSpecSummary(referenceId, input, estimate);
  return {
    referenceId,
    submittedAtIso: now.toISOString(),
    input,
    estimate,
    whatsappUrl: buildWhatsAppInquiryUrl(summaryText),
    summaryText,
  };
}
