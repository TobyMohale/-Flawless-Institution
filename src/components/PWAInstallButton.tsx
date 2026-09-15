/**
 * Flawless Institution™ - In-App PWA Install Button & iOS Safari Guide (Stage 9)
 * Mounts in Navbar and header, provides native prompt for Android/Chromium/Desktop and guided steps for iOS.
 */
import React, { useState } from 'react';
import { Download, Share2, X, Smartphone, Check, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../lib/usePWAInstall';

interface PWAInstallButtonProps {
  compact?: boolean;
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  compact = false,
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // If already running in standalone mode (installed as PWA), do not render
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        setInstallSuccess(true);
        setTimeout(() => setInstallSuccess(false), 3000);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // Ambient fallback instructions
      alert('To install Flawless Institution on your device: In your browser menu, select "Install app" or "Add to Home Screen".');
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        aria-label="Install Flawless Institution PWA App"
        title="Install Flawless Institution on your home screen for offline syllabus access"
        className={`group relative inline-flex items-center gap-2 rounded-lg border transition-all duration-300 font-medium ${
          compact
            ? 'px-2.5 py-1.5 text-xs bg-[#171720] border-[#d4af37]/40 text-[#f3e1a9] hover:bg-[#d4af37]/15 hover:border-[#d4af37]'
            : 'px-3.5 py-2 text-xs bg-gradient-to-r from-stone-900 to-stone-950 border-[#d4af37]/50 text-[#f3e1a9] hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/10'
        } ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
        </span>

        {installSuccess ? (
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        ) : isIOS ? (
          <Share2 className="w-3.5 h-3.5 text-[#d4af37] group-hover:scale-110 transition-transform" />
        ) : (
          <Download className="w-3.5 h-3.5 text-[#d4af37] group-hover:scale-110 transition-transform" />
        )}

        <span className="whitespace-nowrap font-serif tracking-wider">
          {installSuccess ? 'Installed!' : isIOS ? 'Install on iOS' : 'Install PWA App'}
        </span>
      </button>

      {/* iOS Safari Installation Instruction Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-[#121218] border border-[#d4af37]/40 p-6 shadow-2xl text-stone-200 space-y-4">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-stone-900 border border-[#d4af37]/50 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-[#d4af37]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-white">
                  Install Flawless Institution on Apple iOS
                </h3>
                <p className="text-xs text-[#d4af37]">
                  iPhone & iPad Offline Academy Edition
                </p>
              </div>
            </div>

            <div className="bg-[#0b0b10] border border-stone-800 rounded-xl p-4 text-xs space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#f3e1a9] font-bold flex items-center justify-center text-[10px]">
                  1
                </span>
                <p>
                  Open in <strong className="text-white">Safari</strong> and tap the <strong className="text-[#f3e1a9]">Share button</strong> (the square with an arrow pointing up at the bottom of the screen).
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#f3e1a9] font-bold flex items-center justify-center text-[10px]">
                  2
                </span>
                <p>
                  Scroll down the action sheet and select <strong className="text-white">Add to Home Screen</strong>.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#f3e1a9] font-bold flex items-center justify-center text-[10px]">
                  3
                </span>
                <p>
                  Tap <strong className="text-[#f3e1a9]">Add</strong> in the top-right corner. The app will appear on your Home Screen with full offline syllabus caching!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-stone-950 font-bold text-xs hover:brightness-110 transition shadow-lg"
            >
              Understood • Close Guide
            </button>
          </div>
        </div>
      )}
    </>
  );
};
