// Central Assets & Cloudinary Asset Configuration for Flawless Institution
import heroLuxuryBg from '../assets/images/hero_luxury_bg_1788148319780.jpg';
import academyTrainingBg from '../assets/images/academy_training_bg_1788148334126.jpg';
import speakingStageBg from '../assets/images/speaking_stage_bg_1788148356398.jpg';
import privateEstateBg from '../assets/images/private_estate_bg_1788148368763.jpg';
import executiveCoachingBg from '../assets/images/executive_coaching_discussion_1788371303738.jpg';
import luxuryEmployersBg from '../assets/images/luxury_estate_employers_1788371320111.jpg';
import modernEmployersBg from '../assets/images/modern_employers_collaborating_1788371452691.jpg';

// 4 Homepage Professional Skills Background Images
import caregiverSkillBg from '../assets/images/caregiver_elderly_care_1788457595007.jpg';
import nannySkillBg from '../assets/images/nanny_childcare_training_1788457620915.jpg';
import housekeepingSkillBg from '../assets/images/executive_housekeeping_service_1788457637151.jpg';
import chefSkillBg from '../assets/images/chef_culinary_assistant_1788457653512.jpg';

export interface SkillBackgroundImage {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  courseId: string;
  description: string;
}

export const HOMEPAGE_SKILLS_BACKGROUNDS: SkillBackgroundImage[] = [
  {
    id: 'caregiver',
    title: 'Caregiving & Elderly Care',
    subtitle: 'Dignified Geriatric & Bedside Support',
    image: caregiverSkillBg,
    tag: 'Healthcare Skills',
    courseId: 'caregiver-elderly-care',
    description: 'Compassionate vital signs monitoring, patient mobility assistance, and bedside dementia care.'
  },
  {
    id: 'nanny',
    title: 'Nanny / Au Pair Childcare',
    subtitle: 'Early Childhood & Developmental Routines',
    image: nannySkillBg,
    tag: 'Childcare Skills',
    courseId: 'au-pair-nanny-training',
    description: 'Certified infant care, early childhood development activities, and positive behavioural guidance.'
  },
  {
    id: 'housekeeping',
    title: 'Executive Housekeeping',
    subtitle: 'Luxury Estate Standards & 5-Star Presentation',
    image: housekeepingSkillBg,
    tag: 'Estate Management',
    courseId: 'executive-housekeeping',
    description: 'Master suite maintenance, fine linen care, VIP wardrobe handling, and silver polishing.'
  },
  {
    id: 'chef',
    title: 'Chef Assistant & Culinary',
    subtitle: 'Commercial Kitchen Support & Gourmet Prep',
    image: chefSkillBg,
    tag: 'Hospitality & Culinary',
    courseId: 'chef-assistant-training',
    description: 'Mise en place culinary skills, sanitary food handling protocols, and fine dining plating support.'
  }
];

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: 'Founder' | 'Graduation' | 'Healthcare & Nursing' | 'Administration & Campus' | 'Professional Skills';
  description?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

// 1. FOUNDER & EXECUTIVE ASSETS
export const FOUNDER_IMAGE = {
  url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454926/Founder_rltzec.jpg',
  name: 'Teldah Siyawamwaya',
  title: 'Founder & Director',
  alt: 'Teldah Siyawamwaya - Founder and Director of Flawless Institution'
};

