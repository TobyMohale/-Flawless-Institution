import React, { useState } from 'react';
import { 
  GraduationCap, MapPin, Calendar, Clock, CheckCircle2, 
  Search, Award, ShieldCheck, ArrowRight, Sparkles, Building,
  Users, Coffee, ChevronRight, Phone, Mail, FileText, ZoomIn, HeartPulse, Image as ImageIcon
} from 'lucide-react';
import { COURSES, CATEGORIES, Course } from '../data/coursesData';
import { BACKGROUND_IMAGES, HEALTHCARE_NURSING_GALLERY, GalleryImage } from '../data/assetsData';
import { Tilt3DCard } from '../components/MotionEffects';
import { ImageLightboxModal } from '../components/ImageLightboxModal';

interface PhysicalClassesViewProps {
  onSelectCourse: (course: Course) => void;
  onEnrolPhysical?: (course: Course) => void;
  onQuickEnrol?: (course: Course) => void;
  onNavigateToOnline: () => void;
}

export const PhysicalClassesView: React.FC<PhysicalClassesViewProps> = ({
  onSelectCourse,
  onEnrolPhysical,
  onQuickEnrol,
  onNavigateToOnline
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Programmes');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const triggerEnrol = (course: Course) => {
    if (onQuickEnrol) {
      onQuickEnrol(course);
    } else if (onEnrolPhysical) {
      onEnrolPhysical(course);
    }
  };

  // Filter only courses that have physical training in Fourways
  const physicalCourses = COURSES.filter(course => course.physicalAvailableSeptember && course.physicalPrice);

  const filteredCourses = physicalCourses.filter(course => {
    const matchesCategory = selectedCategory === 'All Programmes' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-24 font-sans-body">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-14 pb-20 border-b border-[#d4af37]/20 bg-[#09090c]">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <img
            src={BACKGROUND_IMAGES.academy}
            alt="Flawless Academy Fourways Campus"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/85 to-[#0a0a0d]/95"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0d] via-transparent to-[#0a0a0d]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#181822]/90 backdrop-blur-md border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel font-bold uppercase tracking-widest shadow-lg">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Fourways Campus • Johannesburg
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 font-bold uppercase tracking-wider">
              ● September 2026 Intake Now Open
            </span>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-tight leading-tight">
              FOURWAYS PHYSICAL TRAINING
            </h1>
            <div className="text-lg sm:text-2xl font-cinzel font-semibold text-[#f3e1a9]">
              CLASSES COMMENCE: 7 SEPTEMBER 2026
            </div>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl">
              Selected Flawless Academy programmes are available through in-person training in Fourways, South Africa. 
              Our physical classes provide a structured learning environment for students who prefer face-to-face 
              practical simulations in butler service, caregiving, housekeeping, and culinary support.
            </p>
          </div>

          {/* Quick Key Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 max-w-4xl">
            <div className="bg-[#121218]/90 border border-neutral-800 p-3.5 rounded-xl">
              <span className="text-[10px] text-neutral-400 block uppercase font-cinzel tracking-wider">Location</span>
              <strong className="text-white text-xs sm:text-sm font-semibold">Fourways, Sandton</strong>
            </div>
            <div className="bg-[#121218]/90 border border-neutral-800 p-3.5 rounded-xl">
              <span className="text-[10px] text-neutral-400 block uppercase font-cinzel tracking-wider">Class Commences</span>
              <strong className="text-[#f3e1a9] text-xs sm:text-sm font-semibold">7 September 2026</strong>
            </div>
            <div className="bg-[#121218]/90 border border-neutral-800 p-3.5 rounded-xl">
              <span className="text-[10px] text-neutral-400 block uppercase font-cinzel tracking-wider">Format</span>
              <strong className="text-white text-xs sm:text-sm font-semibold">In-Person & Practical</strong>
            </div>
            <div className="bg-[#121218]/90 border border-neutral-800 p-3.5 rounded-xl">
              <span className="text-[10px] text-neutral-400 block uppercase font-cinzel tracking-wider">Registration Fee</span>
              <strong className="text-white text-xs sm:text-sm font-semibold">R300 (Separate)</strong>
            </div>
          </div>

          {/* Cross link to Online Courses */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-xs text-neutral-400">
              Prefer self-paced distance learning from home?
            </div>
            <button
              onClick={onNavigateToOnline}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4af37] hover:text-[#f3e1a9] underline underline-offset-4 transition-colors"
            >
              <span>View Online Courses & Promotional Prices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE FOURWAYS IN-PERSON TRAINING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#17140e] via-[#1f1b14] to-[#17140e] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs text-[#d4af37] uppercase tracking-widest font-cinzel font-semibold">
              Practical Excellence in Action
            </span>
            <h2 className="text-xl sm:text-3xl font-cinzel font-bold text-white">
              The Fourways Classroom Advantage
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              While our online distance learning offers unmatched flexibility, our physical Fourways classes 
              immerse students in realistic household, estate, and hospitality settings under the direct guidance of master trainers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-[#0f0f13]/80 border border-neutral-800 p-5 rounded-2xl space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-cinzel text-sm font-bold text-white">Live Simulated Suites</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Practice in fully staged master bedrooms, fine-dining banquet tables, sculleries, and care stations using authentic luxury finishes and equipment.
              </p>
            </div>

            <div className="bg-[#0f0f13]/80 border border-neutral-800 p-5 rounded-2xl space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-cinzel text-sm font-bold text-white">Direct Mentorship & Feedback</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Receive instant postural, procedural, and etiquette corrections from experienced practitioners with decades of estate and corporate experience.
              </p>
            </div>

            <div className="bg-[#0f0f13]/80 border border-neutral-800 p-5 rounded-2xl space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-cinzel text-sm font-bold text-white">Recruitment & Graduation</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Classroom attendees receive prioritized visibility for private household placements and celebrate at our formal November graduation ceremony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOURWAYS PHYSICAL PRICING SUMMARY & NOTICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121219] border border-[#d4af37]/30 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-cinzel font-bold text-[#f3e1a9] uppercase tracking-wider">
                PHYSICAL TRAINING TUITION & ENROLMENT CONDITIONS
              </span>
            </div>
            <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
              Every course below reflects our official in-person tuition rate for the Fourways September 2026 intake. 
              A separate <strong>R300 registration fee</strong> applies to all applications. Classroom seats are allocated upon receipt of registration.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3 bg-[#191924] px-4 py-3 rounded-xl border border-neutral-800 text-xs">
            <span className="text-neutral-400">Total Programmes Available:</span>
            <strong className="text-lg font-cinzel font-bold text-[#f3e1a9]">{physicalCourses.length}</strong>
          </div>
        </div>
      </section>

      {/* 4. SEARCH & CATEGORY SELECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search physical training courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121218] border border-neutral-800 focus:border-[#d4af37] text-white text-xs placeholder-neutral-500 outline-none transition-all"
            />
          </div>

          <div className="text-xs text-neutral-400">
            Showing <strong className="text-white">{filteredCourses.length}</strong> physical training programmes
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs whitespace-nowrap transition-all font-medium ${
                selectedCategory === category
                  ? 'bg-[#d4af37] text-black font-bold shadow-lg shadow-[#d4af37]/20'
                  : 'bg-[#121218] text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* 5. COURSES GRID FOR FOURWAYS PHYSICAL TRAINING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-[#121218] rounded-2xl border border-neutral-800 p-8 space-y-4">
            <p className="text-neutral-400 text-sm">No physical programmes match your criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All Programmes'); setSearchQuery(''); }}
              className="px-4 py-2 text-xs bg-neutral-800 text-neutral-200 rounded-lg hover:bg-neutral-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                className="bg-[#121218] border border-neutral-800 hover:border-[#d4af37]/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl group"
              >
                <div className="space-y-4">
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold text-[#d4af37] tracking-wider font-cinzel">
                      {course.category}
                    </span>
                    <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> Fourways In-Person
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 
                    onClick={() => onSelectCourse(course)}
                    className="text-base sm:text-lg font-cinzel font-bold text-white group-hover:text-[#f3e1a9] transition-colors cursor-pointer leading-snug"
                  >
                    {course.title}
                  </h3>

                  {/* Course Overview Snippet */}
                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Learning Highlights */}
                  <div className="space-y-1.5 pt-1 border-t border-neutral-800/60">
                    <span className="text-[10px] text-neutral-400 font-semibold block uppercase font-cinzel">Core Practical Focus:</span>
                    {course.learningOutcomes.slice(0, 2).map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-neutral-300">
                        <CheckCircle2 className="w-3 h-3 text-[#d4af37] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{outcome}</span>
                      </div>
                    ))}
                  </div>

                  {/* Duration & Level */}
                  <div className="flex items-center gap-4 text-[11px] text-neutral-400 pt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-neutral-500" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Pricing & Action Section */}
                <div className="pt-5 mt-5 border-t border-neutral-800 space-y-4">
                  <div className="bg-[#17171f] rounded-xl p-3.5 border border-neutral-800 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase font-cinzel">Physical Tuition Fee:</span>
                      <div className="text-2xl font-bold font-cinzel text-[#f3e1a9]">
                        R{course.physicalPrice?.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-amber-400 block font-semibold">
                        + R300 Reg. Fee
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Fourways Campus
                      </span>
                    </div>
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectCourse(course)}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-600 transition-all text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => triggerEnrol(course)}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold bg-[#d4af37] hover:bg-[#f3e1a9] text-black uppercase tracking-wider transition-all text-center shadow-md shadow-[#d4af37]/10"
                    >
                      Enrol Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal for Healthcare & Nursing Photos */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={HEALTHCARE_NURSING_GALLERY}
        currentIndex={lightboxIndex}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* 5. HEALTHCARE & GERIATRIC NURSING PRACTICUM GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111116] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
                <HeartPulse className="w-4 h-4 text-[#d4af37]" /> Practical Clinical Training
              </div>
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mt-1">
                Healthcare & Old Age Nursing Practicum
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl leading-relaxed">
                Step inside our practical simulations. Students in our Fourways healthcare cohorts master hands-on patient handling, vital signs assessment, sterile hygiene protocols, and dignified geriatric bedside care.
              </p>
            </div>
            <div className="text-xs font-mono text-[#f3e1a9] bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg self-start sm:self-auto">
              {HEALTHCARE_NURSING_GALLERY.length} Practicum Photos
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HEALTHCARE_NURSING_GALLERY.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-xl overflow-hidden border border-neutral-800 hover:border-[#d4af37]/60 bg-[#0d0d12] shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden bg-black/40">
                  <img
                    src={img.url}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/75 border border-neutral-700 text-neutral-300">
                    Practicum #{idx + 1}
                  </span>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-[#d4af37] text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>

                {/* Bottom title & description */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-cinzel text-xs font-bold text-white group-hover:text-[#f3e1a9] transition-colors">
                    {img.title}
                  </h4>
                  {img.description && (
                    <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                      {img.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Enrolment CTA for Caregiver Course */}
          <div className="bg-[#181822] border border-neutral-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-cinzel text-sm font-bold text-white">
                Interested in Joining the Fourways Geriatric Care Cohort?
              </h4>
              <p className="text-xs text-neutral-400">
                Classroom intake begins 7 September 2026. Practical training materials, clinical uniform orientation, and certification included.
              </p>
            </div>
            <button
              onClick={() => {
                const careCourse = COURSES.find(c => c.id === 'caregiver-elderly-care');
                if (careCourse) triggerEnrol(careCourse);
              }}
              className="py-2.5 px-5 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider font-cinzel shrink-0 shadow-lg active:scale-95"
            >
              Enrol for Caregiver Training
            </button>
          </div>
        </div>
      </section>

      {/* 6. FOURWAYS CAMPUS INTAKE TIMELINE & ADMISSION STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#101015] border border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs text-[#d4af37] uppercase tracking-widest font-cinzel font-semibold">
              Step-by-Step Enrolment
            </span>
            <h2 className="text-xl sm:text-3xl font-cinzel font-bold text-white">
              How to Secure Your Classroom Place
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Classes commence on Monday, 7 September 2026. Classroom space is strictly capped to guarantee personalized instruction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#15151c] p-5 rounded-2xl border border-neutral-800 space-y-2.5">
              <span className="text-2xl font-cinzel font-bold text-[#d4af37]">01</span>
              <h3 className="font-cinzel text-sm font-bold text-white">Select Your Programme</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Choose your desired physical training specialization above and click "Enrol Now".
              </p>
            </div>

            <div className="bg-[#15151c] p-5 rounded-2xl border border-neutral-800 space-y-2.5">
              <span className="text-2xl font-cinzel font-bold text-[#d4af37]">02</span>
              <h3 className="font-cinzel text-sm font-bold text-white">Pay Registration Fee</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Pay the R300 separate registration fee via EFT or Card to formally reserve your seat.
              </p>
            </div>

            <div className="bg-[#15151c] p-5 rounded-2xl border border-neutral-800 space-y-2.5">
              <span className="text-2xl font-cinzel font-bold text-[#d4af37]">03</span>
              <h3 className="font-cinzel text-sm font-bold text-white">Orientation & Timetable</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Receive your official Fourways campus directions, uniform/attire protocols, and weekly lecture timetable.
              </p>
            </div>

            <div className="bg-[#15151c] p-5 rounded-2xl border border-neutral-800 space-y-2.5">
              <span className="text-2xl font-cinzel font-bold text-[#d4af37]">04</span>
              <h3 className="font-cinzel text-sm font-bold text-white">Commence & Graduate</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Attend classes from 7 September 2026 and walk the stage at our formal November Graduation Ceremony.
              </p>
            </div>
          </div>

          {/* Direct Support Contacts */}
          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              <span>Campus Address: Fourways, Johannesburg, Gauteng, South Africa</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="mailto:training@flawlessinstitution.co.za" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#d4af37]" /> training@flawlessinstitution.co.za
              </a>
              <a href="tel:+27110000000" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" /> Contact Admissions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
