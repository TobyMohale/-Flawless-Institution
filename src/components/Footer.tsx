import React from 'react';
import { Phone, Mail, MapPin, Sparkles, GraduationCap, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { FOUNDER_CONTACT, GRADUATION_INFO, SEPTEMBER_PHYSICAL_INTAKE } from '../data/siteData';

interface FooterProps {
  setCurrentView: (view: string) => void;
  onOpenSpeakingEnquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, onOpenSpeakingEnquiry }) => {
  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070709] border-t border-[#d4af37]/25 text-neutral-400 font-sans-body">
      {/* Pre-Footer Institutional Callout */}
      <div className="border-b border-neutral-800/80 bg-gradient-to-b from-[#0c0c10] to-[#070709] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
            <div className="p-3 rounded-lg bg-[#d4af37]/10 text-[#d4af37] shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white font-cinzel tracking-wide mb-1">
                {SEPTEMBER_PHYSICAL_INTAKE.intakeName}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-2">
                Classes commence <span className="text-[#f3e1a9] font-medium">7 September 2026</span> in Fourways, South Africa. Limited physical seating available.
              </p>
              <button 
                onClick={() => navigateTo('academy')} 
                id="footer-intake-cta"
                className="text-xs text-[#d4af37] font-semibold hover:underline inline-flex items-center gap-1"
              >
                Enrol for Physical Training <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
            <div className="p-3 rounded-lg bg-[#d4af37]/10 text-[#d4af37] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white font-cinzel tracking-wide mb-1">
                Speaking & Masterclasses
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-2">
                Invite Founder <span className="text-white font-medium">Teldah Siyawamwaya</span> to deliver keynotes, masterclasses, and thought leadership.
              </p>
              <button 
                onClick={onOpenSpeakingEnquiry}
                id="footer-speaking-cta"
                className="text-xs text-[#d4af37] font-semibold hover:underline inline-flex items-center gap-1"
              >
                Submit Speaking Enquiry <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
            <div className="p-3 rounded-lg bg-[#d4af37]/10 text-[#d4af37] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white font-cinzel tracking-wide mb-1">
                {GRADUATION_INFO.month}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-2">
                All students who complete their programmes receive a Flawless Academy Certificate at the Fourways Annual Ceremony.
              </p>
              <button 
                onClick={() => navigateTo('events-graduation')}
                id="footer-graduation-cta"
                className="text-xs text-[#d4af37] font-semibold hover:underline inline-flex items-center gap-1"
              >
                View Graduation Details <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#8f7023] p-[1.5px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0a0a0d] rounded-[7px] flex items-center justify-center font-cinzel font-bold text-[#f3e1a9] text-base">
                  FI
                </div>
              </div>
              <div>
                <span className="font-cinzel text-lg font-bold tracking-wider text-white">FLAWLESS </span>
                <span className="font-cinzel text-xs font-semibold tracking-widest text-[#d4af37]">INSTITUTION</span>
                <div className="text-[10px] text-neutral-400">Established 2016 • Fourways, South Africa</div>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed max-w-md font-serif italic text-base">
              “I did not create Flawless. God created the opportunity, and I found myself walking in it. God is the CEO of Flawless; I am simply entrusted to steward the vision.”
            </p>
            <div className="text-xs text-[#d4af37] font-medium">
              — TELDAH SIYAWAMWAYA, Founder & Director
            </div>

            <div className="pt-2 space-y-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Based in Fourways, South Africa. Serving South Africa and beyond.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="tel:+27659449409" className="hover:text-white transition-colors">+27 65 944 9409</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="mailto:training@flawlessinstitution.co.za" className="hover:text-white transition-colors">
                  training@flawlessinstitution.co.za
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links: Academy & Courses */}
          <div>
            <div className="text-xs font-semibold text-white font-cinzel uppercase tracking-wider mb-4 pb-1 border-b border-[#d4af37]/30">
              Flawless Academy
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('academy')} className="hover:text-[#f3e1a9] transition-colors">
                  Care & Support Programmes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('academy')} className="hover:text-[#f3e1a9] transition-colors">
                  Hospitality & Butler Training
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('academy')} className="hover:text-[#f3e1a9] transition-colors">
                  Personal Assistant & Admin
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('academy')} className="hover:text-[#f3e1a9] transition-colors">
                  Home & Family Services
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('academy')} className="hover:text-[#f3e1a9] transition-colors">
                  Educare Fundamentals (ECD)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('academy')} className="text-[#d4af37] font-semibold hover:underline">
                  Online Course Specials
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Divisions */}
          <div>
            <div className="text-xs font-semibold text-white font-cinzel uppercase tracking-wider mb-4 pb-1 border-b border-[#d4af37]/30">
              Institutions & Pillars
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('about-founder')} className="hover:text-[#f3e1a9] transition-colors">
                  About Founder Teldah Siyawamwaya
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about-institution')} className="hover:text-[#f3e1a9] transition-colors">
                  Our Story, Faith & Values
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('household-advisory')} className="hover:text-[#f3e1a9] transition-colors">
                  Household Advisory
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('private-household-training')} className="hover:text-[#f3e1a9] transition-colors">
                  Private Household Training
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('private-households')} className="hover:text-[#f3e1a9] transition-colors">
                  Professional Household Staffing
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('household-professionals')} className="hover:text-[#f3e1a9] transition-colors">
                  Household Professionals
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('coaching-mentorship')} className="hover:text-[#f3e1a9] transition-colors">
                  Coaching & Mentorship
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('enterprise')} className="hover:text-[#f3e1a9] transition-colors">
                  Flawless Enterprise
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('speaking')} className="hover:text-[#f3e1a9] transition-colors font-medium text-neutral-200">
                  Speaking & Thought Leadership
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('knowledge-store')} className="hover:text-[#f3e1a9] transition-colors">
                  The Knowledge Store
                </button>
              </li>
            </ul>
          </div>

          {/* Disclosures & Regulatory Notes */}
          <div>
            <div className="text-xs font-semibold text-white font-cinzel uppercase tracking-wider mb-4 pb-1 border-b border-[#d4af37]/30">
              Important Disclosures
            </div>
            <div className="space-y-3 text-[11px] text-neutral-400 leading-relaxed">
              <p>
                <strong className="text-neutral-300">Skills Training:</strong> Flawless Academy programmes are skills training courses designed for practical knowledge and professional development.
              </p>
              <p>
                <strong className="text-neutral-300">Registration Fee:</strong> A separate R300 registration fee applies to course enrolments.
              </p>
              <p>
                <strong className="text-neutral-300">No Refunds Policy:</strong> All Flawless Institution services and course purchases are strictly non-refundable.
              </p>
              <p>
                <strong className="text-neutral-300">Employment Notice:</strong> Completion does not guarantee employment or immigration approval.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright, motto & share */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Flawless Institution. All rights reserved. Founded 2016.
          </div>
          <div className="text-neutral-400 font-cinzel text-xs tracking-wider text-center">
            Empowering People • Elevating Homes • Building Businesses
          </div>
          <div className="flex items-center gap-1 text-[11px] text-neutral-500">
            <span>Grounded in Faith, Built on Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
