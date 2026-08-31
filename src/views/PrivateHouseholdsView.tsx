import React, { useState } from 'react';
import { 
  Home, ShieldCheck, CheckCircle2, FileText, ArrowRight, 
  Sparkles, Users, Lock, Compass, Send, Check 
} from 'lucide-react';
import { BACKGROUND_IMAGES } from '../data/assetsData';

interface PrivateHouseholdsViewProps {
  onOpenSpeakingEnquiry: () => void;
}

export const PrivateHouseholdsView: React.FC<PrivateHouseholdsViewProps> = ({
  onOpenSpeakingEnquiry
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    estateOrArea: '',
    email: '',
    phone: '',
    serviceNeeded: 'Household Operating Procedures (SOPs)',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-20 pb-20 font-sans-body">
      {/* Hero */}
      <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-[#d4af37]/20 bg-[#09090c]">
        {/* Luxury Private Estate Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={BACKGROUND_IMAGES.estate}
            alt="Private Estate & Household Excellence"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/80 to-[#0a0a0d]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0d] via-transparent to-[#0a0a0d]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#181822]/90 backdrop-blur-md border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest shadow-lg">
            <Home className="w-3.5 h-3.5 text-[#d4af37]" /> Pillar II: Homes
          </div>

          <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight drop-shadow-md">
            PRIVATE HOUSEHOLDS & ESTATES
          </h1>

          <p className="text-sm sm:text-lg text-neutral-200 font-serif italic max-w-2xl mx-auto leading-relaxed">
            “Structure, discretion, and operational excellence for high-expectation residences.”
          </p>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            From establishing customized Household Standard Operating Procedures (SOPs) and conducting staff audits to private mediation and confidential staffing advisory.
          </p>
        </div>
      </section>

      {/* Advisory Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#f3e1a9] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-white">Household SOPs</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Customized operation manuals tailored to your residence, defining daily routines, hygiene protocols, grocery systems, and security standards.
            </p>
          </div>

          <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#f3e1a9] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-white">Household Audits</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Objective assessment of your existing domestic operations, staffing bottlenecks, efficiency gaps, and resource management.
            </p>
          </div>

          <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#f3e1a9] flex items-center justify-center font-bold">
              <Users className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-white">Staff Mediation</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Professional, neutral mediation for employer-employee communication, conflict resolution, and performance realignment.
            </p>
          </div>

          <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#f3e1a9] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-white">Confidential Advisory</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              High-discretion guidance for executive families, diplomats, and estate owners seeking structured household staffing solutions.
            </p>
          </div>
        </div>

        {/* Private Household Advisory Request Form */}
        <div className="bg-[#101016] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
              Confidential Consultation
            </span>
            <h2 className="text-2xl font-cinzel font-bold text-white">
              Enquire About Household Advisory & SOPs
            </h2>
            <p className="text-xs text-neutral-400">
              Strictly confidential advisory for private residences in Sandton, Fourways, Pretoria, Cape Town, and across SA.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Residential Estate / Area</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Steyn City, Dainfern, Waterfall, Bryanston"
                    value={formData.estateOrArea}
                    onChange={e => setFormData({ ...formData, estateOrArea: e.target.value })}
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Contact Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+27 (0) ... "
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">Service Required</label>
                <select
                  value={formData.serviceNeeded}
                  onChange={e => setFormData({ ...formData, serviceNeeded: e.target.value })}
                  className="w-full bg-[#16161f] border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option>Household Operating Procedures (SOPs)</option>
                  <option>Household Efficiency Audit</option>
                  <option>Staff Conflict Mediation & Performance Review</option>
                  <option>Executive Staff Upskilling & Private Masterclass</option>
                  <option>Bespoke Advisory</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">Requirements Overview</label>
                <textarea
                  rows={3}
                  placeholder="Share details on your household layout, staff numbers, and primary goals..."
                  value={formData.details}
                  onChange={e => setFormData({ ...formData, details: e.target.value })}
                  className="w-full bg-[#16161f] border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all"
              >
                Submit Household Advisory Enquiry
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white">Enquiry Transmitted</h3>
              <p className="text-xs text-neutral-300 max-w-md mx-auto">
                Thank you. A senior household consultant will contact you confidentially within 24 business hours.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
