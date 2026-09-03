import React from 'react';
import { 
  Building, CheckCircle2, ArrowRight, ShieldCheck, FileText, 
  Users, UserCheck, Briefcase, Sparkles
} from 'lucide-react';
import { BACKGROUND_IMAGES } from '../data/assetsData';

export const HouseholdAdvisoryView: React.FC = () => {
  return (
    <div className="space-y-20 pb-20 font-sans-body">
      {/* 1. HERO HEADER */}
      <section className="relative pt-16 pb-20 border-b border-[#d4af37]/20 bg-[#09090c] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={BACKGROUND_IMAGES.coaching}
            alt="Flawless Household Advisory"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center grayscale mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181822]/90 backdrop-blur-md border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" /> Household Advisory
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-tight leading-tight">
            PROFESSIONAL EXPERTISE FOR <br />
            <span className="gold-gradient-text">THE PRIVATE HOUSEHOLD</span>
          </h1>

          <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
            Build a household that works beautifully. Flawless Household Advisory provides discreet, professional guidance to private households and employers seeking greater structure, stronger standards and better team performance.
          </p>
          
          <div className="pt-6">
            <button className="py-3.5 px-8 rounded-xl text-xs sm:text-sm font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all shadow-lg shadow-[#d4af37]/20 active:scale-95">
              Book a Private Consultation
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE CHALLENGE STATEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121219] border border-neutral-800 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider">
            When Experience Is Not Enough
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Sometimes the right solution is not another hire. A household may have experienced staff and still experience challenges. Responsibilities may overlap, standards may be inconsistent, communication may break down, and performance may decline.
          </p>
          <p className="text-neutral-300 text-sm font-semibold">
            Before making another staffing decision, it can be valuable to have an experienced professional assess the situation objectively. Flawless helps you understand the challenge before deciding on the solution.
          </p>
        </div>
      </section>

      {/* 3. EXPERTISE AREAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-cinzel font-bold text-white uppercase tracking-wide">
            Our Expertise
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-gradient-to-b from-[#14141b] to-[#0a0a0d] border border-[#d4af37]/20 rounded-3xl p-8 hover:border-[#d4af37]/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h3 className="text-xl font-cinzel font-bold text-white mb-3 uppercase">Household Staffing Strategy</h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Develop a considered staffing structure aligned with the requirements of your household.
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Household roles & responsibilities</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Team structure & staffing gaps</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Recruitment priorities & future needs</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-b from-[#14141b] to-[#0a0a0d] border border-[#d4af37]/20 rounded-3xl p-8 hover:border-[#d4af37]/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h3 className="text-xl font-cinzel font-bold text-white mb-3 uppercase">Household Assessment</h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              A structured assessment of your household staffing environment to identify strengths, gaps, and opportunities.
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Role clarity & professional standards</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Staff performance & communication</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Household procedures & training requirements</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-b from-[#14141b] to-[#0a0a0d] border border-[#d4af37]/20 rounded-3xl p-8 hover:border-[#d4af37]/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6">
              <UserCheck className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h3 className="text-xl font-cinzel font-bold text-white mb-3 uppercase">Performance & Development</h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Not every performance challenge requires replacement. Develop the people you already have.
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Clearer expectations & communication</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Professional accountability</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Teamwork & leadership</li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-b from-[#14141b] to-[#0a0a0d] border border-[#d4af37]/20 rounded-3xl p-8 hover:border-[#d4af37]/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6">
              <Building className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h3 className="text-xl font-cinzel font-bold text-white mb-3 uppercase">Management Advisory</h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Professional guidance for employers who want to improve the organisation of their household.
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Household organisation & scheduling</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Performance management</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Household procedures & standards</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. WHO WE SERVE & THE METHOD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#121218] border border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-6">
          <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider text-center lg:text-left">
            Who We Serve
          </h2>
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-bold text-[#f3e1a9] uppercase tracking-wide">Private Households</h4>
              <p className="text-xs text-neutral-400 mt-1">Families seeking professional guidance around household staffing and management.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#f3e1a9] uppercase tracking-wide">Executive Households</h4>
              <p className="text-xs text-neutral-400 mt-1">Busy professionals requiring greater structure, reliability and household support.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#f3e1a9] uppercase tracking-wide">High-Net-Worth Households</h4>
              <p className="text-xs text-neutral-400 mt-1">Households with multiple staff members, specialised roles or elevated service expectations.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#f3e1a9] uppercase tracking-wide">New & Established Households</h4>
              <p className="text-xs text-neutral-400 mt-1">Establishing a new team or seeking to review and improve existing staffing arrangements.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1b1710] to-[#0a0a0d] border border-[#d4af37]/30 rounded-3xl p-8 sm:p-12 space-y-6">
          <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider text-center lg:text-left">
            The Flawless Method
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-[#d4af37] font-cinzel font-bold text-lg">01</span>
              <div>
                <h4 className="text-sm font-bold text-white uppercase">Understand</h4>
                <p className="text-xs text-neutral-400 mt-0.5">We begin by understanding your household, expectations and challenge.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-[#d4af37] font-cinzel font-bold text-lg">02</span>
              <div>
                <h4 className="text-sm font-bold text-white uppercase">Assess</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Examine relevant staffing, management and operational factors.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-[#d4af37] font-cinzel font-bold text-lg">03</span>
              <div>
                <h4 className="text-sm font-bold text-white uppercase">Recommend</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Identify practical recommendations based on the findings.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-[#d4af37] font-cinzel font-bold text-lg">04</span>
              <div>
                <h4 className="text-sm font-bold text-white uppercase">Develop</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Connect the appropriate solution — training, staffing, or advisory.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/5 to-[#d4af37]/10 border border-[#d4af37]/30 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider">
            Ready to Elevate Your Household?
          </h2>
          <p className="text-sm text-neutral-300">
            Your household deserves a professional standard. Whether you need an assessment, staffing strategy, or ongoing advisory support, the first step is a confidential consultation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button className="py-3.5 px-6 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all">
              Book a Consultation
            </button>
            <button className="py-3.5 px-6 rounded-xl text-xs font-bold bg-[#14141b] text-[#f3e1a9] border border-[#d4af37]/40 hover:border-[#d4af37] uppercase tracking-wider transition-all">
              Request Assessment
            </button>
          </div>
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest pt-2">Private & Discreet | Professional Confidentiality Assured</p>
        </div>
      </section>
    </div>
  );
};
