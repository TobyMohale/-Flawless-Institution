import React from 'react';
import { 
  Sparkles, Award, Heart, ArrowRight, Mic, ShieldCheck, 
  BookOpen, Users, CheckCircle2, Clock, MapPin, Quote 
} from 'lucide-react';
import { FOUNDER_CONTACT, STORY_TIMELINE } from '../data/siteData';
import { BACKGROUND_IMAGES } from '../data/assetsData';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { ScrollReveal, Tilt3DCard } from '../components/MotionEffects';

interface AboutFounderViewProps {
  setCurrentView: (view: string) => void;
  onOpenSpeakingEnquiry: () => void;
}

export const AboutFounderView: React.FC<AboutFounderViewProps> = ({
  setCurrentView,
  onOpenSpeakingEnquiry
}) => {
  return (
    <div className="space-y-20 pb-20 font-sans-body">
      {/* 1. FOUNDER HERO HEADER */}
      <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-[#d4af37]/20 bg-[#09090c]">
        {/* Atmospheric Manor Heritage Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={BACKGROUND_IMAGES.hero}
            alt="Flawless Heritage"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/85 to-[#0a0a0d]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0d] via-transparent to-[#0a0a0d]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Founder Portrait / Emblem */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <ScrollReveal direction="scale">
                <Tilt3DCard maxTilt={10} glareOpacity={0.2} className="inline-block mx-auto">
                  <div className="w-64 h-80 sm:w-72 sm:h-96 rounded-2xl bg-gradient-to-b from-[#241e12] via-[#1a1711] to-[#0c0c10] border-2 border-[#d4af37]/60 p-3 shadow-2xl relative overflow-hidden flex flex-col justify-between backdrop-blur-md">
                    {/* Decorative corner accents */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#d4af37]"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#d4af37]"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#d4af37]"></div>

                    {/* Emblem / Monogram */}
                    <div className="my-auto text-center space-y-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-[#8f7023] p-[2px] mx-auto shadow-xl flex items-center justify-center">
                        <div className="w-full h-full bg-[#0a0a0d] rounded-full flex flex-col items-center justify-center">
                          <span className="font-cinzel text-3xl font-bold text-[#f3e1a9]">TS</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-cinzel text-xl font-bold text-white tracking-wider">TELDAH</div>
                        <div className="font-cinzel text-sm text-[#d4af37] tracking-widest uppercase">SIYAWAMWAYA</div>
                        <div className="text-[11px] text-neutral-400 mt-1">Founder & Director • Flawless Institution</div>
                      </div>
                    </div>

                    <div className="bg-[#121217] p-2.5 rounded-lg border border-neutral-800 text-center">
                      <span className="text-[10px] text-[#f3e1a9] uppercase font-bold tracking-wider font-cinzel">
                        <AnimatedCounter to={16} suffix="+" duration={1800} /> Years Experience • Est. <AnimatedCounter from={2000} to={2016} duration={2000} />
                      </span>
                    </div>
                  </div>
                </Tilt3DCard>
              </ScrollReveal>
            </div>

            {/* Right: Title & Credentials */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#16161f] border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Leadership Profile
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight">
                  ABOUT THE FOUNDER
                </h1>
                <div className="text-base sm:text-xl font-cinzel font-semibold text-[#f3e1a9]">
                  Teldah Siyawamwaya
                </div>
                <div className="text-xs sm:text-sm text-neutral-400 font-medium tracking-wide">
                  Founder & Director | Speaker | Coach | Household Industry Expert
                </div>
              </div>

              {/* Core Quote */}
              <div className="relative bg-[#15151e] border-l-4 border-[#d4af37] p-5 rounded-r-xl space-y-2">
                <Quote className="w-8 h-8 text-[#d4af37]/30 absolute top-3 right-3" />
                <p className="text-sm sm:text-base text-neutral-200 font-serif italic leading-relaxed">
                  “I did not create Flawless. God created the opportunity, and I found myself walking in it.”
                </p>
                <div className="text-xs text-[#d4af37] font-semibold">
                  — Teldah Siyawamwaya
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-neutral-300">
                <div className="bg-[#121218] p-3 rounded-lg border border-neutral-800 hover:border-[#d4af37]/40 transition-colors">
                  <span className="text-neutral-400 text-[10px] block">EXPERIENCE</span>
                  <strong className="text-white text-xs sm:text-sm font-cinzel font-bold">
                    <AnimatedCounter to={16} suffix="+ Years" duration={1800} />
                  </strong>
                </div>
                <div className="bg-[#121218] p-3 rounded-lg border border-neutral-800 hover:border-[#d4af37]/40 transition-colors">
                  <span className="text-neutral-400 text-[10px] block">ESTABLISHED</span>
                  <strong className="text-[#f3e1a9] text-xs sm:text-sm font-cinzel font-bold">
                    <AnimatedCounter from={2000} to={2016} duration={2000} /> in Fourways
                  </strong>
                </div>
                <div className="bg-[#121218] p-3 rounded-lg border border-neutral-800 col-span-2 sm:col-span-1 hover:border-[#d4af37]/40 transition-colors">
                  <span className="text-neutral-400 text-[10px] block">ROLE</span>
                  <strong className="text-white text-xs sm:text-sm">Founder & Speaker</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE COMPLETE FOUNDER STORY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section 1: A Purpose That Became An Institution */}
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-[#d4af37] font-bold font-cinzel">
            The Origin
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
            A Purpose That Became An Institution
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <p>
              Some businesses begin with a carefully written business plan.
            </p>
            <p className="text-white font-medium">
              Flawless began differently.
            </p>
            <p>
              For Teldah Siyawamwaya, the journey was one of purpose, faith, experience and obedience.
            </p>
            <p className="font-serif italic text-base text-[#f3e1a9] bg-[#14141c] p-4 rounded-xl border border-[#d4af37]/30">
              “I DID NOT CREATE FLAWLESS. GOD CREATED THE OPPORTUNITY, AND I FOUND MYSELF WALKING IN IT.”
            </p>
            <p>
              Before Flawless existed, Teldah personally worked within the household staffing industry for more than six years. Her journey began while working part-time as a Household Professional. She was looking for additional part-time work and placed advertisements seeking employment opportunities.
            </p>
            <p>
              Instead, her existing employers eventually offered her full-time employment.
            </p>
            <p>
              Then something unexpected began to happen. Employers started contacting her, asking whether she could help them find suitable household staff. Because Teldah knew people within her community who were looking for opportunities, she began connecting employers with people she knew.
            </p>
            <p>
              Initially, she did this simply because she wanted to help. There was no elaborate business plan. There was simply a need — and an opportunity to serve.
            </p>
          </div>
        </div>

        {/* Section 2: When The Vision Began to Unfold */}
        <div className="space-y-4 border-t border-neutral-800 pt-8">
          <div className="text-xs uppercase tracking-widest text-[#d4af37] font-bold font-cinzel">
            Growth & Stewardship
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
            When the Vision Began to Unfold
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <p>
              Word began to spread that Teldah could assist employers looking for household staff and people seeking opportunities. More enquiries followed. More referrals followed. And gradually, something began to take shape.
            </p>
            <p className="text-white font-medium">
              In 2016, Flawless was established.
            </p>
            <p>
              Teldah believes God created the opportunity and entrusted her to walk in it. Flawless was built while she was still employed as a Household Professional, giving her the unique opportunity to experience the industry from the inside while building a company designed to serve it.
            </p>
            <p>
              When she eventually left her employment, she assisted her employer with finding a replacement — and that replacement was a candidate from her own company.
            </p>
            <p className="font-semibold text-white">
              What began as an act of service had become a functioning business.
            </p>
          </div>
        </div>

        {/* Section 3: From Referrals to Professional Solutions */}
        <div className="space-y-4 border-t border-neutral-800 pt-8">
          <div className="text-xs uppercase tracking-widest text-[#d4af37] font-bold font-cinzel">
            Evolution into Education
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
            From Referrals to Professional Solutions
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <p>
              As Flawless developed, Teldah identified a deeper need. A placement alone was not enough.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
              <div className="p-3 bg-[#13131a] rounded-lg border border-neutral-800 text-xs">
                <strong className="text-white block mb-1">Households needed properly prepared professionals.</strong>
                Individuals needed structured skills and professional development.
              </div>
              <div className="p-3 bg-[#13131a] rounded-lg border border-neutral-800 text-xs">
                <strong className="text-white block mb-1">Employers needed stronger household staffing solutions.</strong>
                The industry needed greater professionalism and elevated standards.
              </div>
            </div>
            <p>
              This led to the development of Flawless training, coaching, mentorship and advisory services. The vision continued to grow.
            </p>
          </div>
        </div>

        {/* Section 4: Faith & Purpose */}
        <div className="space-y-4 border-t border-neutral-800 pt-8 bg-[#121218] p-6 sm:p-8 rounded-2xl border border-[#d4af37]/30">
          <div className="text-xs uppercase tracking-widest text-[#d4af37] font-bold font-cinzel">
            Faith & Leadership
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
            God is at the Centre of Our Journey
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <p>
              Flawless Institution is founded on Christian faith and a belief in God. Teldah acknowledges God as the ultimate source and leader behind the vision of Flawless.
            </p>
            <p className="font-serif italic text-base sm:text-lg text-[#f3e1a9]">
              “God is the CEO of Flawless. I am simply entrusted to steward the vision.”
            </p>
            <p>
              Her faith influences the values with which she leads: <strong>integrity, excellence, service, responsibility, growth and purpose</strong>.
            </p>
            <p>
              Flawless remains committed to providing professional, respectful and high-quality services to people from diverse backgrounds.
            </p>
          </div>
        </div>

        {/* Section 5: A Message From The Founder */}
        <div className="space-y-4 border-t border-neutral-800 pt-8">
          <div className="text-xs uppercase tracking-widest text-[#d4af37] font-bold font-cinzel">
            Direct Message
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
            A Message From the Founder
          </h2>
          <div className="bg-[#15151e] border-l-4 border-[#d4af37] p-6 rounded-r-xl space-y-4">
            <p className="font-serif italic text-sm sm:text-base text-neutral-200 leading-relaxed">
              «“I did not set out to build Flawless. I responded to what was placed before me. What began as an opportunity to help became a business, and that business became an institution. I believe God is the CEO of Flawless, and I am entrusted to steward the vision, serve people and pursue excellence.”»
            </p>
            <div>
              <div className="font-cinzel font-bold text-white text-sm uppercase">TELDAH SIYAWAMWAYA</div>
              <div className="text-xs text-[#d4af37]">Founder & Director, Flawless Institution</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROMINENT CALL TO ACTION AS REQUIRED: LOOKING FOR A SPEAKER? */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="bg-gradient-to-r from-[#1b170e] via-[#2a2213] to-[#1b170e] border-2 border-[#d4af37] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden"
          id="founder-speaker-cta-card"
        >
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#f3e1a9] flex items-center justify-center mx-auto">
            <Mic className="w-8 h-8 text-[#d4af37]" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
              Book Thought Leadership
            </span>
            <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white">
              LOOKING FOR A SPEAKER?
            </h2>
            <p className="text-xs sm:text-base text-neutral-200 font-medium">
              Teldah Siyawamwaya is available for selected speaking engagements, masterclasses and educational events.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setCurrentView('speaking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              id="founder-invite-speaker-btn"
              className="w-full sm:w-auto py-4 px-8 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-xl shadow-[#d4af37]/25 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Mic className="w-4 h-4" />
              <span>INVITE TELDAH TO SPEAK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
