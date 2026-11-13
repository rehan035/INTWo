import heroGlovesImg from '../assets/images/hero_gk_gloves_unbranded_1794594029374.jpg';
import uniformImg from '../assets/images/division_gk_uniform_1794594004393.jpg';
import teamwearImg from '../assets/images/division_football_kits_1794594005783.jpg';
import bagsImg from '../assets/images/division_gear_bags_1794594005250.jpg';
import workshopImg from '../assets/images/sialkot_oem_workshop_clean_1794594030632.jpg';
import type { DivisionId, MaterialTierId } from '../utils/rfq';

export interface DivisionProduct {
  id: DivisionId;
  indexLabel: string;
  categoryTag: string;
  title: string;
  image: string;
  imageAlt: string;
  highlightBadge: string;
  summary: string;
  defaultMaterialTier: MaterialTierId;
  specs: Array<{ label: string; value: string }>;
  detailedSpecs: {
    fobRange: string;
    sampleLeadTime: string;
    bulkLeadTime: string;
    customizationOptions: string[];
    sizingMatrix: Array<{ size: string; target: string; measurement: string }>;
    hsCode: string;
  };
}

export interface LatexFormulation {
  id: string;
  name: string;
  subtitle: string;
  thickness: string;
  dryGrip: number;
  wetGrip: number;
  durability: number;
  turfTags: Array<'natural' | 'wet' | 'artificial'>;
  recommendedTurf: string;
}

export interface GloveCutOption {
  id: 'negative' | 'roll' | 'hybrid' | 'flat';
  name: string;
  code: string;
  seamType: string;
  ballContact: string;
  fitProfile: string;
  description: string;
  idealFor: string;
}

export interface PipelineStep {
  step: string;
  timeframe: string;
  title: string;
  description: string;
  deliverable: string;
}

export const HERO_MEDIA = {
  glovesImage: heroGlovesImg,
  workshopImage: workshopImg,
};

