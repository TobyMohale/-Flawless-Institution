import React, { useState } from 'react';
import { 
  GraduationCap, Search, Sparkles, MapPin, Globe, 
  ArrowRight, ShieldAlert, Award, Clock, CheckCircle2, Tag, BookOpen, Laptop
} from 'lucide-react';
import { COURSES, CATEGORIES, Course } from '../data/coursesData';
import { CourseCard } from '../components/CourseCard';
import { BACKGROUND_IMAGES } from '../data/assetsData';

interface AcademyViewProps {
  onSelectCourse: (course: Course) => void;
  onQuickEnrol: (course: Course) => void;
  onNavigateToPhysical?: () => void;
}

export const AcademyView: React.FC<AcademyViewProps> = ({ 
  onSelectCourse, 
  onQuickEnrol,
  onNavigateToPhysical 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Programmes');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [specialsOnly, setSpecialsOnly] = useState<boolean>(false);

  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = selectedCategory === 'All Programmes' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecial = !specialsOnly || (course.specialPrice < course.normalPrice);

    return matchesCategory && matchesSearch && matchesSpecial;
  });

  return (
    <div className="space-y-16 pb-20 font-sans-body">
      {/* 1. HERO HEADER: EXCLUSIVELY ONLINE DISTANCE LEARNING */}
      <section className="relative overflow-hidden pt-14 pb-16 border-b border-[#d4af37]/20 bg-[#09090c]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={BACKGROUND_IMAGES.academy}
            alt="Flawless Academy Online Learning Suite"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/80 to-[#0a0a0d]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0d] via-transparent to-[#0a0a0d]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#181822]/90 backdrop-blur-md border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest shadow-lg">
            <Globe className="w-4 h-4 text-[#d4af37]" /> Flawless Academy • 100% Online Courses
          </div>

          <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight drop-shadow-md">
            UPGRADE YOUR SKILLS. <br />
            <span className="gold-gradient-text">ELEVATE YOUR PROFESSIONAL FUTURE.</span>
          </h1>

          <p className="text-xs sm:text-base text-neutral-200 max-w-3xl mx-auto leading-relaxed">
            Professional Skills. Practical Training. A Stronger You. <br className="hidden sm:inline" />
            Flawless Academy provides flexible, 100% online distance learning designed for individuals who want to develop practical knowledge at their own pace.
          </p>

          {/* Reassurance Banner that distance students DO NOT have to be in Fourways */}
          <div className="max-w-2xl mx-auto bg-[#181824]/90 border border-neutral-800 rounded-2xl p-3.5 text-xs text-neutral-300">
            <span className="text-[#f3e1a9] font-semibold">Study from anywhere in South Africa or internationally:</span> You complete your modules 100% online via phone or computer. Physical attendance in Fourways is NOT required for online training.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
            <span className="bg-[#181822]/90 backdrop-blur-md text-[#f3e1a9] border border-[#d4af37]/40 px-3.5 py-1.5 rounded-full font-semibold shadow-md">
              ✓ 100% Online Distance Learning
            </span>
            <span className="bg-[#181822]/90 backdrop-blur-md text-[#f3e1a9] border border-[#d4af37]/40 px-3.5 py-1.5 rounded-full font-semibold shadow-md">
              ✓ Active Promotional Tuition Specials
            </span>
            <span className="bg-[#181822]/90 backdrop-blur-md text-[#f3e1a9] border border-[#d4af37]/40 px-3.5 py-1.5 rounded-full font-semibold shadow-md">
              ✓ Recognized Completion Certificate
            </span>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED CALLOUT BANNER TO PHYSICAL CLASSES IN FOURWAYS */}
      {onNavigateToPhysical && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#19150e] via-[#241d11] to-[#19150e] border border-[#d4af37]/50 rounded-3xl p-6 sm:p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-cinzel font-bold text-[#f3e1a9] uppercase tracking-wider">
                    Looking for Physical In-Person Classes in Fourways?
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-semibold">
                    Classes Commence 7 September 2026
                  </span>
                </div>
                <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
                  Selected Flawless Academy programmes are available as in-person training with face-to-face practical simulations at our Fourways campus in Johannesburg. View dedicated physical tuition rates and reserve your classroom seat.
                </p>
              </div>
            </div>

            <button
              onClick={onNavigateToPhysical}
              className="shrink-0 inline-flex items-center gap-2 py-3 px-6 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all shadow-lg shadow-[#d4af37]/10"
            >
              <span>View Fourways Physical Classes & Prices</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

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
                All online course prices below feature active promotional tuition rates + separate R300 registration fee.
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

      {/* 4. SEARCH & CATEGORIES TOOLBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search online programmes (e.g. Caregiver, Butler, Social Work, Au Pair)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121217] border border-neutral-800 focus:border-[#d4af37] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all"
            />
          </div>

          {/* Crosslink to physical classes */}
          {onNavigateToPhysical && (
            <div className="md:col-span-4 flex">
              <button
                onClick={onNavigateToPhysical}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#161622] hover:bg-[#1f1f30] text-[#f3e1a9] border border-[#d4af37]/30 transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Fourways Physical Training</span>
                <ArrowRight className="w-3 h-3 ml-auto" />
              </button>
            </div>
          )}
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
            Showing <strong className="text-white">{filteredCourses.length}</strong> online distance learning programmes in <strong className="text-[#f3e1a9]">{selectedCategory}</strong>
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
                displayMode="online"
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
              From Online Enrolment to Graduation
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              A structured, transparent pathway designed to develop practical capabilities and recognised credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#15151f] p-5 rounded-2xl border border-neutral-800 space-y-2">
              <div className="font-cinzel text-xl font-bold text-[#f3e1a9]">01 — CHOOSE YOUR PROGRAMME</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Select the online course that aligns with your career ambitions, care skills, or household management goals.
              </p>
            </div>

            <div className="bg-[#15151f] p-5 rounded-2xl border border-neutral-800 space-y-2">
              <div className="font-cinzel text-xl font-bold text-[#f3e1a9]">02 — REGISTER ONLINE</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Complete your online registration. Separate Registration Fee: <strong>R300</strong>.
              </p>
            </div>

            <div className="bg-[#15151f] p-5 rounded-2xl border border-neutral-800 space-y-2">
              <div className="font-cinzel text-xl font-bold text-[#f3e1a9]">03 — ACCESS LEARNING PORTAL</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Receive instant student portal access to your modules, workbooks, video materials, and reading guidelines.
              </p>
            </div>

            <div className="bg-[#15151f] p-5 rounded-2xl border border-neutral-800 space-y-2">
              <div className="font-cinzel text-xl font-bold text-[#f3e1a9]">04 — STUDY AT YOUR PACE</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Study anywhere in South Africa or worldwide on your smartphone, tablet, or PC without commute.
              </p>
            </div>

            <div className="bg-[#15151f] p-5 rounded-2xl border border-neutral-800 space-y-2">
              <div className="font-cinzel text-xl font-bold text-[#f3e1a9]">05 — COMPLETE ASSESSMENTS</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Submit your module evaluations and practical case scenarios for academic review.
              </p>
            </div>

            <div className="bg-[#15151f] p-5 rounded-2xl border border-[#d4af37]/40 space-y-2">
              <div className="font-cinzel text-xl font-bold text-[#f3e1a9]">06 — RECEIVE CERTIFICATE</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Receive your digital certificate upon completion, with the option to attend the annual November Graduation in Fourways.
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
                All students who successfully complete their selected training receive an official Flawless Academy Certificate.
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