// 2. HEALTHCARE & OLD AGE NURSING GALLERY
export const HEALTHCARE_NURSING_GALLERY: GalleryImage[] = [
  {
    id: 'nursing-1',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454906/old_age_nursing_1_fiv2ky.jpg',
    title: 'Clinical Care Practicum',
    category: 'Healthcare & Nursing',
    description: 'Hands-on geriatric patient support and vital sign assessments.',
    aspectRatio: 'landscape'
  },
  {
    id: 'nursing-2',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454907/old_age_nursing_2_itqcrx.jpg',
    title: 'Patient Mobility & Assistive Care',
    category: 'Healthcare & Nursing',
    description: 'Practical training on safe physical transfers and posture alignment.',
    aspectRatio: 'landscape'
  },
  {
    id: 'nursing-3',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454906/old_age_nursing_3_bk60d1.jpg',
    title: 'Personal Care & Hygiene Protocols',
    category: 'Healthcare & Nursing',
    description: 'Ensuring absolute dignity and sterile technique in daily patient hygiene.',
    aspectRatio: 'landscape'
  },
  {
    id: 'nursing-4',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454907/old_age_nursing_4_qmwuk4.jpg',
    title: 'Geriatric Nursing Practicals',
    category: 'Healthcare & Nursing',
    description: 'Comprehensive elderly care techniques and bedside monitoring.',
    aspectRatio: 'landscape'
  },
  {
    id: 'nursing-5',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454901/old_age_nursing_5_paagqf.jpg',
    title: 'Healthcare Cohort Practical Workshop',
    category: 'Healthcare & Nursing',
    description: 'Small-group bedside simulations led by experienced nursing instructors.',
    aspectRatio: 'landscape'
  },
  {
    id: 'nursing-6',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454903/old_age_nursing_6_ef5dtz.jpg',
    title: 'Frail Care Rehabilitation',
    category: 'Healthcare & Nursing',
    description: 'Assisting recovering and vulnerable individuals with tailored therapy routines.',
    aspectRatio: 'landscape'
  },
  {
    id: 'nursing-7',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454902/old_age_nursing_7_rfo28u.jpg',
    title: 'Bedside Nursing & Comfort Care',
    category: 'Healthcare & Nursing',
    description: 'Developing empathy and specialized attention for long-term homecare clients.',
    aspectRatio: 'landscape'
  },
  {
    id: 'nursing-8',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454903/old_age_nursing_8_iyfsl3.jpg',
    title: 'Compassionate Caregiving Training',
    category: 'Healthcare & Nursing',
    description: 'Mastering dignified companionship and ethical bedside interaction.',
    aspectRatio: 'landscape'
  },
  {
    id: 'nursing-general',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454906/old_age_nursing_o5zomv.jpg',
    title: 'Practical Clinical Skills Lab',
    category: 'Healthcare & Nursing',
    description: 'Advanced equipment orientation and emergency response protocols.',
    aspectRatio: 'landscape'
  }
];

// 3. GRADUATION GALLERY (WhatsApp ceremony photo prominently placed as FIRST image as requested)
export const GRADUATION_GALLERY: GalleryImage[] = [
  {
    id: 'grad-feature-whatsapp',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454902/WhatsApp_Image_2026-09-01_at_14.32.50_bl3pbc.jpg',
    title: 'Annual Graduation Gala & Induction',
    category: 'Graduation',
    description: 'Graduating candidates celebrate their official induction with founder Teldah Siyawamwaya.',
    aspectRatio: 'landscape'
  },
  {
    id: 'grad-1',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454901/graduation_1_mvwmiy.jpg',
    title: 'Conferral of Certificates',
    category: 'Graduation',
    description: 'Formal presentation of institutional certificates to successful candidates.',
    aspectRatio: 'landscape'
  },
  {
    id: 'grad-2',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454901/graduation_2_kxmrd3.jpg',
    title: 'Academic Dignity & Achievement',
    category: 'Graduation',
    description: 'Celebrating perseverance, mastery, and professional transformation.',
    aspectRatio: 'landscape'
  },
  {
    id: 'grad-3',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454901/graduation_3_kn1jie.jpg',
    title: 'Honouring Top Graduates',
    category: 'Graduation',
    description: 'Special recognition awards for academic excellence and ethical conduct.',
    aspectRatio: 'landscape'
  },
  {
    id: 'grad-4',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454903/graduation_4_qwaxrf.jpg',
    title: 'Graduation Procession',
    category: 'Graduation',
    description: 'Candidates entering the ceremony hall in official academic regalia.',
    aspectRatio: 'landscape'
  },
  {
    id: 'grad-5',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454903/graduation_5_qhlm0t.jpg',
    title: 'Cohort Celebration',
    category: 'Graduation',
    description: 'Graduates celebrating with families and faculty in Fourways.',
    aspectRatio: 'landscape'
  },
  {
    id: 'grad-6',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454903/graduation_6_fz8q4u.jpg',
    title: 'Induction into Alumni Network',
    category: 'Graduation',
    description: 'Inducting graduates into the active Flawless Alumni Professional Network.',
    aspectRatio: 'landscape'
  },
  {
    id: 'grad-7',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454904/graduation_7_u1mglt.jpg',
    title: 'Formal Academic Stage',
    category: 'Graduation',
    description: 'Keynote address and formal oath of professional service.',
    aspectRatio: 'landscape'
  },
  {
    id: 'grad-7-alt',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454904/graduation_7jpeg_qyedt3.jpg',
    title: 'Graduation Stage Presentation',
    category: 'Graduation',
    description: 'Ceremonial presentation on the institutional stage.',
    aspectRatio: 'landscape'
  },
  {
    id: 'grad-8',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454905/graduation_8_jpeg_pmffj7.jpg',
    title: 'Honoured Guests & Mentors',
    category: 'Graduation',
    description: 'Industry leaders and private employers join in celebrating graduate success.',
    aspectRatio: 'landscape'
  },
  {
    id: 'grad-9',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454905/graduation_9_owqvtb.jpg',
    title: 'Certified Competence Celebrated',
    category: 'Graduation',
    description: 'Empowering domestic, care, and hospitality workers across South Africa.',
    aspectRatio: 'landscape'
  },
  {
    id: 'grad-13-a',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454906/graduation_13_qyxpd3.jpg',
    title: 'Graduation Regalia & Diplomas',
    category: 'Graduation',
    description: 'Proud graduates receiving their stamped, authenticated certifications.',
    aspectRatio: 'landscape'
  },
  {
    id: 'grad-13-b',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454906/graduation_13_wkwtje.jpg',
    title: 'Annual Ceremony Milestone',
    category: 'Graduation',
    description: 'A benchmark annual milestone for the Flawless Academy community.',
    aspectRatio: 'landscape'
  },
  {
    id: 'grad-celebration',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454901/graduation_zscytm.jpg',
    title: 'Triumphant Celebration',
    category: 'Graduation',
    description: 'Shared joy, fellowship, and new beginnings.',
    aspectRatio: 'landscape'
  }
];

