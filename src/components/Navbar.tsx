import React, { useState } from 'react';
import { 
  Menu, X, Phone, Mail, Award, BookOpen, Mic, Home as HomeIcon, 
  Briefcase, Users, ChevronDown, Sparkles, GraduationCap, MapPin 
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenSpeakingEnquiry: (topic?: string) => void;
  onOpenStudentPortal: () => void;
  enrolledCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onOpenSpeakingEnquiry,
  onOpenStudentPortal,
  enrolledCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const navigateTo = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0a0c]/95 backdrop-blur-md border-b border-[#d4af37]/20 transition-all">
      {/* Top Banner for Intake & Quick Contact */}
      <div className="bg-gradient-to-r from-[#14120c] via-[#241e12] to-[#14120c] border-b border-[#d4af37]/15 py-1.5 px-4 text-xs font-sans-body">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-300">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#d4af37] text-black tracking-wider uppercase">
              Physical Intake Open
            </span>
            <span className="text-neutral-300 text-[11px] sm:text-xs">
              Fourways September 2026 Classes Commence <strong className="text-[#f3e1a9]">7 September 2026</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-neutral-400">
            <a 
              href="tel:+27659449409" 
              className="flex items-center gap-1 hover:text-[#d4af37] transition-colors"
              id="top-bar-phone"
            >
              <Phone className="w-3 h-3 text-[#d4af37]" />
              <span>+27 65 944 9409</span>
            </a>
            <span className="text-neutral-700 hidden sm:inline">|</span>
            <a 
              href="mailto:training@flawlessinstitution.co.za" 
              className="flex items-center gap-1 hover:text-[#d4af37] transition-colors hidden md:flex"
              id="top-bar-email"
            >
              <Mail className="w-3 h-3 text-[#d4af37]" />
              <span>training@flawlessinstitution.co.za</span>
            </a>
            <span className="text-neutral-700 hidden md:inline">|</span>
            <span className="hidden lg:flex items-center gap-1 text-neutral-400">
              <MapPin className="w-3 h-3 text-[#d4af37]" /> Fourways, South Africa
            </span>
          </div>
        </div>
      </div>

      {/* Main Brand Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <div 
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex items-center gap-3 group"
            id="brand-logo-button"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-[#8f7023] p-[1.5px] shadow-lg shadow-[#d4af37]/10 flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0d0d10] rounded-[7px] flex flex-col items-center justify-center">
                <span className="font-cinzel text-lg font-bold text-[#f3e1a9] leading-none">FI</span>
                <span className="text-[8px] text-[#c5a059] tracking-widest leading-none mt-0.5">2016</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-[#f3e1a9] transition-colors">
                  FLAWLESS
                </span>
                <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37]">
                  INSTITUTION
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 tracking-wider font-light hidden sm:block">
                People • Homes • Businesses
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 font-sans-body text-xs font-medium">
            <button
              onClick={() => navigateTo('home')}
              id="nav-link-home"
              className={`px-3 py-2 rounded-md transition-all ${
                currentView === 'home' 
                  ? 'text-[#f3e1a9] bg-[#d4af37]/10 border border-[#d4af37]/30' 
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
              }`}
            >
              Home
            </button>

            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                onMouseEnter={() => setAboutDropdownOpen(true)}
                id="nav-link-about-dropdown"
                className={`px-3 py-2 rounded-md flex items-center gap-1 transition-all ${
                  currentView.startsWith('about') 
                    ? 'text-[#f3e1a9] bg-[#d4af37]/10 border border-[#d4af37]/30' 
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
                }`}
              >
                <span>About</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {aboutDropdownOpen && (
                <div 
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-64 bg-[#111115] border border-[#d4af37]/30 rounded-lg shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <button
                    onClick={() => navigateTo('about-founder')}
                    id="dropdown-link-founder"
                    className="w-full text-left px-3 py-2.5 rounded-md hover:bg-[#d4af37]/15 transition-colors group"
                  >
                    <div className="font-semibold text-neutral-200 group-hover:text-[#f3e1a9] text-xs">
                      Founder — Teldah Siyawamwaya
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      Our Story, Faith, 16+ Years Experience
                    </div>
                  </button>
                  <div className="my-1 border-t border-neutral-800"></div>
                  <button
                    onClick={() => navigateTo('about-institution')}
                    id="dropdown-link-institution"
                    className="w-full text-left px-3 py-2.5 rounded-md hover:bg-[#d4af37]/15 transition-colors group"
                  >
                    <div className="font-semibold text-neutral-200 group-hover:text-[#f3e1a9] text-xs">
                      Our Foundation & Pillars
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      Faith, Excellence, Integrity & Vision
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('household-professionals')}
              id="nav-link-household-professionals"
              className={`px-3 py-2 rounded-md transition-all ${
                currentView === 'household-professionals' 
                  ? 'text-[#f3e1a9] bg-[#d4af37]/10 border border-[#d4af37]/30' 
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
              }`}
            >
              Household Professionals
            </button>

            <button
              onClick={() => navigateTo('private-households')}
              id="nav-link-private-households"
              className={`px-3 py-2 rounded-md transition-all ${
                currentView === 'private-households' 
                  ? 'text-[#f3e1a9] bg-[#d4af37]/10 border border-[#d4af37]/30' 
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
              }`}
            >
              Private Households
            </button>

            <button
              onClick={() => navigateTo('academy')}
              id="nav-link-academy"
              className={`px-3 py-2 rounded-md flex items-center gap-1.5 font-semibold transition-all ${
                currentView === 'academy' 
                  ? 'text-[#0a0a0c] bg-gradient-to-r from-[#d4af37] to-[#c5a059] shadow-sm' 
                  : 'text-[#f3e1a9] hover:bg-[#d4af37]/15 border border-[#d4af37]/40'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Flawless Academy</span>
              <span className="text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded-full uppercase">
                Specials
              </span>
            </button>

            <button
              onClick={() => navigateTo('enterprise')}
              id="nav-link-enterprise"
              className={`px-3 py-2 rounded-md transition-all ${
                currentView === 'enterprise' 
                  ? 'text-[#f3e1a9] bg-[#d4af37]/10 border border-[#d4af37]/30' 
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
              }`}
            >
              Flawless Enterprise
            </button>

            {/* Speaking is top-level as instructed */}
            <button
              onClick={() => navigateTo('speaking')}
              id="nav-link-speaking"
              className={`px-3.5 py-2 rounded-md flex items-center gap-1.5 transition-all ${
                currentView === 'speaking' 
                  ? 'text-[#f3e1a9] bg-[#d4af37]/20 border border-[#d4af37]/60 font-semibold' 
                  : 'text-neutral-200 hover:text-[#f3e1a9] hover:bg-neutral-800/60'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Speaking</span>
            </button>

            <button
              onClick={() => navigateTo('events-graduation')}
              id="nav-link-events"
              className={`px-3 py-2 rounded-md transition-all ${
                currentView === 'events-graduation' 
                  ? 'text-[#f3e1a9] bg-[#d4af37]/10 border border-[#d4af37]/30' 
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
              }`}
            >
              Graduation
            </button>

            <button
              onClick={() => navigateTo('contact')}
              id="nav-link-contact"
              className={`px-3 py-2 rounded-md transition-all ${
                currentView === 'contact' 
                  ? 'text-[#f3e1a9] bg-[#d4af37]/10 border border-[#d4af37]/30' 
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Group */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Student Portal Access */}
            <button
              onClick={onOpenStudentPortal}
              id="student-portal-access-button"
              className="px-3 py-2 rounded-md text-xs font-medium text-neutral-300 hover:text-[#f3e1a9] bg-neutral-900 border border-neutral-700 hover:border-[#d4af37]/40 flex items-center gap-1.5 transition-all"
              title="Access your enrolled courses and digital certificates"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Student Portal</span>
              {enrolledCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#d4af37] text-black text-[10px] font-bold flex items-center justify-center">
                  {enrolledCount}
                </span>
              )}
            </button>

            {/* Quick Invite Teldah Button */}
            <button
              onClick={() => onOpenSpeakingEnquiry()}
              id="header-invite-teldah-button"
              className="px-4 py-2 rounded-md text-xs font-semibold tracking-wide bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-md shadow-[#d4af37]/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Invite Teldah to Speak</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenStudentPortal}
              id="mobile-student-portal-icon-button"
              className="p-2 rounded-md bg-neutral-900 text-[#d4af37] border border-[#d4af37]/30 text-xs flex items-center gap-1"
            >
              <BookOpen className="w-4 h-4" />
              {enrolledCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#d4af37] text-black text-[10px] font-bold flex items-center justify-center">
                  {enrolledCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-button"
              className="p-2.5 rounded-md text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0d0d11] border-b border-[#d4af37]/30 px-4 pt-3 pb-6 space-y-2 font-sans-body max-h-[85vh] overflow-y-auto">
          <div className="p-3 bg-[#17171d] rounded-lg border border-[#d4af37]/20 mb-3 flex items-center justify-between">
            <div>
              <div className="text-xs text-neutral-400">Next Physical Intake:</div>
              <div className="text-xs font-semibold text-[#f3e1a9]">Fourways • 7 September 2026</div>
            </div>
            <button
              onClick={() => navigateTo('academy')}
              className="text-[11px] bg-[#d4af37] text-black px-2.5 py-1 rounded font-bold"
            >
              Enrol Now
            </button>
          </div>

          <button
            onClick={() => navigateTo('home')}
            id="mobile-nav-home"
            className="w-full text-left px-3 py-2.5 text-sm text-neutral-200 hover:bg-neutral-800/60 rounded-md font-medium"
          >
            Home
          </button>

          <div className="border-l-2 border-[#d4af37]/40 pl-3 space-y-1 my-1">
            <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold pt-1">
              About The Institution
            </div>
            <button
              onClick={() => navigateTo('about-founder')}
              id="mobile-nav-about-founder"
              className="w-full text-left px-2 py-1.5 text-sm text-[#f3e1a9] font-medium"
            >
              Founder — Teldah Siyawamwaya (Story & Faith)
            </button>
            <button
              onClick={() => navigateTo('about-institution')}
              id="mobile-nav-about-institution"
              className="w-full text-left px-2 py-1.5 text-xs text-neutral-300"
            >
              Institutional Pillars & Values
            </button>
          </div>

          <button
            onClick={() => navigateTo('household-professionals')}
            id="mobile-nav-household-professionals"
            className="w-full text-left px-3 py-2.5 text-sm text-neutral-200 hover:bg-neutral-800/60 rounded-md"
          >
            Household Professionals
          </button>

          <button
            onClick={() => navigateTo('private-households')}
            id="mobile-nav-private-households"
            className="w-full text-left px-3 py-2.5 text-sm text-neutral-200 hover:bg-neutral-800/60 rounded-md"
          >
            Private Households & Advisory
          </button>

          <button
            onClick={() => navigateTo('academy')}
            id="mobile-nav-academy"
            className="w-full text-left px-3 py-2.5 text-sm bg-gradient-to-r from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 text-[#f3e1a9] rounded-md font-semibold flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#d4af37]" />
              Flawless Academy (Course Store)
            </span>
            <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
              Special Prices
            </span>
          </button>

          <button
            onClick={() => navigateTo('enterprise')}
            id="mobile-nav-enterprise"
            className="w-full text-left px-3 py-2.5 text-sm text-neutral-200 hover:bg-neutral-800/60 rounded-md"
          >
            Flawless Enterprise & Coaching
          </button>

          <button
            onClick={() => navigateTo('speaking')}
            id="mobile-nav-speaking"
            className="w-full text-left px-3 py-2.5 text-sm text-[#f3e1a9] bg-neutral-900 border border-[#d4af37]/30 rounded-md font-semibold flex items-center gap-2"
          >
            <Mic className="w-4 h-4 text-[#d4af37]" />
            Speaking & Thought Leadership
          </button>

          <button
            onClick={() => navigateTo('events-graduation')}
            id="mobile-nav-graduation"
            className="w-full text-left px-3 py-2.5 text-sm text-neutral-200 hover:bg-neutral-800/60 rounded-md"
          >
            Annual November Graduation
          </button>

          <button
            onClick={() => navigateTo('resources')}
            id="mobile-nav-resources"
            className="w-full text-left px-3 py-2.5 text-sm text-neutral-200 hover:bg-neutral-800/60 rounded-md"
          >
            Resources & Publications
          </button>

          <button
            onClick={() => navigateTo('contact')}
            id="mobile-nav-contact"
            className="w-full text-left px-3 py-2.5 text-sm text-neutral-200 hover:bg-neutral-800/60 rounded-md"
          >
            Contact & Enquiries
          </button>

          <div className="pt-3 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSpeakingEnquiry();
              }}
              id="mobile-invite-teldah-button"
              className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b38728] text-black font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg"
            >
              Invite Teldah to Speak
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStudentPortal();
              }}
              id="mobile-open-portal-button"
              className="w-full py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs font-medium rounded-lg"
            >
              Open Student Portal ({enrolledCount} enrolled)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
