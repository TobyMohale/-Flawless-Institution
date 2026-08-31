import React, { useState } from 'react';
import { 
  GraduationCap, Search, Filter, Sparkles, MapPin, Globe, 
  ArrowRight, ShieldAlert, Award, Clock, CheckCircle2, Tag 
} from 'lucide-react';
import { COURSES, CATEGORIES, Course } from '../data/coursesData';
import { CourseCard } from '../components/CourseCard';
import { SEPTEMBER_PHYSICAL_INTAKE, GRADUATION_INFO } from '../data/siteData';
import { BACKGROUND_IMAGES } from '../data/assetsData';

interface AcademyViewProps {
  onSelectCourse: (course: Course) => void;
  onQuickEnrol: (course: Course) => void;
}

export const AcademyView: React.FC<AcademyViewProps> = ({ onSelectCourse, onQuickEnrol }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Programmes');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modeFilter, setModeFilter] = useState<'all' | 'online' | 'physical'>('all');
  const [specialsOnly, setSpecialsOnly] = useState<boolean>(false);

  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = selectedCategory === 'All Programmes' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode = modeFilter === 'all' 
      ? true 
      : modeFilter === 'physical' 
        ? course.physicalAvailableSeptember 
        : true;
    const matchesSpecial = !specialsOnly || (course.specialPrice < course.normalPrice);

    return matchesCategory && matchesSearch && matchesMode && matchesSpecial;
  });

  return (
    <div className="space-y-16 pb-20 font-sans-body">
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden pt-14 pb-16 border-b border-[#d4af37]/20 bg-[#09090c]">
        {/* Dignified Butler Training Suite Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={BACKGROUND_IMAGES.academy}
            alt="Flawless Academy Training Suite"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/80 to-[#0a0a0d]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0d] via-transparent to-[#0a0a0d]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#181822]/90 backdrop-blur-md border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest shadow-lg">
            <GraduationCap className="w-4 h-4 text-[#d4af37]" /> Flawless Academy • Established 2016
          </div>

          <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight drop-shadow-md">
            UPGRADE YOUR SKILLS. <br />
            <span className="gold-gradient-text">ELEVATE YOUR PROFESSIONAL FUTURE.</span>
          </h1>

          <p className="text-xs sm:text-base text-neutral-200 max-w-3xl mx-auto leading-relaxed">
            Professional Skills. Practical Training. A Stronger You. <br className="hidden sm:inline" />
            Flawless Academy provides practical, career-focused training designed for individuals who are serious about developing their capabilities, strengthening their profile, and opening doors locally and internationally.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
            <span className="bg-[#181822]/90 backdrop-blur-md text-[#f3e1a9] border border-[#d4af37]/40 px-3.5 py-1.5 rounded-full font-semibold shadow-md">
              ✓ 100% Online Self-Paced Learning
            </span>
            <span className="bg-[#181822]/90 backdrop-blur-md text-[#f3e1a9] border border-[#d4af37]/40 px-3.5 py-1.5 rounded-full font-semibold shadow-md">
              ✓ Fourways September Physical Intake
            </span>
            <span className="bg-[#181822]/90 backdrop-blur-md text-[#f3e1a9] border border-[#d4af37]/40 px-3.5 py-1.5 rounded-full font-semibold shadow-md">
              ✓ Annual November Fourways Graduation
            </span>
          </div>
        </div>
      </section>

      {/* 2. HIGHLY VISIBLE FOURWAYS SEPTEMBER INTAKE ANNOUNCEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="bg-gradient-to-r from-[#1d180f] via-[#292213] to-[#1d180f] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          id="academy-september-intake-banner"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#d4af37] text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full font-cinzel">
                  SEPTEMBER 2026 INTAKE — NOW OPEN
                </span>
                <span className="text-xs text-emerald-400 font-semibold hidden sm:inline">
                  ● Limited Classroom Capacity
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl font-cinzel font-bold text-white">
                FOURWAYS PHYSICAL TRAINING — CLASSES COMMENCE 7 SEPTEMBER 2026
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                Selected Flawless Academy programmes are available through in-person training in Fourways, South Africa. Our physical classes provide a structured learning environment for students who prefer face-to-face practical simulations in butler service, caregiving, housekeeping, and culinary support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => setModeFilter('physical')}
                className="py-3 px-6 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all text-center"
              >
                Filter Physical Programmes
              </button>
              <button
                onClick={() => setModeFilter('all')}
                className="py-2.5 px-4 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-700 text-center"
              >
                View All Programmes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROMOTIONAL PRICING NOTICE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121219] border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-cinzel font-bold text-white uppercase tracking-wider">
                ONLINE COURSE SPECIAL — SPECIAL PROMOTIONAL PRICES (LIMITED TIME ONLY)
              </div>
              <div className="text-xs text-neutral-400">
                All course prices below feature active promotional tuition rates + separate R300 registration fee.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400">Filter Special Offers:</span>
            <button
              onClick={() => setSpecialsOnly(!specialsOnly)}
              className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all ${
                specialsOnly 
                  ? 'bg-amber-400 text-black border-amber-300 font-bold' 
                  : 'bg-neutral-900 text-neutral-300 border-neutral-700'
              }`}
            >
              {specialsOnly ? 'Active: Specials Only' : 'Show All Prices'}
            </button>
          </div>
        </div>
      </section>

      {/* 4. SEARCH, CATEGORIES & MODE FILTER TOOLBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Search & Mode Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search programmes (e.g. Caregiver, Butler, Social Work, Au Pair)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121217] border border-neutral-800 focus:border-[#d4af37] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all"
            />
          </div>

          {/* Mode Switcher (All / Online / Physical) */}
          <div className="md:col-span-6 flex gap-2">
            <button
              onClick={() => setModeFilter('all')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                modeFilter === 'all'
                  ? 'bg-[#d4af37] text-black shadow-md'
                  : 'bg-[#121217] text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <span>All Formats ({COURSES.length})</span>
            </button>

            <button
              onClick={() => setModeFilter('online')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                modeFilter === 'online'
                  ? 'bg-[#d4af37] text-black shadow-md'
                  : 'bg-[#121217] text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>100% Online</span>
            </button>

            <button
              onClick={() => setModeFilter('physical')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                modeFilter === 'physical'
                  ? 'bg-[#d4af37] text-black shadow-md'
                  : 'bg-[#121217] text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Fourways Physical</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'bg-[#14141b] text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* 5. COURSES CATALOGUE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-3">
          <div>
            Showing <strong className="text-white">{filteredCourses.length}</strong> available programmes in <strong className="text-[#f3e1a9]">{selectedCategory}</strong>
          </div>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-[#d4af37] hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-[#111116] rounded-2xl border border-neutral-800 space-y-3">
            <p className="text-sm text-neutral-400">No courses match your filter selection.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Programmes');
                setSearchQuery('');
                setModeFilter('all');
                setSpecialsOnly(false);
              }}
              className="text-xs text-[#d4af37] font-semibold underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onSelectCourse={onSelectCourse}
                onQuickEnrol={onQuickEnrol}
              />
            ))}
          </div>
        )}
      </section>

      {/* 6. YOUR JOURNEY WITH FLAWLESS (01 TO 06 STEP FLOW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#101016] border border-[#d4af37]/30 rounded-3xl p-8 sm:p-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
              Your Journey With Flawless
            </span>
            <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white">
              From Enrolment to Graduation
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              A structured, transparent pathway designed to develop practical capabilities and recognised credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#15151f] p-5 rounded-2xl border border-neutral-800 space-y-2">
              <div className="font-cinzel text-xl font-bold text-[#f3e1a9]">01 — CHOOSE YOUR PROGRAMME</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Select the course that aligns with your professional ambitions, care skills, or household career aspirations.
              </p>
            </div>

            <div className="bg-[#15151f] p-5 rounded-2xl border border-neutral-800 space-y-2">
              <div className="font-cinzel text-xl font-bold text-[#f3e1a9]">02 — REGISTER ONLINE</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Complete your registration and secure your place. Separate Registration Fee: <strong>R300</strong>.
              </p>
            </div>

            <div className="bg-[#15151f] p-5 rounded-2xl border border-neutral-800 space-y-2">
              <div className="font-cinzel text-xl font-bold text-[#f3e1a9]">03 — BEGIN LEARNING</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Access your online learning platform immediately or attend physical classes in Fourways for scheduled intakes.
              </p>
            </div>

            <div className="bg-[#15151f] p-5 rounded-2xl border border-neutral-800 space-y-2">
              <div className="font-cinzel text-xl font-bold text-[#f3e1a9]">04 — DEVELOP YOUR SKILLS</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Work through your modules, case studies, and practical assessments relevant to high-expectation environments.
              </p>
            </div>

            <div className="bg-[#15151f] p-5 rounded-2xl border border-neutral-800 space-y-2">
              <div className="font-cinzel text-xl font-bold text-[#f3e1a9]">05 — COMPLETE PROGRAMME</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Successfully satisfy the practical and theoretical requirements of your chosen programme.
              </p>
            </div>

            <div className="bg-[#15151f] p-5 rounded-2xl border border-[#d4af37]/40 space-y-2">
              <div className="font-cinzel text-xl font-bold text-[#f3e1a9]">06 — GRADUATE WITH FLAWLESS</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Receive your official Flawless Academy Certificate during the annual November Graduation in Fourways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. IMPORTANT COURSE INFORMATION & POLICIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121218] border border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
            Important Information & Institutional Disclosures
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-neutral-300">
            <div className="space-y-1.5">
              <strong className="text-white font-cinzel block text-sm">SKILLS TRAINING</strong>
              <p className="text-neutral-400 leading-relaxed">
                Flawless Academy programmes are vocational skills training courses designed to provide practical knowledge and professional standards. Formal prior academic qualifications are not required.
              </p>
            </div>

            <div className="space-y-1.5">
              <strong className="text-white font-cinzel block text-sm">CERTIFICATES</strong>
              <p className="text-neutral-400 leading-relaxed">
                All students who successfully complete their selected training receive a Flawless Academy Certificate during the annual November Graduation in Fourways.
              </p>
            </div>

            <div className="space-y-1.5">
              <strong className="text-white font-cinzel block text-sm">EMPLOYMENT & OPPORTUNITIES</strong>
              <p className="text-neutral-400 leading-relaxed">
                Completion of a course does not guarantee employment, placement, immigration approval or employment abroad. Opportunities remain subject to employer requirements and suitability.
              </p>
            </div>

            <div className="space-y-1.5">
              <strong className="text-white font-cinzel block text-sm">STRICT NO REFUNDS POLICY</strong>
              <p className="text-neutral-400 leading-relaxed">
                All Flawless Institution services and course purchases are non-refundable. Please carefully review your selected programme before completing your enrolment and payment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
