import React from 'react';
import { 
  BookOpen, Download, FileText, CheckCircle2, 
  Sparkles, ArrowRight, ShieldCheck, Heart 
} from 'lucide-react';

export const ResourcesView: React.FC = () => {
  return (
    <div className="space-y-20 pb-20 font-sans-body">
      {/* Hero */}
      <section className="relative pt-12 pb-16 border-b border-[#d4af37]/20 bg-gradient-to-b from-[#09090c] via-[#121218] to-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#181822] border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" /> Publications & Knowledge
          </div>

          <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight">
            RESOURCES & PUBLICATIONS
          </h1>

          <p className="text-sm sm:text-lg text-neutral-300 font-serif italic max-w-2xl mx-auto leading-relaxed">
            “Practical tools, codes of conduct, and checklists designed to foster healthy household relationships.”
          </p>
        </div>
      </section>

      {/* Publications / Handbooks Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 w-12 h-12 rounded-xl bg-[#d4af37]/15 text-[#f3e1a9] flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#d4af37]" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                Household Code of Professional Conduct
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Institutional standards covering confidentiality, privacy agreements, daily communication, and ethical responsibilities in domestic employment.
              </p>
            </div>
            <div className="pt-2">
              <span className="text-[11px] text-[#f3e1a9] font-semibold block">Included in all Academy Programmes</span>
            </div>
          </div>

          <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 w-12 h-12 rounded-xl bg-[#d4af37]/15 text-[#f3e1a9] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                Employer & Staff Alignment Checklist
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                A 10-point checklist for setting healthy boundaries, fair expectations, working hours, overtime clarity, and room amenities.
              </p>
            </div>
            <div className="pt-2">
              <span className="text-[11px] text-[#f3e1a9] font-semibold block">Available for Private Households</span>
            </div>
          </div>

          <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 w-12 h-12 rounded-xl bg-[#d4af37]/15 text-[#f3e1a9] flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#d4af37]" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                The Caregiving & First Aid Protocol Summary
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Essential reference sheet for emergency contacts, medicine scheduling log, allergy tracking, and vital signs monitoring.
              </p>
            </div>
            <div className="pt-2">
              <span className="text-[11px] text-[#f3e1a9] font-semibold block">Included in Caregiver Courses</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
