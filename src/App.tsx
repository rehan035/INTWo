import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DivisionsSection } from './components/DivisionsSection';
import { LatexEngineeringSection } from './components/LatexEngineeringSection';
import { OemPipelineSection } from './components/OemPipelineSection';
import { RfqSection } from './components/RfqSection';
import { Footer } from './components/Footer';
import { SpecModal } from './components/SpecModal';
import type { DivisionProduct } from './data/catalog';
import type {
  ConfirmedRfqDossier,
  DivisionId,
  MaterialTierId,
  RfqFormInput,
} from './utils/rfq';

const INITIAL_RFQ_INPUT: RfqFormInput = {
  divisions: ['gloves'],
  quantityTier: '50-100',
  materialTier: 'contact-4mm',
  brandName: '',
  destinationCountry: '',
  contactName: '',
  whatsappOrPhone: '',
  email: '',
  projectNotes: '',
};

export default function App() {
  const [rfqInput, setRfqInput] = useState<RfqFormInput>(INITIAL_RFQ_INPUT);
  const [confirmedDossier, setConfirmedDossier] = useState<ConfirmedRfqDossier | null>(null);
  const [inspectedDivision, setInspectedDivision] = useState<DivisionProduct | null>(null);

  const handleConfigureProduct = (
    divisionId: DivisionId,
    materialTier: MaterialTierId,
    note?: string
  ) => {
    setConfirmedDossier(null);
    setRfqInput((prev) => {
      const nextDivisions = prev.divisions.includes(divisionId)
        ? prev.divisions
        : [...prev.divisions, divisionId];
      const hasGloves = nextDivisions.includes('gloves');
      const nextMaterialTier =
        divisionId === 'gloves'
          ? materialTier
          : hasGloves
            ? prev.materialTier === 'apparel-bags-only'
              ? 'contact-4mm'
              : prev.materialTier
            : materialTier;

      return {
        ...prev,
        divisions: nextDivisions,
        materialTier: nextMaterialTier,
        projectNotes: note ? note : prev.projectNotes,
      };
    });

    const target = document.getElementById('rfq-desk');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-[#FFFFFF]">
      <Navbar />

      <main className="flex-1">
        <HeroSection onConfigureProduct={handleConfigureProduct} />
        <DivisionsSection
          onConfigureProduct={handleConfigureProduct}
          onInspectSpec={(division) => setInspectedDivision(division)}
        />
        <LatexEngineeringSection />
        <OemPipelineSection />
        <RfqSection
          formInput={rfqInput}
          onChangeFormInput={setRfqInput}
          confirmedDossier={confirmedDossier}
          onConfirmDossier={setConfirmedDossier}
        />
      </main>

      <Footer />

      <SpecModal
        division={inspectedDivision}
        onClose={() => setInspectedDivision(null)}
        onConfigure={handleConfigureProduct}
      />
    </div>
  );
}