// 4. ADMINISTRATION & INSTITUTIONAL GALLERY
export const ADMIN_GALLERY: GalleryImage[] = [
  {
    id: 'admin-1',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454901/admin_gcrkrj.jpg',
    title: 'Executive Administration & Admissions',
    category: 'Administration & Campus',
    description: 'Dedicated student support, admissions coordination, and curriculum planning.',
    aspectRatio: 'landscape'
  },
  {
    id: 'admin-2',
    url: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454902/admin_2_wuvn0h.jpg',
    title: 'Student Services & Placements Desk',
    category: 'Administration & Campus',
    description: 'Coordinating student welfare, certification verification, and employer referrals.',
    aspectRatio: 'landscape'
  }
];

// CENTRAL DICTIONARY FOR DIRECT ACCESSIBILITY
export const CLOUDINARY_IMAGES = {
  founder: FOUNDER_IMAGE.url,
  nursing: {
    nursing1: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454906/old_age_nursing_1_fiv2ky.jpg',
    nursing2: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454907/old_age_nursing_2_itqcrx.jpg',
    nursing3: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454906/old_age_nursing_3_bk60d1.jpg',
    nursing4: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454907/old_age_nursing_4_qmwuk4.jpg',
    nursing5: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454901/old_age_nursing_5_paagqf.jpg',
    nursing6: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454903/old_age_nursing_6_ef5dtz.jpg',
    nursing7: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454902/old_age_nursing_7_rfo28u.jpg',
    nursing8: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454903/old_age_nursing_8_iyfsl3.jpg',
    practical: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454906/old_age_nursing_o5zomv.jpg'
  },
  graduation: {
    whatsappFeature: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454902/WhatsApp_Image_2026-09-01_at_14.32.50_bl3pbc.jpg',
    grad1: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454901/graduation_1_mvwmiy.jpg',
    grad2: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454901/graduation_2_kxmrd3.jpg',
    grad3: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454901/graduation_3_kn1jie.jpg',
    grad4: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454903/graduation_4_qwaxrf.jpg',
    grad5: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454903/graduation_5_qhlm0t.jpg',
    grad6: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454903/graduation_6_fz8q4u.jpg',
    grad7: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454904/graduation_7_u1mglt.jpg',
    grad7Alt: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454904/graduation_7jpeg_qyedt3.jpg',
    grad8: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454905/graduation_8_jpeg_pmffj7.jpg',
    grad9: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454905/graduation_9_owqvtb.jpg',
    grad13A: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454906/graduation_13_qyxpd3.jpg',
    grad13B: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454906/graduation_13_wkwtje.jpg',
    celebration: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454901/graduation_zscytm.jpg'
  },
  admin: {
    admin1: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454901/admin_gcrkrj.jpg',
    admin2: 'https://res.cloudinary.com/dagphoc0j/image/upload/v1788454902/admin_2_wuvn0h.jpg'
  }
};

// BACKGROUND ASSETS FOR HEROES & ATMOSPHERIC SECTIONS
export const BACKGROUND_IMAGES = {
  hero: heroLuxuryBg,
  caregiver: caregiverSkillBg,
  nanny: nannySkillBg,
  housekeeping: housekeepingSkillBg,
  chef: chefSkillBg,
  academy: academyTrainingBg,
  training: academyTrainingBg,
  speaking: speakingStageBg,
  estate: privateEstateBg,
  coaching: executiveCoachingBg,
  employers: luxuryEmployersBg,
  services: modernEmployersBg,
  enterprise: modernEmployersBg,
  founder: FOUNDER_IMAGE.url,
  graduationFeatured: CLOUDINARY_IMAGES.graduation.whatsappFeature
};

