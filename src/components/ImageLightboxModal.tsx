import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Award, ZoomIn } from 'lucide-react';
import { GalleryImage } from '../data/assetsData';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex] || images[0];

  return (
    <div 
      id="lightbox-overlay"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e1a9] font-cinzel">
            {current.category}
          </span>
          <span className="text-xs text-neutral-400 font-mono">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          id="lightbox-close-btn"
          aria-label="Close Lightbox"
          className="p-2.5 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            id="lightbox-prev-btn"
            aria-label="Previous Image"
            className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/70 border border-[#d4af37]/40 text-[#f3e1a9] hover:bg-[#d4af37] hover:text-black transition-all shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            id="lightbox-next-btn"
            aria-label="Next Image"
            className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/70 border border-[#d4af37]/40 text-[#f3e1a9] hover:bg-[#d4af37] hover:text-black transition-all shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <img
          src={current.url}
          alt={current.title}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] max-w-full w-auto object-contain rounded-xl shadow-2xl border border-neutral-800"
        />
      </div>

      {/* Caption Bar */}
      <div className="max-w-3xl mx-auto w-full text-center space-y-1 bg-[#101016]/80 p-4 rounded-xl border border-neutral-800">
        <h3 className="text-base sm:text-lg font-cinzel font-bold text-white">
          {current.title}
        </h3>
        {current.description && (
          <p className="text-xs sm:text-sm text-neutral-300">
            {current.description}
          </p>
        )}
      </div>
    </div>
  );
};
