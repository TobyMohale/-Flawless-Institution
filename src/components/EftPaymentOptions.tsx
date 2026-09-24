/**
 * Flawless Institution™ - EFT Payment Options Component
 * Renders verified FNB Bank Transfer and Mukuru options,
 * with copyable details and WhatsApp Proof of Payment instructions.
 * Fourways, Johannesburg, South Africa
 */
import React, { useState } from 'react';
import { 
  Building2, Smartphone, Copy, Check, MessageSquare, 
  AlertCircle, ShieldCheck, ExternalLink, ArrowRight 
} from 'lucide-react';
import { EFT_PAYMENT_CONFIG } from '../data/paymentData';

interface EftPaymentOptionsProps {
  studentName?: string;
  courseTitle?: string;
  referenceNumber?: string;
  amountZAR?: number;
  compact?: boolean;
  className?: string;
}

export const EftPaymentOptions: React.FC<EftPaymentOptionsProps> = ({
  studentName,
  courseTitle,
  referenceNumber,
  amountZAR,
  compact = false,
  className = '',
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => {
      setCopiedField((prev) => (prev === label ? null : prev));
    }, 2500);
  };

  const whatsappUrl = EFT_PAYMENT_CONFIG.proofOfPayment.getWhatsAppLink(
    studentName,
    courseTitle,
    referenceNumber
  );

  return (
    <div 
      className={`space-y-4 rounded-2xl bg-[#0b1022] border border-[#d4af37]/40 p-4 sm:p-6 text-neutral-200 shadow-xl ${className}`}
      aria-label="EFT Payment Options"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1a2c5a] pb-3">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d4af37] font-cinzel">
            <ShieldCheck className="w-3.5 h-3.5" /> Direct Payment Methods
          </div>
          <h3 className="text-base sm:text-lg font-cinzel font-bold text-white tracking-wide">
            EFT PAYMENT OPTIONS
          </h3>
        </div>

        {amountZAR && (
          <div className="text-left sm:text-right">
            <div className="text-[10px] uppercase text-neutral-400 font-medium">Total Amount Due</div>
            <div className="text-base sm:text-lg font-cinzel font-bold text-[#f3e1a9]">
              R {amountZAR.toLocaleString()} ZAR
            </div>
          </div>
        )}
      </div>

      {referenceNumber && (
        <div className="bg-[#121c3b] border border-[#233876] rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-xs">
            <span className="text-neutral-400">Payment Reference: </span>
            <strong className="text-[#f3e1a9] font-mono text-sm tracking-wider">{referenceNumber}</strong>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(referenceNumber, 'reference')}
            className="inline-flex items-center gap-1 text-xs text-[#d4af37] hover:text-white px-2 py-1 rounded bg-[#0b1022] border border-[#d4af37]/40 w-fit transition-colors"
          >
            {copiedField === 'reference' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedField === 'reference' ? 'Reference Copied' : 'Copy Reference'}</span>
          </button>
        </div>
      )}

      {/* Grid of 2 Payment Methods: FNB Bank Transfer & Mukuru */}
      <div className={`grid grid-cols-1 ${compact ? 'gap-3' : 'md:grid-cols-2 gap-4'}`}>
        {/* OPTION 1: FNB BANK TRANSFER */}
        <div className="rounded-xl bg-[#0f1730] border border-[#1d2f62] p-4 flex flex-col justify-between space-y-3 relative hover:border-[#d4af37]/50 transition-colors">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white font-cinzel border-b border-[#1a2c5a] pb-2">
              <div className="p-1.5 rounded-lg bg-[#d4af37]/20 text-[#d4af37]">
                <Building2 className="w-4 h-4" />
              </div>
              <span>{EFT_PAYMENT_CONFIG.fnb.title}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-0.5 border-b border-[#14234b]">
                <span className="text-neutral-400">Account Holder:</span>
                <span className="font-semibold text-white">{EFT_PAYMENT_CONFIG.fnb.accountHolder}</span>
              </div>

              <div className="flex justify-between items-center py-0.5 border-b border-[#14234b]">
                <span className="text-neutral-400">Account Number:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-[#f3e1a9] tracking-wider">
                    {EFT_PAYMENT_CONFIG.fnb.accountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(EFT_PAYMENT_CONFIG.fnb.accountNumber, 'fnb-acc')}
                    title="Copy Account Number"
                    className="p-1 rounded hover:bg-[#1a2c5a] text-neutral-400 hover:text-white transition-colors"
                  >
                    {copiedField === 'fnb-acc' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-0.5">
                <span className="text-neutral-400">Branch Code:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-white">{EFT_PAYMENT_CONFIG.fnb.branchCode}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(EFT_PAYMENT_CONFIG.fnb.branchCode, 'fnb-branch')}
                    title="Copy Branch Code"
                    className="p-1 rounded hover:bg-[#1a2c5a] text-neutral-400 hover:text-white transition-colors"
                  >
                    {copiedField === 'fnb-branch' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-neutral-400 flex items-center justify-between border-t border-[#14234b]">
            <span>Supported: All SA Banks & Instant EFT</span>
            {copiedField?.startsWith('fnb') && (
              <span className="text-emerald-400 font-semibold animate-pulse">Copied!</span>
            )}
          </div>
        </div>

        {/* OPTION 2: MUKURU */}
        <div className="rounded-xl bg-[#0f1730] border border-[#1d2f62] p-4 flex flex-col justify-between space-y-3 relative hover:border-[#d4af37]/50 transition-colors">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white font-cinzel border-b border-[#1a2c5a] pb-2">
              <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400">
                <Smartphone className="w-4 h-4" />
              </div>
              <span>{EFT_PAYMENT_CONFIG.mukuru.title}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-0.5 border-b border-[#14234b]">
                <span className="text-neutral-400">Account Holder:</span>
                <span className="font-semibold text-white">{EFT_PAYMENT_CONFIG.mukuru.accountHolder}</span>
              </div>

              <div className="flex justify-between items-center py-0.5 border-b border-[#14234b]">
                <span className="text-neutral-400">Account Number:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-[#f3e1a9] tracking-wider">
                    {EFT_PAYMENT_CONFIG.mukuru.accountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(EFT_PAYMENT_CONFIG.mukuru.accountNumber, 'mukuru-acc')}
                    title="Copy Mukuru Account Number"
                    className="p-1 rounded hover:bg-[#1a2c5a] text-neutral-400 hover:text-white transition-colors"
                  >
                    {copiedField === 'mukuru-acc' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-0.5">
                <span className="text-neutral-400">Linked Number:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-white">{EFT_PAYMENT_CONFIG.mukuru.linkedNumber}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(EFT_PAYMENT_CONFIG.mukuru.linkedNumber, 'mukuru-phone')}
                    title="Copy Linked Phone Number"
                    className="p-1 rounded hover:bg-[#1a2c5a] text-neutral-400 hover:text-white transition-colors"
                  >
                    {copiedField === 'mukuru-phone' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-neutral-400 flex items-center justify-between border-t border-[#14234b]">
            <span>Mukuru Card / App / Booth Deposit</span>
            {copiedField?.startsWith('mukuru') && (
              <span className="text-emerald-400 font-semibold animate-pulse">Copied!</span>
            )}
          </div>
        </div>
      </div>

      {/* PROOF OF PAYMENT SECTION */}
      <div className="rounded-xl bg-[#090e1f] border border-[#1e3266] p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] font-cinzel">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>{EFT_PAYMENT_CONFIG.proofOfPayment.title}</span>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          {EFT_PAYMENT_CONFIG.proofOfPayment.instructionText}
        </p>

        {/* WhatsApp Action Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center shrink-0">
              <span className="text-base" role="img" aria-label="WhatsApp">📲</span>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold">
                Training & Support WhatsApp
              </div>
              <div className="text-sm font-bold text-white font-mono">
                {EFT_PAYMENT_CONFIG.proofOfPayment.whatsappDisplay}
              </div>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0"
          >
            <span>Send Proof on WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-xs text-neutral-400 leading-relaxed italic">
          {EFT_PAYMENT_CONFIG.proofOfPayment.detailsRequired}
        </p>

        {/* Important Warning Banner */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
          <div className="leading-snug">
            <strong className="text-amber-200">Important: </strong>
            Your booking will be processed once payment and proof of payment have been received.
          </div>
        </div>
      </div>
    </div>
  );
};