export const DIVISIONS: DivisionProduct[] = [
  {
    id: 'gloves',
    indexLabel: '01',
    categoryTag: 'Flagship Match Gear',
    title: 'Goalkeeper Gloves',
    image: heroGlovesImg,
    imageAlt:
      'Black carbon and volt-lime match goalkeeper gloves displaying 4mm white German contact latex palm and 3D silicone backhand punch zone',
    highlightBadge: '4.0mm German Contact Latex',
    summary:
      'Engineered for elite shot-stoppers. Produced in Negative, Roll Finger, and Hybrid cuts with optional detachable finger spines, breathable neoprene backhands, and 3D injected silicone punch zones.',
    defaultMaterialTier: 'contact-4mm',
    specs: [
      { label: 'Palm Spec', value: 'German Contact / Giga / Aqua' },
      { label: 'Wrist System', value: 'Extended Elastic / Dual Strap' },
      { label: 'Size Range', value: '4–7 (Youth) · 8–11 (Pro)' },
      { label: 'Minimum Order', value: '50 Pairs per Colorway' },
    ],
    detailedSpecs: {
      fobRange: '$13.50 – $18.00 USD / pair (tier dependent)',
      sampleLeadTime: '7–10 business days',
      bulkLeadTime: '20–25 business days',
      hsCode: '4015.19 (Vulcanized Rubber / Latex Gloves)',
      customizationOptions: [
        'Custom 3D micro-injected rubber backhand punch zones',
        'High-frequency embossed wrist strap branding & woven tabs',
        'Choice of 4mm Contact, Giga Grip, Aqua, or 3G Hardground latex',
        'Custom zippered ventilated glove carry pouches with brand cards',
      ],
      sizingMatrix: [
        { size: '4 – 5', target: 'Junior Academy', measurement: '15.0 – 16.5 cm palm' },
        { size: '6 – 7', target: 'Youth Competitive', measurement: '17.0 – 18.5 cm palm' },
        { size: '8 – 9', target: 'Adult Standard Match', measurement: '19.0 – 20.5 cm palm' },
        { size: '10 – 11', target: 'Pro Extended Reach', measurement: '21.0 – 22.5 cm palm' },
      ],
    },
  },
  {
    id: 'uniforms',
    indexLabel: '02',
    categoryTag: 'Impact Resistant',
    title: 'GK Uniforms & Padded Armor',
    image: uniformImg,
    imageAlt:
      'Matte black padded goalkeeper jersey and trousers with hexagonal EVA protective elbow and hip guards',
    highlightBadge: '12mm Ergonomic EVA Guards',
    summary:
      'Reinforced high-impact goalkeeper jerseys, padded compression baselayers, and match trousers engineered to prevent turf burn and absorb diving shock on 3G/4G artificial pitches.',
    defaultMaterialTier: 'apparel-bags-only',
    specs: [
      { label: 'Fabric Matrix', value: '220 GSM Interlock Polyester' },
      { label: 'Impact Zones', value: 'Elbows, Forearms, Hips, Knees' },
      { label: 'Ventilation', value: 'Laser-Perforated Side Mesh' },
      { label: 'Minimum Order', value: '50 Full Kits (Top + Pants)' },
    ],
    detailedSpecs: {
      fobRange: '$21.00 – $28.50 USD / full kit',
      sampleLeadTime: '7–10 business days',
      bulkLeadTime: '20–25 business days',
      hsCode: '6116.10 / 6114.30 (Impact Athletic Textiles)',
      customizationOptions: [
        'Articulated 12mm hexagonal EVA impact foam density customization',
        'Full Pantone-matched Italian sublimation across interlock panels',
        'Raised silicone heat-transfer club crests & sponsor prints',
        'Anti-abrasion knee & elbow Cordura reinforcement overlays',
      ],
      sizingMatrix: [
        { size: 'YS – YL', target: 'Youth Academy', measurement: 'Chest 76 – 86 cm' },
        { size: 'S – M', target: 'Adult Athletic', measurement: 'Chest 92 – 102 cm' },
        { size: 'L – XL', target: 'Senior Match', measurement: 'Chest 106 – 116 cm' },
        { size: '2XL – 3XL', target: 'Tall / Extended', measurement: 'Chest 120 – 128 cm' },
      ],
    },
  },
  {
    id: 'teamwear',
    indexLabel: '03',
    categoryTag: 'Italian Sublimation',
    title: 'Football Kits & Teamwear',
    image: teamwearImg,
    imageAlt:
      'Three custom sublimated charcoal and volt-lime football match jerseys hanging in a dark locker room',
    highlightBadge: '140–180 GSM Dry-Fit Mesh',
    summary:
      'Complete bespoke squad uniform supply. Zero-fade Italian sublimation printing, 3D raised silicone crests, individual player numbering, sponsor placement, and athletic tailoring.',
    defaultMaterialTier: 'apparel-bags-only',
    specs: [
      { label: 'Print Method', value: 'Zero-Fade Italian Sublimation' },
      { label: 'Crest Options', value: '3D Silicone, TPU, Woven Patch' },
      { label: 'Fit Profile', value: 'Slim Match / Regular Academy' },
      { label: 'Minimum Order', value: '30 Full Uniform Sets' },
    ],
    detailedSpecs: {
      fobRange: '$14.00 – $19.50 USD / kit set (Jersey + Shorts)',
      sampleLeadTime: '5–7 business days',
      bulkLeadTime: '18–22 business days',
      hsCode: '6110.30 / 6104.63 (Sublimated Athletic Teamwear)',
      customizationOptions: [
        'Unlimited colorways and custom geometric patterns with zero setup fees',
        'Individualized player names & numbers baked directly into fabric',
        'Moisture-wicking micro-jacquard or bird-eye 160 GSM mesh',
        'Custom collar ribbing, internal neck tape, and woven hem labels',
      ],
      sizingMatrix: [
        { size: 'YXS – YXL', target: 'Academy Youth', measurement: 'Ages 6 – 14' },
        { size: 'XS – M', target: 'Club Senior', measurement: 'Chest 88 – 102 cm' },
        { size: 'L – XL', target: 'First Team', measurement: 'Chest 106 – 114 cm' },
        { size: '2XL – 4XL', target: 'Extended Fit', measurement: 'Chest 118 – 132 cm' },
      ],
    },
  },
  {
    id: 'bags',
    indexLabel: '04',
    categoryTag: '1680D Ballistic Nylon',
    title: 'Ballistic Kit & Gear Bags',
    image: bagsImg,
    imageAlt:
      'Heavy-duty 1680D black ballistic nylon team duffel bag and matching backpack with waterproof tarpaulin base',
    highlightBadge: 'Waterproof Tarpaulin Base',
    summary:
      'Tour-ready luggage built for rigorous team travel. Constructed with 1680D ballistic nylon, isolated ventilated boot vaults, padded glove compartments, and YKK #10 heavy-gauge zippers.',
    defaultMaterialTier: 'apparel-bags-only',
    specs: [
      { label: 'Shell Material', value: '1680D Cordura / Waterproof PVC' },
      { label: 'Hardware', value: 'YKK #10 Heavy Dual Zippers' },
      { label: 'Capacities', value: '45L Backpack · 85L Tour Duffel' },
      { label: 'Minimum Order', value: '50 Units with Custom Branding' },
    ],
    detailedSpecs: {
      fobRange: '$17.50 – $26.00 USD / unit',
      sampleLeadTime: '8–12 business days',
      bulkLeadTime: '22–28 business days',
      hsCode: '4202.92 (Ballistic Nylon Sports Luggage)',
      customizationOptions: [
        'High-density club embroidery or raised PVC front panel patches',
        'Custom branded metal zipper pullers and internal neon lining',
        'Separate ventilated cleat tunnel & moisture-sealed glove pocket',
        'Reinforced bar-tacked load points and removable padded shoulder straps',
      ],
      sizingMatrix: [
        { size: '35L Daypack', target: 'Training / Youth', measurement: '48 × 32 × 22 cm' },
        { size: '45L Pro Pack', target: 'Matchday Player', measurement: '53 × 34 × 25 cm' },
        { size: '65L Club Duffel', target: 'Weekend Away', measurement: '64 × 33 × 31 cm' },
        { size: '85L Tour Holdall', target: 'Squad Equipment', measurement: '76 × 38 × 35 cm' },
      ],
    },
  },
];

