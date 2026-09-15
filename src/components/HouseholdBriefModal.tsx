import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, ArrowRight, Loader2, Building, Sparkles } from 'lucide-react';
import { api } from '../lib/api';

interface HouseholdBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const HouseholdBriefModal: React.FC<HouseholdBriefModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [successBrief, setSuccessBrief] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    employerName: '',
    contactEmail: '',
    contactPhone: '',
    residenceArea: 'Sandhurst, Johannesburg',
    roleRequested: 'Head Butler & Estate Manager',
    placementType: 'Live-In' as 'Live-In' | 'Live-Out' | 'Rotational',
    targetStartDate: 'Immediate / Next 30 Days',
    experienceYearsRequired: 3,
    privacyTier: 'High-Profile VIP' as 'Standard Confidential' | 'High-Profile VIP' | 'Diplomatic & Ultra-HNW',
    additionalNotes: '',
    agreedToTerms: true,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employerName || !formData.contactEmail || !formData.contactPhone) {
      setError('Please provide your name or family office entity, email, and phone number.');
      return;
    }

    setLoading(true);
    setError(null);

    const res = await api.submitHouseholdBrief(formData);
    setLoading(false);

    if (res.success && res.data) {
      setSuccessBrief(res.data);
      if (onSuccess) onSuccess();
    } else {
      setError(res.error || 'Failed to submit advisory brief.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#0e0e13] border border-[#d4af37]/40 rounded-2xl w-full max-w-xl max-h-[94vh] overflow-y-auto shadow-2xl text-neutral-200 font-sans-body"
        id="household-brief-modal"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#121218]/95 backdrop-blur-md border-b border-neutral-800 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37] text-black font-cinzel font-bold flex items-center justify-center text-xs">
              FI
            </div>
            <div>
              <div className="text-[10px] text-[#d4af37] uppercase tracking-wider font-semibold">
                POPIA Protected Estate Placement
              </div>
              <h2 className="text-base sm:text-lg font-cinzel font-bold text-white leading-tight">
                Confidential Staffing & Advisory Brief
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8">
          {successBrief ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest">
                  Brief Securely Registered
                </span>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Advisory Dossier Created
                </h3>
                <p className="text-xs text-neutral-300 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{formData.employerName}</strong>. Your placement brief has been encrypted under institutional POPIA protocols.
                </p>
              </div>

              <div className="bg-[#14141c] p-4 rounded-xl border border-neutral-800 text-xs text-left max-w-md mx-auto space-y-1.5">
                <div className="flex justify-between border-b border-neutral-800 pb-1">
                  <span className="text-neutral-400">Brief Reference:</span>
                  <strong className="text-[#f3e1a9] font-mono">{successBrief.briefId || successBrief.id}</strong>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-1">
                  <span className="text-neutral-400">Role Requested:</span>
                  <strong className="text-white">{formData.roleRequested}</strong>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-1">
                  <span className="text-neutral-400">Residence Area:</span>
                  <strong className="text-emerald-400">{formData.residenceArea}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Confidentiality Tier:</span>
                  <strong className="text-[#f3e1a9]">{formData.privacyTier}</strong>
                </div>
              </div>

              <p className="text-[11px] text-neutral-400 max-w-md mx-auto">
                Founder & Director Teldah Siyawamwaya and our senior placement advisors will review our accredited graduate registry and contact you discreetly within 24 business hours.
              </p>

              <button
                onClick={onClose}
                className="py-2.5 px-6 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 bg-red-950/50 border border-red-800 rounded-lg text-red-300">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Principal / Family Trust Name</label>
                  <input
                    type="text"
                    required
                    value={formData.employerName}
                    onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                    placeholder="e.g. Dr. Motsepe Family Office"
                    className="w-full px-3 py-2 rounded-lg bg-[#14141c] border border-neutral-800 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Residence Area / Estate</label>
                  <input
                    type="text"
                    required
                    value={formData.residenceArea}
                    onChange={(e) => setFormData({ ...formData, residenceArea: e.target.value })}
                    placeholder="e.g. Sandhurst / Steyn City"
                    className="w-full px-3 py-2 rounded-lg bg-[#14141c] border border-neutral-800 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Confidential Contact Email</label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="office@family-trust.co.za"
                    className="w-full px-3 py-2 rounded-lg bg-[#14141c] border border-neutral-800 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Contact Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="+27 82 000 0000"
                    className="w-full px-3 py-2 rounded-lg bg-[#14141c] border border-neutral-800 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Staffing Role Requested</label>
                  <select
                    value={formData.roleRequested}
                    onChange={(e) => setFormData({ ...formData, roleRequested: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#14141c] border border-neutral-800 text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Head Butler & Estate Manager">Head Butler & Estate Manager</option>
                    <option value="Executive Housekeeper">Executive Housekeeper</option>
                    <option value="Professional Nanny & Au Pair">Professional Nanny & Au Pair</option>
                    <option value="Private Chef & Table Stylist">Private Chef & Table Stylist</option>
                    <option value="Domestic Executive Specialist">Domestic Executive Specialist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Placement Type</label>
                  <select
                    value={formData.placementType}
                    onChange={(e) => setFormData({ ...formData, placementType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#14141c] border border-neutral-800 text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Live-In">Live-In (Private Quarters Provided)</option>
                    <option value="Live-Out">Live-Out (Daily Shift)</option>
                    <option value="Rotational">Rotational (Estate Roster)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-medium">Privacy & POPIA Classification</label>
                <select
                  value={formData.privacyTier}
                  onChange={(e) => setFormData({ ...formData, privacyTier: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-[#14141c] border border-neutral-800 text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Standard Confidential">Standard Confidential Estate</option>
                  <option value="High-Profile VIP">High-Profile VIP (Strict Identity Redaction)</option>
                  <option value="Diplomatic & Ultra-HNW">Diplomatic & Ultra-HNW (Non-Disclosure Agreement Mandated)</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-medium">Estate Notes & Key Expectations</label>
                <textarea
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Outline household protocols, wardrobe care standards, or specific dietary requirements..."
                  className="w-full px-3 py-2 rounded-lg bg-[#14141c] border border-neutral-800 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-400">
                <Lock className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Protected by POPIA (Act 4 of 2013). High-profile details are masked to non-executive staff.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 uppercase tracking-wider transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Encrypting & Registering Brief...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Submit Confidential Placement Brief</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
