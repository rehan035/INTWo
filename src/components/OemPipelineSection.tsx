import { HERO_MEDIA, OEM_PIPELINE } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

const FACILITY_RECORDS = [
  { label: 'Official Trade Entity', value: 'INTWO SPORTS (Private) Limited' },
  { label: 'Factory Address', value: 'Dewana Wala Chowk, Akbarabad, Sialkot, Pakistan' },
  { label: 'GPS Coordinates', value: '32.4945° N, 74.5229° E' },
  { label: 'Chamber Membership', value: 'Sialkot Chamber of Commerce & Industry (SCCI)' },
  { label: 'Customs Authority', value: 'Sialkot Dry Port Trust · Sambrial EPZ' },
  { label: 'Direct Factory Desk', value: '+92 300 5167080', isAccent: true },
];

export function OemPipelineSection() {
  return (
    <section id="oem" className="scroll-mt-24 py-16 md:py-24 border-b border-[#262626] bg-[#080808]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Pipeline Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#A8FF00] mb-2">
              Sialkot Precision Production
            </p>
            <h2 className="font-display-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#FFFFFF]">
              From Tech Pack to Global Air Dispatch
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#b4b8b4] max-w-xl leading-relaxed">
            Verticalized manufacturing under ISO 9001:2015 standards. Every production run undergoes tensile seam testing, palm abrasion checks, and AQL 1.5 final inspection.
          </p>
        </div>

        {/* 5-Step Production Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-[#262626] bg-[#101010] divide-y sm:divide-y-0 sm:divide-x divide-[#262626]">
          {OEM_PIPELINE.map((item) => (
            <div key={item.step} className="p-6 flex flex-col justify-between gap-6 hover:bg-[#161616] transition-colors duration-150">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#262626]">
                  <span className="font-display-heading text-3xl font-bold text-[#A8FF00] tabular-nums">
                    {item.step}
                  </span>
                  <span className="font-mono text-xs text-[#b4b8b4] tabular-nums">
                    {item.timeframe}
                  </span>
                </div>

                <h3 className="mt-4 font-display-heading text-xl font-bold uppercase text-[#FFFFFF]">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-sm text-[#b4b8b4] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#262626] font-mono text-xs text-[#FFFFFF]">
                {item.deliverable}
              </div>
            </div>
          ))}
        </div>

        {/* Sialkot Heritage & Facility Verification Split */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Workshop Documentary Photo */}
          <div className="group lg:col-span-6 relative bg-[#101010] border border-[#262626] overflow-hidden min-h-[300px]">
            <ResilientImage
              src={HERO_MEDIA.workshopImage}
              alt="Craftspeople inside the INTWO SPORTS Sialkot workshop inspecting black and lime goalkeeper gloves beside steel cutting dies and German latex foam rolls"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              fallbackTitle="Sialkot Manufacturing Line"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080808]/95 via-[#080808]/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-[#FFFFFF]">
                Sialkot Assembly &amp; Latex Die-Cutting Floor
              </span>
              <span className="font-mono text-[#A8FF00] tabular-nums">
                AQL 1.5 · BSCI Audited
              </span>
            </div>
          </div>

          {/* Facility Verification Profile */}
          <div className="lg:col-span-6 bg-[#101010] border border-[#262626] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#262626]">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#A8FF00]">
                    Industrial Heritage · Sialkot, Pakistan
                  </p>
                  <h3 className="mt-1 font-display-heading text-2xl sm:text-3xl font-bold uppercase text-[#FFFFFF]">
                    Facility Verification Profile
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#b4b8b4] tabular-nums shrink-0">
                  ISO 9001:2015
                </span>
              </div>

              <p className="mt-4 text-sm text-[#b4b8b4] leading-relaxed">
                Sialkot manufactures over 70% of the world&apos;s match footballs and elite goalkeeper gloves. INTWO SPORTS pairs generational hand-stitching mastery with CNC clicking presses, custom aluminium embossing moulds, and Italian sublimation lines starting at 50-pair minimums.
              </p>

              <dl className="mt-6 divide-y divide-[#262626] text-sm">
                {FACILITY_RECORDS.map((record) => (
                  <div
                    key={record.label}
                    className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
                  >
                    <dt className="text-[#b4b8b4]">{record.label}</dt>
                    <dd
                      className={`font-medium sm:text-right tabular-nums ${
                        record.isAccent ? 'font-mono text-[#A8FF00]' : 'text-[#FFFFFF]'
                      }`}
                    >
                      {record.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
