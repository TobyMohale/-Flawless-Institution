import React, { useState } from 'react';
import { Course } from '../data/coursesData';
import { 
  X, BookOpen, CheckCircle, Award, Play, 
  GraduationCap, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight
} from 'lucide-react';
import { GRADUATION_INFO } from '../data/siteData';

interface StudentPortalModalProps {
  enrolledCourses: {
    course: Course;
    studentData: any;
  }[];
  onClose: () => void;
  onExploreMore: () => void;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  enrolledCourses,
  onClose,
  onExploreMore
}) => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'modules' | 'certificate' | 'graduation'>('modules');
  const [completedModules, setCompletedModules] = useState<{ [key: string]: boolean }>({
    '0-0': true,
    '0-1': true
  });

  const activeEnrolment = enrolledCourses[selectedCourseIndex] || null;

  const totalModules = activeEnrolment?.course.modules.length || 0;
  const completedCount = activeEnrolment
    ? activeEnrolment.course.modules.filter((_, mIdx) => !!completedModules[`${selectedCourseIndex}-${mIdx}`]).length
    : 0;
  const isFullyQualified = totalModules > 0 && completedCount === totalModules;
  const progressPercent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  const toggleModule = (courseIdx: number, moduleIdx: number) => {
    const key = `${courseIdx}-${moduleIdx}`;
    setCompletedModules(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#0e0e13] border border-[#d4af37]/40 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl text-neutral-200 font-sans-body"
        id="student-portal-modal"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#121218]/95 backdrop-blur-md border-b border-neutral-800 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#8f7023] p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0a0d] rounded-[9px] flex items-center justify-center font-cinzel font-bold text-[#f3e1a9] text-sm">
                FI
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#d4af37] font-semibold tracking-wider uppercase">Flawless Academy</div>
              <h2 className="text-base sm:text-lg font-cinzel font-bold text-white leading-tight">
                Student Learning & Graduation Portal
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-student-portal-btn"
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8">
          {enrolledCourses.length === 0 ? (
            /* Empty State */
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-cinzel text-xl font-bold text-white">No Enrolled Courses Found</h3>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
                  Enrol in any Flawless Academy online course or physical training programme to immediately access your study modules, video lectures, and certificate track.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onExploreMore();
                }}
                id="portal-empty-explore-btn"
                className="py-3 px-6 rounded-xl text-xs font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-lg shadow-[#d4af37]/20 uppercase tracking-wider"
              >
                Browse Available Programmes
              </button>
            </div>
          ) : (
            /* Active Student State */
            <div className="space-y-6">
              {/* Course Switcher Tabs if multiple courses */}
              {enrolledCourses.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 border-b border-neutral-800">
                  {enrolledCourses.map((enrol, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCourseIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                        selectedCourseIndex === idx
                          ? 'bg-[#d4af37] text-black font-bold'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                      }`}
                    >
                      {enrol.course.title}
                    </button>
                  ))}
                </div>
              )}

              {/* Student Overview Header */}
              {activeEnrolment && (
                <div className="bg-[#14141c] border border-[#d4af37]/30 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-[#d4af37]/20 text-[#f3e1a9] border border-[#d4af37]/40 px-2.5 py-0.5 rounded uppercase">
                        {activeEnrolment.studentData?.learningMode || 'Online'} Mode
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">
                        ID: {activeEnrolment.studentData?.studentId || 'FI-2026-ACTIVE'}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white mt-1">
                      {activeEnrolment.course.title}
                    </h3>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      Student: <strong className="text-white">{activeEnrolment.studentData?.fullName || 'Valued Candidate'}</strong> • Fourways Annual Graduation Track
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <span className="text-xs text-neutral-400 hidden sm:inline">Target: Nov Ceremony</span>
                    <button
                      onClick={() => setActiveTab('certificate')}
                      className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-neutral-900 border border-[#d4af37]/50 text-[#f3e1a9] hover:bg-[#d4af37]/15 flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Qualification Status</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="flex border-b border-neutral-800 text-xs font-medium gap-1 overflow-x-auto whitespace-nowrap no-scrollbar pb-0.5">
                <button
                  onClick={() => setActiveTab('modules')}
                  className={`py-2.5 px-4 rounded-t-lg transition-all flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'modules'
                      ? 'bg-[#181822] text-[#f3e1a9] border-t-2 border-x border-[#d4af37]/60'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Modules & Lessons ({activeEnrolment?.course.modules.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveTab('certificate')}
                  className={`py-2.5 px-4 rounded-t-lg transition-all flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'certificate'
                      ? 'bg-[#181822] text-[#f3e1a9] border-t-2 border-x border-[#d4af37]/60'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Qualification & Certificate</span>
                </button>

                <button
                  onClick={() => setActiveTab('graduation')}
                  className={`py-2.5 px-4 rounded-t-lg transition-all flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'graduation'
                      ? 'bg-[#181822] text-[#f3e1a9] border-t-2 border-x border-[#d4af37]/60'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>November Fourways Ceremony</span>
                </button>
              </div>

              {/* TAB 1: MODULES & CHECKLIST */}
              {activeTab === 'modules' && activeEnrolment && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Check off completed lessons to track your learning progress:</span>
                    <span className="text-[#f3e1a9] font-semibold">Self-Paced Learning</span>
                  </div>

                  <div className="space-y-3">
                    {activeEnrolment.course.modules.map((moduleName, mIdx) => {
                      const isCompleted = !!completedModules[`${selectedCourseIndex}-${mIdx}`];
                      return (
                        <div
                          key={mIdx}
                          className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                            isCompleted
                              ? 'bg-[#111612] border-emerald-900/60'
                              : 'bg-[#13131a] border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleModule(selectedCourseIndex, mIdx)}
                              className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all ${
                                isCompleted
                                  ? 'bg-emerald-500 text-black'
                                  : 'border border-neutral-600 hover:border-[#d4af37]'
                              }`}
                            >
                              {isCompleted && <CheckCircle className="w-4 h-4" />}
                            </button>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-white">{moduleName}</span>
                                {isCompleted && (
                                  <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.2 rounded">
                                    Completed
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-neutral-400 mt-1">
                                Video lecture, practical case studies, and reading handbook included.
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleModule(selectedCourseIndex, mIdx)}
                            className="text-xs text-[#d4af37] hover:underline flex items-center gap-1 shrink-0 mt-0.5"
                          >
                            <Play className="w-3 h-3" />
                            <span>{isCompleted ? 'Review Lesson' : 'Start Lesson'}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: QUALIFICATION & CERTIFICATION STATUS */}
              {activeTab === 'certificate' && activeEnrolment && (
                <div className="space-y-6">
                  {/* Institutional Certification Policy Alert */}
                  <div className="bg-[#14141d] border border-[#d4af37]/40 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-[#d4af37]/15 text-[#d4af37] shrink-0 mt-0.5">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-cinzel text-sm sm:text-base font-bold text-white flex items-center gap-2">
                          <span>Institutional Certification Standard</span>
                          <span className="text-[10px] font-sans font-normal px-2 py-0.5 bg-[#d4af37]/20 text-[#f3e1a9] rounded border border-[#d4af37]/40 uppercase tracking-wider">
                            Non-Downloadable
                          </span>
                        </h4>
                        <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
                          To safeguard professional integrity and accreditation, certificates cannot be downloaded online by users. You must complete your training modules and practical evaluations; your official certificate is formally conferred and presented upon qualifying.
                        </p>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto shrink-0">
                      {isFullyQualified ? (
                        <div className="px-3.5 py-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Qualified for Conferral</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveTab('modules')}
                          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#d4af37] text-black text-xs font-bold hover:bg-[#f3e1a9] flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <span>Continue Training</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Qualification Progress Card */}
                  <div className="bg-[#111117] border border-neutral-800 rounded-xl p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="text-neutral-400">Current Candidate Standing: </span>
                        <strong className={isFullyQualified ? 'text-emerald-400' : 'text-[#f3e1a9]'}>
                          {isFullyQualified
                            ? 'All Prescribed Modules Cleared • Approved for Graduation Award'
                            : `In Training (${completedCount} of ${totalModules} Lessons Completed)`}
                        </strong>
                      </div>
                      <span className="font-mono text-[#d4af37] font-semibold">{progressPercent}% Completed</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isFullyQualified
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                            : 'bg-gradient-to-r from-[#d4af37] to-[#f3e1a9]'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>

                    <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                      <span>
                        {isFullyQualified
                          ? 'Your completed status is confirmed in the academic registry. Your certificate will be presented at the Annual Flawless Graduation in Fourways.'
                          : 'Complete all remaining lessons in the Modules tab to meet qualification standards for certificate conferral.'}
                      </span>
                    </div>
                  </div>

                  {/* Digital Certificate Specimen Render */}
                  <div className="relative bg-[#fcfbf7] text-[#111] p-5 sm:p-8 md:p-12 rounded-2xl border-4 border-[#c5a059] shadow-2xl max-w-2xl mx-auto font-serif text-center space-y-4 overflow-hidden">
                    <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#d4af37]/40 pointer-events-none"></div>

                    {/* Watermark Ribbon */}
                    <div className="absolute -right-12 top-6 bg-[#8a6e27] text-[#fcfbf7] py-1 px-14 text-[9px] font-sans font-bold uppercase tracking-widest rotate-45 shadow-md pointer-events-none">
                      Specimen
                    </div>

                    {/* Certificate Crest */}
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#111] text-[#d4af37] border-2 border-[#d4af37] flex items-center justify-center font-cinzel font-bold text-lg">
                      FI
                    </div>

                    <div className="space-y-1">
                      <div className="font-cinzel text-xs uppercase tracking-widest text-[#8a6e27] font-bold">
                        Flawless Institution • Flawless Academy
                      </div>
                      <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-900 uppercase tracking-wider">
                        Certificate of Completion
                      </h2>
                      <div className="text-xs text-neutral-600 italic">Official Institutional Specimen</div>
                    </div>

                    <div className="py-2 border-b-2 border-[#c5a059] max-w-md mx-auto">
                      <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#8a6e27]">
                        {activeEnrolment.studentData?.fullName || 'Nomvula Dlamini'}
                      </div>
                    </div>

                    <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed max-w-lg mx-auto">
                      has successfully completed the prescribed curriculum and professional standards of
                      <div className="font-bold text-neutral-900 font-cinzel text-sm sm:text-base mt-1">
                        {activeEnrolment.course.title}
                      </div>
                    </div>

                    <div className="pt-6 grid grid-cols-2 gap-8 text-xs text-neutral-700 max-w-md mx-auto border-t border-neutral-300">
                      <div>
                        <div className="font-serif italic font-bold text-neutral-900 text-sm">Teldah Siyawamwaya</div>
                        <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Founder & Director</div>
                      </div>
                      <div>
                        <div className="font-mono text-xs font-semibold text-neutral-800">
                          {activeEnrolment.studentData?.studentId || 'FI-2026-CERT'}
                        </div>
                        <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Fourways, South Africa</div>
                      </div>
                    </div>
                  </div>

                  {/* Institutional Award Notice */}
                  <div className="text-center text-xs text-neutral-400 max-w-md mx-auto space-y-1">
                    <p className="font-medium text-neutral-300">
                      Conferred in Person • Fourways Annual Graduation
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      The official embossed certificate bearing institutional seals is presented to graduates who successfully complete their training.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: GRADUATION INFO */}
              {activeTab === 'graduation' && (
                <div className="space-y-6">
                  <div className="bg-[#15151e] border border-[#d4af37]/30 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-[#d4af37]" />
                      <h3 className="font-cinzel text-lg font-bold text-white">
                        {GRADUATION_INFO.ceremony}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {GRADUATION_INFO.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                      <div className="bg-[#0e0e13] p-3.5 rounded-xl border border-neutral-800">
                        <span className="text-[10px] text-neutral-400 block uppercase">When</span>
                        <strong className="text-[#f3e1a9] block mt-0.5">Annual Ceremony in November</strong>
                      </div>
                      <div className="bg-[#0e0e13] p-3.5 rounded-xl border border-neutral-800">
                        <span className="text-[10px] text-neutral-400 block uppercase">Location</span>
                        <strong className="text-white block mt-0.5">Fourways, Johannesburg</strong>
                      </div>
                      <div className="bg-[#0e0e13] p-3.5 rounded-xl border border-neutral-800">
                        <span className="text-[10px] text-neutral-400 block uppercase">Eligibility</span>
                        <strong className="text-emerald-400 block mt-0.5">All Completed Programmes</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
