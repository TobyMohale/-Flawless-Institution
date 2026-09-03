import React from 'react';
import { 
  Users, CheckCircle2, Home, Star, Shield, Search, ArrowRight, UserCheck 
} from 'lucide-react';
import { BACKGROUND_IMAGES } from '../data/assetsData';

export const PrivateHouseholdsView: React.FC = () => {
  return (
    <div className="space-y-20 pb-20 font-sans-body">
      {/* 1. HERO HEADER */}
      <section className="relative pt-16 pb-20 border-b border-[#d4af37]/20 bg-[#09090c] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={BACKGROUND_IMAGES.employers}
            alt="Flawless Professional Household Staffing"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center grayscale mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181822]/90 backdrop-blur-md border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest shadow-lg">
            <Home className="w-4 h-4 text-[#d4af37]" /> Professional Household Staffing
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-tight leading-tight">
            EXCEPTIONAL HOUSEHOLDS DESERVE <br />
            <span className="gold-gradient-text">THE RIGHT PROFESSIONALS.</span>
          </h1>

          <p className="text-sm text-[#f3e1a9] font-bold uppercase tracking-[0.2em] pt-2">
            DISCREET. CONSIDERED. PROFESSIONAL.
          </p>

          <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light mt-4">
            Your home deserves more than a vacancy being filled. It deserves the right person, for the right role, within the right household environment. Flawless Institution provides professional household staffing solutions across South Africa and beyond.
          </p>
          
          <div className="pt-6">
            <button className="py-3.5 px-8 rounded-xl text-xs sm:text-sm font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all shadow-lg shadow-[#d4af37]/20 active:scale-95">
              Request Household Staffing
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE FLAWLESS APPROACH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121219] border border-neutral-800 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider">
              Start with the Household.
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Every private household is different. The responsibilities, lifestyle, family structure, service expectations and working environment all influence the type of professional required. We therefore begin by understanding the household before considering the professional.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-xs">
            <div className="space-y-1 p-4 bg-[#181822] rounded-xl border border-neutral-800">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block font-cinzel">Household</span>
              <span className="text-neutral-400">What does your home require?</span>
            </div>
            <div className="space-y-1 p-4 bg-[#181822] rounded-xl border border-neutral-800">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block font-cinzel">Role</span>
              <span className="text-neutral-400">What responsibilities?</span>
            </div>
            <div className="space-y-1 p-4 bg-[#181822] rounded-xl border border-neutral-800">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block font-cinzel">Standard</span>
              <span className="text-neutral-400">What service level?</span>
            </div>
            <div className="space-y-1 p-4 bg-[#181822] rounded-xl border border-neutral-800">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block font-cinzel">Professional</span>
              <span className="text-neutral-400">Skills & experience?</span>
            </div>
            <div className="space-y-1 p-4 bg-[#181822] rounded-xl border border-neutral-800 col-span-2 md:col-span-1">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block font-cinzel">Fit</span>
              <span className="text-neutral-400">Is it suitable?</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ROLES WE PLACE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-cinzel font-bold text-white uppercase tracking-wide">
            Household Professionals
          </h2>
          <p className="text-sm text-[#f3e1a9] uppercase tracking-wider font-bold">Professionals for a range of private requirements.</p>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { title: "Nannies & Au Pairs", desc: "Professional childcare and family support." },
            { title: "Caregivers", desc: "Support for elderly, frail or vulnerable members." },
            { title: "Housekeepers", desc: "Professional household cleaning, organisation." },
            { title: "Domestic Helpers", desc: "Practical household support." },
            { title: "Executive Housekeepers", desc: "Higher-level housekeeping and service." },
            { title: "Butlers", desc: "Formal service, hospitality and household support." },
            { title: "Household Managers", desc: "Coordination and oversight of household operations." },
            { title: "Personal Assistants", desc: "Administrative and personal support." },
            { title: "Chefs & Assistants", desc: "Kitchen and culinary support." },
            { title: "Gardeners & Support", desc: "Specialised household and property support." },
            { title: "Professional Cleaners", desc: "Cleaning services for private residences." },
            { title: "Specialised Roles", desc: "Tailored to specific household requirements." }
          ].map((role, idx) => (
            <div key={idx} className="bg-[#101016] border border-neutral-800 rounded-2xl p-5 hover:border-[#d4af37]/40 transition-colors">
              <h4 className="text-sm font-bold text-white font-cinzel uppercase mb-1">{role.title}</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">{role.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. OUR STAFFING PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#14141b] to-[#0a0a0d] border border-[#d4af37]/20 rounded-3xl p-8 sm:p-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider">
              Our Staffing Process
            </h2>
            <p className="text-sm text-neutral-400">A professional process from requirement to appointment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold font-cinzel text-lg">01 — Private Consultation</span>
              <p className="text-xs text-neutral-400">We begin by understanding your household and staffing requirements.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold font-cinzel text-lg">02 — Role Profiling</span>
              <p className="text-xs text-neutral-400">We clarify the position, responsibilities, expectations and essential requirements.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold font-cinzel text-lg">03 — Candidate Sourcing</span>
              <p className="text-xs text-neutral-400">Suitable professionals identified through networks and recruitment channels.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold font-cinzel text-lg">04 — Screening & Review</span>
              <p className="text-xs text-neutral-400">Candidates considered against agreed requirements and processes.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold font-cinzel text-lg">05 — Presentation</span>
              <p className="text-xs text-neutral-400">Suitable candidate profiles are presented to the employer for consideration.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold font-cinzel text-lg">06 — Interview & Decision</span>
              <p className="text-xs text-neutral-400">The employer evaluates candidates and makes the final appointment decision.</p>
            </div>
            <div className="space-y-2 lg:col-span-2">
              <span className="text-[#d4af37] font-bold font-cinzel text-lg">07 — Onboarding & Development</span>
              <p className="text-xs text-neutral-400">Where appropriate, Flawless may provide guidance, professional development or private household training.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AUDIENCES (Employers vs Candidates) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#121219] border border-neutral-800 rounded-3xl p-8 space-y-6">
          <Shield className="w-8 h-8 text-[#d4af37]" />
          <h3 className="text-xl font-cinzel font-bold text-white uppercase">For Private Employers</h3>
          <p className="text-xs text-[#f3e1a9] font-bold uppercase tracking-wider">Your home is personal. Your staffing decisions matter.</p>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Household Professionals may work closely with your family, your home and your daily routines. They may have access to personal spaces, family information, belongings and confidential matters. Professional household staffing therefore requires care, discretion and clear expectations.
          </p>
          <p className="text-sm text-neutral-300 font-semibold italic border-l-2 border-[#d4af37] pl-4">
            Flawless helps employers think beyond: "Who can start immediately?" and consider: "Who is appropriate for our household?"
          </p>
        </div>

        <div className="bg-[#121219] border border-[#d4af37]/20 rounded-3xl p-8 space-y-6 shadow-lg shadow-[#d4af37]/5">
          <UserCheck className="w-8 h-8 text-[#d4af37]" />
          <h3 className="text-xl font-cinzel font-bold text-white uppercase">For Household Professionals</h3>
          <p className="text-xs text-[#f3e1a9] font-bold uppercase tracking-wider">Develop first. Opportunities follow.</p>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Flawless Institution is not an open job-placement platform for private individuals. <strong className="text-white">WE DO NOT OFFER JOB PLACEMENTS TO PRIVATE JOB SEEKERS.</strong>
          </p>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Opportunities may be considered for eligible Flawless Graduates where suitable client requirements become available. Selection is not automatic. Completing a Flawless course does not guarantee employment.
          </p>
          <button className="py-2.5 px-4 rounded-lg text-xs font-bold bg-[#1a1a24] text-white border border-neutral-700 hover:border-[#d4af37] hover:text-[#d4af37] transition-all">
            Explore Flawless Academy
          </button>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/5 to-[#d4af37]/10 border border-[#d4af37]/30 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider">
            Looking for a Household Professional?
          </h2>
          <p className="text-sm text-neutral-300">
            Tell us about the role, your household and the professional you are looking for. Our team will review your requirements and advise you on the appropriate next step.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button className="py-3.5 px-6 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all">
              Request Household Staffing
            </button>
            <button className="py-3.5 px-6 rounded-xl text-xs font-bold bg-[#14141b] text-[#f3e1a9] border border-[#d4af37]/40 hover:border-[#d4af37] uppercase tracking-wider transition-all">
              Book a Private Consultation
            </button>
          </div>
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest pt-2">Flawless Institution | Established 2016</p>
        </div>
      </section>
    </div>
  );
};

