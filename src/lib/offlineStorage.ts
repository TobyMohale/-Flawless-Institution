/**
 * Flawless Institution™ - Offline Learning Storage & Caching Layer (Stage 9)
 * Local persistent caching for:
 * - Course Syllabus Checklists (interactive module checklists & student progress)
 * - Household Etiquette Guides (Silver Service, VIP Protocol, POPIA Confidentiality, Elderly Care)
 */
import { COURSES } from '../data/coursesData';

export interface SyllabusItem {
  id: string;
  title: string;
  description: string;
  practicalHours: number;
  completed: boolean;
  notes?: string;
  keyConcepts: string[];
}

export interface CourseSyllabusChecklist {
  courseId: string;
  courseTitle: string;
  qualificationLevel: string;
  totalHours: number;
  lastUpdated: string;
  items: SyllabusItem[];
}

export interface EtiquetteGuide {
  id: string;
  title: string;
  category: 'Silver Service' | 'VIP Protocol' | 'Confidentiality & POPIA' | 'Elderly Care' | 'Deportment & Uniform';
  readingTimeMinutes: number;
  summary: string;
  rules: {
    ruleNumber: number;
    heading: string;
    detail: string;
    do: string;
    doNot: string;
  }[];
  quickChecklist: string[];
}

const STORAGE_KEYS = {
  SYLLABUS_CHECKLISTS: 'flawless_offline_syllabus_checklists',
  ETIQUETTE_GUIDES: 'flawless_offline_etiquette_guides',
  CACHE_METADATA: 'flawless_offline_cache_metadata',
};

