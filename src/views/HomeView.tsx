import React from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Award, Heart, CheckCircle2, 
  GraduationCap, Mic, Home, TrendingUp, Users, Clock, MapPin, Play 
} from 'lucide-react';
import { motion } from 'motion/react';
import { INSTITUTIONAL_PILLARS, FOUNDATION_VALUES, SEPTEMBER_PHYSICAL_INTAKE, GRADUATION_INFO } from '../data/siteData';
import { COURSES, Course } from '../data/coursesData';
import { CourseCard } from '../components/CourseCard';
import { SPEAKING_TOPICS } from '../data/speakingData';
import { BACKGROUND_IMAGES } from '../data/assetsData';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { ScrollReveal, Tilt3DCard, Floating3D } from '../components/MotionEffects';

interface HomeViewProps {
  setCurrentView: (view: string) => void;
  onSelectCourse: (course: Course) => void;
  onQuickEnrol: (course: Course) => void;
  onOpenSpeakingEnquiry: (topic?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentView,
  onSelectCourse,
  onQuickEnrol,
  onOpenSpeakingEnquiry
}) => {
  const featuredCourses = COURSES.filter(c => c.featured || c.popular).slice(0, 6);
  const featuredTopics = SPEAKING_TOPICS.slice(0, 3);

  return (
    <div className="space-y-28 pb-20 font-sans-body">
      {/* 1. HERO BANNER: British-Institutional Prestige & Authority */}
      <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-36 border-b border-[#d4af37]/20 bg-[#09090c]">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            initial={{ scale: 1.15, opacity: 0.15 }}
            animate={{ scale: 1.05, opacity: 0.3 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            src={BACKGROUND_IMAGES.hero}
            alt="Flawless Institution Grand Heritage"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/80 to-[#0a0a0d]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0d] via-transparent to-[#0a0a0d]"></div>
        </div>

        {/* Subtle Gold Aura Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.06] pointer-events-none z-0"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#d4af37]/10 blur-[140px] rounded-full pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Institution Header Tag */}
          <ScrollReveal direction="down" duration={0.6}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#17171d]/90 backdrop-blur-md border border-[#d4af37]/40 shadow-xl shadow-black/60">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#f3e1a9] font-cinzel">
                Flawless Institution • Established 2016
              </span>
            </div>
          </ScrollReveal>

          {/* Main Headline */}
          <ScrollReveal direction="up" delay={0.1} duration={0.8}>
            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
                A Purpose That Became <br className="hidden sm:inline" />
                <span className="gold-gradient-text">An Institution.</span>
              </h1>
              <p className="text-base sm:text-xl text-neutral-200 font-serif italic max-w-2xl mx-auto leading-relaxed">
                “I did not create Flawless. God created the opportunity, and I found myself walking in it.”
              </p>
              <div className="text-xs text-[#d4af37] font-semibold tracking-wider uppercase font-cinzel">
                — TELDAH SIYAWAMWAYA, Founder & Director
              </div>
            </div>
          </ScrollReveal>

          {/* Value Motto */}
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Empowering People through professional skills training, elevating Homes through household advisory and staffing, and building Businesses through practical entrepreneurship.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setCurrentView('academy')}
                id="hero-explore-courses-btn"
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-xl shadow-[#d4af37]/25 transition-all flex items-center justify-center gap-2 uppercase tracking-wider active:scale-95"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Explore Academy Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenSpeakingEnquiry()}
                id="hero-invite-speaking-btn"
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white bg-[#14141b]/90 backdrop-blur-md border border-[#d4af37]/50 hover:border-[#d4af37] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <Mic className="w-4 h-4 text-[#d4af37]" />
                <span>Invite Teldah to Speak</span>
              </button>

              <button
                onClick={() => setCurrentView('about-founder')}
                id="hero-founder-story-btn"
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl text-xs font-medium text-neutral-300 hover:text-[#f3e1a9] hover:bg-neutral-900/80 transition-all backdrop-blur-sm"
              >
                Read Our Story & Faith →
              </button>
            </div>
          </ScrollReveal>

          {/* Metric Bar with 3D Float and Hover Interactivity */}
          <ScrollReveal direction="3d-flip" delay={0.4}>
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-neutral-800/80 text-center">
              <Tilt3DCard maxTilt={8} glareOpacity={0.15}>
                <div className="p-4 bg-[#111116]/80 backdrop-blur-md rounded-xl border border-neutral-800/80 transition-all hover:border-[#d4af37]/50 hover:bg-[#15151c] shadow-lg">
                  <div className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                    <AnimatedCounter to={16} suffix="+" duration={1800} />
                  </div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider mt-1">Years Industry Experience</div>
                </div>
              </Tilt3DCard>

              <Tilt3DCard maxTilt={8} glareOpacity={0.15}>
                <div className="p-4 bg-[#111116]/80 backdrop-blur-md rounded-xl border border-neutral-800/80 transition-all hover:border-[#d4af37]/50 hover:bg-[#15151c] shadow-lg">
                  <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f3e1a9]">
                    <AnimatedCounter from={2000} to={2016} duration={2000} />
                  </div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider mt-1">Year Established</div>
                </div>
              </Tilt3DCard>

              <Tilt3DCard maxTilt={8} glareOpacity={0.15}>
                <div className="p-4 bg-[#111116]/80 backdrop-blur-md rounded-xl border border-neutral-800/80 transition-all hover:border-[#d4af37]/50 hover:bg-[#15151c] shadow-lg">
                  <div className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                    <AnimatedCounter to={20} suffix="+" duration={1800} />
                  </div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider mt-1">Professional Programmes</div>
                </div>
              </Tilt3DCard>

              <Tilt3DCard maxTilt={8} glareOpacity={0.15}>
                <div className="p-4 bg-[#111116]/80 backdrop-blur-md rounded-xl border border-neutral-800/80 transition-all hover:border-[#d4af37]/50 hover:bg-[#15151c] shadow-lg">
                  <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f3e1a9]">Fourways</div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider mt-1">Annual Graduation Hub</div>
                </div>
              </Tilt3DCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. THE THREE INSTITUTIONAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
              From Company to Institution
            </span>
            <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white">
              Three Dedicated Pillars of Transformation
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Flawless Institution represents a holistic vision built to serve individuals, private residences, and emerging enterprises across South Africa and beyond.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {INSTITUTIONAL_PILLARS.map((pillar, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.15}>
              <Tilt3DCard maxTilt={8} glareOpacity={0.15} className="h-full">
                <div
                  className="h-full bg-[#111116] border border-neutral-800 hover:border-[#d4af37]/60 rounded-2xl p-7 transition-colors duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[#d4af37]/10"
                  id={`pillar-card-${pillar.title.toLowerCase()}`}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#f3e1a9] flex items-center justify-center font-cinzel font-bold text-lg group-hover:scale-110 transition-transform">
                      0{idx + 1}
                    </div>

                    <div>
                      <h3 className="font-cinzel text-2xl font-bold text-white group-hover:text-[#f3e1a9] transition-colors">
                        {pillar.title}
                      </h3>
                      <div className="text-xs font-semibold text-[#d4af37] tracking-wide mt-0.5">
                        {pillar.subtitle}
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {pillar.description}
                    </p>

                    <div className="pt-2 border-t border-neutral-800/80 space-y-2">
                      <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Core Solutions:</div>
                      {pillar.deliverables.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2 text-xs text-neutral-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setCurrentView(pillar.link)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-200 bg-[#16161f] border border-neutral-700 hover:border-[#d4af37] hover:text-[#f3e1a9] transition-all flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <span>Explore {pillar.title} Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Tilt3DCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. SEPTEMBER PHYSICAL INTAKE CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="scale" duration={0.8}>
          <div className="bg-gradient-to-r from-[#17140e] via-[#241e12] to-[#17140e] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#d4af37] text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-cinzel shadow-md">
                  <MapPin className="w-3.5 h-3.5" /> Fourways Physical Training
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  September 2026 Intake — Classes Commence 7 September 2026
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                  Selected Flawless Academy programmes are available through structured, face-to-face classroom learning in Fourways, South Africa. Ideal for candidates seeking hands-on practical masterclasses in luxury butler service, caregiving, executive housekeeping, and chef support.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                    <span>Face-to-face practical simulations & labs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                    <span>Direct instructor guidance & mentorship</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                    <span>Fourways, Johannesburg location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                    <span>Annual November Graduation ceremony qualification</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0e0e13]/90 border border-[#d4af37]/30 rounded-2xl p-6 text-center space-y-4 backdrop-blur-md shadow-xl">
                <div className="text-xs text-[#f3e1a9] font-cinzel uppercase tracking-wider font-bold">
                  Physical Seat Reservation
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-white font-cinzel">7 SEPT 2026</div>
                  <div className="text-xs text-emerald-400 font-semibold">Intake Now Open</div>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Registration Fee: <strong>R300</strong>. Limited physical seating per class to ensure high instructional standards.
                </p>
                <button
                  onClick={() => setCurrentView('academy')}
                  id="home-physical-enrol-cta"
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  Enrol for Physical Classes
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. FLAWLESS ACADEMY FEATURED COURSES & STORE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
            <div>
              <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
                Flawless Academy • Online & Physical
              </span>
              <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white mt-1">
                Upgrade Your Skills. Elevate Your Future.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                Practical, career-focused programmes recognised by employers across South Africa. Special limited-time promotional pricing currently active.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('academy')}
              id="home-browse-all-courses-btn"
              className="self-start md:self-auto py-2.5 px-5 rounded-xl text-xs font-bold bg-neutral-900 border border-[#d4af37]/40 text-[#f3e1a9] hover:bg-[#d4af37]/15 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <span>Browse All {COURSES.length} Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </ScrollReveal>

        {/* Featured Courses Grid with 3D Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course, idx) => (
            <ScrollReveal key={course.id} direction="up" delay={idx * 0.1}>
              <CourseCard
                course={course}
                onSelectCourse={onSelectCourse}
                onQuickEnrol={onQuickEnrol}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. SPEAKING & THOUGHT LEADERSHIP SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="relative overflow-hidden bg-[#101016] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-8">
            {/* Subtle background stage image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src={BACKGROUND_IMAGES.speaking} 
                alt="Speaking Stage" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#101016] via-[#101016]/90 to-[#101016]/80"></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-neutral-800/80 pb-8">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
                  <Mic className="w-3.5 h-3.5" /> Thought Leadership & Masterclasses
                </div>
                <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white">
                  Speaking Engagements with Teldah Siyawamwaya
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-serif italic text-base">
                  “With more than 16 years of experience within the household staffing industry, entrepreneurship and professional development, Teldah brings a practical, experience-led perspective to conversations that matter.”
                </p>
              </div>

              <button
                onClick={() => onOpenSpeakingEnquiry()}
                id="home-speaking-invite-cta"
                className="py-3.5 px-7 rounded-xl text-xs font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-lg shadow-[#d4af37]/20 uppercase tracking-wider shrink-0 active:scale-95"
              >
                Invite Teldah to Speak
              </button>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTopics.map((topic, idx) => (
                <Tilt3DCard key={topic.id} maxTilt={6} glareOpacity={0.12} className="h-full">
                  <div
                    className="h-full bg-[#15151e]/90 backdrop-blur-md p-5 rounded-xl border border-neutral-800 hover:border-[#d4af37]/50 transition-colors flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded">
                        {topic.category}
                      </span>
                      <h4 className="font-cinzel text-base font-bold text-white mt-2 mb-1.5">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                        {topic.summary}
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setCurrentView('speaking');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs text-[#d4af37] font-semibold hover:underline flex items-center gap-1"
                      >
                        View Speaking Topics <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </Tilt3DCard>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. FOUNDATION & VALUES: FAITH & PURPOSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
              Faith & Purpose
            </span>
            <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white">
              God is at the Centre of Our Journey
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-serif italic text-base">
              “God is the CEO of Flawless. I am simply entrusted to steward the vision.”
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOUNDATION_VALUES.map((val, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.08}>
              <Tilt3DCard maxTilt={5} glareOpacity={0.08} className="h-full">
                <div
                  className="h-full bg-[#111116] border border-neutral-800 hover:border-[#d4af37]/40 rounded-2xl p-6 space-y-3 transition-colors shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-lg font-bold text-[#f3e1a9]">
                      {val.title}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">0{idx + 1}</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {val.desc}
                  </p>
                  <div className="text-[10px] text-[#d4af37] font-medium pt-1">
                    {val.scriptureOrNote}
                  </div>
                </div>
              </Tilt3DCard>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};
