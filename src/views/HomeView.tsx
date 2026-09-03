import React from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Award, Heart, CheckCircle2, 
  GraduationCap, Mic, Home, TrendingUp, Users, Clock, MapPin, Play, Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';
import { INSTITUTIONAL_PILLARS, FOUNDATION_VALUES, SEPTEMBER_PHYSICAL_INTAKE, GRADUATION_INFO } from '../data/siteData';
import { COURSES, Course } from '../data/coursesData';
import { CourseCard } from '../components/CourseCard';
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
  onOpenSpeakingEnquiry // Kept in interface but unused here
}) => {
  const featuredCourses = COURSES.filter(c => c.featured || c.popular).slice(0, 6);

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
                Elevating Standards, <br className="hidden sm:inline" />
                <span className="gold-gradient-text">Empowering Careers.</span>
              </h1>
              <p className="text-base sm:text-xl text-neutral-200 font-serif max-w-2xl mx-auto leading-relaxed">
                Flawless Institution provides world-class professional skills training, elite household staffing, and enterprise advisory services across South Africa.
              </p>
            </div>
          </ScrollReveal>

          {/* Value Motto */}
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed mt-4">
              Empowering People through targeted education. Elevating Homes through meticulous placements. Building Businesses through practical entrepreneurship.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 flex-wrap">
              <button
                onClick={() => setCurrentView('academy')}
                id="hero-explore-courses-btn"
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-xl shadow-[#d4af37]/25 transition-all flex items-center justify-center gap-2 uppercase tracking-wider active:scale-95"
              >
                <GraduationCap className="w-4 h-4" />
                <span>100% Online Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView('physical-classes')}
                id="hero-physical-classes-btn"
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold bg-[#161622] hover:bg-[#1e1e2d] text-[#f3e1a9] border border-[#d4af37]/60 hover:border-[#d4af37] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>Fourways Physical Classes</span>
              </button>

              <button
                onClick={() => setCurrentView('household-professionals')}
                id="hero-services-btn"
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white bg-[#14141b]/90 backdrop-blur-md border border-neutral-700 hover:border-[#d4af37]/50 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <Users className="w-4 h-4 text-[#d4af37]" />
                <span>Staffing & Placements</span>
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
                    <AnimatedCounter from={2000} to={2016} duration={2000} useGrouping={false} />
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
                  onClick={() => setCurrentView('physical-classes')}
                  id="home-physical-enrol-cta"
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  View Fourways Physical Classes & Prices
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

      {/* 5. ABOUT FLAWLESS INSTITUTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="relative overflow-hidden bg-[#101016] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-8">
            {/* Subtle background stage image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src={BACKGROUND_IMAGES.hero} 
                alt="Flawless Institution Campus" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center opacity-10"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#101016] via-[#101016]/90 to-[#101016]/80"></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-neutral-800/80 pb-8">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
                  <Award className="w-3.5 h-3.5" /> About The Institution
                </div>
                <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white">
                  A Legacy of Excellence & Professional Development
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed text-base">
                  Established in 2016, Flawless Institution has grown from a specialized training provider into a comprehensive authority in household staffing, professional skills development, and enterprise advisory services across South Africa.
                </p>
              </div>

              <button
                onClick={() => {
                  setCurrentView('about-institution');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                id="home-about-institution-cta"
                className="py-3.5 px-7 rounded-xl text-xs font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-lg shadow-[#d4af37]/20 uppercase tracking-wider shrink-0 active:scale-95"
              >
                Read Our Story
              </button>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Tilt3DCard maxTilt={6} glareOpacity={0.12} className="h-full">
                <div className="h-full bg-[#15151e]/90 backdrop-blur-md p-5 rounded-xl border border-neutral-800 hover:border-[#d4af37]/50 transition-colors flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-4 border border-[#d4af37]/20">
                      <GraduationCap className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <h4 className="font-cinzel text-base font-bold text-white mb-1.5">World-Class Academy</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Rigorous, practical training programmes designed to equip professionals with top-tier skills in hospitality, caregiving, and household management.
                    </p>
                  </div>
                </div>
              </Tilt3DCard>

              <Tilt3DCard maxTilt={6} glareOpacity={0.12} className="h-full">
                <div className="h-full bg-[#15151e]/90 backdrop-blur-md p-5 rounded-xl border border-neutral-800 hover:border-[#d4af37]/50 transition-colors flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-4 border border-[#d4af37]/20">
                      <Users className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <h4 className="font-cinzel text-base font-bold text-white mb-1.5">Elite Staffing</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Connecting private residences and corporate clients with thoroughly vetted, highly trained personnel who understand the nuances of luxury service.
                    </p>
                  </div>
                </div>
              </Tilt3DCard>

              <Tilt3DCard maxTilt={6} glareOpacity={0.12} className="h-full">
                <div className="h-full bg-[#15151e]/90 backdrop-blur-md p-5 rounded-xl border border-neutral-800 hover:border-[#d4af37]/50 transition-colors flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-4 border border-[#d4af37]/20">
                      <Briefcase className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <h4 className="font-cinzel text-base font-bold text-white mb-1.5">Enterprise Advisory</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Consulting services that help emerging businesses and established households streamline their operations and human resource management.
                    </p>
                  </div>
                </div>
              </Tilt3DCard>
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
              Built on a Foundation of Faith
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed text-base">
              Our institution is anchored in strong Christian values, guiding every aspect of our training, service, and commitment to excellence.
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