// Default Course Syllabus Checklists compiled from institutional curricula
const DEFAULT_SYLLABUS_CHECKLISTS: CourseSyllabusChecklist[] = [
  {
    courseId: 'executive-butler-valet',
    courseTitle: 'Executive Butler & Valet Masterclass',
    qualificationLevel: 'FI Executive Master Diploma • SAQA Aligned Level 5',
    totalHours: 120,
    lastUpdated: '2026-09-01',
    items: [
      {
        id: 'eb-mod-1',
        title: 'Module 1: The Modern Gentleman & Lady Butler Creed',
        description: 'Historical heritage of British and European butlering adapted to modern South African luxury estates (Sandton, Hyde Park, Steyn City, Franschhoek).',
        practicalHours: 15,
        completed: true,
        keyConcepts: ['Anticipatory Service', 'Spatial Invisibility', 'Household Hierarchy'],
      },
      {
        id: 'eb-mod-2',
        title: 'Module 2: Haute Table Artistry & Silver Service Execution',
        description: 'Multi-course formal place settings, English/French service, crystal polishing, decanting vintage wines, and cigar service.',
        practicalHours: 30,
        completed: false,
        keyConcepts: ['English Silver Service', 'Cover Spacing (2.5cm)', 'Decanting Protocol'],
      },
      {
        id: 'eb-mod-3',
        title: 'Module 3: Bespoke Valet & Luxury Wardrobe Management',
        description: 'Care of luxury textiles (cashmere, vicuña, bespoke tailored suits), rotary steaming, shoe polishing art, and luxury luggage packing.',
        practicalHours: 25,
        completed: false,
        keyConcepts: ['Textile Conservation', 'Luggage Compartmentalisation', 'Valet Pressing'],
      },
      {
        id: 'eb-mod-4',
        title: 'Module 4: Chauffeur & VIP Principal Protocol',
        description: 'Executive vehicle preparation, route reconnaissance, umbrella escort in inclement weather, and gate greeting etiquette.',
        practicalHours: 20,
        completed: false,
        keyConcepts: ['Vehicle Ambience', 'Escort Protocol', 'Security Awareness'],
      },
      {
        id: 'eb-mod-5',
        title: 'Module 5: Cellar & Beverage Inventory Controls',
        description: 'Stock control registers, optimal temperature storage for MCC/Champagne and reds, and beverage inventory reconciliations.',
        practicalHours: 30,
        completed: false,
        keyConcepts: ['Cellar Temperature Maps', 'Stock Reconciliation', 'Glassware Selection'],
      },
    ],
  },
  {
    courseId: 'caregiving-elderly-care',
    courseTitle: 'Caregiving & Elderly Care Intensive',
    qualificationLevel: 'FI Certified Clinical & Domestic Caregiver • Level 4',
    totalHours: 90,
    lastUpdated: '2026-09-01',
    items: [
      {
        id: 'cg-mod-1',
        title: 'Module 1: Patient Dignity & Emotional Well-Being',
        description: 'Empathetic communication, respecting autonomy, emotional support, and mental stimulation through companionship.',
        practicalHours: 15,
        completed: true,
        keyConcepts: ['Person-Centred Care', 'Active Listening', 'Dignity Preservation'],
      },
      {
        id: 'cg-mod-2',
        title: 'Module 2: Vital Signs Monitoring & Health Log Books',
        description: 'Blood pressure cuff operation, glucometer readings, temperature tracking, and daily medical journal logging.',
        practicalHours: 25,
        completed: true,
        keyConcepts: ['Hypertension Indicators', 'Glucose Tracking', 'Daily Shift Handover'],
      },
      {
        id: 'cg-mod-3',
        title: 'Module 3: Fall Prevention & Safe Mobility Assistance',
        description: 'Transfer techniques from bed to wheelchair, gait belt application, bathroom grab bar safety, and non-slip environment audits.',
        practicalHours: 25,
        completed: false,
        keyConcepts: ['Biomechanics of Transfer', 'Fall Risk Audit', 'Assistive Devices'],
      },
      {
        id: 'cg-mod-4',
        title: 'Module 4: Medication Adherence & Emergency Protocols',
        description: 'Dosette box organization, verifying prescribed times, allergy avoidance, and rapid escalation to emergency medical services.',
        practicalHours: 25,
        completed: false,
        keyConcepts: ['Medication Charting', 'Emergency 10111 / Netcare 911 Protocols'],
      },
    ],
  },
  {
    courseId: 'professional-housekeeping-estate',
    courseTitle: 'Professional Housekeeping & Estate Maintenance',
    qualificationLevel: 'FI Executive Estate Specialist • Level 3',
    totalHours: 80,
    lastUpdated: '2026-09-01',
    items: [
      {
        id: 'hk-mod-1',
        title: 'Module 1: Chemical Safety & Luxury Surface Care',
        description: 'Treating natural marble, travertine, granite, brass, and hardwood floors without acidic corrosive damage.',
        practicalHours: 20,
        completed: true,
        keyConcepts: ['pH Neutral Cleaning', 'Marble Sealing', 'Chemical Dilution Ratios'],
      },
      {
        id: 'hk-mod-2',
        title: 'Module 2: 5-Star Turndown & Linen Artistry',
        description: 'Hospital corners, 800-thread Egyptian cotton linen handling, decorative duvet fold techniques, and aroma curation.',
        practicalHours: 20,
        completed: false,
        keyConcepts: ['Mitred Hospital Corners', 'Pillow Plumping', 'Evening Turndown'],
      },
      {
        id: 'hk-mod-3',
        title: 'Module 3: Deep Cleaning Scheduling & Stock Audits',
        description: 'Creating rotating master cleaning schedules for multi-storey residential estates and recording supply consumption.',
        practicalHours: 20,
        completed: false,
        keyConcepts: ['Master Rota Design', 'Quarterly Deep Clean', 'Cleaning Inventory'],
      },
      {
        id: 'hk-mod-4',
        title: 'Module 4: Laundry Chemistry & Stain Eradication',
        description: 'Removing red wine, grease, makeup, and coffee stains from luxury textiles without garment degradation.',
        practicalHours: 20,
        completed: false,
        keyConcepts: ['Stain Pre-treatment', 'Water Hardness Adjustments', 'Delicate Wash Cycles'],
      },
    ],
  },
];

