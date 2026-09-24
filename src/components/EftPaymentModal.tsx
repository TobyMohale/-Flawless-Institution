/**
 * Flawless Institution™ - EFT Payment Options Modal
 * Provides direct access to FNB and Mukuru banking details and Proof of Payment instructions
 * Fourways, Johannesburg, South Africa
 */
import React from 'react';
import { X, Landmark } from 'lucide-react';
import { EftPaymentOptions } from './EftPaymentOptions';

interface EftPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  courseTitle?: string;
  referenceNumber?: string;
  amountZAR?: number;
}

export const EftPaymentModal: React.FC<EftPaymentModalProps> = ({
  isOpen,
  onClose,
  studentName,
  courseTitle,
  referenceNumber,
  amountZAR,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#0c1226] border border-[#d4af37]/50 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl text-neutral-200"
        id="eft-payment-modal"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#0e1630]/95 backdrop-blur-md border-b border-[#1a2c5a] p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37] text-black font-cinzel font-bold flex items-center justify-center text-xs">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-[#d4af37] uppercase tracking-wider font-semibold">
                Official Banking & Remittance
              </div>
              <h2 className="text-base sm:text-lg font-cinzel font-bold text-white leading-tight">
                EFT Payment Options
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#14234b] border border-[#1d3572] hover:bg-[#1c3066] text-neutral-300 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">
          <EftPaymentOptions
            studentName={studentName}
            courseTitle={courseTitle}
            referenceNumber={referenceNumber}
            amountZAR={amountZAR}
          />
        </div>
      </div>
    </div>
  );
};
