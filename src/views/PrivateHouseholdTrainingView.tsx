import React from 'react';
import { 
  Sparkles, CheckCircle2, Star, Shield, ArrowRight, UserCheck, BookOpen 
} from 'lucide-react';
import { BACKGROUND_IMAGES } from '../data/assetsData';

export const PrivateHouseholdTrainingView: React.FC = () => {
  return (
    <div className="space-y-20 pb-20 font-sans-body">
      {/* 1. HERO HEADER */}
      <section className="relative pt-16 pb-20 border-b border-[#d4af37]/20 bg-[#09090c] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={BACKGROUND_IMAGES.training}
            alt="Private Household Training"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center grayscale mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181822]/90 backdrop-blur-md border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest shadow-lg">
            <BookOpen className="w-4 h-4 text-[#d4af37]" /> Private Household Training
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-tight leading-tight">
            THE FLAWLESS PRIVATE <br />
            <span className="gold-gradient-text">HOUSEHOLD STANDARD.</span>
          </h1>

          <p className="text-sm text-[#f3e1a9] font-bold uppercase tracking-[0.2em] pt-2">
            BESPOKE PROFESSIONAL DEVELOPMENT FOR YOUR HOUSEHOLD TEAM.
          </p>

          <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light mt-4">
            A well-run household does not happen by chance. It is built through the right people, clear expectations, professional standards, effective systems and continuous development.
          </p>
          
          <div className="pt-6">
            <button className="py-3.5 px-8 rounded-xl text-xs sm:text-sm font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all shadow-lg shadow-[#d4af37]/20 active:scale-95">
              Request Private Household Training
            </button>
          </div>
        </div>
      </section>

      {/* 2. TRAINING DESIGNED AROUND YOUR HOME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121219] border border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-cinzel font-bold text-[#f3e1a9] uppercase tracking-wider">
              Your Household. Your Team. Your Standard.
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Every household is different. A family with one Household Professional has different requirements from an estate with a larger household team. Your training should reflect those differences.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-[#181822] rounded-xl border border-neutral-800">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-xs">Household Environment</span>
            </div>
            <div className="p-4 bg-[#181822] rounded-xl border border-neutral-800">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-xs">Team Structure</span>
            </div>
            <div className="p-4 bg-[#181822] rounded-xl border border-neutral-800">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-xs">Individual Roles</span>
            </div>
            <div className="p-4 bg-[#181822] rounded-xl border border-neutral-800">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-xs">Current Standards</span>
            </div>
            <div className="p-4 bg-[#181822] rounded-xl border border-neutral-800">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-xs">Areas of Concern</span>
            </div>
            <div className="p-4 bg-[#181822] rounded-xl border border-neutral-800">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-xs">Development Needs</span>
            </div>
            <div className="p-4 bg-[#181822] rounded-xl border border-neutral-800">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-xs">Expectations</span>
            </div>
            <div className="p-4 bg-[#181822] rounded-xl border border-neutral-800">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-xs">Service Level</span>
            </div>
          </div>
          
          <p className="text-center text-xs text-neutral-400 font-bold uppercase tracking-widest pt-4">
            We understand first, then recommend the most appropriate training approach.
          </p>
        </div>
      </section>

      {/* 3. WHAT WE DEVELOP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-cinzel font-bold text-white uppercase tracking-wide">
            What We Develop
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Professional Housekeeping", desc: "Develop stronger standards in cleaning, organisation, presentation, efficiency and household care." },
            { title: "Executive Housekeeping", desc: "For households requiring a higher level of attention to detail, presentation, organisation and service." },
            { title: "Household Operations", desc: "Develop greater understanding of routines, responsibilities, procedures and efficient household operations." },
            { title: "Laundry & Garment Care", desc: "Professional garment handling, laundry organisation, care, storage and presentation." },
            { title: "Cooking & Kitchen Standards", desc: "Develop kitchen organisation, hygiene, preparation, presentation and professional kitchen conduct." },
            { title: "Nanny Professionalism", desc: "Professional development for Household Professionals caring for children within private homes." },
            { title: "Caregiving Support", desc: "Professional development for individuals providing care and support within household environments." },
            { title: "Butler & Formal Service", desc: "Formal household service, presentation, etiquette, guest service and professional standards." },
            { title: "Guest Service & Etiquette", desc: "Develop polished service, professional presentation, communication and appropriate household etiquette." },
            { title: "Confidentiality & Conduct", desc: "Reinforce discretion, boundaries, integrity, privacy and responsible professional behaviour." },
            { title: "Communication & Teamwork", desc: "Develop effective communication, cooperation, role clarity and accountability within the household team." }
          ].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-b from-[#14141b] to-[#0a0a0d] border border-neutral-800 rounded-2xl p-6 hover:border-[#d4af37]/40 transition-colors">
              <h4 className="text-sm font-bold text-[#f3e1a9] font-cinzel uppercase mb-2">{item.title}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE COMPLETE PROFESSIONAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121219] border border-[#d4af37]/20 rounded-3xl p-8 sm:p-12 text-center space-y-10 shadow-xl shadow-[#d4af37]/5">
          <div className="space-y-4">
            <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider">
              From Skills to Service Excellence
            </h2>
            <p className="text-sm text-neutral-400">Our training can address more than technical skills. We develop the complete professional.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-sm font-cinzel">Knowledge</span>
              <span className="text-xs text-neutral-400">Understanding what is expected.</span>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-sm font-cinzel">Skill</span>
              <span className="text-xs text-neutral-400">Knowing how to perform effectively.</span>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-sm font-cinzel">Standard</span>
              <span className="text-xs text-neutral-400">Understanding the level of service required.</span>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-sm font-cinzel">Conduct</span>
              <span className="text-xs text-neutral-400">Knowing how to behave professionally.</span>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-sm font-cinzel">Communication</span>
              <span className="text-xs text-neutral-400">Knowing how to communicate appropriately.</span>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-sm font-cinzel">Accountability</span>
              <span className="text-xs text-neutral-400">Taking responsibility for performance.</span>
            </div>
            <div className="space-y-2 md:col-span-2">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider block text-sm font-cinzel">Service Mindset</span>
              <span className="text-xs text-neutral-400">Exceptional service is about anticipation, consistency and attention to detail.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHO IS THIS SERVICE FOR? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider">
            Who is this service for?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border-l-2 border-[#d4af37] pl-4 space-y-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Private Households</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">For families who want to develop the professionalism and capability of their household team.</p>
          </div>
          <div className="border-l-2 border-[#d4af37] pl-4 space-y-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Executive Households</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">For busy professionals who require reliable, organised and professional household support.</p>
          </div>
          <div className="border-l-2 border-[#d4af37] pl-4 space-y-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">High-Net-Worth Households</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">For households with larger teams, specialised roles or elevated service expectations.</p>
          </div>
          <div className="border-l-2 border-[#d4af37] pl-4 space-y-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Estates & Large Households</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">For teams requiring consistent standards across multiple household functions.</p>
          </div>
          <div className="border-l-2 border-[#d4af37] pl-4 space-y-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">New Households</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">For employers establishing a household team and wanting to introduce professional standards from the beginning.</p>
          </div>
          <div className="border-l-2 border-[#d4af37] pl-4 space-y-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Existing Households</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">For employers who want to improve the performance and development of their current team.</p>
          </div>
        </div>
      </section>

      {/* 6. OUR BESPOKE PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#14141b] to-[#0a0a0d] border border-[#d4af37]/20 rounded-3xl p-8 sm:p-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider">
              Our Bespoke Process
            </h2>
            <p className="text-sm text-neutral-400">A structured path to household excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold font-cinzel text-lg">01 — Consultation</span>
              <p className="text-xs text-neutral-400">We begin by understanding your household and what you would like to improve.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold font-cinzel text-lg">02 — Assessment</span>
              <p className="text-xs text-neutral-400">Where appropriate, we assess relevant staffing, service and development requirements.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold font-cinzel text-lg">03 — Development Plan</span>
              <p className="text-xs text-neutral-400">We identify the appropriate training priorities for your household team.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold font-cinzel text-lg">04 — Private Training</span>
              <p className="text-xs text-neutral-400">Training is delivered according to the agreed programme, format and schedule.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold font-cinzel text-lg">05 — Review</span>
              <p className="text-xs text-neutral-400">Additional training, coaching or advisory support can be recommended.</p>
            </div>
          </div>
          
          <div className="pt-6 border-t border-neutral-800 text-center flex flex-col sm:flex-row justify-center items-center gap-6">
            <span className="text-xs text-white font-bold uppercase tracking-widest"><span className="text-[#d4af37] block sm:inline">The Objective:</span> A More Capable Team.</span>
            <span className="text-xs text-white font-bold uppercase tracking-widest">A More Professional Service.</span>
            <span className="text-xs text-white font-bold uppercase tracking-widest">A Better Functioning Household.</span>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121219] border border-[#d4af37]/30 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider">
            Ready to elevate your household team?
          </h2>
          <p className="text-sm text-neutral-300">
            Tell us about your household, your team and the standard you want to achieve.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button className="py-3.5 px-6 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all">
              Request Private Training
            </button>
            <button className="py-3.5 px-6 rounded-xl text-xs font-bold bg-[#14141b] text-[#f3e1a9] border border-[#d4af37]/40 hover:border-[#d4af37] uppercase tracking-wider transition-all">
              Book a Consultation
            </button>
          </div>
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest pt-2">Flawless Institution | Established 2016</p>
        </div>
      </section>
    </div>
  );
};