export const LATEX_FORMULATIONS: LatexFormulation[] = [
  {
    id: 'contact-pro',
    name: 'German Contact Pro',
    subtitle: 'Adhesive polymer blend with protective peel film',
    thickness: '4.0mm + 3.0mm Foam',
    dryGrip: 10.0,
    wetGrip: 9.5,
    durability: 8.0,
    turfTags: ['natural', 'wet'],
    recommendedTurf: 'Pro Natural Grass · Elite Match',
  },
  {
    id: 'giga-grip',
    name: 'Giga Grip Germany',
    subtitle: 'All-round professional match standard',
    thickness: '4.0mm + 3.5mm Foam',
    dryGrip: 9.0,
    wetGrip: 8.5,
    durability: 8.5,
    turfTags: ['natural', 'artificial'],
    recommendedTurf: 'Natural Grass · High-End 4G Turf',
  },
  {
    id: 'aqua-premier',
    name: 'Aqua Premier Hydro-Block',
    subtitle: 'Open-cell hydrophilic moisture channels',
    thickness: '4.0mm + 3.0mm Foam',
    dryGrip: 8.5,
    wetGrip: 10.0,
    durability: 8.0,
    turfTags: ['wet', 'natural'],
    recommendedTurf: 'Wet, Rain & Saturated Natural Pitches',
  },
  {
    id: 'hardground-3g',
    name: '3G Hardground Resist',
    subtitle: 'Micro-graphite reinforced vulcanized base',
    thickness: '3.5mm + 3.0mm Foam',
    dryGrip: 7.5,
    wetGrip: 7.0,
    durability: 10.0,
    turfTags: ['artificial'],
    recommendedTurf: 'Artificial 3G Turf, Hard Clay & Academy',
  },
];

