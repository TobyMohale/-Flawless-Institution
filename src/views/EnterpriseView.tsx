import React from 'react';
import { 
  TrendingUp, Building2, Briefcase, CheckCircle2, 
  ArrowRight, Sparkles, Mic, Target, Layers 
} from 'lucide-react';
import { BACKGROUND_IMAGES } from '../data/assetsData';

interface EnterpriseViewProps {
  onOpenSpeakingEnquiry: (topic?: string) => void;
}

export const EnterpriseView: React.FC<EnterpriseViewProps> = ({ onOpenSpeakingEnquiry }) => {
  return (
    <div className="space-y-20 pb-20 font-sans-body">
      {/* Hero */}
      <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-[#d4af37]/20 bg-[#09090c]">
        {/* Executive Boardroom & Enterprise Heritage Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={BACKGROUND_IMAGES.hero}
            alt="Flawless Enterprise Architecture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/80 to-[#0a0a0d]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0d] via-transparent to-[#0a0a0d]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#181822]/90 backdrop-blur-md border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest shadow-lg">
            <TrendingUp className="w-3.5 h-3.5 text-[#d4af37]" /> Pillar III: Businesses
          </div>

          <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight drop-shadow-md">
            FLAWLESS ENTERPRISE
          </h1>

          <p className="text-sm sm:text-lg text-neutral-200 font-serif italic max-w-2xl mx-auto leading-relaxed">
            “Building sustainable businesses that scale beyond the founder through operational systems, brand integrity, and strategic clarity.”
          </p>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            From grassroots start-up to national institution, Teldah Siyawamwaya guides entrepreneurs through the unvarnished realities of building, structuring, and sustaining real-world businesses.
          </p>
        </div>
      </section>

      {/* Enterprise Solutions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="text-[#d4af37] font-cinzel font-bold text-lg">01. 1-on-1 Business Coaching</div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Strategic mentorship for service-industry founders, staffing agencies, cleaning companies, and care service providers navigating growth barriers.
            </p>
          </div>

          <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="text-[#d4af37] font-cinzel font-bold text-lg">02. Building Beyond the Founder</div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Transitioning from daily owner-dependent grind into repeatable standard operating procedures, delegated team leadership, and institutional value.
            </p>
          </div>

          <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="text-[#d4af37] font-cinzel font-bold text-lg">03. Corporate & Staff Workshops</div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Tailored workforce upskilling on customer service etiquette, service delivery excellence, and operational accountability.
            </p>
          </div>
        </div>

        {/* Enterprise Callout */}
        <div className="bg-[#111117] border border-[#d4af37]/30 rounded-3xl p-8 sm:p-10 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
              Executive Consultation
            </span>
            <h2 className="text-2xl font-cinzel font-bold text-white">
              Schedule an Entrepreneurship Strategy Session
            </h2>
            <p className="text-xs text-neutral-400">
              Work directly with Teldah Siyawamwaya to analyze bottlenecks, clarify pricing, and systemize your service venture.
            </p>
          </div>

          <button
            onClick={() => onOpenSpeakingEnquiry('Building a Business Beyond the Founder')}
            className="py-3.5 px-8 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all"
          >
            Enquire for Business Mentorship
          </button>
        </div>
      </section>
    </div>
  );
};