// Comprehensive Household Etiquette Reference Guides for Offline Field Use
const DEFAULT_ETIQUETTE_GUIDES: EtiquetteGuide[] = [
  {
    id: 'etiquette-silver-service',
    title: 'Haute Table Artistry & Silver Service Field Manual',
    category: 'Silver Service',
    readingTimeMinutes: 12,
    summary: 'Master standard formal banquet and private family table settings, cutlery alignments, and discreet serving sequences.',
    rules: [
      {
        ruleNumber: 1,
        heading: 'Cover Spacing & Geometric Symmetry',
        detail: 'The base of all flatware and the charger plate must sit exactly 2.5 centimetres (one thumb width) from the edge of the table. Spacing between place settings must measure 50 to 60 centimetres.',
        do: 'Align cutlery baselines meticulously with a formal measuring guide.',
        doNot: 'Never touch cutlery prongs, blades, or the bowls of spoons with bare fingers.',
      },
      {
        ruleNumber: 2,
        heading: 'Serving & Clearing Directionality',
        detail: 'In formal French/English service, serve food from the guest’s LEFT using the service fork and spoon, and clear used plates from the guest’s RIGHT.',
        do: 'Approach guests silently from the left when presenting platters.',
        doNot: 'Never reach across a guest’s line of sight or over their plate.',
      },
      {
        ruleNumber: 3,
        heading: 'Beverage & Crystal Pouring Etiquette',
        detail: 'Pour wines, water, and champagne from the guest’s RIGHT. The bottle neck must never touch the crystal rim. Conclude each pour with a slight clockwise rotation and wipe with a clean linen service cloth.',
        do: 'Keep the label facing the host when pouring.',
        doNot: 'Never overfill glasses; fill red wine to 1/3, white to 1/2, and champagne to 3/4.',
      },
    ],
    quickChecklist: [
      'Napkins folded and placed on charger or to the left of the forks.',
      'Water goblet aligned directly above the principal dinner knife.',
      'Salt and pepper cellars placed together between every two covers.',
      'Butter knives angled across bread plates at a uniform 45-degree slant.',
    ],
  },
  {
    id: 'etiquette-vip-protocol',
    title: 'VIP Principal Protocol, Wardrobe & Deportment',
    category: 'VIP Protocol',
    readingTimeMinutes: 10,
    summary: 'The code of conduct for operating inside high-profile, ultra-high-net-worth (UHNW) and executive households.',
    rules: [
      {
        ruleNumber: 1,
        heading: 'Anticipatory Silence & Spatial Invisibility',
        detail: 'The highest compliment for professional household staff is seamless service that appears effortlessly without drawing attention to itself. Speak only when addressed or when necessary to deliver essential information.',
        do: 'Acknowledge principals with polite, concise verbal confirmations: "Certainly, Sir" or "Right away, Ma\'am".',
        doNot: 'Never interrupt a private meeting, phone conversation, or family meal for routine queries.',
      },
      {
        ruleNumber: 2,
        heading: 'Luxury Garment Steaming & Pressing Protocol',
        detail: 'Inspect garment care labels prior to applying heat. For cashmere and vicuña, steam exclusively from the reverse with a protective cloth barrier.',
        do: 'Hang tailored suit jackets on broad wooden wishbone hangers to retain shoulder shape.',
        doNot: 'Never press trousers directly on the right side without an organza press cloth to avoid unsightly sheen.',
      },
      {
        ruleNumber: 3,
        heading: 'Luggage Packing Architecture',
        detail: 'Place heavy items (footwear inside flannel dust bags, toiletries inside waterproof pouches) at the wheel-end of the suitcase. Interleave evening wear with acid-free tissue paper.',
        do: 'Fasten internal luggage compression straps snugly to prevent shifting during transit.',
        doNot: 'Never pack open liquids or perfumes without individual ziplock sealing.',
      },
    ],
    quickChecklist: [
      'Morning briefing prepared: itinerary, weather, wardrobe selection, dietary changes.',
      'Footwear polished and placed ready with cedar shoe trees inserted.',
      'Mobile phones kept on silent in service areas at all times.',
      'Vehicle interiors vacuumed and climate-controlled 10 minutes prior to departure.',
    ],
  },
  {
    id: 'etiquette-popia-confidentiality',
    title: 'POPIA Compliance & Estate Confidentiality Standard',
    category: 'Confidentiality & POPIA',
    readingTimeMinutes: 8,
    summary: 'Strict protection of personal information under South Africa POPIA Act No 4 of 2013 and executive non-disclosure standards.',
    rules: [
      {
        ruleNumber: 1,
        heading: 'Absolute Digital Silence & Photography Ban',
        detail: 'Taking photographs, videos, or audio recordings inside the principal’s estate, vehicles, or grounds is strictly prohibited without prior written director authorization.',
        do: 'Leave personal smartphones inside staff lockers during working shifts.',
        doNot: 'Never post estate locations, family schedules, or guest appearances on social media platforms.',
      },
      {
        ruleNumber: 2,
        heading: 'Document Shredding & Waste Sanitization',
        detail: 'Financial statements, itineraries, flight confirmations, and school schedules found in waste bins must be cross-cut shredded rather than placed in general recycling.',
        do: 'Use the institutional cross-cut shredder for any discarded principal correspondence.',
        doNot: 'Never read or discuss letters, invoices, or legal contracts left on desks or tables.',
      },
      {
        ruleNumber: 3,
        heading: 'Visitor Privacy & Gate Verification',
        detail: 'Verify all delivery drivers, contractors, and visiting dignitaries against the estate security guest manifest before granting gate clearance.',
        do: 'Request official identification from unannounced visitors and telephone the security control room.',
        doNot: 'Never disclose whether the principal is home or away to third parties.',
      },
    ],
    quickChecklist: [
      'Signed Non-Disclosure Agreement (NDA) on file with Flawless Institution.',
      'No mention of principal names in casual social or industry circles.',
      'Estate access codes and smart lock PINs never written on sticky notes.',
      'Any suspicious inquiries reported immediately to estate security.',
    ],
  },
  {
    id: 'etiquette-elderly-care',
    title: 'Patient Dignity, Mobility & Vital Signs Protocols',
    category: 'Elderly Care',
    readingTimeMinutes: 14,
    summary: 'Compassionate caregiving standards designed to ensure physical safety, dignity, and clinical adherence for elderly clients.',
    rules: [
      {
        ruleNumber: 1,
        heading: 'Preserving Independence & Autonomy',
        detail: 'Encourage clients to perform daily living tasks (dressing, grooming, selecting meals) to the maximum extent of their safe physical capability.',
        do: 'Patiently wait while the client buttons their own shirt or chooses their preferred jacket.',
        doNot: 'Never rush a client or treat them as helpless; always ask permission before touching them.',
      },
      {
        ruleNumber: 2,
        heading: 'Two-Point Gait & Wheelchair Transfer Safety',
        detail: 'Ensure wheelchair wheel locks are firmly engaged before initiating any sit-to-stand transfer. Use a gait belt around the waist rather than pulling on armpits.',
        do: 'Count aloud: "One, two, three, stand together" so the client anticipates the movement.',
        doNot: 'Never pull a client by the arms or wrists; this causes shoulder subluxation.',
      },
      {
        ruleNumber: 3,
        heading: 'Hydration & Nutrition Vigilance',
        detail: 'Elderly individuals frequently lose the sensation of thirst. Offer room-temperature filtered water, rooibos tea, or broth every 90 minutes.',
        do: 'Record fluid intake in the daily caregiver log book.',
        doNot: 'Never offer liquids while the client is reclined flat on their back to avoid choking/aspiration.',
      },
    ],
    quickChecklist: [
      'Morning blood pressure, pulse, and temperature logged in the shift journal.',
      'Pathways cleared of loose throw rugs, electrical cords, and clutter.',
      'Prescribed medications administered with water and recorded on the chart.',
      'Emergency numbers (client physician, next of kin, Netcare 911) verified on the fridge chart.',
    ],
  },
];

