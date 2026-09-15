/**
 * Flawless Institution™ - Live Communications & Automated Notifications Hub (Stage 8)
 * Executive Communications & Messaging Console:
 * - Email Dispatch Templates: Enrolment Confirmation, Standard Bank EFT Instructions, SARS Tax Invoices.
 * - WhatsApp & SMS Alert Triggers: Fourways Training Centre physical cohort commencement alerts.
 * - Notification Audit Trail: Real-time multi-channel delivery ledger.
 */
import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  AlertCircle, 
  Copy, 
  Check, 
  Calendar, 
  MapPin, 
  ShieldCheck,
  Eye,
  Sliders,
  Filter,
  FileText
} from 'lucide-react';
import { api } from '../lib/api';

interface LiveCommunicationsHubProps {
  onClose?: () => void;
}

export const LiveCommunicationsHub: React.FC<LiveCommunicationsHubProps> = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'triggers' | 'logs'>('templates');
  
  // Template Studio State
  const [selectedTemplate, setSelectedTemplate] = useState<'enrolment_confirmation' | 'standard_bank_eft_instructions' | 'sars_tax_invoice'>('enrolment_confirmation');
  const [previewData, setPreviewData] = useState<any>(null);
  const [previewLoading, setPreviewLoading] = useState<boolean>(false);
  const [testEmailAddress, setTestEmailAddress] = useState<string>('student@flawlessinstitution.co.za');
  const [testStudentName, setTestStudentName] = useState<string>('Thabo Mokoena');
  const [testReference, setTestReference] = useState<string>('FI-2026-8801');
  const [sendingTest, setSendingTest] = useState<boolean>(false);
  const [testSendSuccess, setTestSendSuccess] = useState<string | null>(null);
  const [copiedHtml, setCopiedHtml] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'preview' | 'html' | 'text'>('preview');

  // WhatsApp & SMS Triggers State
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [selectedCohortId, setSelectedCohortId] = useState<string>('');
  const [triggerChannels, setTriggerChannels] = useState<{ whatsapp: boolean; sms: boolean; email: boolean }>({
    whatsapp: true,
    sms: true,
    email: false,
  });
  const [sendOnlyPaid, setSendOnlyPaid] = useState<boolean>(false);
  const [dispatchingBatch, setDispatchingBatch] = useState<boolean>(false);
  const [dispatchResult, setDispatchResult] = useState<any>(null);

  // WhatsApp & SMS Preview Simulation
  const [waPreview, setWaPreview] = useState<any>(null);
  const [smsPreview, setSmsPreview] = useState<any>(null);

  // Communications Logs State
  const [logs, setLogs] = useState<any[]>([]);
  const [logsLoading, setLogsLoading] = useState<boolean>(false);
  const [logChannelFilter, setLogChannelFilter] = useState<string>('all');
  const [logSearchQuery, setLogSearchQuery] = useState<string>('');

  // Load Initial Cohorts & Template Preview
  useEffect(() => {
    loadCohorts();
    loadTemplatePreview();
    loadLogs();
  }, []);

  useEffect(() => {
    loadTemplatePreview();
  }, [selectedTemplate, testStudentName, testEmailAddress, testReference]);

  useEffect(() => {
    if (selectedCohortId) {
      updatePreviewsForCohort(selectedCohortId);
    }
  }, [selectedCohortId, cohorts]);

  const loadCohorts = async () => {
    try {
      const res = await api.getCohorts();
      if (res.success && res.data) {
        const physicalCohorts = res.data.filter((c: any) => c.mode === 'Physical' || c.location.includes('Fourways'));
        setCohorts(physicalCohorts.length > 0 ? physicalCohorts : res.data);
        if (physicalCohorts.length > 0) {
          setSelectedCohortId(physicalCohorts[0].id);
        } else if (res.data[0]) {
          setSelectedCohortId(res.data[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load cohorts', err);
    }
  };

  const loadTemplatePreview = async () => {
    setPreviewLoading(true);
    try {
      const res = await api.getTemplatePreview(
        selectedTemplate,
        testStudentName,
        testEmailAddress,
        testReference
      );
      if (res.success && res.data) {
        setPreviewData(res.data);
      }
    } catch (err) {
      console.error('Failed to load preview', err);
    } finally {
      setPreviewLoading(false);
    }
  };

  const updatePreviewsForCohort = async (cohortId: string) => {
    const cohort = cohorts.find(c => c.id === cohortId);
    if (!cohort) return;

    try {
      const waRes = await api.getWhatsAppPreview({
        studentName: testStudentName,
        studentPhone: '+27 82 123 4567',
        cohortName: cohort.name,
        courseTitle: cohort.name || 'Executive Butler & Valet Masterclass',
        startDate: cohort.startDate,
        location: cohort.location || 'Fourways Training Centre, Design Quarter District',
      });
      if (waRes.success && waRes.data) {
        setWaPreview(waRes.data);
      }

      const smsRes = await api.getSmsPreview({
        studentName: testStudentName,
        studentPhone: '+27 82 123 4567',
        cohortName: cohort.name,
        startDate: cohort.startDate,
      });
      if (smsRes.success && smsRes.data) {
        setSmsPreview(smsRes.data);
      }
    } catch (err) {
      console.error('Failed to update messaging previews', err);
    }
  };

  const loadLogs = async () => {
    setLogsLoading(true);
    try {
      const res = await api.getCommunicationLogs(logChannelFilter, undefined, logSearchQuery);
      if (res.success && res.data) {
        setLogs(res.data);
      }
    } catch (err) {
      console.error('Failed to load communication logs', err);
    } finally {
      setLogsLoading(false);
    }
  };

  const handleSendTestEmail = async () => {
    if (!testEmailAddress) return;
    setSendingTest(true);
    setTestSendSuccess(null);
    try {
      const res = await api.sendTestEmail({
        templateType: selectedTemplate,
        recipientEmail: testEmailAddress,
        recipientName: testStudentName,
      });
      if (res.success) {
        setTestSendSuccess(`Successfully dispatched ${selectedTemplate} to ${testEmailAddress}`);
        loadLogs();
      } else {
        setTestSendSuccess(`Failed: ${res.error || 'Could not send test email'}`);
      }
    } catch (err: any) {
      setTestSendSuccess(`Error: ${err.message}`);
    } finally {
      setSendingTest(false);
    }
  };

  const handleDispatchBatchAlerts = async () => {
    if (!selectedCohortId) return;
    const channels = Object.entries(triggerChannels)
      .filter(([_, active]) => active)
      .map(([ch]) => ch);

    if (channels.length === 0) {
      alert('Please select at least one channel (WhatsApp, SMS, or Email)');
      return;
    }

    setDispatchingBatch(true);
    setDispatchResult(null);
    try {
      const res = await api.dispatchCohortAlerts({
        cohortId: selectedCohortId,
        channels,
        sendOnlyPaid,
      });
      if (res.success && res.data) {
        setDispatchResult(res.data);
        loadLogs();
      }
    } catch (err: any) {
      alert(`Batch dispatch failed: ${err.message}`);
    } finally {
      setDispatchingBatch(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const selectedCohort = cohorts.find(c => c.id === selectedCohortId);

  return (
    <div className="space-y-6" id="communications-hub-root">
      {/* Top Banner & Quick Metrics */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 border border-amber-900/40 rounded-xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Stage 8 • Production Engine
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Multi-Channel Gateway Live
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
              Live Communications & Automated Notifications
            </h2>
            <p className="text-sm text-stone-400 max-w-2xl mt-1">
              Transactional Resend email rendering, Standard Bank EFT instructions, SARS VAT tax invoices, and WhatsApp/SMS reminder triggers for the Fourways Training Centre.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-stone-950/60 border border-stone-700/60 rounded-lg p-3 text-center min-w-[120px]">
              <div className="text-xs text-stone-400 uppercase tracking-wider">Fourways Hub</div>
              <div className="text-lg font-bold text-amber-400">15 Seats / Cl.</div>
              <div className="text-[10px] text-stone-500">Design Quarter JHB</div>
            </div>
            <div className="bg-stone-950/60 border border-stone-700/60 rounded-lg p-3 text-center min-w-[120px]">
              <div className="text-xs text-stone-400 uppercase tracking-wider">SARS VAT</div>
              <div className="text-lg font-bold text-emerald-400">15% Standard</div>
              <div className="text-[10px] text-stone-500">Act 89 of 1991</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-stone-700/50">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'templates'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email Dispatch Templates (3)</span>
          </button>

          <button
            onClick={() => setActiveTab('triggers')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'triggers'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>WhatsApp & SMS Alert Triggers</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('logs');
              loadLogs();
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'logs'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Multi-Channel Audit Log</span>
            <span className="ml-1 px-1.5 py-0.2 bg-stone-900 text-amber-300 rounded text-xs font-mono">
              {logs.length}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: EMAIL DISPATCH TEMPLATES */}
      {/* ========================================================================= */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Controls & Parameter Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Sliders className="w-4 h-4" />
                <span>Select Transactional Template</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedTemplate('enrolment_confirmation')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                    selectedTemplate === 'enrolment_confirmation'
                      ? 'bg-amber-500/10 border-amber-500/60 text-white'
                      : 'bg-stone-950/40 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <div className="font-semibold text-sm text-amber-300">1. Enrolment Confirmation</div>
                  <div className="text-xs text-stone-400 mt-1">
                    Order confirmation, course summary & 15-seat Fourways reservation policy.
                  </div>
                </button>

                <button
                  onClick={() => setSelectedTemplate('standard_bank_eft_instructions')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                    selectedTemplate === 'standard_bank_eft_instructions'
                      ? 'bg-sky-500/10 border-sky-500/60 text-white'
                      : 'bg-stone-950/40 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <div className="font-semibold text-sm text-sky-400">2. Standard Bank EFT Instructions</div>
                  <div className="text-xs text-stone-400 mt-1">
                    Beneficiary account, branch code, deposit reference matching & POP upload.
                  </div>
                </button>

                <button
                  onClick={() => setSelectedTemplate('sars_tax_invoice')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                    selectedTemplate === 'sars_tax_invoice'
                      ? 'bg-emerald-500/10 border-emerald-500/60 text-white'
                      : 'bg-stone-950/40 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <div className="font-semibold text-sm text-emerald-400">3. Official SARS VAT Tax Invoice</div>
                  <div className="text-xs text-stone-400 mt-1">
                    15% VAT output breakdown, VAT Reg 4790281944 & Section 20(4) compliance.
                  </div>
                </button>
              </div>

              {/* Dynamic Sample Parameters */}
              <div className="pt-3 border-t border-stone-800 space-y-3">
                <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  Test Render Parameters
                </div>

                <div>
                  <label className="text-xs text-stone-400 block mb-1">Student / Recipient Full Name</label>
                  <input
                    type="text"
                    value={testStudentName}
                    onChange={e => setTestStudentName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-400 block mb-1">Enrolment Reference Number</label>
                  <input
                    type="text"
                    value={testReference}
                    onChange={e => setTestReference(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-md px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-400 block mb-1">Send Test Dispatch to Email</label>
                  <input
                    type="email"
                    value={testEmailAddress}
                    onChange={e => setTestEmailAddress(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  onClick={handleSendTestEmail}
                  disabled={sendingTest || !testEmailAddress}
                  className="w-full mt-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 text-white py-2.5 px-4 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 shadow-md"
                >
                  {sendingTest ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  <span>Dispatch Live Test via Resend</span>
                </button>

                {testSendSuccess && (
                  <div className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                    testSendSuccess.includes('Successfully')
                      ? 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-300'
                      : 'bg-amber-950/60 border border-amber-800/80 text-amber-300'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{testSendSuccess}</span>
                  </div>
                )}
              </div>
            </div>

            {/* SARS & Regulatory Information Box */}
            <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4 text-xs text-stone-400 space-y-2">
              <div className="flex items-center gap-2 text-stone-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>South African Statutory Disclosures</span>
              </div>
              <p className="leading-relaxed">
                Flawless Institution (Pty) Ltd adheres to the South African Value-Added Tax Act No 89 of 1991. Standard rate 15% VAT is calculated on inclusive amounts via the statutory factor (15 / 115).
              </p>
              <div className="font-mono text-[11px] text-stone-500 bg-stone-950 p-2 rounded border border-stone-800">
                VAT Reg: 4790281944 • Reg: 2016/094821/07
              </div>
            </div>
          </div>

          {/* Right Preview Viewport (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-xl flex flex-col h-[740px]">
              {/* Preview Bar Header */}
              <div className="bg-stone-950 border-b border-stone-800 p-3.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <div className="text-xs text-stone-300 font-mono truncate max-w-md">
                    Subject: <span className="text-amber-400">{previewData?.subject || 'Loading template...'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex bg-stone-900 rounded-lg p-0.5 border border-stone-700">
                    <button
                      onClick={() => setViewMode('preview')}
                      className={`px-3 py-1 rounded text-xs transition ${
                        viewMode === 'preview'
                          ? 'bg-amber-500 text-stone-950 font-semibold'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3 h-3" />
                        Preview
                      </span>
                    </button>
                    <button
                      onClick={() => setViewMode('html')}
                      className={`px-3 py-1 rounded text-xs transition ${
                        viewMode === 'html'
                          ? 'bg-amber-500 text-stone-950 font-semibold'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      HTML
                    </button>
                    <button
                      onClick={() => setViewMode('text')}
                      className={`px-3 py-1 rounded text-xs transition ${
                        viewMode === 'text'
                          ? 'bg-amber-500 text-stone-950 font-semibold'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Plain Text
                    </button>
                  </div>

                  <button
                    onClick={() => previewData?.html && copyToClipboard(previewData.html)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
                    title="Copy Raw HTML"
                  >
                    {copiedHtml ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Viewport Content */}
              <div className="flex-1 bg-stone-950 overflow-auto relative">
                {previewLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
                  </div>
                ) : viewMode === 'preview' ? (
                  <iframe
                    title="Email Template Live Preview"
                    srcDoc={previewData?.html || ''}
                    className="w-full h-full border-none bg-stone-950"
                  />
                ) : viewMode === 'html' ? (
                  <pre className="p-4 font-mono text-xs text-amber-300/90 whitespace-pre-wrap selection:bg-amber-900">
                    {previewData?.html}
                  </pre>
                ) : (
                  <pre className="p-6 font-mono text-xs text-stone-300 whitespace-pre-wrap leading-relaxed">
                    {previewData?.plainText}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: WHATSAPP & SMS ALERT TRIGGERS */}
      {/* ========================================================================= */}
      {activeTab === 'triggers' && (
        <div className="space-y-6">
          {/* Cohort Selector & Alert Config */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 space-y-2">
                <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                  Select Physical Fourways Cohort
                </label>
                <select
                  value={selectedCohortId}
                  onChange={e => setSelectedCohortId(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {cohorts.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.enrolledCount}/{c.capacity} Seats • Starts {new Date(c.startDate).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' })})
                    </option>
                  ))}
                </select>
                {selectedCohort && (
                  <div className="flex items-center gap-3 text-xs text-stone-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      {selectedCohort.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      Starts: {new Date(selectedCohort.startDate).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                )}
              </div>

              {/* Channels & Filters */}
              <div className="md:col-span-4 space-y-3">
                <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  Target Notification Channels
                </div>
                <div className="flex flex-wrap gap-4 text-xs">
                  <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={triggerChannels.whatsapp}
                      onChange={e => setTriggerChannels({ ...triggerChannels, whatsapp: e.target.checked })}
                      className="rounded border-stone-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="font-semibold text-emerald-400">WhatsApp Alert</span>
                  </label>

                  <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={triggerChannels.sms}
                      onChange={e => setTriggerChannels({ ...triggerChannels, sms: e.target.checked })}
                      className="rounded border-stone-700 text-sky-500 focus:ring-sky-500"
                    />
                    <span className="font-semibold text-sky-400">SMS (160c GSM)</span>
                  </label>

                  <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={triggerChannels.email}
                      onChange={e => setTriggerChannels({ ...triggerChannels, email: e.target.checked })}
                      className="rounded border-stone-700 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="font-semibold text-amber-400">Email Pack</span>
                  </label>
                </div>

                <label className="flex items-center gap-2 text-xs text-stone-400 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={sendOnlyPaid}
                    onChange={e => setSendOnlyPaid(e.target.checked)}
                    className="rounded border-stone-700 text-amber-500"
                  />
                  <span>Dispatch only to students with cleared tuition payment</span>
                </label>
              </div>

              {/* Action Trigger Button */}
              <div className="md:col-span-3 flex flex-col justify-end">
                <button
                  onClick={handleDispatchBatchAlerts}
                  disabled={dispatchingBatch || !selectedCohortId}
                  className="w-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {dispatchingBatch ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>Broadcast Cohort Alerts</span>
                </button>
              </div>
            </div>

            {/* Batch Result Feedback */}
            {dispatchResult && (
              <div className="mt-5 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 text-xs text-emerald-200">
                <div className="font-semibold text-emerald-300 flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Batch Dispatch Complete for {dispatchResult.cohortName}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {dispatchResult.results?.map((res: any, idx: number) => (
                    <div key={idx} className="bg-emerald-950/60 p-2 rounded border border-emerald-800/50 flex justify-between">
                      <span className="font-medium text-white">{res.recipientName} ({res.channel.toUpperCase()}):</span>
                      <span className="text-emerald-400">{res.summary}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Real-time Preview Cards: WhatsApp & SMS Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp Live Simulator */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
              <div className="bg-[#075e54] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center text-white font-serif font-bold text-sm">
                    FI
                  </div>
                  <div>
                    <div className="font-bold text-sm">Flawless Institution Registrar</div>
                    <div className="text-[11px] text-emerald-200">Official Campus Notifications • Fourways</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#128c7e] text-white">
                  WhatsApp Web / App
                </span>
              </div>

              {/* Chat Bubble Viewport */}
              <div className="p-5 flex-1 bg-[#0b141a] bg-opacity-95 text-stone-200 text-xs overflow-auto min-h-[300px] flex flex-col justify-between">
                <div className="bg-[#005c4b] text-white p-3.5 rounded-xl rounded-tl-none shadow-md max-w-lg leading-relaxed whitespace-pre-wrap font-sans">
                  {waPreview?.messageText || 'Generating WhatsApp cohort reminder message...'}
                </div>

                <div className="pt-4 mt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] text-stone-400">
                    Recipient: <span className="font-mono text-emerald-400">{waPreview?.formattedPhone || '+27 82 123 4567'}</span>
                  </div>
                  {waPreview?.clickToChatUrl && (
                    <a
                      href={waPreview.clickToChatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition shadow"
                    >
                      <span>Open in WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* SMS 160-char GSM Simulator */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
              <div className="bg-stone-950 text-white p-4 flex items-center justify-between border-b border-stone-800">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-5 h-5 text-sky-400" />
                  <div>
                    <div className="font-bold text-sm">SMS Gateway Simulator</div>
                    <div className="text-[11px] text-stone-400">Sender ID: FLAWLESS • South African Telco Routing</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-sky-400 font-bold">
                    {smsPreview?.characterCount || 0} / 160 chars
                  </span>
                  <div className="text-[10px] text-stone-500">
                    {smsPreview?.segments || 1} GSM Segment(s)
                  </div>
                </div>
              </div>

              {/* SMS Bubble Viewport */}
              <div className="p-5 flex-1 bg-stone-950 text-stone-200 text-xs overflow-auto min-h-[300px] flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-center text-[10px] text-stone-500 font-mono">
                    Today • Standard South African SMS Routing
                  </div>
                  <div className="bg-sky-950/60 border border-sky-800/60 text-sky-100 p-4 rounded-2xl rounded-bl-none shadow-md max-w-md leading-relaxed font-sans">
                    {smsPreview?.messageText || 'Generating SMS text alert...'}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between">
                  <div className="text-[11px] text-stone-400">
                    Target: <span className="font-mono text-sky-300">{smsPreview?.recipientPhone || '+27 82 123 4567'}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded text-[10px] font-mono">
                    Direct Telco Handshake Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: MULTI-CHANNEL AUDIT LOG */}
      {/* ========================================================================= */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-[260px]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search recipient, contact, or subject..."
                  value={logSearchQuery}
                  onChange={e => setLogSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && loadLogs()}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={logChannelFilter}
                  onChange={e => {
                    setLogChannelFilter(e.target.value);
                  }}
                  className="bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-stone-300"
                >
                  <option value="all">All Channels</option>
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
            </div>

            <button
              onClick={loadLogs}
              disabled={logsLoading}
              className="bg-stone-800 hover:bg-stone-700 text-stone-300 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${logsLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Logs</span>
            </button>
          </div>

          {/* Logs Table */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-800">
                  <tr>
                    <th className="p-3.5">Channel</th>
                    <th className="p-3.5">Recipient</th>
                    <th className="p-3.5">Subject / Template</th>
                    <th className="p-3.5">Cohort / Reference</th>
                    <th className="p-3.5">Timestamp (SAST)</th>
                    <th className="p-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-stone-500">
                        No communication logs matching current filter.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log: any) => (
                      <tr key={log.id} className="hover:bg-stone-800/40 transition">
                        <td className="p-3.5">
                          {log.channel === 'email' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              <Mail className="w-3 h-3" />
                              Email
                            </span>
                          ) : log.channel === 'whatsapp' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              <MessageSquare className="w-3 h-3" />
                              WhatsApp
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20">
                              <Smartphone className="w-3 h-3" />
                              SMS
                            </span>
                          )}
                        </td>

                        <td className="p-3.5">
                          <div className="font-semibold text-white">{log.recipientName}</div>
                          <div className="text-[11px] text-stone-400 font-mono">{log.recipientContact}</div>
                        </td>

                        <td className="p-3.5 max-w-xs">
                          <div className="font-medium text-stone-200 truncate">{log.subjectOrTitle}</div>
                          <div className="text-[11px] text-stone-500 truncate">{log.contentSnippet}</div>
                        </td>

                        <td className="p-3.5">
                          {log.cohortName ? (
                            <div className="text-stone-300">{log.cohortName}</div>
                          ) : log.referenceNumber ? (
                            <span className="font-mono text-amber-400">{log.referenceNumber}</span>
                          ) : (
                            <span className="text-stone-600">—</span>
                          )}
                        </td>

                        <td className="p-3.5 text-stone-400 font-mono text-[11px]">
                          {new Date(log.sentAt).toLocaleString('en-ZA', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>

                        <td className="p-3.5 text-right">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                            log.status === 'delivered'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                              : log.status === 'sent'
                              ? 'bg-sky-950/80 text-sky-300 border border-sky-800'
                              : 'bg-stone-800 text-stone-300'
                          }`}>
                            <CheckCircle2 className="w-3 h-3" />
                            {log.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
