import React, { useState } from 'react';
import { X, Shield, Lock, Mail, CheckCircle2, User, Key, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { api, authStorage, AuthUser } from '../lib/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (loginEmail?: string, loginPass?: string) => {
    const e = loginEmail || email;
    const p = loginPass || password;

    if (!e || !p) {
      setError('Please provide your institutional email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    const res = await api.login(e, p);
    setLoading(false);

    if (res.success && res.data) {
      authStorage.setSession(res.data);
      onLoginSuccess(res.data.user);
      onClose();
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const demoAccounts = [
    {
      role: 'super_admin' as const,
      title: 'Founder & Executive Director',
      name: 'Teldah Siyawamwaya',
      email: 'director@flawlessinstitution.co.za',
      password: 'Director@2026!',
      badgeColor: 'from-[#d4af37] to-[#c5a059] text-black',
      description: 'Full institutional authority: Capacity controls, graduation conferrals, VIP briefs, financial audit.',
    },
    {
      role: 'faculty' as const,
      title: 'Academic Faculty & Trainer',
      name: 'Faculty Advisor',
      email: 'faculty@flawlessinstitution.co.za',
      password: 'Faculty@2026!',
      badgeColor: 'bg-emerald-800 text-emerald-100',
      description: 'Academic syllabus management, candidate evaluations, masked VIP household matching.',
    },
    {
      role: 'employer' as const,
      title: 'Private Estate Office / Employer',
      name: 'Dr. Kagiso Motsepe Family Trust',
      email: 'employer@family-trust.co.za',
      password: 'Employer@2026!',
      badgeColor: 'bg-blue-800 text-blue-100',
      description: 'Submit confidential household staffing briefs, view matched graduates.',
    },
    {
      role: 'student' as const,
      title: 'Academy Candidate / Student',
      name: 'Nomvula Dlamini',
      email: 'student@alumni.flawlessinstitution.co.za',
      password: 'Student@2026!',
      badgeColor: 'bg-purple-800 text-purple-100',
      description: 'Access curriculum lessons, SARS VAT receipts, digital certificate specimen.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#0e0e13] border border-[#d4af37]/40 rounded-2xl w-full max-w-xl max-h-[94vh] overflow-y-auto shadow-2xl text-neutral-200 font-sans-body"
        id="auth-modal"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#121218]/95 backdrop-blur-md border-b border-neutral-800 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37] text-black font-cinzel font-bold flex items-center justify-center text-xs">
              FI
            </div>
            <div>
              <div className="text-[10px] text-[#d4af37] uppercase tracking-wider font-semibold">
                Flawless Institution IAM Portal
              </div>
              <h2 className="text-base sm:text-lg font-cinzel font-bold text-white leading-tight">
                Institutional Sign In & Role Switcher
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-auth-modal-btn"
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6">
          {error && (
            <div className="p-3.5 bg-red-950/50 border border-red-800/60 rounded-xl text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Quick Demo Switcher */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#f3e1a9] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                1-Click Institutional Role Switcher
              </span>
              <span className="text-[10px] text-neutral-400">Pre-configured Demo Access</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => handleLogin(acc.email, acc.password)}
                  disabled={loading}
                  className="w-full text-left p-3 rounded-xl bg-[#14141c] hover:bg-[#1a1a24] border border-neutral-800 hover:border-[#d4af37]/40 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${acc.badgeColor}`}>
                        {acc.title}
                      </span>
                      <span className="text-xs font-semibold text-white group-hover:text-[#f3e1a9] transition-colors">
                        {acc.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-tight">
                      {acc.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-neutral-800"></div>
            <span className="text-[10px] uppercase text-neutral-500 font-semibold tracking-wider">Or Sign In with Credentials</span>
            <div className="flex-1 border-t border-neutral-800"></div>
          </div>

          {/* Custom Credentials Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1 font-medium">Institutional Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@flawlessinstitution.co.za"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#14141c] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 font-medium">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#14141c] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating Session...</span>
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Sign In to Flawless Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1.5 pt-2">
            <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Encrypted Bearer JWT Session • Protection of Personal Information Act (POPIA) Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};