export class OfflineStorageManager {
  /**
   * Get all cached course syllabus checklists
   */
  public static getSyllabusChecklists(): CourseSyllabusChecklist[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SYLLABUS_CHECKLISTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading offline syllabus from localStorage', e);
    }
    // Initialize default if not present
    this.saveSyllabusChecklists(DEFAULT_SYLLABUS_CHECKLISTS);
    return DEFAULT_SYLLABUS_CHECKLISTS;
  }

  /**
   * Save all course syllabus checklists
   */
  public static saveSyllabusChecklists(checklists: CourseSyllabusChecklist[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SYLLABUS_CHECKLISTS, JSON.stringify(checklists));
      this.updateCacheMetadata();
    } catch (e) {
      console.error('Error saving syllabus checklists', e);
    }
  }

  /**
   * Toggle completion state of a syllabus item
   */
  public static toggleSyllabusItem(courseId: string, itemId: string): CourseSyllabusChecklist[] {
    const checklists = this.getSyllabusChecklists();
    const updated = checklists.map(c => {
      if (c.courseId === courseId) {
        return {
          ...c,
          lastUpdated: new Date().toISOString().split('T')[0],
          items: c.items.map(item => {
            if (item.id === itemId) {
              return { ...item, completed: !item.completed };
            }
            return item;
          }),
        };
      }
      return c;
    });

    this.saveSyllabusChecklists(updated);
    return updated;
  }

  /**
   * Update student notes on a specific syllabus module
   */
  public static updateSyllabusItemNotes(courseId: string, itemId: string, notes: string): CourseSyllabusChecklist[] {
    const checklists = this.getSyllabusChecklists();
    const updated = checklists.map(c => {
      if (c.courseId === courseId) {
        return {
          ...c,
          lastUpdated: new Date().toISOString().split('T')[0],
          items: c.items.map(item => {
            if (item.id === itemId) {
              return { ...item, notes };
            }
            return item;
          }),
        };
      }
      return c;
    });

    this.saveSyllabusChecklists(updated);
    return updated;
  }

  /**
   * Get all cached household etiquette field guides
   */
  public static getEtiquetteGuides(): EtiquetteGuide[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ETIQUETTE_GUIDES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading offline etiquette guides from localStorage', e);
    }
    // Initialize default if not present
    this.saveEtiquetteGuides(DEFAULT_ETIQUETTE_GUIDES);
    return DEFAULT_ETIQUETTE_GUIDES;
  }

  /**
   * Save all household etiquette field guides
   */
  public static saveEtiquetteGuides(guides: EtiquetteGuide[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ETIQUETTE_GUIDES, JSON.stringify(guides));
      this.updateCacheMetadata();
    } catch (e) {
      console.error('Error saving etiquette guides', e);
    }
  }

  /**
   * Cache all institutional learning assets into offline storage
   */
  public static forceRefreshAllOfflineContent(): {
    syllabusCount: number;
    etiquetteCount: number;
    cachedAt: string;
    totalBytes: number;
  } {
    this.saveSyllabusChecklists(DEFAULT_SYLLABUS_CHECKLISTS);
    this.saveEtiquetteGuides(DEFAULT_ETIQUETTE_GUIDES);
    const meta = this.getCacheMetadata();
    return {
      syllabusCount: DEFAULT_SYLLABUS_CHECKLISTS.length,
      etiquetteCount: DEFAULT_ETIQUETTE_GUIDES.length,
      cachedAt: meta.lastCachedAt,
      totalBytes: meta.approxBytes,
    };
  }

  /**
   * Clear all offline caches
   */
  public static clearOfflineCache(): void {
    localStorage.removeItem(STORAGE_KEYS.SYLLABUS_CHECKLISTS);
    localStorage.removeItem(STORAGE_KEYS.ETIQUETTE_GUIDES);
    localStorage.removeItem(STORAGE_KEYS.CACHE_METADATA);
  }

  /**
   * Get storage diagnostics & metadata
   */
  public static getCacheMetadata() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CACHE_METADATA);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}

    const syllabusStr = localStorage.getItem(STORAGE_KEYS.SYLLABUS_CHECKLISTS) || '';
    const etiquetteStr = localStorage.getItem(STORAGE_KEYS.ETIQUETTE_GUIDES) || '';
    const approxBytes = (syllabusStr.length + etiquetteStr.length) * 2; // UTF-16 approx

    const meta = {
      lastCachedAt: new Date().toISOString(),
      serviceWorkerStatus: 'active',
      isOfflineReady: true,
      approxBytes,
      quotaEstimate: '50 MB (Browser Storage)',
    };
    try {
      localStorage.setItem(STORAGE_KEYS.CACHE_METADATA, JSON.stringify(meta));
    } catch (e) {}
    return meta;
  }

  private static updateCacheMetadata() {
    const syllabusStr = localStorage.getItem(STORAGE_KEYS.SYLLABUS_CHECKLISTS) || '';
    const etiquetteStr = localStorage.getItem(STORAGE_KEYS.ETIQUETTE_GUIDES) || '';
    const approxBytes = (syllabusStr.length + etiquetteStr.length) * 2;

    const meta = {
      lastCachedAt: new Date().toISOString(),
      serviceWorkerStatus: 'active',
      isOfflineReady: true,
      approxBytes,
      quotaEstimate: '50 MB (Browser Storage)',
    };
    try {
      localStorage.setItem(STORAGE_KEYS.CACHE_METADATA, JSON.stringify(meta));
    } catch (e) {}
  }
}
