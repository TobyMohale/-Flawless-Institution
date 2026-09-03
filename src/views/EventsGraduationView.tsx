import React, { useState } from 'react';
import { 
  GraduationCap, Calendar, MapPin, Award, CheckCircle2, 
  Sparkles, ArrowRight, Clock, Users, BookOpen, ZoomIn, Image as ImageIcon
} from 'lucide-react';
import { GRADUATION_INFO, SEPTEMBER_PHYSICAL_INTAKE } from '../data/siteData';
import { BACKGROUND_IMAGES, GRADUATION_GALLERY, ADMIN_GALLERY, GalleryImage } from '../data/assetsData';
import { ImageLightboxModal } from '../components/ImageLightboxModal';
import { ScrollReveal, Tilt3DCard } from '../components/MotionEffects';

interface EventsGraduationViewProps {
  setCurrentView: (view: string) => void;
  onExploreCourses: () => void;
}

export const EventsGraduationView: React.FC<EventsGraduationViewProps> = ({
  setCurrentView,
  onExploreCourses
}) => {
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [activeGalleryList, setActiveGalleryList] = useState<GalleryImage[]>(GRADUATION_GALLERY);

  const openLightbox = (gallery: GalleryImage[], index: number) => {
    setActiveGalleryList(gallery);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const primaryGraduationPhoto = GRADUATION_GALLERY[0]; // WhatsApp Image 2026-09-01

  return (
    <div className="space-y-20 pb-24 font-sans-body">
      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={activeGalleryList}
        currentIndex={lightboxIndex}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-[#d4af37]/20 bg-[#09090c]">
        {/* Background Atmosphere using the First WhatsApp Graduation Asset */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={primaryGraduationPhoto.url}
            alt="Annual Graduation & Ceremonies"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/85 to-[#0a0a0d]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0d] via-transparent to-[#0a0a0d]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#181822]/90 backdrop-blur-md border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest shadow-lg">
            <GraduationCap className="w-3.5 h-3.5 text-[#d4af37]" /> Institutional Ceremonies
          </div>

          <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight drop-shadow-md">
            EVENTS & ANNUAL GRADUATION
          </h1>

          <p className="text-sm sm:text-lg text-neutral-200 font-serif italic max-w-2xl mx-auto leading-relaxed">
            “Celebrating dedication, certified competence, and personal transformation.”
          </p>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Every year in November, Flawless Academy gathers students, employers, community leaders, and families in Fourways for our signature Graduation Ceremony.
          </p>
        </div>
      </section>

      {/* 2. FEATURED GRADUATION SPOTLIGHT (PRIMARY WHATSAPP IMAGE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="bg-[#121217] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Primary Image Display */}
              <div className="lg:col-span-7">
                <div 
                  className="relative group rounded-2xl overflow-hidden border-2 border-[#d4af37]/50 shadow-2xl cursor-pointer bg-black/60"
                  onClick={() => openLightbox(GRADUATION_GALLERY, 0)}
                >
                  <img
                    src={primaryGraduationPhoto.url}
                    alt={primaryGraduationPhoto.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-80 sm:h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  
                  {/* Badge & Zoom Overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#d4af37] text-black uppercase tracking-wider font-cinzel shadow-lg flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" /> Featured Milestone
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                        {primaryGraduationPhoto.title}
                      </h3>
                      <p className="text-xs text-neutral-300 mt-0.5">
                        {primaryGraduationPhoto.description}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-full bg-[#d4af37] text-black group-hover:scale-110 transition-transform shadow-lg">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ceremony Highlights */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3e1a9] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-cinzel">
                  <Award className="w-3.5 h-3.5 text-[#d4af37]" /> The Fourways Tradition
                </div>

                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                  Conferring Certified Competence
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Graduation at Flawless Institution is not merely a formality; it is a sacred milestone of empowerment. Household professionals and caregivers who have committed hours to rigorous practicals and ethical standards are formally honored in the presence of distinguished guests and employers.
                </p>

                <div className="space-y-2.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>Conferral of Official Flawless Authenticated Certificates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>Formal Keynote Address by Founder Teldah Siyawamwaya</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>Special Recognition for Outstanding Practical Achievement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>Induction into the Exclusive Flawless Alumni Network</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onExploreCourses}
                    id="grad-hero-enrol-cta"
                    className="w-full sm:w-auto py-3 px-6 rounded-xl text-xs font-bold bg-gradient-to-r from-[#d4af37] to-[#b38728] text-black hover:brightness-110 uppercase tracking-wider font-cinzel shadow-lg active:scale-95"
                  >
                    Enrol To Qualify For November
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. COMPLETE GRADUATION PHOTO GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-neutral-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
                <ImageIcon className="w-3.5 h-3.5" /> Photographic Archive
              </div>
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mt-1">
                Ceremony & Celebration Gallery
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Click any image to view in full resolution. Captured moments of joy, dignity, and academic milestone.
              </p>
            </div>
            <div className="text-xs font-mono text-[#f3e1a9] bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg self-start sm:self-auto">
              {GRADUATION_GALLERY.length} Official Photos
            </div>
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {GRADUATION_GALLERY.map((img, idx) => (
            <ScrollReveal key={img.id} direction="up" delay={idx * 0.05}>
              <div
                onClick={() => openLightbox(GRADUATION_GALLERY, idx)}
                className="group relative rounded-xl overflow-hidden border border-neutral-800 hover:border-[#d4af37]/60 bg-[#111116] shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden bg-black/40">
                  <img
                    src={img.url}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Index tag */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 border border-neutral-700 text-neutral-300">
                    #{idx + 1}
                  </span>
                </div>

                {/* Hover zoom indicator */}
                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-[#d4af37]/80 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>

                {/* Bottom title */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-cinzel text-xs font-bold text-white truncate group-hover:text-[#f3e1a9] transition-colors">
                    {img.title}
                  </h4>
                  {img.description && (
                    <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                      {img.description}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. INSTITUTIONAL ADMINISTRATION & CAMPUS DESK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="bg-gradient-to-r from-[#17140e] via-[#241e12] to-[#17140e] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
                  Campus Facilities
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                  Admissions, Student Services & Administration
                </h3>
                <p className="text-xs text-neutral-300 mt-1 max-w-2xl">
                  Our professional campus desk in Fourways coordinates candidate admissions, records verification, and graduation credential conferral.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ADMIN_GALLERY.map((adminImg, idx) => (
                <div
                  key={adminImg.id}
                  onClick={() => openLightbox(ADMIN_GALLERY, idx)}
                  className="group relative rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#d4af37]/50 bg-[#0d0d12] shadow-xl cursor-pointer"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={adminImg.url}
                      alt={adminImg.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 bg-[#111117] border-t border-neutral-800/80">
                    <h4 className="font-cinzel text-sm font-bold text-[#f3e1a9]">
                      {adminImg.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1">
                      {adminImg.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

