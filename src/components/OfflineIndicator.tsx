/**
 * Flawless Institution™ - Offline Connectivity Indicator (Stage 9)
 * Alert banner when network connection drops, directing student to cached syllabus and etiquette guides.
 */
import React, { useState } from 'react';
import { WifiOff, Wifi, BookOpen, ChevronRight, X } from 'lucide-react';
import { useOnlineStatus } from '../lib/useOnlineStatus';

interface OfflineIndicatorProps {
  onOpenOfflineHub?: () => void;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ onOpenOfflineHub }) => {
  const isOnline = useOnlineStatus();
  const [dismissed, setDismissed] = useState(false);

  if (isOnline || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 animate-in slide-in-from-bottom-3 duration-300">
      <div className="bg-stone-900/95 border border-amber-500/60 rounded-xl p-3.5 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
            <WifiOff className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
              <span>Offline Mode Active</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            </div>
            <div className="text-[11px] text-stone-300">
              Cached syllabus checklists & etiquette guides are fully accessible.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {onOpenOfflineHub && (
            <button
              onClick={onOpenOfflineHub}
              className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3" />
              <span>Guides</span>
            </button>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded text-stone-400 hover:text-white transition"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
