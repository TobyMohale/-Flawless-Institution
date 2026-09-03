import React from 'react';
import { 
  BookOpen, Download, FileText, CheckCircle2, 
  Sparkles, ArrowRight, BookMarked, Briefcase, Building
} from 'lucide-react';
import { BACKGROUND_IMAGES } from '../data/assetsData';

export const KnowledgeStoreView: React.FC = () => {
  return (
    <div className="space-y-20 pb-20 font-sans-body">
      {/* 1. HERO HEADER */}
      <section className="relative pt-16 pb-20 border-b border-[#d4af37]/20 bg-[#09090c] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={BACKGROUND_IMAGES.hero}
            alt="The Flawless Knowledge Store"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center grayscale mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181822]/90 backdrop-blur-md border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest shadow-lg">
            <BookOpen className="w-4 h-4 text-[#d4af37]" /> The Flawless Knowledge Store
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-tight leading-tight">
            EXPERTISE YOU CAN ACCESS. <br />
            <span className="gold-gradient-text">KNOWLEDGE YOU CAN APPLY.</span>
          </h1>

          <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
            Carefully developed educational resources, professional guides, workbooks, templates, and practical tools designed to help you move from knowledge to action.
          </p>
          
          <div className="pt-6">
            <button className="py-3.5 px-8 rounded-xl text-xs sm:text-sm font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all shadow-lg shadow-[#d4af37]/20 active:scale-95">
              Explore The Store
            </button>
          </div>
        </div>
      </section>

      {/* 2. COLLECTION CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-cinzel font-bold text-white uppercase tracking-wide">
            Explore Our Collections
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Household Professionals */}
          <div className="bg-gradient-to-b from-[#14141b] to-[#0a0a0d] border border-[#d4af37]/20 rounded-3xl p-8 hover:border-[#d4af37]/40 transition-colors flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6">
              <Briefcase className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h3 className="text-xl font-cinzel font-bold text-white mb-2 uppercase">Household Professionals</h3>
            <p className="text-xs text-[#f3e1a9] font-bold mb-4 uppercase tracking-wider">Develop Your Edge.</p>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed flex-grow">
              Practical resources for individuals who want to strengthen their skills, professionalism, and career development.
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-300 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Professional Development Guides</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> CV & Interview Preparation</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Workplace Communication</li>
            </ul>
            <button className="w-full py-3 rounded-xl text-xs font-bold bg-[#1a1a24] text-[#f3e1a9] border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-black uppercase tracking-wider transition-all">
              Shop Professional Resources
            </button>
          </div>

          {/* Private Households */}
          <div className="bg-gradient-to-b from-[#14141b] to-[#0a0a0d] border border-[#d4af37]/20 rounded-3xl p-8 hover:border-[#d4af37]/40 transition-colors flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6">
              <Building className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h3 className="text-xl font-cinzel font-bold text-white mb-2 uppercase">Private Households</h3>
            <p className="text-xs text-[#f3e1a9] font-bold mb-4 uppercase tracking-wider">Elevate Operations.</p>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed flex-grow">
              Resources designed for employers who want greater structure, clarity and professionalism with household staff.
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-300 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Employer & Staffing Guides</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Role & Responsibility Templates</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Household Standards Checklists</li>
            </ul>
            <button className="w-full py-3 rounded-xl text-xs font-bold bg-[#1a1a24] text-[#f3e1a9] border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-black uppercase tracking-wider transition-all">
              Shop Household Resources
            </button>
          </div>

          {/* Entrepreneurs */}
          <div className="bg-gradient-to-b from-[#14141b] to-[#0a0a0d] border border-[#d4af37]/20 rounded-3xl p-8 hover:border-[#d4af37]/40 transition-colors flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h3 className="text-xl font-cinzel font-bold text-white mb-2 uppercase">Entrepreneurs</h3>
            <p className="text-xs text-[#f3e1a9] font-bold mb-4 uppercase tracking-wider">Build with Clarity.</p>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed flex-grow">
              Practical resources for entrepreneurs who are ready to start, strengthen, structure or grow a business.
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-300 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Business Start-Up Guides</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Client Acquisition & Pricing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Business Systems & Growth</li>
            </ul>
            <button className="w-full py-3 rounded-xl text-xs font-bold bg-[#1a1a24] text-[#f3e1a9] border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-black uppercase tracking-wider transition-all">
              Shop Business Resources
            </button>
          </div>
        </div>
      </section>

      {/* 3. DIGITAL RESOURCES FORMATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121219] border border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-wider">
              Digital Resources
            </h2>
            <p className="text-sm text-neutral-400">Practical tools for real-life challenges.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="bg-[#161622] p-4 rounded-xl border border-neutral-800">
              <FileText className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
              <h4 className="text-xs font-bold text-white uppercase">Guides</h4>
              <p className="text-[10px] text-neutral-400 mt-1">Focused educational info.</p>
            </div>
            <div className="bg-[#161622] p-4 rounded-xl border border-neutral-800">
              <BookMarked className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
              <h4 className="text-xs font-bold text-white uppercase">Workbooks</h4>
              <p className="text-[10px] text-neutral-400 mt-1">Learning & action.</p>
            </div>
            <div className="bg-[#161622] p-4 rounded-xl border border-neutral-800">
              <CheckCircle2 className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
              <h4 className="text-xs font-bold text-white uppercase">Checklists</h4>
              <p className="text-[10px] text-neutral-400 mt-1">Assessment & organisation.</p>
            </div>
            <div className="bg-[#161622] p-4 rounded-xl border border-neutral-800">
              <FileText className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
              <h4 className="text-xs font-bold text-white uppercase">Templates</h4>
              <p className="text-[10px] text-neutral-400 mt-1">Ready-to-use documents.</p>
            </div>
            <div className="bg-[#161622] p-4 rounded-xl border border-neutral-800">
              <BookOpen className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
              <h4 className="text-xs font-bold text-white uppercase">E-Books</h4>
              <p className="text-[10px] text-neutral-400 mt-1">Original publications.</p>
            </div>
            <div className="bg-[#161622] p-4 rounded-xl border border-neutral-800">
              <Briefcase className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
              <h4 className="text-xs font-bold text-white uppercase">Toolkits</h4>
              <p className="text-[10px] text-neutral-400 mt-1">Curated collections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESOURCE SPOTLIGHT (E-Commerce Concept) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-cinzel font-bold text-white uppercase tracking-wider">
            Featured Publications
          </h2>
          <button className="text-xs font-bold text-[#d4af37] hover:text-[#f3e1a9] uppercase tracking-wider flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Mock Product 1 */}
          <div className="bg-[#101016] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 transition-all group flex flex-col">
            <div className="aspect-[3/4] bg-neutral-900 relative">
              {/* Placeholder for Book Cover */}
              <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-cinzel text-center p-4 border-b border-neutral-800">
                <span className="text-xs uppercase tracking-widest">The Exceptional<br/>Household Professional</span>
              </div>
              <div className="absolute top-2 right-2 bg-[#d4af37] text-black text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                Digital E-Book
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h4 className="text-sm font-bold text-white font-cinzel mb-2">The Exceptional Household Professional</h4>
              <p className="text-xs text-neutral-400 line-clamp-2 mb-4 flex-grow">
                Professionalism, standards, conduct and career development within private households.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-bold text-[#f3e1a9]">R350</span>
                <button className="text-[10px] font-bold bg-[#1a1a24] text-white px-3 py-1.5 rounded hover:bg-[#d4af37] hover:text-black uppercase transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Mock Product 2 */}
          <div className="bg-[#101016] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 transition-all group flex flex-col">
            <div className="aspect-[3/4] bg-neutral-900 relative">
              <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-cinzel text-center p-4 border-b border-neutral-800">
                <span className="text-xs uppercase tracking-widest">The Private Household<br/>Employer's Guide</span>
              </div>
              <div className="absolute top-2 right-2 bg-neutral-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                Toolkit
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h4 className="text-sm font-bold text-white font-cinzel mb-2">The Private Household Employer's Guide</h4>
              <p className="text-xs text-neutral-400 line-clamp-2 mb-4 flex-grow">
                Practical guidance for hiring, managing and developing household professionals.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-bold text-[#f3e1a9]">R550</span>
                <button className="text-[10px] font-bold bg-[#1a1a24] text-white px-3 py-1.5 rounded hover:bg-[#d4af37] hover:text-black uppercase transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Mock Product 3 */}
          <div className="bg-[#101016] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 transition-all group flex flex-col">
            <div className="aspect-[3/4] bg-neutral-900 relative">
              <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-cinzel text-center p-4 border-b border-neutral-800">
                <span className="text-xs uppercase tracking-widest">From Idea<br/>To Enterprise</span>
              </div>
              <div className="absolute top-2 right-2 bg-[#d4af37] text-black text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                Digital E-Book
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h4 className="text-sm font-bold text-white font-cinzel mb-2">From Idea To Enterprise</h4>
              <p className="text-xs text-neutral-400 line-clamp-2 mb-4 flex-grow">
                Turning an idea into a structured and purposeful business.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-bold text-[#f3e1a9]">R250</span>
                <button className="text-[10px] font-bold bg-[#1a1a24] text-white px-3 py-1.5 rounded hover:bg-[#d4af37] hover:text-black uppercase transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Mock Product 4 */}
          <div className="bg-[#101016] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 transition-all group flex flex-col">
            <div className="aspect-[3/4] bg-neutral-900 relative">
              <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-cinzel text-center p-4 border-b border-neutral-800">
                <span className="text-xs uppercase tracking-widest">Building A Business<br/>That Sells</span>
              </div>
              <div className="absolute top-2 right-2 bg-neutral-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                Workbook
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h4 className="text-sm font-bold text-white font-cinzel mb-2">Building A Business That Actually Sells</h4>
              <p className="text-xs text-neutral-400 line-clamp-2 mb-4 flex-grow">
                Understanding offers, positioning, clients, pricing and commercial growth.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-bold text-[#f3e1a9]">R450</span>
                <button className="text-[10px] font-bold bg-[#1a1a24] text-white px-3 py-1.5 rounded hover:bg-[#d4af37] hover:text-black uppercase transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHOPPING & DIGITAL DELIVERY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#14120c] via-[#1a1710] to-[#14120c] border border-[#d4af37]/30 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <Download className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
          <h2 className="text-2xl font-cinzel font-bold text-[#f3e1a9] uppercase tracking-wider">
            Shopping & Digital Delivery
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Select your resource, complete your purchase securely and receive your digital product automatically according to the delivery method specified on the product page.
          </p>
          <div className="pt-4 flex flex-col items-center gap-3 text-xs text-neutral-400">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Secure Checkout</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Instant Digital Delivery</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Non-Refundable Purchases</span>
          </div>
        </div>
      </section>
    </div>
  );
};
