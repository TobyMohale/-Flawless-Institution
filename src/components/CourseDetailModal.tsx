import React, { useState } from 'react';
import { Course } from '../data/coursesData';
import { 
  X, CheckCircle, Clock, BookOpen, GraduationCap, MapPin, 
  ShieldAlert, Sparkles, ArrowRight, Download, Share2, Award, Check
} from 'lucide-react';
import { GRADUATION_INFO, SEPTEMBER_PHYSICAL_INTAKE } from '../data/siteData';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onEnrol: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, onClose, onEnrol }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadedSyllabus, setDownloadedSyllabus] = useState(false);

  if (!course) return null;

  const totalFee = course.specialPrice + course.registrationFee;
  const savings = course.normalPrice - course.specialPrice;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadSyllabus = () => {
    setDownloadedSyllabus(true);
    setTimeout(() => setDownloadedSyllabus(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#0e0e12] border border-[#d4af37]/40 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl text-neutral-200 font-sans-body"
        id="course-detail-modal"
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 bg-[#121218]/95 backdrop-blur-md border-b border-neutral-800 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#f3e1a9] bg-[#d4af37]/15 border border-[#d4af37]/30 px-3 py-1 rounded-md">
              {course.category}
            </span>
            <span className="text-xs text-neutral-400 font-medium hidden sm:inline">
              Level: <strong className="text-neutral-200">{course.level}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#d4af37]/40 text-neutral-400 hover:text-white text-xs flex items-center gap-1 transition-all"
              title="Share Course"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              id="close-course-modal-btn"
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Flawless Academy Professional Programme
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-cinzel font-bold text-white tracking-wide leading-tight">
              {course.title}
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl">
              {course.overview}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#16161d] p-4 rounded-xl border border-neutral-800">
            <div>
              <span className="text-[10px] uppercase text-neutral-400 tracking-wider block">Duration</span>
              <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> {course.duration}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-400 tracking-wider block">Learning Format</span>
              <span className="text-xs sm:text-sm font-semibold text-[#f3e1a9] flex items-center gap-1 mt-0.5">
                <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" /> {course.format}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-400 tracking-wider block">Certificate Award</span>
              <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1 mt-0.5">
                <Award className="w-3.5 h-3.5 text-[#d4af37]" /> Flawless Academy
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-400 tracking-wider block">Graduation Ceremony</span>
              <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1 mt-0.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#d4af37]" /> Nov in Fourways
              </span>
            </div>
          </div>

          {/* Physical Intake Callout if applicable */}
          {course.physicalAvailableSeptember && (
            <div className="bg-gradient-to-r from-[#201a0e] via-[#292212] to-[#201a0e] border border-[#d4af37]/40 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#d4af37] text-black text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                    September Intake Open
                  </span>
                  <span className="text-xs font-semibold text-white font-cinzel">
                    Fourways In-Person Practical Training
                  </span>
                </div>
                <p className="text-xs text-neutral-300 mt-1">
                  Classes commence <strong>7 September 2026</strong> in Fourways, South Africa. Practical labs, hands-on master instructors, and in-person peer interaction.
                </p>
              </div>
              <button
                onClick={() => onEnrol(course)}
                id="modal-enrol-physical-btn"
                className="shrink-0 text-xs font-bold bg-[#d4af37] text-black px-4 py-2.5 rounded-lg hover:bg-[#f3e1a9] transition-all"
              >
                Select Physical Mode
              </button>
            </div>
          )}

          {/* Two-Column Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: What You Learn & Modules */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-cinzel font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
                  What Students Will Learn
                </h3>
                <div className="space-y-2.5">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-cinzel font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
                  Curriculum & Core Modules
                </h3>
                <div className="space-y-2 bg-[#121217] p-4 rounded-xl border border-neutral-800">
                  {course.modules.map((module, index) => (
                    <div key={index} className="flex items-center gap-3 text-xs text-neutral-300 py-1.5 border-b border-neutral-800/60 last:border-0">
                      <span className="text-[10px] font-bold text-[#d4af37] bg-[#d4af37]/10 w-5 h-5 rounded flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <span>{module}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Who It's For & Career Pathways & Pricing Breakdown */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-cinzel font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
                  Who This Programme Is For
                </h3>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {course.targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#d4af37] font-bold">•</span>
                      <span>{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-cinzel font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
                  Target Career Pathways
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {course.careerPathways.map((path, index) => (
                    <span key={index} className="text-xs bg-neutral-900 text-neutral-300 border border-neutral-800 px-2.5 py-1 rounded-md">
                      {path}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Investment Box */}
              <div className="bg-[#15151c] border border-[#d4af37]/30 rounded-xl p-5 space-y-4">
                <div className="text-xs uppercase font-cinzel font-bold text-neutral-300 tracking-wider">
                  Investment Summary
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Course Tuition (Special Promo):</span>
                    <div className="text-right">
                      <span className="text-neutral-500 line-through mr-2">R{course.normalPrice.toLocaleString()}</span>
                      <strong className="text-white">R{course.specialPrice.toLocaleString()}</strong>
                    </div>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Registration Fee (Separate):</span>
                    <strong className="text-white">R{course.registrationFee.toLocaleString()}</strong>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline">
                    <div>
                      <span className="text-sm font-bold text-white">Total Investment:</span>
                      <div className="text-[10px] text-emerald-400">You save R{savings.toLocaleString()} on tuition!</div>
                    </div>
                    <span className="text-2xl font-cinzel font-bold text-[#f3e1a9]">
                      R{totalFee.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onEnrol(course)}
                  id="modal-primary-enrol-btn"
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                  <span>ENROL NOW IN THIS COURSE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400 pt-1">
                  <button 
                    onClick={handleDownloadSyllabus}
                    className="hover:text-[#d4af37] underline inline-flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>{downloadedSyllabus ? 'Syllabus Downloaded ✓' : 'Download Prospectus'}</span>
                  </button>
                  <span>•</span>
                  <span>Instant Learning Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Institutional Disclosures & Certificate Policy */}
          <div className="bg-[#121217] border border-neutral-800 rounded-xl p-5 space-y-3 text-xs text-neutral-400">
            <div className="flex items-center gap-2 text-neutral-200 font-cinzel font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-[#d4af37]" /> Important Programme Guidelines & Policies
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] leading-relaxed">
              <div>
                <strong className="text-neutral-300 block mb-0.5">Skills Training Credential:</strong>
                Flawless Academy programmes provide practical vocational knowledge and professional standards. Formal prior academic qualifications are not required.
              </div>
              <div>
                <strong className="text-neutral-300 block mb-0.5">Annual Fourways Graduation:</strong>
                Successful candidates receive their Flawless Academy Certificate during our prestigious November ceremony in Fourways.
              </div>
              <div>
                <strong className="text-neutral-300 block mb-0.5">Strict No-Refund Policy:</strong>
                All Flawless Institution course purchases and registrations are non-refundable. Please confirm your selection before enrolment.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