export const GLOVE_CUTS: GloveCutOption[] = [
  {
    id: 'negative',
    name: 'Negative Cut (NC)',
    code: 'NC-INTERNAL',
    seamType: 'Internal Gusset Stitching',
    ballContact: 'Snug Second-Skin Precision',
    fitProfile: 'Close & Tapered',
    description:
      'Internal seams eliminate excess material inside the fingers, preventing palm slip and maximizing fingertip sensitivity for clean distribution and catching.',
    idealFor: 'Technical goalkeepers with narrow-to-medium hands',
  },
  {
    id: 'roll',
    name: 'Roll Finger (RC)',
    code: 'RC-WRAP',
    seamType: 'Wrapped Tubular Latex',
    ballContact: '360° Maximum Latex Envelope',
    fitProfile: 'Cushioned & Rounded',
    description:
      'Latex wraps continuously around each finger to eliminate side seams, creating the largest catching surface area and extra shock damping on heavy strikes.',
    idealFor: 'Shot-stoppers prioritizing maximum ball contact & cushioning',
  },
  {
    id: 'hybrid',
    name: 'Hybrid Pro Cut',
    code: 'HYB-ROLL-NEG',
    seamType: 'Roll Tips + Negative Middle',
    ballContact: 'Balanced Grip & Tactile Control',
    fitProfile: 'Contoured Match Fit',
    description:
      'Combines wrapped index and pinky fingers with internal-stitched middle fingers, locking the hand securely while maximizing outer edge catching reach.',
    idealFor: 'All-weather pro match keepers wanting zero-compromise control',
  },
  {
    id: 'flat',
    name: 'Flat Palm Classic',
    code: 'FP-GUSSET',
    seamType: 'External Mesh Gussets',
    ballContact: 'Wide Traditional Catching Plane',
    fitProfile: 'Roomy & Ventilated',
    description:
      'Traditional exterior-stitched construction with breathable mesh gussets, offering a roomier anatomical profile built to house removable finger protection spines.',
    idealFor: 'Keepers using finger-save spines or preferring classic airflow',
  },
];

export const OEM_PIPELINE: PipelineStep[] = [
  {
    step: '01',
    timeframe: '24 Hours',
    title: 'Tech Pack & 3D CAD',
    description:
      'We review your vector artwork, Pantone color codes, 3D rubber punch zone placement, and custom packaging specs.',
    deliverable: 'Digital Production Proof',
  },
  {
    step: '02',
    timeframe: '5–7 Days',
    title: 'Master Prototyping',
    description:
      'Physical master samples crafted with German latex palms, custom neoprene wraps, and branded trims for hands-on testing.',
    deliverable: 'Physical Prototype Sample',
  },
  {
    step: '03',
    timeframe: 'Buyer Sign-Off',
    title: 'Commercial Approval',
    description:
      'Fit adjustments, latex abrasion verification, and sealed golden sample sign-off before bulk die cutting begins.',
    deliverable: 'Sealed Golden Sample',
  },
  {
    step: '04',
    timeframe: '20–25 Days',
    title: 'Mass Production',
    description:
      'Hydraulic clicking press palm cutting, high-density interlock stitching, and heat-welded silicone detailing on dedicated lines.',
    deliverable: 'ISO 9001 Batch Build',
  },
  {
    step: '05',
    timeframe: 'Worldwide',
    title: 'AQL 1.5 QA & Dispatch',
    description:
      'Final AQL 1.5 inspection, anti-mold silica packing, barcoded master cartons, and dispatch via DHL Express, FedEx, or FOB sea.',
    deliverable: 'Cleared Global Freight',
  },
];
