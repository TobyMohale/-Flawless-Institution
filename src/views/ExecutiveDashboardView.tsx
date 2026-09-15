import React, { useState, useEffect } from 'react';
import { 
  Award, BookOpen, Users, CheckCircle2, AlertCircle, Sparkles, 
  MapPin, Shield, Check, X, RefreshCw, ChevronRight, FileText, 
  Search, Filter, Landmark, CreditCard, Mic, UserCheck, Eye, EyeOff,
  Building, Calendar, Clock, DollarSign, Database, Send, ExternalLink,
  Lock, ArrowRight, Loader2, Play, BarChart3, TrendingUp, FileSpreadsheet,
  Smartphone
} from 'lucide-react';
import { api, AuthUser, authStorage } from '../lib/api';
import { TaxInvoiceModal } from '../components/TaxInvoiceModal';
import { FinancialIntelligenceDashboard } from '../components/FinancialIntelligenceDashboard';
import { LiveCommunicationsHub } from '../components/LiveCommunicationsHub';
import { OfflineLearningHub } from '../components/OfflineLearningHub';

interface ExecutiveDashboardViewProps {
  currentUser: AuthUser | null;
  onOpenAuthModal: () => void;
  onNavigate: (view: string) => void;
}

export const ExecutiveDashboardView: React.FC<ExecutiveDashboardViewProps> = ({
  currentUser,
  onOpenAuthModal,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'analytics' | 'cohorts' | 'registry' | 'staffing' | 'speaking' | 'finances' | 'communications' | 'offline' | 'cloud'
  >('overview');

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Data states
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [enrolments, setEnrolments] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [briefs, setBriefs] = useState<any[]>([]);
  const [speakingEnquiries, setSpeakingEnquiries] = useState<any[]>([]);
  const [integrations, setIntegrations] = useState<any>(null);

  // Action / Detail states
  const [selectedInvoiceRef, setSelectedInvoiceRef] = useState<string | null>(null);
  const [selectedBriefForMatching, setSelectedBriefForMatching] = useState<any | null>(null);
  const [matchedCandidates, setMatchedCandidates] = useState<any | null>(null);
  const [matchingLoading, setMatchingLoading] = useState(false);
  const [selectedEnrolmentForModules, setSelectedEnrolmentForModules] = useState<any | null>(null);
  const [statusActionLoading, setStatusActionLoading] = useState<string | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [eftVerifyRef, setEftVerifyRef] = useState<string | null>(null);
  const [eftVerifyNotes, setEftVerifyNotes] = useState('Standard Bank statement audit trace verified by Director Office.');

  const fetchDashboardData = async () => {
    setRefreshing(true);
    try {
      const [cohortsRes, enrolmentsRes, txRes, briefsRes, spkRes, integRes] = await Promise.all([
        api.getCohorts(),
        api.getEnrolments(),
        api.getAllTransactions(),
        api.getHouseholdBriefs(),
        api.getSpeakingEnquiries(),
        api.getIntegrations(),
      ]);

      if (cohortsRes.success && cohortsRes.data) setCohorts(cohortsRes.data);
      if (enrolmentsRes.success && enrolmentsRes.data) setEnrolments(enrolmentsRes.data);
      if (txRes.success && txRes.data) setTransactions(txRes.data);
      if (briefsRes.success && briefsRes.data) setBriefs(briefsRes.data);
      if (spkRes.success && spkRes.data) setSpeakingEnquiries(spkRes.data);
      if (integRes.success && (integRes.data?.integrations || (integRes as any).integrations)) {
        setIntegrations(integRes.data?.integrations || (integRes as any).integrations);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [currentUser]);

  const showToast = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  // 1. Toggle module completion in academic registry
  const handleToggleModule = async (enrolment: any, moduleName: string) => {
    const isCompleted = enrolment.completedModules.includes(moduleName);
    const updatedModules = isCompleted
      ? enrolment.completedModules.filter((m: string) => m !== moduleName)
      : [...enrolment.completedModules, moduleName];

    setStatusActionLoading(enrolment.id);
    const res = await api.updateModules(enrolment.id, updatedModules);
    setStatusActionLoading(null);

    if (res.success && res.data) {
      showToast(`Curriculum module updated for ${enrolment.studentName}`);
      setSelectedEnrolmentForModules(res.data);
      setEnrolments(prev => prev.map(e => e.id === enrolment.id ? res.data : e));
    }
  };

  // 2. Confer graduation award
  const handleConferGraduation = async (enrolmentId: string) => {
    setStatusActionLoading(enrolmentId);
    const res = await api.conferGraduation(enrolmentId);
    setStatusActionLoading(null);

    if (res.success && res.data) {
      showToast('Official graduation conferred! Automatic invitation dispatched via Resend.');
      setEnrolments(prev => prev.map(e => e.id === enrolmentId ? res.data.enrolment : e));
      if (selectedEnrolmentForModules?.id === enrolmentId) {
        setSelectedEnrolmentForModules(res.data.enrolment);
      }
    }
  };

  // 3. Run candidate matching for a household brief
  const handleRunCandidateMatch = async (brief: any) => {
    setSelectedBriefForMatching(brief);
    setMatchingLoading(true);
    const res = await api.getCandidateMatches(brief.id);
    setMatchingLoading(false);

    if (res.success && res.data) {
      setMatchedCandidates(res.data);
    }
  };

  // 4. Update household brief pipeline status
  const handleUpdateBriefStatus = async (briefId: string, status: string) => {
    setStatusActionLoading(briefId);
    const res = await api.updateBriefStatus(briefId, status, `Updated via Executive Portal by ${currentUser?.name || 'Administrator'}`);
    setStatusActionLoading(null);

    if (res.success && res.data) {
      showToast(`Brief ${briefId} status updated to ${status}`);
      setBriefs(prev => prev.map(b => b.id === briefId ? res.data.data : b));
    }
  };

  // 5. Update speaking booking status
  const handleUpdateSpeakingStatus = async (id: string, status: string) => {
    setStatusActionLoading(id);
    const res = await api.updateSpeakingStatus(id, status, `Reviewed and approved by Founder & Director Teldah Siyawamwaya.`);
    setStatusActionLoading(null);

    if (res.success && res.data) {
      showToast(`Speaking engagement updated to ${status}`);
      setSpeakingEnquiries(prev => prev.map(s => s.id === id ? res.data.data : s));
    }
  };

  // 6. Verify manual EFT bank payment
  const handleVerifyEftPayment = async (ref: string) => {
    setStatusActionLoading(ref);
    const res = await api.verifyEft(ref, eftVerifyNotes);
    setStatusActionLoading(null);
    setEftVerifyRef(null);

    if (res.success && res.data) {
      showToast(`Payment verified! Tax Invoice ${res.data.invoiceNumber} issued and receipt emailed.`);
      fetchDashboardData();
    }
  };

  // High-level statistics
  const totalStudents = enrolments.length;
  const totalClearedRevenue = transactions
    .filter(t => t.paymentStatus === 'cleared')
    .reduce((sum, t) => sum + (t.totalAmountZAR || 0), 0);
  const pendingEftCount = transactions.filter(t => t.paymentStatus === 'pending_verification').length;
  const conferredGraduatesCount = enrolments.filter(e => e.graduationConferred).length;

  return (
    <div className="min-h-screen bg-[#0a0a0e] text-neutral-200 font-sans-body pb-20">
      {/* Toast Notification */}
      {actionSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-500 text-emerald-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Top Executive Header */}
      <div className="bg-[#121218] border-b border-[#d4af37]/30 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-[#8f7023] p-[2px] flex items-center justify-center shadow-lg shadow-[#d4af37]/15">
              <div className="w-full h-full bg-[#0d0d12] rounded-[10px] flex items-center justify-center font-cinzel font-bold text-[#f3e1a9] text-base">
                FI
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Executive Command & Institutional Portal
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d4af37]/20 text-[#f3e1a9] border border-[#d4af37]/40">
                  Fourways HQ
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Flawless Institution (Pty) Ltd • Founder & Director Teldah Siyawamwaya • Est. 2016
              </p>
            </div>
          </div>

          {/* User Session Bar & Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#171720] border border-neutral-800 px-3 py-1.5 rounded-lg text-xs">
              <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
              <div className="text-left">
                <span className="text-[10px] text-neutral-400 block leading-none">Active Identity:</span>
                <span className="font-semibold text-white">
                  {currentUser?.name || 'Director Teldah Siyawamwaya'}
                </span>
                <span className="text-[10px] text-[#f3e1a9] ml-1.5 font-mono">
                  [{currentUser?.role ? currentUser.role.toUpperCase() : 'SUPER_ADMIN'}]
                </span>
              </div>
            </div>

            <button
              onClick={onOpenAuthModal}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-[#d4af37]/40 text-xs text-[#f3e1a9] font-medium transition-all"
              title="Switch between Director, Faculty, Employer, or Student identity"
            >
              Switch Role
            </button>

            <button
              onClick={fetchDashboardData}
              disabled={refreshing}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 transition-all"
              title="Refresh Institutional Data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#d4af37]' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="bg-[#0f0f15] border-b border-neutral-800 sticky top-20 z-30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 overflow-x-auto py-2.5 text-xs font-medium scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Command', icon: Sparkles },
            { id: 'analytics', label: 'Financial Intelligence & Analytics', icon: BarChart3, badge: 'Stage 7', badgeColor: 'bg-[#d4af37] text-black font-bold' },
            { id: 'cohorts', label: '15-Seat Physical Cohorts', icon: Building, badge: cohorts.length },
            { id: 'registry', label: 'Academic Registry & Graduation', icon: Award, badge: enrolments.length },
            { id: 'staffing', label: 'Household Advisory & Staffing', icon: Users, badge: briefs.length },
            { id: 'speaking', label: 'Director Keynote Bureau', icon: Mic, badge: speakingEnquiries.length },
            { id: 'finances', label: 'SARS VAT Invoicing & EFT', icon: Landmark, badge: pendingEftCount > 0 ? `${pendingEftCount} Pending` : undefined, badgeColor: 'bg-amber-600 text-white' },
            { id: 'communications', label: 'Live Comms & Alert Triggers', icon: Send, badge: 'Stage 8', badgeColor: 'bg-emerald-500 text-black font-bold' },
            { id: 'offline', label: 'PWA & Offline Learning', icon: Smartphone, badge: 'Stage 9', badgeColor: 'bg-amber-400 text-black font-bold' },
            { id: 'cloud', label: 'Cloud & Database Diagnostics', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#d4af37]/20 text-[#f3e1a9] border border-[#d4af37]/50 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#d4af37]' : 'text-neutral-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${tab.badgeColor || 'bg-neutral-800 text-neutral-300'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin mx-auto" />
            <p className="text-xs text-neutral-400 font-medium">Synchronizing institutional registry from server...</p>
          </div>
        ) : (
          <>
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#121219] p-5 rounded-2xl border border-[#d4af37]/30 space-y-2">
                    <div className="flex items-center justify-between text-neutral-400 text-xs">
                      <span>Total Enrolled Students</span>
                      <BookOpen className="w-4 h-4 text-[#d4af37]" />
                    </div>
                    <div className="text-2xl font-bold font-cinzel text-white">
                      {totalStudents}
                    </div>
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{conferredGraduatesCount} Conferred Graduates</span>
                    </div>
                  </div>

                  <div className="bg-[#121219] p-5 rounded-2xl border border-[#d4af37]/30 space-y-2">
                    <div className="flex items-center justify-between text-neutral-400 text-xs">
                      <span>Cleared Revenue (ZAR)</span>
                      <Landmark className="w-4 h-4 text-[#d4af37]" />
                    </div>
                    <div className="text-2xl font-bold font-mono text-[#f3e1a9]">
                      R {totalClearedRevenue.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Standard Bank & PayFast Settled
                    </div>
                  </div>

                  <div className="bg-[#121219] p-5 rounded-2xl border border-[#d4af37]/30 space-y-2">
                    <div className="flex items-center justify-between text-neutral-400 text-xs">
                      <span>Physical Intake Capacity</span>
                      <Building className="w-4 h-4 text-[#d4af37]" />
                    </div>
                    <div className="text-2xl font-bold font-cinzel text-white">
                      15 / 15 Max Lock
                    </div>
                    <div className="text-[11px] text-amber-400">
                      Fourways Campus September Class Active
                    </div>
                  </div>

                  <div className="bg-[#121219] p-5 rounded-2xl border border-[#d4af37]/30 space-y-2">
                    <div className="flex items-center justify-between text-neutral-400 text-xs">
                      <span>Advisory & Keynote Pipeline</span>
                      <Users className="w-4 h-4 text-[#d4af37]" />
                    </div>
                    <div className="text-2xl font-bold font-cinzel text-white">
                      {briefs.length} Briefs • {speakingEnquiries.length} Talks
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      POPIA Encrypted VIP Estates
                    </div>
                  </div>
                </div>

                {/* Priority Operational Action Banner */}
                {pendingEftCount > 0 && (
                  <div className="bg-amber-950/40 border border-amber-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">
                          {pendingEftCount} Manual Standard Bank EFT Transfer(s) Awaiting Audit Clearance
                        </h3>
                        <p className="text-xs text-neutral-300">
                          Candidates have registered orders. Verify the bank transaction trace to issue official SARS VAT Tax Invoices.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('finances')}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs shrink-0 transition-all"
                    >
                      Review EFT Queue →
                    </button>
                  </div>
                )}

                {/* Stage 7 Financial Intelligence & Analytics Quick Banner */}
                <div className="bg-gradient-to-r from-[#171724] via-[#151520] to-[#1a1829] border border-[#d4af37]/40 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3e1a9] flex items-center justify-center shrink-0">
                      <BarChart3 className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4af37] text-black font-bold uppercase tracking-wider">
                          Stage 7 Reporting Engine Active
                        </span>
                        <span className="text-xs text-neutral-400">
                          Recharts • SARS VAT eFiling • Placement Tracking
                        </span>
                      </div>
                      <h3 className="font-cinzel text-base font-bold text-white mt-0.5">
                        Executive Revenue Intelligence & SARS Tax Reconciliation
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Interactive revenue trajectory, Fourways cohort fill rates, SARS VAT 15% reconciliation tables, and 94.2% graduate placement analytics.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c5a059] text-black font-semibold text-xs flex items-center gap-1.5 shrink-0 shadow-lg shadow-[#d4af37]/20 transition-all cursor-pointer"
                  >
                    <span>Launch Analytics Suite</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Split Quick Previews: Cohort Capacity & Latest Briefs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Cohort Status Box */}
                  <div className="bg-[#121219] border border-neutral-800 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#d4af37]" />
                        Fourways Physical Intakes (15-Seat Lock)
                      </h3>
                      <button
                        onClick={() => setActiveTab('cohorts')}
                        className="text-xs text-[#f3e1a9] hover:underline"
                      >
                        Manage All →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {cohorts.map((c) => {
                        const occupied = c.maxCapacity - c.seatsRemaining;
                        const pct = Math.round((occupied / c.maxCapacity) * 100);
                        return (
                          <div key={c.id} className="bg-[#0b0b10] p-4 rounded-xl border border-neutral-800/80 space-y-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-semibold text-white">{c.name}</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                c.seatsRemaining <= 3 ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              }`}>
                                {c.seatsRemaining} Seats Remaining
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#d4af37] to-[#c5a059]"
                                style={{ width: `${pct}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-[11px] text-neutral-400">
                              <span>Commences: {new Date(c.startDate).toLocaleDateString('en-ZA')}</span>
                              <span>{occupied} of {c.maxCapacity} Seats Allocated</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Advisory Placement Intake Box */}
                  <div className="bg-[#121219] border border-neutral-800 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#d4af37]" />
                        Confidential Household Staffing Briefs
                      </h3>
                      <button
                        onClick={() => setActiveTab('staffing')}
                        className="text-xs text-[#f3e1a9] hover:underline"
                      >
                        Match Candidates →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {briefs.slice(0, 3).map((b) => (
                        <div key={b.id} className="bg-[#0b0b10] p-3.5 rounded-xl border border-neutral-800/80 flex items-center justify-between text-xs">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white">{b.roleRequested}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                                {b.privacyTier}
                              </span>
                            </div>
                            <div className="text-[11px] text-neutral-400 flex items-center gap-2">
                              <span>{b.residenceArea}</span>
                              <span>•</span>
                              <span>{b.placementType}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                              {b.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FINANCIAL INTELLIGENCE & ANALYTICS (STAGE 7) */}
            {activeTab === 'analytics' && (
              <FinancialIntelligenceDashboard
                transactions={transactions}
                cohorts={cohorts}
                enrolments={enrolments}
                briefs={briefs}
                onOpenInvoice={(ref) => setSelectedInvoiceRef(ref)}
                onRefresh={fetchDashboardData}
              />
            )}

            {/* TAB 2: COHORT CAPACITY ENGINE */}
            {activeTab === 'cohorts' && (
              <div className="space-y-6">
                <div className="bg-[#121219] border border-[#d4af37]/30 rounded-2xl p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="font-cinzel text-xl font-bold text-white">
                        Physical Intake Capacity Control Engine
                      </h2>
                      <p className="text-xs text-neutral-400">
                        Strict 15-Seat Cap on Fourways In-Person Practical Classes. System prevents oversubscription.
                      </p>
                    </div>
                    <div className="text-xs bg-neutral-900 border border-[#d4af37]/40 px-3 py-1.5 rounded-lg text-[#f3e1a9]">
                      Headquarters: Fourways, Johannesburg
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {cohorts.map((cohort) => {
                      const occupied = cohort.maxCapacity - cohort.seatsRemaining;
                      const pct = Math.round((occupied / cohort.maxCapacity) * 100);
                      return (
                        <div key={cohort.id} className="bg-[#0e0e14] border border-neutral-800 rounded-xl p-5 space-y-4">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                                Physical Campus
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                cohort.seatsRemaining <= 3 ? 'bg-red-950 text-red-300' : 'bg-emerald-950 text-emerald-300'
                              }`}>
                                {cohort.seatsRemaining > 0 ? 'Intake Open' : 'Class Locked'}
                              </span>
                            </div>
                            <h3 className="font-cinzel text-base font-bold text-white">
                              {cohort.name}
                            </h3>
                            <div className="text-xs text-neutral-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#d4af37]" />
                              <span>{cohort.location}</span>
                            </div>
                          </div>

                          {/* Capacity Gauge */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-medium">
                              <span className="text-neutral-400">Seats Occupied:</span>
                              <span className="text-white font-mono">{occupied} / {cohort.maxCapacity}</span>
                            </div>
                            <div className="w-full h-3 rounded-full bg-neutral-800 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#8f7023] transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              ></div>
                            </div>
                            <div className="text-[11px] text-right text-[#f3e1a9] font-mono">
                              {cohort.seatsRemaining} seats remaining
                            </div>
                          </div>

                          <div className="pt-2 border-t border-neutral-800 text-xs space-y-1 text-neutral-300">
                            <div><strong>Start Date:</strong> {new Date(cohort.startDate).toLocaleDateString('en-ZA')}</div>
                            <div><strong>Graduation:</strong> {cohort.graduationTarget}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ACADEMIC REGISTRY & GRADUATION CONFERRAL */}
            {activeTab === 'registry' && (
              <div className="space-y-6">
                <div className="bg-[#121219] border border-[#d4af37]/30 rounded-2xl p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-cinzel text-xl font-bold text-white">
                        Academic Registry & Graduation Conferral Pipeline
                      </h2>
                      <p className="text-xs text-neutral-400">
                        Mark syllabus practical modules complete and confer official graduation status with automatic email invites.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400">Total Enrolled:</span>
                      <span className="text-xs font-bold text-[#f3e1a9] bg-[#0e0e13] px-3 py-1 rounded-lg border border-neutral-800">
                        {enrolments.length} Students
                      </span>
                    </div>
                  </div>

                  {/* Student Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-neutral-800 text-neutral-400 text-[10px] uppercase tracking-wider">
                          <th className="py-3 px-3 font-semibold">Student Name & Ref</th>
                          <th className="py-3 px-3 font-semibold">Accredited Course</th>
                          <th className="py-3 px-3 font-semibold">Mode</th>
                          <th className="py-3 px-3 font-semibold">Progress</th>
                          <th className="py-3 px-3 font-semibold">Graduation Standing</th>
                          <th className="py-3 px-3 text-right font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60">
                        {enrolments.map((enr) => (
                          <tr key={enr.id} className="hover:bg-neutral-800/20 transition-colors">
                            <td className="py-3 px-3">
                              <div className="font-semibold text-white">{enr.studentName}</div>
                              <div className="text-[11px] text-neutral-400">{enr.studentEmail}</div>
                              <div className="text-[10px] font-mono text-[#d4af37]">{enr.id}</div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-medium text-neutral-200">{enr.courseTitle}</div>
                              <div className="text-[10px] text-neutral-500">{enr.cohortName}</div>
                            </td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                enr.mode === 'Physical' ? 'bg-[#d4af37]/20 text-[#f3e1a9]' : 'bg-neutral-800 text-neutral-300'
                              }`}>
                                {enr.mode}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px]">
                                  <span>{enr.completedModules.length} Modules</span>
                                  <span className="font-mono">{enr.progressPercentage}%</span>
                                </div>
                                <div className="w-24 h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                                  <div
                                    className={`h-full ${enr.progressPercentage === 100 ? 'bg-emerald-400' : 'bg-[#d4af37]'}`}
                                    style={{ width: `${enr.progressPercentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              {enr.graduationConferred ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Conferred Graduate</span>
                                </span>
                              ) : (
                                <span className="text-[11px] text-neutral-400">
                                  In Training ({enr.status})
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                onClick={() => setSelectedEnrolmentForModules(enr)}
                                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-[#d4af37]/20 hover:text-[#f3e1a9] text-neutral-300 font-medium text-[11px] transition-all"
                              >
                                Manage Syllabus →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Student Syllabus & Conferral Drawer/Modal */}
                {selectedEnrolmentForModules && (
                  <div className="bg-[#14141d] border-2 border-[#d4af37]/50 rounded-2xl p-6 space-y-6 animate-in fade-in">
                    <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
                      <div>
                        <div className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">
                          Student Academic Dossier
                        </div>
                        <h3 className="text-lg font-cinzel font-bold text-white">
                          {selectedEnrolmentForModules.studentName} — {selectedEnrolmentForModules.courseTitle}
                        </h3>
                        <div className="text-xs text-neutral-400">
                          ID: {selectedEnrolmentForModules.id} • Enrolled: {new Date(selectedEnrolmentForModules.enrolledAt).toLocaleDateString('en-ZA')}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedEnrolmentForModules(null)}
                        className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Practical Module Checklist */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-white">
                          Required Curriculum Modules:
                        </span>
                        <span className="text-xs text-[#f3e1a9] font-mono">
                          {selectedEnrolmentForModules.completedModules.length} Modules Verified
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {[
                          'The Modern Butler: Discretion, Protocol & Etiquette',
                          'Formal Silver Service, Table Scaping & Wine Etiquette',
                          'Wardrobe Management, Valet Services & Garment Care',
                          'Household Tech, Security Protocols & VIP Privacy (POPIA)',
                          'Event Management, Travel Logistics & Entertaining',
                          'High-Level Housekeeping Standards & Cleaning Chemistry',
                          'Surface Care: Marble, Granite, Fine Wood & Metals',
                          'Bed-Making & Luxury Turndown Service Protocols',
                          'Laundry Management, Stain Removal & Steaming',
                          'Pediatric First Aid, CPR & Home Safety Protocols',
                        ].map((moduleName, mIdx) => {
                          const isDone = selectedEnrolmentForModules.completedModules.includes(moduleName);
                          return (
                            <button
                              key={mIdx}
                              onClick={() => handleToggleModule(selectedEnrolmentForModules, moduleName)}
                              disabled={statusActionLoading === selectedEnrolmentForModules.id}
                              className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                                isDone 
                                  ? 'bg-emerald-950/30 border-emerald-600/50 text-emerald-200' 
                                  : 'bg-[#0d0d12] border-neutral-800 text-neutral-400 hover:border-neutral-700'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                                  isDone ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-neutral-700'
                                }`}>
                                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                                <span>{moduleName}</span>
                              </div>
                              <span className="text-[10px] font-mono text-neutral-500">
                                {isDone ? 'Verified' : 'Click to sign off'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Graduation Conferral Action Box */}
                    <div className="bg-[#0b0b0f] p-4 rounded-xl border border-[#d4af37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold text-white">
                          Confer Official Institutional Graduation
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          Endorses candidate credentials and triggers automated Resend graduation invitation to {selectedEnrolmentForModules.studentEmail}.
                        </p>
                      </div>

                      {selectedEnrolmentForModules.graduationConferred ? (
                        <div className="px-4 py-2 rounded-xl bg-emerald-900/60 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Graduation Conferred</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleConferGraduation(selectedEnrolmentForModules.id)}
                          disabled={statusActionLoading === selectedEnrolmentForModules.id}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black font-bold text-xs hover:brightness-110 flex items-center gap-2 transition-all shadow-md shadow-[#d4af37]/20"
                        >
                          <Award className="w-4 h-4" />
                          <span>Confer Graduation Award</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: HOUSEHOLD ADVISORY & STAFFING CRM */}
            {activeTab === 'staffing' && (
              <div className="space-y-6">
                <div className="bg-[#121219] border border-[#d4af37]/30 rounded-2xl p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-cinzel text-xl font-bold text-white">
                        Private Household Staffing CRM & Advisory
                      </h2>
                      <p className="text-xs text-neutral-400">
                        Employer estate staffing briefs, POPIA confidentiality protection, and verified alumni matching.
                      </p>
                    </div>

                    <div className="text-xs text-neutral-400">
                      Viewing as: <strong className="text-white">{currentUser?.role === 'faculty' ? 'Faculty (VIP Masked)' : 'Executive Director (Unredacted)'}</strong>
                    </div>
                  </div>

                  {/* Briefs List */}
                  <div className="grid grid-cols-1 gap-4">
                    {briefs.map((brief) => (
                      <div key={brief.id} className="bg-[#0e0e14] border border-neutral-800 rounded-xl p-5 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-cinzel text-base font-bold text-white">
                                {brief.roleRequested}
                              </h3>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                brief.privacyTier === 'High-Profile VIP' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-neutral-800 text-neutral-300'
                              }`}>
                                {brief.privacyTier}
                              </span>
                              {brief.isRedacted && (
                                <span className="text-[10px] text-amber-400 flex items-center gap-1">
                                  <Lock className="w-3 h-3" /> POPIA Masked
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-neutral-300">
                              <strong>Client:</strong> {brief.employerName}
                            </div>
                          </div>

                          {/* Pipeline Status Selector */}
                          <div className="flex items-center gap-2">
                            <label className="text-[10px] text-neutral-500 uppercase font-semibold">Status:</label>
                            <select
                              value={brief.status}
                              onChange={(e) => handleUpdateBriefStatus(brief.id, e.target.value)}
                              className="bg-[#161622] border border-neutral-700 text-neutral-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#d4af37]"
                            >
                              <option value="new">New</option>
                              <option value="advisory_review">Advisory Review</option>
                              <option value="candidate_matching">Candidate Matching</option>
                              <option value="interviewing">Interviewing</option>
                              <option value="placed">Placed</option>
                              <option value="closed">Closed</option>
                            </select>

                            <button
                              onClick={() => handleRunCandidateMatch(brief)}
                              className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-black font-semibold text-xs hover:brightness-110 flex items-center gap-1.5 transition-all"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Match Candidates</span>
                            </button>
                          </div>
                        </div>

                        {/* Brief Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300">
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase block">Location:</span>
                            <span>{brief.residenceArea}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase block">Type:</span>
                            <span>{brief.placementType}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase block">Target Start:</span>
                            <span>{brief.targetStartDate}</span>
                          </div>
                        </div>

                        {brief.additionalNotes && (
                          <div className="bg-[#14141c] p-3 rounded-lg border border-neutral-800 text-[11px] text-neutral-400">
                            <strong>Estate Notes:</strong> {brief.additionalNotes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Candidate Matching Drawer */}
                {selectedBriefForMatching && (
                  <div className="bg-[#14141d] border-2 border-[#d4af37]/50 rounded-2xl p-6 space-y-6 animate-in fade-in">
                    <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
                      <div>
                        <div className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">
                          Institutional Candidate Matching Engine
                        </div>
                        <h3 className="text-lg font-cinzel font-bold text-white">
                          Qualified Alumni for: {selectedBriefForMatching.roleRequested} ({selectedBriefForMatching.residenceArea})
                        </h3>
                        <div className="text-xs text-neutral-400">
                          Brief Reference: {selectedBriefForMatching.id} • Privacy Tier: {selectedBriefForMatching.privacyTier}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedBriefForMatching(null)}
                        className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {matchingLoading ? (
                      <div className="py-12 text-center">
                        <Loader2 className="w-6 h-6 text-[#d4af37] animate-spin mx-auto" />
                        <p className="text-xs text-neutral-400 mt-2">Evaluating graduate syllabus and vetted credentials...</p>
                      </div>
                    ) : matchedCandidates ? (
                      <div className="space-y-4">
                        <div className="text-xs text-neutral-300">
                          Found <strong>{matchedCandidates.totalMatched}</strong> certified Flawless Institution graduates matching this role requirement:
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {matchedCandidates.recommendations.map((cand: any) => (
                            <div key={cand.candidateId} className="bg-[#0d0d12] border border-neutral-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-white text-sm">{cand.fullName}</span>
                                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                                    {cand.completionStatus}
                                  </span>
                                </div>
                                <div className="text-xs text-[#f3e1a9]">
                                  {cand.accreditedQualification} ({cand.trainingMode} Mode)
                                </div>
                                <div className="text-[11px] text-neutral-400">
                                  {cand.institutionEndorsement}
                                </div>
                              </div>

                              <div className="text-right sm:border-l border-neutral-800 sm:pl-4 space-y-1">
                                <div className="text-[11px] text-neutral-300">{cand.contactPhone}</div>
                                <div className="text-[10px] text-neutral-500">{cand.contactEmail}</div>
                                <span className="text-[10px] font-bold text-[#d4af37] block">
                                  {cand.syllabusModulesVerified} Syllabus Modules Verified
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: DIRECTOR KEYNOTE SPEAKING BUREAU */}
            {activeTab === 'speaking' && (
              <div className="space-y-6">
                <div className="bg-[#121219] border border-[#d4af37]/30 rounded-2xl p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-cinzel text-xl font-bold text-white">
                        Executive Speaking Bureau & Masterclass Booking
                      </h2>
                      <p className="text-xs text-neutral-400">
                        Keynote invitations and executive masterclass requests for Founder & Director Teldah Siyawamwaya.
                      </p>
                    </div>

                    <span className="text-xs text-[#f3e1a9] bg-neutral-900 border border-[#d4af37]/40 px-3 py-1.5 rounded-lg">
                      Speaker: Teldah Siyawamwaya
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {speakingEnquiries.map((spk) => (
                      <div key={spk.id} className="bg-[#0e0e14] border border-neutral-800 rounded-xl p-5 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-cinzel text-base font-bold text-white">
                                {spk.hostOrganization}
                              </h3>
                              <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded font-bold uppercase">
                                {spk.eventFormat}
                              </span>
                            </div>
                            <div className="text-xs text-[#f3e1a9] font-medium mt-0.5">
                              Theme: {spk.eventTheme}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-neutral-500 uppercase font-semibold">Decision:</span>
                            <select
                              value={spk.status}
                              onChange={(e) => handleUpdateSpeakingStatus(spk.id, e.target.value)}
                              className="bg-[#161622] border border-neutral-700 text-neutral-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#d4af37]"
                            >
                              <option value="received">Received</option>
                              <option value="under_review">Under Review</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="declined">Declined</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-neutral-300">
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase block">Requested Date:</span>
                            <span>{spk.requestedDate}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase block">Venue / City:</span>
                            <span>{spk.location}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase block">Estimated Audience:</span>
                            <span>{spk.estimatedAudienceSize} Attendees</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase block">Proposed Honorarium:</span>
                            <span className="font-mono text-[#f3e1a9] font-bold">{spk.budgetZAR || 'Institutional Standard'}</span>
                          </div>
                        </div>

                        {spk.specialRequests && (
                          <div className="bg-[#14141c] p-3 rounded-lg border border-neutral-800 text-[11px] text-neutral-400">
                            <strong>Host Notes:</strong> {spk.specialRequests}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: SARS VAT INVOICING & FINANCIAL AUDIT */}
            {activeTab === 'finances' && (
              <div className="space-y-6">
                <div className="bg-[#121219] border border-[#d4af37]/30 rounded-2xl p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-cinzel text-xl font-bold text-white">
                        SARS VAT Tax Invoicing & Financial Reconciliation
                      </h2>
                      <p className="text-xs text-neutral-400">
                        Flawless Institution (Pty) Ltd • VAT Reg: 4710298841 • Value-Added Tax Act No 89 of 1991.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => setActiveTab('analytics')}
                        className="px-3.5 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#c5a059] text-black font-semibold text-xs flex items-center gap-1.5 transition-all shadow cursor-pointer"
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>Reporting Engine & CSV Export</span>
                      </button>
                      <div className="text-xs font-mono text-[#f3e1a9] bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg">
                        Total Cleared: R {totalClearedRevenue.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>

                  {/* Transactions Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-neutral-800 text-neutral-400 text-[10px] uppercase tracking-wider">
                          <th className="py-3 px-3 font-semibold">Reference & Date</th>
                          <th className="py-3 px-3 font-semibold">Student / Client</th>
                          <th className="py-3 px-3 font-semibold">Course Program</th>
                          <th className="py-3 px-3 font-semibold">Gateway / Method</th>
                          <th className="py-3 px-3 font-semibold">Amount (ZAR)</th>
                          <th className="py-3 px-3 font-semibold">Tax Status</th>
                          <th className="py-3 px-3 text-right font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60">
                        {transactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-neutral-800/20 transition-colors">
                            <td className="py-3 px-3">
                              <span className="font-mono font-bold text-[#d4af37] block">{tx.referenceNumber}</span>
                              <span className="text-[10px] text-neutral-500">
                                {new Date(tx.createdAt).toLocaleDateString('en-ZA')}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-semibold text-white">{tx.studentName}</div>
                              <div className="text-[11px] text-neutral-400">{tx.studentEmail}</div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="text-neutral-200">{tx.courseTitle}</div>
                            </td>
                            <td className="py-3 px-3">
                              <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-bold">
                                {tx.paymentMethod.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-mono font-semibold text-white">
                              R {tx.totalAmountZAR.toFixed(2)}
                            </td>
                            <td className="py-3 px-3">
                              {tx.paymentStatus === 'cleared' ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Cleared • Invoice Issued</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded-full">
                                  <AlertCircle className="w-3 h-3" />
                                  <span>Pending EFT Verification</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-right">
                              {tx.paymentStatus === 'cleared' ? (
                                <button
                                  onClick={() => setSelectedInvoiceRef(tx.referenceNumber)}
                                  className="px-2.5 py-1 rounded bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#f3e1a9] font-medium text-[11px] transition-all flex items-center gap-1 ml-auto"
                                >
                                  <FileText className="w-3 h-3" />
                                  <span>SARS Invoice</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => setEftVerifyRef(tx.referenceNumber)}
                                  className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-semibold text-[11px] transition-all ml-auto"
                                >
                                  Verify EFT Deposit
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* EFT Verification Confirmation Modal */}
                {eftVerifyRef && (
                  <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#121219] border border-amber-500/50 rounded-2xl max-w-lg w-full p-6 space-y-4">
                      <div className="flex items-center gap-3 text-amber-400">
                        <Landmark className="w-6 h-6" />
                        <h3 className="font-cinzel text-lg font-bold text-white">
                          Verify Standard Bank EFT Deposit
                        </h3>
                      </div>

                      <p className="text-xs text-neutral-300 leading-relaxed">
                        You are verifying an EFT bank deposit for Reference: <strong className="text-[#f3e1a9] font-mono">{eftVerifyRef}</strong>.
                        This will clear the student enrolment and automatically dispatch their official SARS Tax Invoice via Resend.
                      </p>

                      <div className="space-y-1 text-xs">
                        <label className="text-neutral-400 font-medium">Verification Audit Notes:</label>
                        <input
                          type="text"
                          value={eftVerifyNotes}
                          onChange={(e) => setEftVerifyNotes(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#0e0e14] border border-neutral-700 text-white text-xs focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          onClick={() => setEftVerifyRef(null)}
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleVerifyEftPayment(eftVerifyRef)}
                          disabled={statusActionLoading === eftVerifyRef}
                          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5"
                        >
                          {statusActionLoading === eftVerifyRef ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                          <span>Confirm Bank Clearing</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: LIVE COMMUNICATIONS & AUTOMATED NOTIFICATIONS (STAGE 8) */}
            {activeTab === 'communications' && (
              <div className="space-y-6">
                <LiveCommunicationsHub />
              </div>
            )}

            {/* TAB 7: CLOUD & DATABASE DIAGNOSTICS */}
            {activeTab === 'cloud' && (
              <div className="space-y-6">
                <div className="bg-[#121219] border border-[#d4af37]/30 rounded-2xl p-6 space-y-6">
                  <div>
                    <h2 className="font-cinzel text-xl font-bold text-white">
                      Cloud Integrations & Production Diagnostics
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Real-time status of Supabase PostgreSQL, Resend Transactional Email API, and PayFast South Africa.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Supabase Box */}
                    <div className="bg-[#0e0e14] p-5 rounded-xl border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Supabase PostgreSQL</span>
                        <Database className="w-4 h-4 text-[#d4af37]" />
                      </div>
                      <div className="text-xs text-neutral-300">
                        {integrations?.supabase?.status || 'Active Local Persistence Engine'}
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        URL: {integrations?.supabase?.url || 'Configured via Settings / .env'}
                      </div>
                      <a
                        href="/api/v1/health/supabase-schema"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#f3e1a9] hover:underline"
                      >
                        <span>View SQL Schema DDL</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Resend Box */}
                    <div className="bg-[#0e0e14] p-5 rounded-xl border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Resend Email API</span>
                        <Send className="w-4 h-4 text-[#d4af37]" />
                      </div>
                      <div className="text-xs text-neutral-300">
                        {integrations?.resend?.status || 'Dev Console Logging'}
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        From: {integrations?.resend?.fromEmail || 'Flawless Institution Admissions'}
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        Triggers: Enrolment confirmation, payment receipt, and graduation ceremony invitations.
                      </div>
                    </div>

                    {/* PayFast Box */}
                    <div className="bg-[#0e0e14] p-5 rounded-xl border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">PayFast Gateway</span>
                        <CreditCard className="w-4 h-4 text-[#d4af37]" />
                      </div>
                      <div className="text-xs text-neutral-300">
                        {integrations?.payfast?.mode || 'Sandbox (Test Mode)'}
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        Merchant ID: 10000100 (Official Test Account)
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        Instant EFT, Credit Card, Masterpass ready
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

            {/* TAB: OFFLINE & PWA LEARNING HUB */}
            {activeTab === 'offline' && (
              <div className="space-y-6">
                <OfflineLearningHub />
              </div>
            )}

            {/* View Invoice Modal */}
      {selectedInvoiceRef && (
        <TaxInvoiceModal
          referenceNumber={selectedInvoiceRef}
          onClose={() => setSelectedInvoiceRef(null)}
        />
      )}
    </div>
  );
};
