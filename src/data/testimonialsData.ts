/**
 * Flawless Institution™ - Verified Student Success Stories & Testimonials
 * Fourways, Johannesburg, South Africa
 */
import nomvulaImg from '../assets/images/nomvula_housekeeping_graduate_1790193002911.jpg';
import thaboImg from '../assets/images/thabo_butler_graduate_1790193015268.jpg';
import preciousImg from '../assets/images/precious_caregiver_graduate_1790193025357.jpg';

export interface StudentTestimonial {
  id: string;
  name: string;
  role: string;
  placement: string;
  location: string;
  courseId: string;
  courseTitle: string;
  cohort: string;
  category: 'caregiving' | 'hospitality' | 'housekeeping' | 'childcare' | 'entrepreneurship';
  quote: string;
  outcomeMetric: string;
  rating: number;
  verifiedId: string;
  graduationYear: string;
  photoUrl: string;
  isFeatured?: boolean;
}

export const STUDENT_TESTIMONIALS: StudentTestimonial[] = [
  {
    id: 'test-nomvula-dlamini',
    name: 'Nomvula Dlamini',
    role: 'Head Executive Housekeeper',
    placement: 'Sandton Private Estate',
    location: 'Sandton, Johannesburg',
    courseId: 'executive-housekeeping',
    courseTitle: 'Executive Housekeeping & Estate Protocol',
    cohort: 'Fourways Campus • Class of 2025',
    category: 'housekeeping',
    quote: 'Before Flawless Academy, I worked without formal recognition of my skills. Teldah and the faculty taught us estate-level protocols, fabric care, delicate surfaces, and high-discretion household conduct. Within three weeks of my November graduation, I was placed through Flawless Staffing with an executive family in Sandton.',
    outcomeMetric: '+75% Income Growth & Estate Placement',
    rating: 5,
    verifiedId: 'FI-CERT-2025-0814',
    graduationYear: '2025',
    photoUrl: nomvulaImg,
    isFeatured: true
  },
  {
    id: 'test-thabo-ndlovu',
    name: 'Thabo Ndlovu',
    role: 'Lead Estate Butler & Valet',
    placement: 'Dainfern Golf & Residential Estate',
    location: 'Fourways, Johannesburg',
    courseId: 'butler-luxury-service',
    courseTitle: 'Butler & Luxury Service Masterclass',
    cohort: 'Fourways Practical Masterclass • September Intake',
    category: 'hospitality',
    quote: 'The practical simulations at the Fourways campus set this institution apart. We drilled white-glove table service, formal wine cellar management, VIP reception, and diplomatic wardrobe care. The mentorship gave me the poise needed to manage a 14-room residence with complete confidence.',
    outcomeMetric: 'Promoted to Lead Butler in 4 Months',
    rating: 5,
    verifiedId: 'FI-CERT-2025-1102',
    graduationYear: '2025',
    photoUrl: thaboImg,
    isFeatured: true
  },
  {
    id: 'test-precious-sibanda',
    name: 'Precious Sibanda',
    role: 'Specialised Geriatric Caregiver',
    placement: 'Hyde Park Private Residence',
    location: 'Hyde Park, Johannesburg',
    courseId: 'caregiver-elderly-care',
    courseTitle: 'Caregiving & Elderly Care Certification',
    cohort: 'Fourways Hybrid Intensive • June Cohort',
    category: 'caregiving',
    quote: 'Caring for an elderly patient requires not only technical knowledge of vitals and mobility, but deep human empathy and emotional dignity. Flawless instilled values of faith, service, and medical vigilance. The family I serve constantly praises the standard of care and daily hygiene logging I learned here.',
    outcomeMetric: 'Permanent Placement & Full Family Commendation',
    rating: 5,
    verifiedId: 'FI-CERT-2025-0428',
    graduationYear: '2025',
    photoUrl: preciousImg,
    isFeatured: true
  },
  {
    id: 'test-lerato-kgosi',
    name: 'Lerato Kgosi',
    role: 'Certified Au Pair & Early Childhood Lead',
    placement: 'Bryanston Diplomatic Household',
    location: 'Bryanston, Johannesburg',
    courseId: 'au-pair-nanny-training',
    courseTitle: 'Au Pair & Professional Nanny Masterclass',
    cohort: 'Online Masterclass & Practical Immersion',
    category: 'childcare',
    quote: 'The curriculum covered emergency pediatric first aid, developmental routines, and professional communication with high-profile employers. Flawless gave me the standard that elevated my career from babysitting to being an indispensable child development partner.',
    outcomeMetric: 'Secured Long-term Expatriate Placement',
    rating: 5,
    verifiedId: 'FI-CERT-2024-0931',
    graduationYear: '2024',
    photoUrl: '/assets/images/nanny_childcare_training_1788457620915.jpg',
    isFeatured: false
  },
  {
    id: 'test-sipho-mthembu',
    name: 'Sipho Mthembu',
    role: 'Private Estate Chef Assistant',
    placement: 'Steyn City Luxury Residence',
    location: 'Midrand, Gauteng',
    courseId: 'chef-assistant-training',
    courseTitle: 'Chef Assistant & Culinary Hygiene',
    cohort: 'Fourways Physical Practical Lab',
    category: 'hospitality',
    quote: 'From knife safety and HACCP sanitation to plating etiquette and allergen handling for private family banquets, the hands-on kitchen practicals prepared me for the speed and exacting expectations of high-net-worth private kitchens.',
    outcomeMetric: 'Hired Directly by Executive Chef',
    rating: 5,
    verifiedId: 'FI-CERT-2025-0612',
    graduationYear: '2025',
    photoUrl: '/assets/images/chef_culinary_assistant_1788457653512.jpg',
    isFeatured: false
  },
  {
    id: 'test-gugulethu-nkosi',
    name: 'Gugulethu Nkosi',
    role: 'Founder & Managing Director',
    placement: 'Prestige Domestic Services (Pty) Ltd',
    location: 'Centurion, Pretoria',
    courseId: 'personal-assistant-training',
    courseTitle: 'Executive Administration & Enterprise Systems',
    cohort: 'Flawless Enterprise Coaching Fellowship',
    category: 'entrepreneurship',
    quote: 'Teldah’s personal journey of building Flawless from frontline household work into a recognized institution inspired me to start my own residential cleaning business. Through Flawless Enterprise coaching, I learned contract structuring, client pricing, and staff vetting. Today my business employs 9 trained staff.',
    outcomeMetric: 'Built 9-Person Cleaning Enterprise in 1 Year',
    rating: 5,
    verifiedId: 'FI-ENT-2024-0019',
    graduationYear: '2024',
    photoUrl: '/assets/images/executive_coaching_discussion_1788371303738.jpg',
    isFeatured: false
  }
];
