import React, { useState } from 'react';
import { 
  FileText, Shield, AlertCircle, ArrowLeft, Printer, 
  ExternalLink, Mail, Phone, MapPin, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { 
  LEGAL_SECTIONS_MAP, 
  TERMS_AND_CONDITIONS, 
  PRIVACY_POLICY, 
  REFUND_POLICY, 
  DISCLAIMER, 
  PAIA_MANUAL,
  LegalSection 
} from '../data/legalData';

interface LegalViewProps {
  currentPolicy: 'terms-conditions' | 'privacy-policy' | 'refund-policy' | 'disclaimer' | 'paia-manual';
  onSelectPolicy: (policy: 'terms-conditions' | 'privacy-policy' | 'refund-policy' | 'disclaimer' | 'paia-manual') => void;
  setCurrentView: (view: string) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ 
  currentPolicy, 
  onSelectPolicy, 
  setCurrentView 
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const policyData: LegalSection = LEGAL_SECTIONS_MAP[currentPolicy] || TERMS_AND_CONDITIONS;

  const policyTabs: { id: 'terms-conditions' | 'privacy-policy' | 'refund-policy' | 'disclaimer' | 'paia-manual'; label: string }[] = [
    { id: 'terms-conditions', label: 'Terms & Conditions' },
    { id: 'privacy-policy', label: 'Privacy Policy (POPIA)' },
    { id: 'refund-policy', label: 'Refund & Cancellation' },
    { id: 'disclaimer', label: 'Institutional Disclaimer' },
    { id: 'paia-manual', label: 'PAIA Manual' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-200 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Actions */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <button
          onClick={() => setCurrentView('home')}
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-[#d4af37] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Home</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-[#d4af37]/40 text-xs text-neutral-300 hover:text-white inline-flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Print Document</span>
          </button>
          <button
            onClick={() => setCurrentView('contact')}
            className="px-3 py-1.5 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/40 text-xs text-[#f3e1a9] hover:bg-[#d4af37]/25 inline-flex items-center gap-1.5 transition-all"
          >
            <span>Legal Inquiries</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Header Document Title */}
      <div className="max-w-5xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#f3e1a9] text-xs font-cinzel uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Flawless Institution™ Legal Governance</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide">
          {policyData.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-1 font-mono">
          <span>Effective Date: {policyData.lastUpdated}</span>
          <span>•</span>
          <span>Jurisdiction: Republic of South Africa</span>
          <span>•</span>
          <span>Fourways, South Africa</span>
        </div>

        <p className="text-sm text-neutral-300 font-serif leading-relaxed max-w-3xl pt-2">
          {policyData.summary}
        </p>
      </div>

      {/* Separate Policy Tabs Bar */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-800/80 no-scrollbar">
          {policyTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onSelectPolicy(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                currentPolicy === tab.id
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold shadow-lg shadow-[#d4af37]/20'
                  : 'bg-[#111116] text-neutral-400 hover:text-white hover:bg-neutral-800/70 border border-neutral-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
          <button
            onClick={() => setCurrentView('contact')}
            className="px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all text-neutral-400 hover:text-white hover:bg-neutral-800/70 border border-neutral-800"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Policy Content Body */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Quick Navigation Sidebar (for desktop) */}
        <div className="hidden lg:block lg:col-span-1 space-y-4">
          <div className="sticky top-28 bg-[#111116] p-4 rounded-xl border border-neutral-800 space-y-3">
            <div className="text-xs font-cinzel font-bold text-white uppercase tracking-wider pb-2 border-b border-neutral-800">
              Contents
            </div>
            <div className="space-y-1.5 max-h-[65vh] overflow-y-auto pr-1 text-[11px]">
              {policyData.content.map((sec, idx) => {
                const secKey = `sec-${idx}`;
                return (
                  <a
                    key={idx}
                    href={`#${secKey}`}
                    className="block py-1 text-neutral-400 hover:text-[#f3e1a9] transition-colors line-clamp-1"
                  >
                    {sec.sectionNumber ? `${sec.sectionNumber}. ` : ''}{sec.heading}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Document Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-[#0f0f14] p-6 sm:p-10 rounded-2xl border border-neutral-800/80 shadow-2xl space-y-10">
            {policyData.content.map((section, idx) => {
              const secKey = `sec-${idx}`;
              return (
                <div 
                  key={idx} 
                  id={secKey} 
                  className="space-y-4 pt-4 first:pt-0 border-t border-neutral-800/60 first:border-0 scroll-mt-28"
                >
                  <div className="flex items-center gap-3">
                    {section.sectionNumber !== undefined && (
                      <span className="w-7 h-7 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#f3e1a9] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {section.sectionNumber}
                      </span>
                    )}
                    <h2 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    {section.body.map((p, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>

                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="space-y-2 pt-1">
                      {section.bulletPoints.map((bp, bIdx) => (
                        <li 
                          key={bIdx} 
                          className="flex items-start gap-2.5 p-3 rounded-lg bg-[#14141d] border border-neutral-800/80 text-xs text-neutral-200"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {/* Institutional Contact Bar */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111117] border border-[#d4af37]/30 space-y-4">
            <div className="text-xs font-cinzel font-bold text-[#f3e1a9] uppercase tracking-wider">
              Legal, POPIA & Institutional Contact
            </div>
            <p className="text-xs text-neutral-300">
              For any formal correspondence, compliance queries, POPIA access requests, or contractual notices, please contact:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                <div className="font-semibold text-white font-cinzel">Employers & Private Clients</div>
                <div className="text-neutral-300">Teldah Siyawamwaya (Founder & Director)</div>
                <div className="text-[#d4af37]">+27 83 872 2001</div>
                <div className="text-neutral-400">info@flawlessinstitution.co.za</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                <div className="font-semibold text-white font-cinzel">Flawless Academy & Training</div>
                <div className="text-neutral-300">Precious (Academy Administration)</div>
                <div className="text-[#d4af37]">+27 65 944 9409</div>
                <div className="text-neutral-400">training@flawlessinstitution.co.za</div>
              </div>
            </div>
            <div className="text-[11px] text-neutral-500 pt-2">
              Flawless Institution™ • Fourways, Johannesburg, South Africa • Established 2016
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
