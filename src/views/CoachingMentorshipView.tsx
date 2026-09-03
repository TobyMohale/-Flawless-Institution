import React from 'react';
import { 
  Target, TrendingUp, CheckCircle2, UserCheck, 
  Lightbulb, Briefcase, ArrowRight, BrainCircuit
} from 'lucide-react';
import { BACKGROUND_IMAGES } from '../data/assetsData';

export const CoachingMentorshipView: React.FC = () => {
  return (
    <div className="space-y-20 pb-20 font-sans-body">
      {/* 1. HERO HEADER */}
      <section className="relative pt-16 pb-20 border-b border-[#d4af37]/20 bg-[#09090c] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={BACKGROUND_IMAGES.coaching}
            alt="Flawless Coaching & Mentorship"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center grayscale mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181822]/90 backdrop-blur-md border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest shadow-lg">
            <Target className="w-4 h-4 text-[#d4af37]" /> Coaching & Strategic Mentorship
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-tight leading-tight">
            CLARITY TO MOVE FORWARD. <br />
            <span className="gold-gradient-text">STRATEGY TO BUILD.</span>
          </h1>

          <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
            For people who are ready for their next level. Focused, practical guidance for individuals, professionals and entrepreneurs who are serious about growth.
          </p>
          
          <div className="pt-6">
            <button className="py-3.5 px-8 rounded-xl text-xs sm:text-sm font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all shadow-lg shadow-[#d4af37]/20 active:scale-95">
              Book a Coaching Consultation
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE CHALLENGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121219] border border-neutral-800 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider">
            When Knowledge Alone Is Not Enough
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            You may know that something needs to change, but not know where to begin. You may have an idea but need direction. You may have a business but feel uncertain about your next move.
          </p>
          <p className="text-neutral-300 text-sm font-semibold">
            This is not about simply having someone to talk to. It is about gaining clarity, perspective, strategy, accountability and practical direction. Come with a challenge. Leave with greater clarity.
          </p>
        </div>
      </section>

      {/* 3. WHO WE SUPPORT (3 Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-cinzel font-bold text-white uppercase tracking-wide">
            Who We Support
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Professionals */}
          <div className="bg-[#101016] border border-neutral-800 rounded-3xl p-8 hover:border-[#d4af37]/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6">
              <UserCheck className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h3 className="text-xl font-cinzel font-bold text-white mb-2 uppercase">Professionals</h3>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              For individuals seeking greater clarity, professional development and career direction.
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-300 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Career direction & transitions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Confidence & professional presence</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Leadership development</li>
            </ul>
          </div>

          {/* Household Professionals */}
          <div className="bg-[#101016] border border-[#d4af37]/20 rounded-3xl p-8 hover:border-[#d4af37]/50 transition-colors shadow-lg shadow-[#d4af37]/5">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6">
              <Briefcase className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h3 className="text-xl font-cinzel font-bold text-white mb-2 uppercase">Household Pros</h3>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Coaching for Household Professionals who want to take their development seriously.
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-300 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Professional standards & presentation</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Workplace communication</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Managing workplace challenges</li>
            </ul>
          </div>

          {/* Entrepreneurs */}
          <div className="bg-[#101016] border border-neutral-800 rounded-3xl p-8 hover:border-[#d4af37]/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h3 className="text-xl font-cinzel font-bold text-white mb-2 uppercase">Entrepreneurs</h3>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Stop guessing. Start building with strategy, positioning, and effective systems.
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-300 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Business positioning & pricing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Client acquisition & sales</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Strategic decision-making</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. COACHING EXPERIENCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider">
            Coaching Experiences
          </h2>
          <p className="text-sm text-neutral-400">Select the level of support that fits your need.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-[#16161f] to-[#121219] p-6 rounded-2xl border border-neutral-800 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold text-[#f3e1a9] uppercase font-cinzel">Clarity Session</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">A focused session for a specific challenge or decision.</p>
            </div>
            <button className="text-[10px] font-bold bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-[#d4af37] hover:text-black transition-colors uppercase tracking-wider">
              Enquire
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#16161f] to-[#121219] p-6 rounded-2xl border border-neutral-800 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold text-[#f3e1a9] uppercase font-cinzel">Strategic Coaching</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">Structured coaching towards a defined professional objective.</p>
            </div>
            <button className="text-[10px] font-bold bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-[#d4af37] hover:text-black transition-colors uppercase tracking-wider">
              Enquire
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#16161f] to-[#121219] p-6 rounded-2xl border border-[#d4af37]/30 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold text-[#f3e1a9] uppercase font-cinzel">Founder Coaching</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">Strategic support for entrepreneurs making growth decisions.</p>
            </div>
            <button className="text-[10px] font-bold bg-[#d4af37] text-black px-4 py-2 rounded-lg hover:bg-[#f3e1a9] transition-colors uppercase tracking-wider">
              Enquire
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#16161f] to-[#121219] p-6 rounded-2xl border border-neutral-800 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold text-[#f3e1a9] uppercase font-cinzel">Strategic Mentorship</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">Ongoing guidance and accountability throughout your journey.</p>
            </div>
            <button className="text-[10px] font-bold bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-[#d4af37] hover:text-black transition-colors uppercase tracking-wider">
              Enquire
            </button>
          </div>
        </div>
      </section>

      {/* 5. THE APPROACH & PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121218] border border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-10">
          <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider text-center">
            What Happens When You Work With Us?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] font-bold font-cinzel">01</div>
              <h4 className="text-xs font-bold text-white uppercase">Clarify</h4>
              <p className="text-[10px] text-neutral-400">Define the real challenge and desired outcome.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] font-bold font-cinzel">02</div>
              <h4 className="text-xs font-bold text-white uppercase">Assess</h4>
              <p className="text-[10px] text-neutral-400">Examine current position, gaps and opportunities.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] font-bold font-cinzel">03</div>
              <h4 className="text-xs font-bold text-white uppercase">Strategise</h4>
              <p className="text-[10px] text-neutral-400">Determine priorities and practical options.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] font-bold font-cinzel">04</div>
              <h4 className="text-xs font-bold text-white uppercase">Act</h4>
              <p className="text-[10px] text-neutral-400">Translate the strategy into clear action.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] font-bold font-cinzel">05</div>
              <h4 className="text-xs font-bold text-white uppercase">Review</h4>
              <p className="text-[10px] text-neutral-400">Assess progress and determine the next move.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOUNDER EXPERTISE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="bg-gradient-to-r from-[#14120c] via-[#1a1710] to-[#14120c] border border-[#d4af37]/30 rounded-3xl p-8 sm:p-12">
          <BrainCircuit className="w-8 h-8 text-[#d4af37] mx-auto mb-4" />
          <h2 className="text-2xl font-cinzel font-bold text-[#f3e1a9] uppercase tracking-wider mb-4">
            Flawless Founder Expertise
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed mb-4">
            Flawless Institution was founded by Teldah Siyawamwaya, bringing more than 16 years of experience within the household staffing industry and more than a decade of entrepreneurial experience developing Flawless.
          </p>
          <p className="text-sm text-neutral-400 leading-relaxed">
            You are not simply paying for a conversation. You are accessing experience, perspective and practical thinking developed over years of working within people, homes and business.
          </p>
        </div>
      </section>
    </div>
  );
};
