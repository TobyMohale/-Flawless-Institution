import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, Search, ChevronDown, ChevronUp, Sparkles, 
  GraduationCap, Phone, Mail, ArrowRight, ShieldCheck, 
  Briefcase, CheckCircle2, MessageSquare, Copy, Check 
} from 'lucide-react';
import { FAQ_LIST, FAQ_CATEGORIES, FAQItem } from '../data/faqData';

interface FAQViewProps {
  setCurrentView: (view: string) => void;
  onOpenSpeakingEnquiry?: () => void;
}

export const FAQView: React.FC<FAQViewProps> = ({ setCurrentView, onOpenSpeakingEnquiry }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredFAQs = useMemo(() => {
    return FAQ_LIST.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery = 
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        (item.bulletPoints && item.bulletPoints.some(b => b.toLowerCase().includes(query)));

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleCopyAnswer = (item: FAQItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `Q: ${item.question}\n\nA: ${item.answer}${
      item.bulletPoints ? '\n\n• ' + item.bulletPoints.join('\n• ') : ''
    }\n\n— Flawless Institution™ (Fourways, South Africa)`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#09090c] text-neutral-200 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="max-w-5xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#f3e1a9] text-xs font-cinzel uppercase tracking-widest">
          <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Frequently Asked Questions</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
          Clear Answers. Transparent Standards.
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300 font-serif leading-relaxed">
          Everything you need to know about Flawless Institution™, our professional household staffing, 
          accredited skills training at Flawless Academy, and enterprise advisory.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-xl mx-auto relative">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. staffing, Fourways, certificate, refund)..."
              className="w-full bg-[#13131a] border border-neutral-700/80 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] shadow-lg shadow-black/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white bg-neutral-800 px-2 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Quick Topic Pills */}
        <div className="pt-3 flex items-center justify-center flex-wrap gap-2 text-xs">
          {FAQ_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 rounded-full transition-all text-xs ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold shadow-md shadow-[#d4af37]/20'
                  : 'bg-[#14141c] text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main FAQ Accordion Container */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-16 bg-[#111117] border border-neutral-800 rounded-2xl p-8 space-y-3">
            <HelpCircle className="w-10 h-10 text-neutral-500 mx-auto" />
            <h3 className="font-cinzel text-lg font-bold text-white">No questions found</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              We couldn't find any questions matching "{searchQuery}". Try selecting "All" or reach out to our team directly.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-2 text-xs text-[#d4af37] font-semibold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFAQs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`transition-all duration-200 rounded-xl border ${
                  isExpanded
                    ? 'bg-[#121219] border-[#d4af37]/60 shadow-xl shadow-black/40'
                    : 'bg-[#0e0e13] border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 select-none cursor-pointer"
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-semibold text-[#d4af37] px-2 py-0.5 rounded bg-[#d4af37]/10 border border-[#d4af37]/30">
                        Q{faq.id}
                      </span>
                      <span className="text-[10px] uppercase font-cinzel text-neutral-400 tracking-wider">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wide mt-1">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="p-2 rounded-lg bg-neutral-800/60 text-neutral-300 shrink-0 mt-1">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#d4af37]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 border-t border-neutral-800/60 text-xs sm:text-sm text-neutral-300 space-y-4">
                    <div className="whitespace-pre-line leading-relaxed font-sans text-neutral-300">
                      {faq.answer}
                    </div>

                    {/* Bullet points if any */}
                    {faq.bulletPoints && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {faq.bulletPoints.map((point, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2 p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                            <span className="text-neutral-200">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Contact details if any */}
                    {faq.contactDetails && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {faq.contactDetails.map((contact, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-4 rounded-xl bg-neutral-900 border border-[#d4af37]/30 space-y-2"
                          >
                            <div className="text-xs font-cinzel font-bold text-[#f3e1a9]">
                              {contact.role}
                            </div>
                            {contact.name && (
                              <div className="text-sm font-semibold text-white">
                                {contact.name}
                              </div>
                            )}
                            <div className="space-y-1 text-xs">
                              {contact.phone && (
                                <a
                                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                                  className="flex items-center gap-2 text-neutral-300 hover:text-white"
                                >
                                  <Phone className="w-3 h-3 text-[#d4af37]" />
                                  <span>{contact.phone}</span>
                                </a>
                              )}
                              {contact.email && (
                                <a
                                  href={`mailto:${contact.email}`}
                                  className="flex items-center gap-2 text-neutral-300 hover:text-[#d4af37]"
                                >
                                  <Mail className="w-3 h-3 text-[#d4af37]" />
                                  <span>{contact.email}</span>
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer Actions inside accordion item */}
                    <div className="pt-3 flex items-center justify-between border-t border-neutral-800/40 text-[11px] text-neutral-500">
                      <button
                        onClick={(e) => handleCopyAnswer(faq, e)}
                        className="inline-flex items-center gap-1.5 hover:text-[#d4af37] transition-colors"
                      >
                        {copiedId === faq.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Answer copied to clipboard</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy answer</span>
                          </>
                        )}
                      </button>

                      <span className="text-[10px] text-neutral-600">
                        Flawless Institution™ Official FAQ
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Institutional Support CTA Box */}
      <div className="max-w-4xl mx-auto mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#121219] via-[#0d0d12] to-[#121219] border border-[#d4af37]/30 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-cinzel font-bold text-[#d4af37] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Still Have Questions?</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              Speak Directly with Our Advisory Team
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Whether you are an employer seeking household staffing, a candidate looking to enrol in Fourways or online, or an entrepreneur seeking guidance, we are here to assist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentView('contact')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-bold text-xs hover:brightness-110 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Us</span>
            </button>
            <button
              onClick={() => setCurrentView('academy')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white font-medium text-xs hover:border-[#d4af37]/50 flex items-center justify-center gap-2 transition-all"
            >
              <GraduationCap className="w-4 h-4 text-[#d4af37]" />
              <span>Explore Academy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
