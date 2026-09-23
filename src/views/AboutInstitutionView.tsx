import React from 'react';
import { 
  Sparkles, ShieldCheck, Heart, Award, CheckCircle2, 
  ArrowRight, Users, BookOpen, Clock, Building, Compass 
} from 'lucide-react';
import { INSTITUTIONAL_PILLARS, FOUNDATION_VALUES } from '../data/siteData';
import { INSTITUTION_LOGO } from '../data/assetsData';

interface AboutInstitutionViewProps {
  setCurrentView: (view: string) => void;
  onOpenSpeakingEnquiry: () => void;
}

export const AboutInstitutionView: React.FC<AboutInstitutionViewProps> = ({
  setCurrentView,
  onOpenSpeakingEnquiry
}) => {
  return (
    <div className="space-y-20 pb-20 font-sans-body">
      {/* 1. INSTITUTION HEADER */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#d4af37]/20 bg-gradient-to-b from-[#0a122a] via-[#091332] to-[#0a122a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-[#d4af37]/50 p-1.5 bg-[#0a122a] shadow-2xl shadow-[#040816] hover:scale-105 transition-transform duration-300">
              <img 
                src={INSTITUTION_LOGO.url} 
                alt="Flawless Institution Official Seal" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1432] border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest">
            <Building className="w-3.5 h-3.5 text-[#d4af37]" /> The Institution
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-tight leading-tight">
            ABOUT FLAWLESS INSTITUTION
          </h1>

          <p className="text-sm sm:text-lg text-neutral-200 font-serif italic max-w-3xl mx-auto leading-relaxed">
            “A purpose that began as an act of service, transformed into a company, and matured into an institution.”
          </p>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Established in 2016 in Fourways, South Africa, Flawless Institution stands at the intersection of professional education, household excellence, and ethical business stewardship.
          </p>
        </div>
      </section>

      {/* 2. VISION, MISSION & PURPOSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0a1432] border border-[#1a2c5a] hover:border-[#d4af37]/50 transition-colors rounded-2xl p-7 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3e1a9] flex items-center justify-center font-cinzel font-bold text-lg">
              01
            </div>
            <h3 className="font-cinzel text-xl font-bold text-white">Our Vision</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              To be the benchmark African institution for vocational excellence, household staffing transformation, and values-driven enterprise development.
            </p>
          </div>

          <div className="bg-[#0a1432] border border-[#1a2c5a] hover:border-[#d4af37]/50 transition-colors rounded-2xl p-7 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3e1a9] flex items-center justify-center font-cinzel font-bold text-lg">
              02
            </div>
            <h3 className="font-cinzel text-xl font-bold text-white">Our Mission</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Empowering people through high-standard vocational training, elevating homes through household advisory and staffing excellence, and building enterprises through practical coaching.
            </p>
          </div>

          <div className="bg-[#0a1432] border border-[#1a2c5a] hover:border-[#d4af37]/50 transition-colors rounded-2xl p-7 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3e1a9] flex items-center justify-center font-cinzel font-bold text-lg">
              03
            </div>
            <h3 className="font-cinzel text-xl font-bold text-white">Our Stewardship</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Operating with unwavering integrity, Christian stewardship, and practical wisdom — treating every student, employer, and business partner with profound respect.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE 3 PILLARS EXPANDED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
            Institutional Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white">
            The Three Pillars of Flawless
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {INSTITUTIONAL_PILLARS.map((p, i) => (
            <div key={i} className="bg-[#0a1432] border border-[#1a2c5a] hover:border-[#d4af37]/50 transition-colors rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider font-cinzel">
                  Pillar 0{i + 1}
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-white">
                  {p.title}
                </h3>
                <div className="text-xs text-[#f3e1a9] font-medium">
                  {p.subtitle}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {p.description}
                </p>
                <div className="pt-2 space-y-1.5">
                  {p.deliverables.map((d, di) => (
                    <div key={di} className="flex items-center gap-2 text-xs text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1a2c5a]">
                <button
                  onClick={() => setCurrentView(p.link)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-[#0a122a] border border-[#1a2c5a] hover:border-[#d4af37] text-neutral-200 hover:text-[#f3e1a9] transition-all"
                >
                  View Detailed Pillar Profile →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FAITH & PURPOSE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#08112a] border border-[#d4af37]/35 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
              Foundational Values
            </span>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
              Guided by Principles That Endure
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-serif italic text-base">
              “Flawless Institution is founded on Christian faith and a belief in God. Teldah acknowledges God as the ultimate source and leader behind the vision.”
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOUNDATION_VALUES.map((val, idx) => (
              <div key={idx} className="bg-[#0a1432] p-5 rounded-xl border border-[#1a2c5a] hover:border-[#d4af37]/40 transition-colors space-y-2 shadow-lg">
                <h4 className="font-cinzel text-base font-bold text-[#f3e1a9]">{val.title}</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">{val.desc}</p>
                <div className="text-[10px] text-[#d4af37] font-medium">{val.scriptureOrNote}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
