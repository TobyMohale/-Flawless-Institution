/**
 * Flawless Institution™ - Offline Learning Hub & Field Manuals (Stage 9)
 * - Course Syllabus Checklists: Interactive module check-offs, practical hours, and private notes.
 * - Household Etiquette Guides: Silver service, VIP protocol, POPIA confidentiality, and patient dignity.
 * - Offline Storage Diagnostics: Cache state, byte count, and service worker status.
 */
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Wifi, 
  WifiOff, 
  HardDrive, 
  Download, 
  FileText, 
  Save, 
  Trash2, 
  RefreshCw, 
  Search, 
  ShieldCheck, 
  Clock, 
  Award, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  Smartphone,
  Bookmark,
  Check
} from 'lucide-react';
import { 
  OfflineStorageManager, 
  CourseSyllabusChecklist, 
  EtiquetteGuide 
} from '../lib/offlineStorage';
import { useOnlineStatus } from '../lib/useOnlineStatus';
import { PWAInstallButton } from './PWAInstallButton';

interface OfflineLearningHubProps {
  onClose?: () => void;
  initialCourseId?: string;
}

export const OfflineLearningHub: React.FC<OfflineLearningHubProps> = ({ 
  onClose,
  initialCourseId = 'executive-butler-valet'
}) => {
  const isOnline = useOnlineStatus();
  const [activeTab, setActiveTab] = useState<'syllabus' | 'etiquette' | 'diagnostics'>('syllabus');

  // Syllabus State
  const [checklists, setChecklists] = useState<CourseSyllabusChecklist[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  // Etiquette State
  const [etiquetteGuides, setEtiquetteGuides] = useState<EtiquetteGuide[]>([]);
  const [selectedGuideId, setSelectedGuideId] = useState<string>('etiquette-silver-service');
  const [etiquetteSearch, setEtiquetteSearch] = useState<string>('');

  // Diagnostics & Feedback
  const [cacheMeta, setCacheMeta] = useState<any>(null);
  const [refreshSuccessMsg, setRefreshSuccessMsg] = useState<string | null>(null);
  const [savedNoteMsg, setSavedNoteMsg] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loadedChecklists = OfflineStorageManager.getSyllabusChecklists();
    setChecklists(loadedChecklists);

    const loadedGuides = OfflineStorageManager.getEtiquetteGuides();
    setEtiquetteGuides(loadedGuides);

    const meta = OfflineStorageManager.getCacheMetadata();
    setCacheMeta(meta);
  };

  const handleToggleModule = (courseId: string, itemId: string) => {
    const updated = OfflineStorageManager.toggleSyllabusItem(courseId, itemId);
    setChecklists(updated);
  };

  const handleOpenNoteEditor = (itemId: string, existingNote: string = '') => {
    setEditingNoteId(itemId);
    setNoteText(existingNote);
  };

  const handleSaveNote = (courseId: string, itemId: string) => {
    const updated = OfflineStorageManager.updateSyllabusItemNotes(courseId, itemId, noteText);
    setChecklists(updated);
    setEditingNoteId(null);
    setSavedNoteMsg('Private module note saved in offline storage.');
    setTimeout(() => setSavedNoteMsg(null), 3000);
  };

  const handleForceRefreshCache = () => {
    const res = OfflineStorageManager.forceRefreshAllOfflineContent();
    loadData();
    setRefreshSuccessMsg(`Successfully verified and refreshed ${res.syllabusCount} course syllabi and ${res.etiquetteCount} etiquette manuals into offline memory.`);
    setTimeout(() => setRefreshSuccessMsg(null), 4000);
  };

  const handleClearCache = () => {
    if (window.confirm('Are you sure you want to reset all offline learning data to defaults?')) {
      OfflineStorageManager.clearOfflineCache();
      loadData();
      setRefreshSuccessMsg('Offline cache reset to institutional defaults.');
      setTimeout(() => setRefreshSuccessMsg(null), 3000);
    }
  };

  const currentChecklist = checklists.find(c => c.courseId === selectedCourseId) || checklists[0];
  const currentGuide = etiquetteGuides.find(g => g.id === selectedGuideId) || etiquetteGuides[0];

  // Calculate syllabus stats
  const completedCount = currentChecklist?.items.filter(i => i.completed).length || 0;
  const totalCount = currentChecklist?.items.length || 0;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const completedHours = currentChecklist?.items
    .filter(i => i.completed)
    .reduce((acc, i) => acc + i.practicalHours, 0) || 0;

  return (
    <div className="bg-[#0e0e14] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-stone-200">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#d4af37]/20 text-[#f3e1a9] border border-[#d4af37]/40">
                Stage 9 • Progressive Web App
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${
                isOnline 
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}>
                {isOnline ? (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Network Connected</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                    <span>Offline Active • Cache Serving</span>
                  </>
                )}
              </span>
            </div>

            <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
              Offline Learning Mode & Field Manuals
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl">
              Course syllabus checklists, practical evaluation rubrics, and household etiquette guides cached locally for continuous study without data connectivity.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <PWAInstallButton compact />
            {onClose && (
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg bg-stone-900 border border-stone-700 hover:border-stone-500 text-xs font-medium text-stone-300 transition"
              >
                Close Hub
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-stone-800/80">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'syllabus'
                ? 'bg-[#d4af37] text-stone-950 shadow-md shadow-[#d4af37]/20'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Course Syllabus Checklists ({checklists.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('etiquette')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'etiquette'
                ? 'bg-[#d4af37] text-stone-950 shadow-md shadow-[#d4af37]/20'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Household Etiquette Guides ({etiquetteGuides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'diagnostics'
                ? 'bg-[#d4af37] text-stone-950 shadow-md shadow-[#d4af37]/20'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Offline Cache Diagnostics</span>
          </button>
        </div>
      </div>

      {/* Global Toast Alerts */}
      {refreshSuccessMsg && (
        <div className="bg-emerald-950/80 border-b border-emerald-800/80 text-emerald-200 px-6 py-2.5 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{refreshSuccessMsg}</span>
        </div>
      )}

      {savedNoteMsg && (
        <div className="bg-[#d4af37]/20 border-b border-[#d4af37]/40 text-[#f3e1a9] px-6 py-2.5 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
          <span>{savedNoteMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: COURSE SYLLABUS CHECKLISTS */}
      {/* ========================================================================= */}
      {activeTab === 'syllabus' && currentChecklist && (
        <div className="p-6 space-y-6">
          {/* Course Selector & Progress Summary */}
          <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider block">
                  Select Enrolled Academy Qualification
                </label>
                <select
                  value={selectedCourseId}
                  onChange={e => setSelectedCourseId(e.target.value)}
                  className="bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37] min-w-[300px]"
                >
                  {checklists.map(c => (
                    <option key={c.courseId} value={c.courseId}>
                      {c.courseTitle}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-stone-400 pt-1">
                  {currentChecklist.qualificationLevel}
                </div>
              </div>

              {/* Progress Gauges */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-xs text-stone-400">Curriculum Progress</div>
                  <div className="text-xl font-bold text-[#d4af37] font-mono">{progressPercent}%</div>
                  <div className="text-[10px] text-stone-500">{completedCount} of {totalCount} Modules</div>
                </div>

                <div className="text-center border-l border-stone-800 pl-6">
                  <div className="text-xs text-stone-400">Practical Hours</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono">
                    {completedHours} / {currentChecklist.totalHours} hrs
                  </div>
                  <div className="text-[10px] text-stone-500">Fourways Campus Ready</div>
                </div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-stone-900 rounded-full h-2 mt-4 overflow-hidden border border-stone-800">
              <div
                className="bg-gradient-to-r from-[#aa8222] via-[#d4af37] to-[#f5e4ab] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Interactive Modules Checklist List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-400 uppercase tracking-wider">
              <span>Syllabus Modules & Practical Competencies</span>
              <span>Tap checkmark to toggle offline completion</span>
            </div>

            <div className="space-y-3">
              {currentChecklist.items.map((item) => (
                <div
                  key={item.id}
                  className={`border rounded-xl p-5 transition-all ${
                    item.completed
                      ? 'bg-stone-950/60 border-emerald-900/40'
                      : 'bg-stone-900/70 border-stone-800'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Completion Checkbox */}
                    <button
                      onClick={() => handleToggleModule(currentChecklist.courseId, item.id)}
                      className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                        item.completed
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                          : 'bg-stone-950 border-stone-700 text-transparent hover:border-[#d4af37]'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className={`text-sm font-semibold tracking-wide ${
                          item.completed ? 'text-stone-300 line-through' : 'text-white'
                        }`}>
                          {item.title}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-stone-950 text-[#f3e1a9] border border-stone-800">
                          {item.practicalHours} Practical Hours
                        </span>
                      </div>

                      <p className="text-xs text-stone-400 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Key Concepts Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.keyConcepts.map((kc, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] bg-stone-950 text-stone-300 border border-stone-800"
                          >
                            {kc}
                          </span>
                        ))}
                      </div>

                      {/* Student Private Field Notes */}
                      <div className="pt-3 border-t border-stone-800/80">
                        {editingNoteId === item.id ? (
                          <div className="space-y-2">
                            <textarea
                              rows={3}
                              value={noteText}
                              onChange={e => setNoteText(e.target.value)}
                              placeholder="Record personal observations, supervisor feedback, or revision notes..."
                              className="w-full bg-stone-950 border border-stone-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveNote(currentChecklist.courseId, item.id)}
                                className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-stone-950 text-xs font-bold hover:bg-[#aa8222] transition flex items-center gap-1.5"
                              >
                                <Save className="w-3.5 h-3.5" />
                                <span>Save Private Note</span>
                              </button>
                              <button
                                onClick={() => setEditingNoteId(null)}
                                className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 text-xs hover:bg-stone-700 transition"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-xs">
                            <div className="text-stone-400 italic">
                              {item.notes ? (
                                <span className="text-[#f3e1a9] not-italic">
                                  <strong>Field Note:</strong> "{item.notes}"
                                </span>
                              ) : (
                                <span className="text-stone-500">No student field notes attached.</span>
                              )}
                            </div>
                            <button
                              onClick={() => handleOpenNoteEditor(item.id, item.notes || '')}
                              className="text-xs text-[#d4af37] hover:underline flex items-center gap-1"
                            >
                              <span>{item.notes ? 'Edit Note' : '+ Add Note'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: HOUSEHOLD ETIQUETTE GUIDES */}
      {/* ========================================================================= */}
      {activeTab === 'etiquette' && (
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Guide Category List Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search protocols (e.g. silver, wine, NDA)..."
                  value={etiquetteSearch}
                  onChange={e => setEtiquetteSearch(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-2">
                {etiquetteGuides
                  .filter(g => 
                    !etiquetteSearch || 
                    g.title.toLowerCase().includes(etiquetteSearch.toLowerCase()) ||
                    g.category.toLowerCase().includes(etiquetteSearch.toLowerCase())
                  )
                  .map(guide => (
                    <button
                      key={guide.id}
                      onClick={() => setSelectedGuideId(guide.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedGuideId === guide.id
                          ? 'bg-[#d4af37]/15 border-[#d4af37] text-white shadow-md'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-950 text-[#f3e1a9] border border-stone-800">
                          {guide.category}
                        </span>
                        <span className="text-[10px] text-stone-500 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          {guide.readingTimeMinutes} min read
                        </span>
                      </div>
                      <div className="font-semibold text-xs text-stone-200 line-clamp-2">
                        {guide.title}
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Guide Reader Panel (8 cols) */}
            <div className="lg:col-span-8">
              {currentGuide && (
                <div className="bg-stone-950 border border-stone-800 rounded-xl p-6 space-y-6 shadow-md">
                  {/* Guide Header */}
                  <div className="border-b border-stone-800 pb-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-[#d4af37]/20 text-[#f3e1a9] border border-[#d4af37]/30">
                        {currentGuide.category}
                      </span>
                      <span className="text-xs text-stone-400">
                        Official Flawless Field Reference Manual
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white tracking-wide">
                      {currentGuide.title}
                    </h3>
                    <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                      {currentGuide.summary}
                    </p>
                  </div>

                  {/* Numbered Rules with DO and DO NOT */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                      Core Institutional Standards
                    </h4>

                    {currentGuide.rules.map(rule => (
                      <div key={rule.ruleNumber} className="bg-stone-900/70 border border-stone-800 rounded-xl p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#d4af37]/20 text-[#f3e1a9] text-xs font-bold flex items-center justify-center font-mono">
                            {rule.ruleNumber}
                          </span>
                          <span className="font-semibold text-xs text-white">
                            {rule.heading}
                          </span>
                        </div>

                        <p className="text-xs text-stone-300 leading-relaxed pl-8">
                          {rule.detail}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-8 pt-1 text-xs">
                          <div className="bg-emerald-950/40 border border-emerald-900/50 p-2.5 rounded-lg text-emerald-200">
                            <span className="font-bold text-emerald-400 block mb-0.5">DO:</span>
                            {rule.do}
                          </div>

                          <div className="bg-rose-950/40 border border-rose-900/50 p-2.5 rounded-lg text-rose-200">
                            <span className="font-bold text-rose-400 block mb-0.5">DO NOT:</span>
                            {rule.doNot}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Shift Checklist */}
                  <div className="bg-stone-900/90 border border-[#d4af37]/40 rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-[#d4af37] font-semibold text-xs uppercase tracking-wider">
                      <Bookmark className="w-4 h-4" />
                      <span>Shift Briefing Quick-Checklist</span>
                    </div>

                    <ul className="space-y-2 text-xs text-stone-300">
                      {currentGuide.quickChecklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: OFFLINE CACHE DIAGNOSTICS */}
      {/* ========================================================================= */}
      {activeTab === 'diagnostics' && (
        <div className="p-6 space-y-6">
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                Service Worker & Offline Cache Status
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Verify asset caching integrity for low-connectivity environments across South Africa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-1">
                <div className="text-stone-400 uppercase text-[10px] tracking-wider">Service Worker</div>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Vite PWA Active</span>
                </div>
                <div className="text-[11px] text-stone-500">Auto-updating background worker</div>
              </div>

              <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-1">
                <div className="text-stone-400 uppercase text-[10px] tracking-wider">Offline Learning Cache</div>
                <div className="text-sm font-bold text-[#d4af37] font-mono">
                  {((cacheMeta?.approxBytes || 12000) / 1024).toFixed(1)} KB Stored
                </div>
                <div className="text-[11px] text-stone-500">Syllabus Checklists & Manuals</div>
              </div>

              <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-1">
                <div className="text-stone-400 uppercase text-[10px] tracking-wider">Last Verification</div>
                <div className="text-sm font-bold text-sky-400 font-mono">
                  {new Date(cacheMeta?.lastCachedAt || Date.now()).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })} SAST
                </div>
                <div className="text-[11px] text-stone-500">Local persistent storage</div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-stone-800">
              <button
                onClick={handleForceRefreshCache}
                className="bg-[#d4af37] hover:bg-[#aa8222] text-stone-950 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Force Re-Cache All Guides</span>
              </button>

              <button
                onClick={handleClearCache}
                className="bg-stone-900 hover:bg-stone-800 text-rose-400 border border-rose-900/50 px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Offline Storage</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
