import React from 'react';
import { Phone, Mail, MapPin, Sparkles, GraduationCap, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { FOUNDER_CONTACT, GRADUATION_INFO, SEPTEMBER_PHYSICAL_INTAKE } from '../data/siteData';
import { INSTITUTION_LOGO } from '../data/assetsData';

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
    <footer className="bg-[#040816] border-t border-[#d4af37]/25 text-neutral-300 font-sans-body">
      {/* Pre-Footer Institutional Callout */}
      <div className="border-b border-[#1a2c5a]/60 bg-gradient-to-b from-[#070f28] to-[#040816] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-5 rounded-xl bg-[#0a1432]/70 border border-[#1a2c5a] hover:border-[#d4af37]/40 transition-colors">
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

          <div className="flex items-start gap-4 p-5 rounded-xl bg-[#0a1432]/70 border border-[#1a2c5a] hover:border-[#d4af37]/40 transition-colors">
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

          <div className="flex items-start gap-4 p-5 rounded-xl bg-[#0a1432]/70 border border-[#1a2c5a] hover:border-[#d4af37]/40 transition-colors">
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
              <div className="w-12 h-12 rounded-lg border border-[#d4af37]/45 p-0.5 flex items-center justify-center bg-[#0a122a] shrink-0 shadow-md">
                <img 
                  src={INSTITUTION_LOGO.url} 
                  alt={INSTITUTION_LOGO.alt} 
                  className="w-full h-full object-contain"
                />
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
              <li>
                <button onClick={() => navigateTo('blog')} className="hover:text-[#f3e1a9] transition-colors flex items-center gap-1.5">
                  <span>The Flawless Journal (Blog)</span>
                  <span className="text-[9px] bg-[#d4af37]/20 border border-[#d4af37]/40 px-1 py-0.2 rounded text-[#d4af37]">Articles</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="text-[#f3e1a9] hover:text-white transition-colors font-medium flex items-center gap-1.5">
                  <span>Frequently Asked Questions (FAQ)</span>
                  <span className="text-[9px] bg-[#d4af37]/20 border border-[#d4af37]/40 px-1 py-0.2 rounded text-[#d4af37]">27 Q&As</span>
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
                <strong className="text-neutral-300">Skills Training:</strong> Flawless Academy programmes are practical skills training courses designed for hands-on capability and professional standards.
              </p>
              <p>
                <strong className="text-neutral-300">Registration Fee:</strong> A separate R300 registration fee applies to course enrolments.
              </p>
              <p>
                <strong className="text-neutral-300">Strict No Refunds Policy:</strong> All Flawless Institution services, training and course bookings are non-refundable.
              </p>
              <p>
                <strong className="text-neutral-300">No Employment Guarantee:</strong> Course completion does not guarantee employment, job placement or specific earnings.
              </p>
            </div>
          </div>
        </div>

        {/* Dedicated Legal & Governance Links Bar (Recommended by User) */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-neutral-400">
          <button 
            onClick={() => navigateTo('terms-conditions')}
            id="footer-link-terms"
            className="hover:text-[#f3e1a9] transition-colors"
          >
            Terms & Conditions
          </button>
          <span className="text-neutral-600">|</span>
          <button 
            onClick={() => navigateTo('privacy-policy')}
            id="footer-link-privacy"
            className="hover:text-[#f3e1a9] transition-colors"
          >
            Privacy Policy
          </button>
          <span className="text-neutral-600">|</span>
          <button 
            onClick={() => navigateTo('refund-policy')}
            id="footer-link-refund"
            className="hover:text-[#f3e1a9] transition-colors"
          >
            Refund & Cancellation Policy
          </button>
          <span className="text-neutral-600">|</span>
          <button 
            onClick={() => navigateTo('disclaimer')}
            id="footer-link-disclaimer"
            className="hover:text-[#f3e1a9] transition-colors"
          >
            Disclaimer
          </button>
          <span className="text-neutral-600">|</span>
          <button 
            onClick={() => navigateTo('paia-manual')}
            id="footer-link-paia"
            className="hover:text-[#f3e1a9] transition-colors"
          >
            PAIA Manual
          </button>
          <span className="text-neutral-600">|</span>
          <button 
            onClick={() => navigateTo('contact')}
            id="footer-link-contact"
            className="hover:text-[#f3e1a9] transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Bottom copyright, motto & share */}
        <div className="mt-6 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Flawless Institution™. All rights reserved. Founded 2016. Fourways, South Africa.
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
