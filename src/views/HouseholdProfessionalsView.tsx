import React from 'react';
import { 
  Users, Award, CheckCircle2, ShieldCheck, ArrowRight, 
  Sparkles, BookOpen, Clock, Heart, Star, Compass 
} from 'lucide-react';
import { Course } from '../data/coursesData';

interface HouseholdProfessionalsViewProps {
  setCurrentView: (view: string) => void;
  onExploreCourses: () => void;
}

export const HouseholdProfessionalsView: React.FC<HouseholdProfessionalsViewProps> = ({
  setCurrentView,
  onExploreCourses
}) => {
  return (
    <div className="space-y-20 pb-20 font-sans-body">
      {/* Hero */}
      <section className="relative pt-12 pb-16 border-b border-[#d4af37]/20 bg-gradient-to-b from-[#09090c] via-[#121218] to-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#181822] border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest">
            <Users className="w-3.5 h-3.5 text-[#d4af37]" /> Pillar I: People
          </div>

          <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight">
            HOUSEHOLD PROFESSIONALS
          </h1>

          <p className="text-sm sm:text-lg text-neutral-300 font-serif italic max-w-2xl mx-auto leading-relaxed">
            “Elevating domestic and care work from informal labour into respected, credentialed professions.”
          </p>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            We provide structured vocational skills training, etiquette preparation, workplace boundary guidance, and career pathways for nannies, au pairs, housekeepers, caregivers, chefs, and butlers.
          </p>

          <div className="pt-2">
            <button
              onClick={onExploreCourses}
              id="professionals-browse-courses-btn"
              className="py-3.5 px-8 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all"
            >
              Explore Vocational Training Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Core Solutions for Professionals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="text-[#d4af37] font-cinzel font-bold text-lg">01. Standardised Skills</div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Comprehensive training in high-expectation techniques, delicate fabric care, luxury sanitisation, child development stages, and specialized patient care protocols.
            </p>
          </div>

          <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="text-[#d4af37] font-cinzel font-bold text-lg">02. Ethics & Confidentiality</div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Training on household privacy, non-disclosure protocols, professional boundaries, conflict de-escalation, and ethical conduct in executive residences.
            </p>
          </div>

          <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="text-[#d4af37] font-cinzel font-bold text-lg">03. Career Advancement</div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Equipping candidates with verified Flawless Academy credentials that set them apart in the job market, both across South Africa and in international placements.
            </p>
          </div>
        </div>

        {/* Roles We Prepare */}
        <div className="bg-[#111117] border border-[#d4af37]/30 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
              Disciplines & Roles
            </span>
            <h2 className="text-2xl font-cinzel font-bold text-white">
              Specialist Disciplines We Train
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
            {[
              'Executive Housekeepers',
              'Professional Nannies & Au Pairs',
              'Caregivers & Elder Companions',
              'Luxury Butlers & Valets',
              'Private Chefs & Cook Support',
              'Estate Managers'
            ].map((role, idx) => (
              <div key={idx} className="bg-[#181824] p-4 rounded-xl border border-neutral-800 flex flex-col items-center justify-center space-y-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span className="font-semibold text-neutral-200">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
