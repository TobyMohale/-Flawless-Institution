/**
 * Flawless Institution™ - TestimonialCarousel Component
 * Fetches and displays verified graduate success stories and social proof
 * Fourways, Johannesburg, South Africa
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Star, ShieldCheck, Quote, 
  ArrowRight, Award, Pause, Play, Sparkles, CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../lib/api';
import { STUDENT_TESTIMONIALS, StudentTestimonial } from '../data/testimonialsData';
import { COURSES, Course } from '../data/coursesData';

interface TestimonialCarouselProps {
  onSelectCourse?: (course: Course) => void;
  onNavigateToAcademy?: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'caregiving', label: 'Caregiving & Support' },
  { id: 'hospitality', label: 'Butler & Hospitality' },
  { id: 'housekeeping', label: 'Executive Housekeeping' },
  { id: 'childcare', label: 'Childcare & Au Pair' },
  { id: 'entrepreneurship', label: 'Enterprise & Advisory' }
];

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  onSelectCourse,
  onNavigateToAcademy
}) => {
  const [testimonials, setTestimonials] = useState<StudentTestimonial[]>(STUDENT_TESTIMONIALS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [direction, setDirection] = useState<number>(1);
  const [imgLoadErrors, setImgLoadErrors] = useState<Record<string, boolean>>({});

  // Touch swipe tracking for mobile
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Fetch testimonials from API with instant fallback
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    api.getTestimonials(selectedCategory)
      .then((res) => {
        if (isMounted) {
          if (res.success && Array.isArray(res.data) && res.data.length > 0) {
            setTestimonials(res.data);
          } else {
            // Filter local dataset as fallback
            const filtered = selectedCategory === 'all' 
              ? STUDENT_TESTIMONIALS 
              : STUDENT_TESTIMONIALS.filter(t => t.category === selectedCategory);
            setTestimonials(filtered);
          }
          setCurrentIndex(0);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          const filtered = selectedCategory === 'all' 
            ? STUDENT_TESTIMONIALS 
            : STUDENT_TESTIMONIALS.filter(t => t.category === selectedCategory);
          setTestimonials(filtered);
          setCurrentIndex(0);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  const total = testimonials.length;

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (total === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelectIndex = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying || total <= 1 || isLoading) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, total, isLoading, handleNext]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const activeTestimonial = testimonials[currentIndex] || testimonials[0];

  const handleExploreCourse = (courseId: string) => {
    const course = COURSES.find(c => c.id === courseId);
    if (course && onSelectCourse) {
      onSelectCourse(course);
    } else if (onNavigateToAcademy) {
      onNavigateToAcademy();
    }
  };

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <section 
      aria-label="Student Success Stories" 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10"
    >
      {/* Header and Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1a2c5a] pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
            <ShieldCheck className="w-3.5 h-3.5" /> Social Proof & Verified Outcomes
          </div>
          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white">
            Student Success Stories
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
            From classroom masterclasses in Fourways to prestigious placements across Sandton, Hyde Park, and Dainfern. Real career transformations verified by Flawless Academy.
          </p>
        </div>

        {/* Carousel Playback and Stepper Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => setIsAutoPlaying(prev => !prev)}
            aria-label={isAutoPlaying ? 'Pause automatic slideshow' : 'Play automatic slideshow'}
            title={isAutoPlaying ? 'Pause rotation' : 'Resume rotation'}
            className="p-2 rounded-lg bg-[#0d1734] border border-[#1a2c5a] text-neutral-400 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-colors"
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <div className="h-4 w-[1px] bg-[#1a2c5a]" aria-hidden="true" />

          <button
            onClick={handlePrev}
            disabled={total <= 1}
            aria-label="Previous testimonial"
            className="p-2 rounded-lg bg-[#0d1734] border border-[#1a2c5a] text-neutral-300 hover:text-white hover:border-[#d4af37]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono tabular-nums text-neutral-400 px-1">
            {total > 0 ? currentIndex + 1 : 0} <span className="text-neutral-600">/</span> {total}
          </span>

          <button
            onClick={handleNext}
            disabled={total <= 1}
            aria-label="Next testimonial"
            className="p-2 rounded-lg bg-[#0d1734] border border-[#1a2c5a] text-neutral-300 hover:text-white hover:border-[#d4af37]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Tabs (Segmented Button Controls) */}
      <div 
        role="tablist" 
        aria-label="Filter testimonials by discipline" 
        className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none"
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-[#d4af37] text-black border-[#d4af37] font-semibold shadow-md shadow-[#d4af37]/15'
                  : 'bg-[#0d1734]/80 text-neutral-300 border-[#1a2c5a] hover:border-[#d4af37]/40 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Showcase Carousel Card */}
      <div
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative bg-gradient-to-br from-[#0a1432] via-[#0d193d] to-[#081026] border border-[#1a2c5a] hover:border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl transition-colors duration-300 overflow-hidden"
      >
        {/* Ambient Decorative Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1a2c5a]/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {isLoading ? (
          /* Shimmer Loading State */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-pulse">
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start space-y-4">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#14234b]/80" />
              <div className="h-5 w-40 bg-[#14234b]/80 rounded" />
              <div className="h-4 w-56 bg-[#14234b]/60 rounded" />
            </div>
            <div className="lg:col-span-8 space-y-4">
              <div className="h-4 w-24 bg-[#14234b]/60 rounded" />
              <div className="h-20 w-full bg-[#14234b]/70 rounded" />
              <div className="h-10 w-48 bg-[#14234b]/80 rounded" />
            </div>
          </div>
        ) : activeTestimonial ? (
          <div className="relative z-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeTestimonial.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left Column: Student Avatar & Verified Identity Profile */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 border-b lg:border-b-0 lg:border-r border-[#1a2c5a] pb-6 lg:pb-0 lg:pr-8">
                  {/* Photo Container with Gold Halo */}
                  <div className="relative group">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 p-1 bg-[#0b173c] shadow-xl">
                      {activeTestimonial.photoUrl && !imgLoadErrors[activeTestimonial.id] ? (
                        <img
                          src={activeTestimonial.photoUrl}
                          alt={activeTestimonial.name}
                          referrerPolicy="no-referrer"
                          onError={() => {
                            setImgLoadErrors(prev => ({ ...prev, [activeTestimonial.id]: true }));
                          }}
                          className="w-full h-full object-cover object-center rounded-xl"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#142554] rounded-xl flex items-center justify-center text-[#d4af37] font-cinzel font-bold text-2xl">
                          {activeTestimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>

                    {/* Verified Certificate Stamp */}
                    <div 
                      title="Verified Credential Conferred by Flawless Academy Faculty"
                      className="absolute -bottom-2 -right-2 bg-[#d4af37] text-black p-1.5 rounded-lg shadow-lg flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                    >
                      <Award className="w-3.5 h-3.5 text-black" />
                    </div>
                  </div>

                  {/* Student Name & Title */}
                  <div className="space-y-1">
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                      {activeTestimonial.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#f3e1a9]">
                      {activeTestimonial.role}
                    </p>
                  </div>

                  {/* Unboxed Metadata (Zero-Pill Discipline) */}
                  <div className="text-xs text-neutral-400 space-y-1">
                    <div className="flex items-center justify-center lg:justify-start gap-1.5">
                      <span>{activeTestimonial.placement}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span>{activeTestimonial.location}</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[11px] text-neutral-500 font-mono">
                      <span>{activeTestimonial.cohort}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#d4af37]/80">{activeTestimonial.verifiedId}</span>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 pt-1" aria-label="5 out of 5 stars rating">
                    {[...Array(activeTestimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                    ))}
                  </div>
                </div>

                {/* Right Column: Authentic Quote, Quantified Outcome & Course Cross-link */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Quantified Outcome Callout */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-1.5 rounded-lg w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span>Verified Career Impact: {activeTestimonial.outcomeMetric}</span>
                  </div>

                  {/* Narrative Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-3 -left-3 w-8 h-8 text-[#d4af37]/20 pointer-events-none transform -scale-x-100" />
                    <blockquote className="text-sm sm:text-base lg:text-lg text-neutral-200 leading-relaxed font-sans italic pl-5 border-l-2 border-[#d4af37]/60">
                      "{activeTestimonial.quote}"
                    </blockquote>
                  </div>

                  {/* Program Reference & Course Action */}
                  <div className="pt-4 border-t border-[#1a2c5a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-cinzel">
                        Curriculum Completed
                      </span>
                      <div className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-[#d4af37]" />
                        <span>{activeTestimonial.courseTitle}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleExploreCourse(activeTestimonial.courseId)}
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] transition-all shadow-md active:scale-95 shrink-0"
                    >
                      <span>Explore This Programme</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-400 text-sm">
            No testimonials found for this discipline. Select another tab above.
          </div>
        )}

        {/* Carousel Pips / Indicators */}
        {total > 1 && (
          <div 
            className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-[#1a2c5a]/60"
            role="tablist"
            aria-label="Testimonial slides"
          >
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Go to testimonial by ${t.name}`}
                onClick={() => handleSelectIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-8 h-2 bg-[#d4af37]'
                    : 'w-2 h-2 bg-[#1a2c5a] hover:bg-neutral-500'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Aggregate Institutional Proof Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        <div className="bg-[#0a1432]/70 border border-[#1a2c5a] p-4 rounded-xl text-center space-y-1">
          <div className="text-xl sm:text-2xl font-bold font-cinzel text-[#f3e1a9] tabular-nums">
            98.4%
          </div>
          <div className="text-[11px] text-neutral-400">
            Graduate Placement & Retention
          </div>
        </div>

        <div className="bg-[#0a1432]/70 border border-[#1a2c5a] p-4 rounded-xl text-center space-y-1">
          <div className="text-xl sm:text-2xl font-bold font-cinzel text-[#f3e1a9] tabular-nums">
            3,200+
          </div>
          <div className="text-[11px] text-neutral-400">
            Certified Alumni Since 2016
          </div>
        </div>

        <div className="bg-[#0a1432]/70 border border-[#1a2c5a] p-4 rounded-xl text-center space-y-1">
          <div className="text-xl sm:text-2xl font-bold font-cinzel text-[#f3e1a9] tabular-nums">
            14 Days
          </div>
          <div className="text-[11px] text-neutral-400">
            Average In-Service Placement Time
          </div>
        </div>

        <div className="bg-[#0a1432]/70 border border-[#1a2c5a] p-4 rounded-xl text-center space-y-1">
          <div className="text-xl sm:text-2xl font-bold font-cinzel text-[#f3e1a9] tabular-nums">
            100%
          </div>
          <div className="text-[11px] text-neutral-400">
            Faculty Vetted & Criminal Cleared
          </div>
        </div>
      </div>
    </section>
  );
};
