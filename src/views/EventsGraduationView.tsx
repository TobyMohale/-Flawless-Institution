import React from 'react';
import { 
  GraduationCap, Calendar, MapPin, Award, CheckCircle2, 
  Sparkles, ArrowRight, Clock, Users, BookOpen 
} from 'lucide-react';
import { GRADUATION_INFO, SEPTEMBER_PHYSICAL_INTAKE } from '../data/siteData';
import { BACKGROUND_IMAGES } from '../data/assetsData';

interface EventsGraduationViewProps {
  setCurrentView: (view: string) => void;
  onExploreCourses: () => void;
}

export const EventsGraduationView: React.FC<EventsGraduationViewProps> = ({
  setCurrentView,
  onExploreCourses
}) => {
  return (
    <div className="space-y-20 pb-20 font-sans-body">
      {/* Hero */}
      <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-[#d4af37]/20 bg-[#09090c]">
        {/* Dignified Institutional Academy Setting */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={BACKGROUND_IMAGES.academy}
            alt="Annual Graduation & Ceremonies"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/80 to-[#0a0a0d]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0d] via-transparent to-[#0a0a0d]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#181822]/90 backdrop-blur-md border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest shadow-lg">
            <GraduationCap className="w-3.5 h-3.5 text-[#d4af37]" /> Institutional Ceremonies
          </div>

          <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight drop-shadow-md">
            EVENTS & ANNUAL GRADUATION
          </h1>

          <p className="text-sm sm:text-lg text-neutral-200 font-serif italic max-w-2xl mx-auto leading-relaxed">
            “Celebrating dedication, certified competence, and personal transformation.”
          </p>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Every year in November, Flawless Academy gathers students, employers, community leaders, and families in Fourways for our signature Graduation Ceremony.
          </p>
        </div>
      </section>

      {/* Graduation Highlight Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#17140e] via-[#241e12] to-[#17140e] border-2 border-[#d4af37] rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#d4af37] text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-cinzel">
                <Award className="w-3.5 h-3.5" /> Signature Institutional Event
              </div>

              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white">
                {GRADUATION_INFO.ceremony}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                {GRADUATION_INFO.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Physical Conferral of Official Flawless Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Keynote Address by Teldah Siyawamwaya</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Employer & Industry Guest Recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Alumni Network Induction</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0e0e13]/90 border border-[#d4af37]/30 rounded-2xl p-6 text-center space-y-3">
              <div className="text-xs text-[#f3e1a9] font-cinzel uppercase tracking-wider font-bold">
                Graduation Timeline
              </div>
              <div className="text-3xl font-bold text-white font-cinzel">NOVEMBER</div>
              <div className="text-xs text-emerald-400 font-semibold">Annual Fourways Ceremony</div>
              <p className="text-[11px] text-neutral-400">
                Open to all candidates who successfully complete online or physical coursework by October.
              </p>
              <button
                onClick={onExploreCourses}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider"
              >
                Enrol to Qualify for November
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
