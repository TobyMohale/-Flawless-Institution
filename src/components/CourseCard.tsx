import React from 'react';
import { Course } from '../data/coursesData';
import { Clock, GraduationCap, CheckCircle2, ArrowRight, Sparkles, MapPin, Globe } from 'lucide-react';
import { Tilt3DCard } from './MotionEffects';
import { motion } from 'motion/react';

interface CourseCardProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
  onQuickEnrol: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onSelectCourse, onQuickEnrol }) => {
  const discountPercent = Math.round(((course.normalPrice - course.specialPrice) / course.normalPrice) * 100);

  return (
    <Tilt3DCard
      maxTilt={6}
      glareOpacity={0.12}
      className="h-full"
      id={`course-card-${course.id}`}
    >
      <div 
        className="group relative h-full bg-[#111115] border border-neutral-800 hover:border-[#d4af37]/60 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#d4af37]/15 transition-colors duration-300 flex flex-col justify-between"
      >
        {/* Top Banner Accent */}
        {course.featured && (
          <div className="bg-gradient-to-r from-[#d4af37] via-[#f3e1a9] to-[#c5a059] text-black text-[10px] font-bold uppercase tracking-wider py-1 px-3 text-center flex items-center justify-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3" /> Featured Flagship Programme
          </div>
        )}

        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Header row: category + format pill */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-medium text-[#f3e1a9] bg-[#d4af37]/10 border border-[#d4af37]/25 px-2.5 py-0.5 rounded-md">
                {course.category}
              </span>

              {course.physicalAvailableSeptember ? (
                <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" /> Fourways In-Person Opt.
                </span>
              ) : (
                <span className="text-[10px] font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Globe className="w-2.5 h-2.5" /> 100% Online
                </span>
              )}
            </div>

            {/* Title */}
            <h3 
              onClick={() => onSelectCourse(course)}
              className="text-lg font-cinzel font-bold text-white group-hover:text-[#f3e1a9] transition-colors cursor-pointer leading-snug mb-2"
            >
              {course.title}
            </h3>

            {/* Short Description */}
            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
              {course.description}
            </p>

            {/* Key Outcome Highlights */}
            <div className="space-y-1.5 mb-4">
              {course.learningOutcomes.slice(0, 2).map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[11px] text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{outcome}</span>
                </div>
              ))}
            </div>

            {/* Meta details (Duration & Level) */}
            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-3 border-t border-neutral-800/80 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Nov Graduation</span>
              </div>
            </div>
          </div>

          {/* Pricing Block & Action Buttons */}
          <div>
            <div className="bg-[#17171d] rounded-lg p-3 border border-neutral-800 mb-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Promotional Fee:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#f3e1a9] font-cinzel">
                      R{course.specialPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-500 line-through">
                      R{course.normalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded">
                    Save {discountPercent}%
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">
                    + R300 Reg. Fee
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectCourse(course)}
                id={`view-details-${course.id}`}
                className="py-2.5 px-3 rounded-lg text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-700 hover:border-[#d4af37]/40 transition-all text-center active:scale-95"
              >
                Course Overview
              </button>
              <button
                onClick={() => onQuickEnrol(course)}
                id={`enrol-now-${course.id}`}
                className="py-2.5 px-3 rounded-lg text-xs font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-md shadow-[#d4af37]/15 transition-all text-center flex items-center justify-center gap-1 active:scale-95"
              >
                <span>ENROL NOW</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Tilt3DCard>
  );
};
