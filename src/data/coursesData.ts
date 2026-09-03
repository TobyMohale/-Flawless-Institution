export interface Course {
  id: string;
  title: string;
  category: 'Care & Support' | 'Business & Professional' | 'Hospitality & Housekeeping' | 'Home & Family Services' | 'Education & Development';
  normalPrice: number;
  specialPrice: number;
  physicalPrice?: number;
  registrationFee: number;
  description: string;
  overview: string;
  targetAudience: string[];
  learningOutcomes: string[];
  modules: string[];
  format: 'Online' | 'Online & Physical (Fourways)' | 'Physical (Fourways)';
  duration: string;
  level: 'Foundational' | 'Intermediate' | 'Executive / Advanced';
  popular?: boolean;
  featured?: boolean;
  physicalAvailableSeptember?: boolean;
  careerPathways: string[];
}

export const COURSES: Course[] = [
  // 1. CARE & SUPPORT
  {
    id: 'caregiver-elderly-care',
    title: 'Caregiver & Elderly Care',
    category: 'Care & Support',
    normalPrice: 2000,
    specialPrice: 1500,
    physicalPrice: 3500,
    registrationFee: 300,
    description: 'Build foundational knowledge and practical skills for supporting elderly and care-dependent individuals with professionalism, dignity and compassion.',
    overview: 'This comprehensive programme prepares candidates to deliver dignified, compassionate, and technically sound care to elderly and vulnerable individuals in private residences, assisted living facilities, and care centres.',
    targetAudience: [
      'Individuals seeking to enter the elderly caregiving sector',
      'Household professionals wishing to upskill into specialised care',
      'Family caregivers looking to master proper care techniques and ethics',
      'Candidates preparing for private home care positions locally or internationally'
    ],
    learningOutcomes: [
      'Understand the biological, psychological, and social aspects of ageing',
      'Master safe patient mobility, lifting techniques, and fall prevention',
      'Administer personal hygiene, grooming, and nutritional feeding support',
      'Monitor vital signs and recognise emergency medical warning signs',
      'Maintain patient confidentiality, emotional dignity, and ethical standards'
    ],
    modules: [
      'Module 1: Principles of Geriatric & Compassionate Care',
      'Module 2: Hygiene, Bathing & Personal Grooming Protocols',
      'Module 3: Safe Patient Transfers, Mobility & Assistive Devices',
      'Module 4: Nutrition, Hydration & Special Dietary Needs',
      'Module 5: Medication Prompts, Vital Monitoring & Record Keeping',
      'Module 6: Professional Ethics, Boundaries & Communication'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '4 - 6 Weeks (Self-Paced / In-Person)',
    level: 'Foundational',
    popular: true,
    featured: true,
    physicalAvailableSeptember: true,
    careerPathways: ['Private Home Caregiver', 'Assisted Living Assistant', 'Frailed Care Support Worker']
  },
  {
    id: 'au-pair-nanny-training',
    title: 'Au Pair / Nanny Training',
    category: 'Care & Support',
    normalPrice: 1600,
    specialPrice: 1200,
    physicalPrice: 1950,
    registrationFee: 300,
    description: 'Develop professional childcare knowledge and the skills required to support children and families in a professional household environment.',
    overview: 'Equips au pairs, nannies, and childminders with the developmental understanding, household safety protocols, structured routine planning, and emotional intelligence needed by modern high-standard families.',
    targetAudience: [
      'Aspiring au pairs seeking local or overseas placements',
      'Domestic childminders wishing to elevate their professional standing',
      'Young professionals and graduates looking for flexible childcare careers'
    ],
    learningOutcomes: [
      'Formulate age-appropriate daily routines, milestone tracking, and play schedules',
      'Implement child safety, hazard prevention, and basic emergency response',
      'Communicate effectively with parents and navigate household boundaries',
      'Manage positive discipline, emotional co-regulation, and behavioral challenges'
    ],
    modules: [
      'Module 1: Child Development Milestones & Developmental Stages',
      'Module 2: Child Safety, Household Risk Assessment & Choking Prevention',
      'Module 3: Daily Routine Design, Meal Planning & Nutritional Support',
      'Module 4: Positive Discipline, Boundaries & Tantrum Management',
      'Module 5: Professional Employer-Au Pair Communication & Conduct'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '4 Weeks',
    level: 'Foundational',
    popular: true,
    physicalAvailableSeptember: true,
    careerPathways: ['Professional Au Pair', 'Full-Time Private Nanny', 'Governess Assistant']
  },
  {
    id: 'first-aid-cpr',
    title: 'First Aid & CPR',
    category: 'Care & Support',
    normalPrice: 800,
    specialPrice: 600,
    registrationFee: 300,
    description: 'Develop essential first-aid and emergency-response knowledge to strengthen your preparedness in professional and household environments.',
    overview: 'Essential life-saving readiness for domestic staff, au pairs, carers, and business professionals to handle household medical crises, burns, cuts, seizures, and sudden cardiac emergencies.',
    targetAudience: [
      'All household professionals, domestic workers, and child carers',
      'Corporate receptionists, office assistants, and facility staff',
      'Parents and guardians seeking practical home safety preparedness'
    ],
    learningOutcomes: [
      'Perform CPR protocols on adults, children, and infants',
      'Apply correct first-aid interventions for burns, bleeding, and bone fractures',
      'Manage choking situations using the Heimlich manoeuvre safely',
      'Assemble and maintain an emergency household first-aid kit'
    ],
    modules: [
      'Module 1: Emergency Scene Assessment & Primary Safety Rules',
      'Module 2: CPR & Recovery Position for Adults, Children & Babies',
      'Module 3: Choking Management & Airway Obstruction Response',
      'Module 4: Wound Care, Bleeding Control, Burns & Shock Management',
      'Module 5: Handling Common Emergencies: Allergic Reactions, Poisoning & Seizures'
    ],
    format: 'Online',
    duration: '2 Weeks',
    level: 'Foundational',
    careerPathways: ['Certified Emergency Responder in Households', 'Workplace First Aider']
  },
  {
    id: 'aged-care-disability-support',
    title: 'Aged Care & Disability Support',
    category: 'Care & Support',
    normalPrice: 1200,
    specialPrice: 800,
    physicalPrice: 1450,
    registrationFee: 300,
    description: 'Develop foundational skills for supporting individuals requiring aged care or disability support.',
    overview: 'Learn the specialized nuances of supporting individuals experiencing chronic health challenges, physical mobility restrictions, or intellectual disabilities with maximum empowerment and respect.',
    targetAudience: [
      'Healthcare and domestic staff working with differently-abled individuals',
      'Caregivers seeking cross-disciplinary disability credentials'
    ],
    learningOutcomes: [
      'Promote independence and personal autonomy for supported individuals',
      'Assist with adaptive equipment, wheelchairs, and physical mobility devices',
      'Understand ethical safeguarding, anti-discrimination, and rights-based care'
    ],
    modules: [
      'Module 1: Understanding Disabilities & Functional Needs',
      'Module 2: Assistive Devices, Hoists & Wheelchair Navigation',
      'Module 3: Promoting Independence & Dignity in Daily Living',
      'Module 4: Emotional Support, Active Listening & Conflict De-escalation'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '3 Weeks',
    level: 'Foundational',
    physicalAvailableSeptember: true,
    careerPathways: ['Disability Support Worker', 'Community Care Facilitator']
  },
  {
    id: 'dementia-care-assistant',
    title: 'Dementia Care Assistant',
    category: 'Care & Support',
    normalPrice: 1200,
    specialPrice: 800,
    physicalPrice: 1450,
    registrationFee: 300,
    description: 'Develop foundational knowledge and practical awareness for supporting individuals living with dementia.',
    overview: 'Specialised training designed to navigate the progressive stages of Alzheimer’s disease and other forms of dementia, minimizing distress and fostering comforting, structured routines.',
    targetAudience: [
      'Carers and companions working with Alzheimer’s or dementia patients',
      'Families seeking empathetic and scientifically grounded coping strategies'
    ],
    learningOutcomes: [
      'Understand dementia progression and memory decline triggers',
      'Apply validation therapy and memory stimulation routines',
      'Manage agitation, wandering, and sundowning symptoms calmly'
    ],
    modules: [
      'Module 1: Types & Stages of Dementia',
      'Module 2: Cognitive Stimulation & Sensory Engagement',
      'Module 3: Managing Behavioral Changes & Sundowning',
      'Module 4: Creating a Safe, Calming Household Environment'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '3 Weeks',
    level: 'Intermediate',
    physicalAvailableSeptember: true,
    careerPathways: ['Specialist Memory Care Assistant', 'Elderly Companion']
  },
  {
    id: 'newborn-infant-care',
    title: 'Newborn & Infant Care',
    category: 'Care & Support',
    normalPrice: 1200,
    specialPrice: 800,
    physicalPrice: 1450,
    registrationFee: 300,
    description: 'Develop practical knowledge for providing appropriate support and care for newborns and infants.',
    overview: 'Master the delicate arts of newborn bathing, sterilisation, sleep routines, swaddling, umbilical cord care, and maternal post-partum support.',
    targetAudience: [
      'Maternity nurses, night nannies, and infant care specialists',
      'Domestic professionals expanding into infant care'
    ],
    learningOutcomes: [
      'Implement safe sleep practices according to SIDS prevention guidelines',
      'Handle bottle sterilisation, formula preparation, and burping techniques',
      'Recognise infant health flags, colic symptoms, and fever signs'
    ],
    modules: [
      'Module 1: The Fourth Trimester & Newborn Anatomy',
      'Module 2: Sterilisation, Feeding & Burping Protocols',
      'Module 3: Bathing, Cord Care, Nappy Changing & Skin Health',
      'Module 4: Sleep Training Foundations & SIDS Safety'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '3 Weeks',
    level: 'Foundational',
    physicalAvailableSeptember: true,
    careerPathways: ['Night Nanny', 'Maternity Care Assistant']
  },

  // 2. BUSINESS & PROFESSIONAL
  {
    id: 'personal-assistant-training',
    title: 'Personal Assistant Training',
    category: 'Business & Professional',
    normalPrice: 2000,
    specialPrice: 1500,
    physicalPrice: 3500,
    registrationFee: 300,
    description: 'Develop professional administrative, organisational, communication and executive-support skills.',
    overview: 'Learn how to become an indispensable right hand to executives, high-net-worth individuals, or corporate leaders by mastering diary management, itinerary coordination, discretion, and executive communication.',
    targetAudience: [
      'Aspiring Personal Assistants and Executive Assistants',
      'Administrative workers looking to upgrade to private C-suite support',
      'Household managers transitioning into lifestyle executive support'
    ],
    learningOutcomes: [
      'Manage complex multi-calendar schedules, travel itineraries, and meetings',
      'Draft impeccable business correspondence, memos, and executive briefings',
      'Demonstrate absolute discretion, confidentiality, and gatekeeping acumen',
      'Utilise modern digital productivity and organisation tools efficiently'
    ],
    modules: [
      'Module 1: Role of the Modern Executive & Personal Assistant',
      'Module 2: Diary & Complex Calendar Orchestration',
      'Module 3: High-Touch Travel & Hospitality Coordination',
      'Module 4: Professional Business Writing & Executive Etiquette',
      'Module 5: Confidentiality, Privacy & High-Stakes Discretion'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '4 - 6 Weeks',
    level: 'Intermediate',
    popular: true,
    physicalAvailableSeptember: true,
    careerPathways: ['Executive Personal Assistant', 'Lifestyle Concierge Manager', 'Private Office Coordinator']
  },
  {
    id: 'receptionist-training',
    title: 'Receptionist Training',
    category: 'Business & Professional',
    normalPrice: 2000,
    specialPrice: 1500,
    physicalPrice: 3500,
    registrationFee: 300,
    description: 'Develop professional front-office, communication, customer-service and administrative skills.',
    overview: 'The receptionist is the voice and first visual impression of any esteemed institution or corporate firm. Master professional telephonics, visitor greeting, switchboards, and front-desk diplomacy.',
    targetAudience: [
      'Entry-level job seekers looking for corporate or hotel front-desk roles',
      'Office administrators wanting to refine their customer service polish'
    ],
    learningOutcomes: [
      'Deliver world-class telephone etiquette and visitor hospitality',
      'Handle difficult callers and visitors with grace and assertiveness',
      'Manage mail, deliveries, visitor security logs, and meeting room bookings'
    ],
    modules: [
      'Module 1: First Impressions & Professional Image Standards',
      'Module 2: Telephone Etiquette & Switchboard Best Practices',
      'Module 3: Customer Service Excellence & Difficult Scenarios',
      'Module 4: Front Office Systems, Booking & Visitor Flow Management'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '4 Weeks',
    level: 'Foundational',
    physicalAvailableSeptember: true,
    careerPathways: ['Corporate Front Desk Officer', 'Medical Practice Receptionist', 'Hotel Receptionist']
  },
  {
    id: 'counselling-skills',
    title: 'Counselling Skills',
    category: 'Business & Professional',
    normalPrice: 2000,
    specialPrice: 1500,
    physicalPrice: 3500,
    registrationFee: 300,
    description: 'Develop foundational communication, listening and interpersonal skills relevant to supportive interactions.',
    overview: 'Learn active listening, empathetic questioning, non-verbal mirroring, and supportive communication to aid colleagues, community members, and clients facing emotional stress.',
    targetAudience: [
      'Community leaders, HR practitioners, and care workers',
      'Individuals wishing to improve interpersonal support and coaching depth'
    ],
    learningOutcomes: [
      'Apply reflective listening without offering premature or biased advice',
      'Identify signs of emotional distress, burnout, and trauma',
      'Establish clear professional boundaries and referral channels'
    ],
    modules: [
      'Module 1: Principles of Non-Judgmental Active Listening',
      'Module 2: Questioning Techniques & Empathetic Paraphrasing',
      'Module 3: Boundaries, Transference & Ethical Responsibility',
      'Module 4: Crisis Support Fundamentals & Referral Pathways'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '4 Weeks',
    level: 'Intermediate',
    physicalAvailableSeptember: true,
    careerPathways: ['Support Facilitator', 'Peer Supporter', 'Wellness Coordinator Assistant']
  },
  {
    id: 'basics-of-mental-health',
    title: 'Basics of Mental Health',
    category: 'Business & Professional',
    normalPrice: 1200,
    specialPrice: 800,
    physicalPrice: 2250,
    registrationFee: 300,
    description: 'Develop foundational awareness and knowledge relating to mental health and wellbeing.',
    overview: 'Understand anxiety, depression, workplace stress, stigma reduction, and mental health first aid principles in family, community, and corporate environments.',
    targetAudience: [
      'Managers, carers, educators, and anyone seeking deeper mental health awareness'
    ],
    learningOutcomes: [
      'De-stigmatise common mental health conditions',
      'Recognise early behavioral indicators of depression and severe anxiety',
      'Implement mental wellbeing hygiene and self-care strategies'
    ],
    modules: [
      'Module 1: Demystifying Mental Health & Wellbeing',
      'Module 2: Common Disorders: Anxiety, Mood & Stress-Related Disorders',
      'Module 3: Creating Supportive Workplaces & Households',
      'Module 4: Community Resources & Professional Medical Interventions'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '3 Weeks',
    level: 'Foundational',
    physicalAvailableSeptember: true,
    careerPathways: ['Mental Health Champion', 'Community Wellness Helper']
  },
  {
    id: 'basics-of-social-work',
    title: 'Basics of Social Work',
    category: 'Care & Support',
    normalPrice: 1200,
    specialPrice: 800,
    physicalPrice: 3500,
    registrationFee: 300,
    description: 'Explore foundational concepts and principles relevant to social work, community support and professional service.',
    overview: 'Gain an understanding of community development, family support systems, vulnerable population advocacy, and NGO operational standards.',
    targetAudience: [
      'NGO volunteers, church welfare workers, community developers'
    ],
    learningOutcomes: [
      'Understand social justice frameworks and human rights advocacy',
      'Conduct basic family needs assessments and case documentation',
      'Collaborate effectively with statutory bodies and relief organizations'
    ],
    modules: [
      'Module 1: Introduction to Social Work Values & Philosophy',
      'Module 2: Community Needs Assessment & Resource Mapping',
      'Module 3: Family Support Systems & Child Protection Principles',
      'Module 4: Case Documentation & Reporting Protocols'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '3 Weeks',
    level: 'Foundational',
    physicalAvailableSeptember: true,
    careerPathways: ['Community Welfare Officer', 'NGO Programme Assistant']
  },

  // 3. HOSPITALITY & HOUSEKEEPING
  {
    id: 'butler-luxury-service',
    title: 'Butler & Modern Household Management',
    category: 'Hospitality & Housekeeping',
    normalPrice: 4500,
    specialPrice: 3500,
    physicalPrice: 4500,
    registrationFee: 300,
    description: 'Develop elevated service, etiquette, household support and professional standards relevant to luxury private service environments.',
    overview: 'The pinnacle of private estate and luxury hospitality service. Master high-level formal table service, wine presentation, VIP protocol, wardrobe care, and seamless household coordination.',
    targetAudience: [
      'House managers, head housekeepers, and senior hospitality professionals',
      'Individuals aiming for prestigious private estate or superyacht careers'
    ],
    learningOutcomes: [
      'Execute British and French formal table service and banqueting etiquette',
      'Manage private cellars, decanting, and beverage pairings',
      'Coordinate residential staff teams and maintain comprehensive house manuals',
      'Uphold absolute royal-grade decorum, discretion, and personal presentation'
    ],
    modules: [
      'Module 1: The Heritage & Evolution of the Modern Butler',
      'Module 2: Silver Service, Table Scaping & Formal Dining Etiquette',
      'Module 3: Wine & Beverage Service, Decanting & Cellar Care',
      'Module 4: Valet Services, Wardrobe Care & Fine Luggage Packing',
      'Module 5: Estate Management Protocols, SOPs & Staff Supervision'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '6 - 8 Weeks',
    level: 'Executive / Advanced',
    popular: true,
    featured: true,
    physicalAvailableSeptember: true,
    careerPathways: ['Private Estate Butler', 'Superyacht Steward', 'VIP Hospitality Manager']
  },
  {
    id: 'advanced-hotel-management',
    title: 'Advanced Hotel Management',
    category: 'Hospitality & Housekeeping',
    normalPrice: 3500,
    specialPrice: 2800,
    physicalPrice: 3500,
    registrationFee: 300,
    description: 'Develop knowledge of hotel operations, guest experience, service standards and professional hospitality management.',
    overview: 'Designed for supervisors and managers in boutique hotels, lodges, and resorts seeking to master revenue management, guest satisfaction, and operational efficiency.',
    targetAudience: [
      'Hospitality supervisors, duty managers, and guest relations officers'
    ],
    learningOutcomes: [
      'Optimize front office and room division workflows',
      'Deliver elevated 5-star guest satisfaction scores',
      'Manage housekeeping audits and hotel health and safety compliance'
    ],
    modules: [
      'Module 1: Hotel Operational Hierarchy & Quality Standards',
      'Module 2: Guest Journey Mapping & VIP Guest Protocol',
      'Module 3: Housekeeping Audits & Inventory Controls',
      'Module 4: Team Leadership, Shift Handover & Conflict Resolution'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '6 Weeks',
    level: 'Executive / Advanced',
    physicalAvailableSeptember: true,
    careerPathways: ['Boutique Lodge Manager', 'Guest Relations Lead', 'Duty Manager']
  },
  {
    id: 'cruise-ship-housekeeping',
    title: 'Cruise Ship Housekeeping',
    category: 'Hospitality & Housekeeping',
    normalPrice: 2000,
    specialPrice: 1500,
    physicalPrice: 3500,
    registrationFee: 300,
    description: 'Prepare yourself with professional housekeeping and hospitality knowledge relevant to cruise ship environments.',
    overview: 'Tailored for candidates preparing for global cruise line cabin steward interviews and maritime hospitality standards, focusing on speed, USPH sanitation, and maritime safety.',
    targetAudience: [
      'Housekeepers seeking international cruise ship employment',
      'Hospitality staff wanting fast-paced high-volume housekeeping expertise'
    ],
    learningOutcomes: [
      'Apply USPH (United States Public Health) sanitation and hygiene codes',
      'Master rapid 15-minute stateroom turnover techniques',
      'Navigate onboard maritime hierarchies and multinational team cultures'
    ],
    modules: [
      'Module 1: Maritime Hospitality & Cruise Line Expectations',
      'Module 2: USPH Sanitation, Chemical Safety & Deep Cleaning Protocols',
      'Module 3: Stateroom Turnaround & Turndown Service Artistry',
      'Module 4: International Maritime Interview & Resume Preparation'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '4 Weeks',
    level: 'Intermediate',
    popular: true,
    physicalAvailableSeptember: true,
    careerPathways: ['Cruise Cabin Steward', 'Stateroom Attendant', 'International Hotel Housekeeper']
  },
  {
    id: 'executive-housekeeping',
    title: 'Executive Housekeeping',
    category: 'Hospitality & Housekeeping',
    normalPrice: 2000,
    specialPrice: 1500,
    physicalPrice: 3500,
    registrationFee: 300,
    description: 'Develop elevated housekeeping skills and professional standards suitable for high-end residential and hospitality environments.',
    overview: 'Covers the care of luxury finishes (marble, solid wood, brass, silk), sanitisation protocols, detailed inspection checklists, and bespoke residential standards.',
    targetAudience: [
      'Residential head housekeepers, estate staff, and luxury lodge cleaners'
    ],
    learningOutcomes: [
      'Identify and protect delicate interior materials and fine surfaces',
      'Create structured seasonal and daily deep-cleaning routines',
      'Implement hotel-grade turn-down standards and floral staging'
    ],
    modules: [
      'Module 1: Care of Fine Finishes: Marble, Silver, Crystal & Wood',
      'Module 2: Master Suite Presentation & Bed-Making Techniques',
      'Module 3: Deep Cleaning Schedules & Chemical Handling Safety',
      'Module 4: Quality Inspection Checklists & Professional Self-Audits'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '4 Weeks',
    level: 'Intermediate',
    popular: true,
    physicalAvailableSeptember: true,
    careerPathways: ['Head Housekeeper', 'Estate Housekeeper', 'Luxury Villa Attendant']
  },
  {
    id: 'chef-assistant-training',
    title: 'Chef Assistant Training',
    category: 'Hospitality & Housekeeping',
    normalPrice: 2000,
    specialPrice: 1500,
    physicalPrice: 3500,
    registrationFee: 300,
    description: 'Develop foundational kitchen organisation, food preparation, hygiene and support skills.',
    overview: 'Step confidently into restaurant, lodge, or private estate kitchens with solid prep skills, knife handling, HACCP food hygiene, and recipe execution support.',
    targetAudience: [
      'Kitchen helpers, scullery staff wanting promotion, and private cooks'
    ],
    learningOutcomes: [
      'Demonstrate safe knife handling and classical cutting cuts (julienne, brunoise, dice)',
      'Maintain strict cold-chain, cross-contamination prevention, and HACCP compliance',
      'Execute mise-en-place for complex multi-course services smoothly'
    ],
    modules: [
      'Module 1: Kitchen Safety, Knife Mastery & Knife Sharpening',
      'Module 2: HACCP Food Safety, Temperature Logs & Storage',
      'Module 3: Stocks, Sauces, Vegetable & Meat Preparation',
      'Module 4: Kitchen Station Organization & Service Support'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '4 - 6 Weeks',
    level: 'Intermediate',
    physicalAvailableSeptember: true,
    careerPathways: ['Commis Chef Assistant', 'Private Cook Helper', 'Kitchen Station Hand']
  },
  {
    id: 'waitron-training',
    title: 'Waitron Training',
    category: 'Hospitality & Housekeeping',
    normalPrice: 2000,
    specialPrice: 1500,
    physicalPrice: 3250,
    registrationFee: 300,
    description: 'Develop professional food-service, customer-service, presentation and table-service skills.',
    overview: 'Learn 3-plate carrying, beverage pouring, wine opening, upselling techniques, order memorisation, and polite dispute resolution for fine-dining restaurants.',
    targetAudience: [
      'Hospitality waitstaff, event banquet servers, and restaurant newcomers'
    ],
    learningOutcomes: [
      'Master graceful multi-plate service and table clearing protocols',
      'Deliver refined table-side communication, menu storytelling, and upselling',
      'Handle POS transactions, bill presentation, and tip etiquette'
    ],
    modules: [
      'Module 1: Table Setting Formats (Casual, Bistro, Fine Dining)',
      'Module 2: Carrying Techniques, Plate Clearing & Tray Balance',
      'Module 3: Order Taking, Menu Descriptions & Wine Opening',
      'Module 4: Guest Complaints Resolution & Service Recovery'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '3 Weeks',
    level: 'Foundational',
    physicalAvailableSeptember: true,
    careerPathways: ['Fine Dining Waiter / Waitress', 'Banquet Server', 'VIP Lounge Server']
  },
  {
    id: 'hotel-and-housekeeping',
    title: 'Hotel & Housekeeping',
    category: 'Hospitality & Housekeeping',
    normalPrice: 2000,
    specialPrice: 1500,
    physicalPrice: 3500,
    registrationFee: 300,
    description: 'Develop professional housekeeping knowledge and standards relevant to hotel environments.',
    overview: 'Focuses on commercial accommodation standards, linen control, trolley setup, room servicing speeds, and guest amenity replenishment.',
    targetAudience: [
      'Hotel room attendants, guest house cleaners, and lodge workers'
    ],
    learningOutcomes: [
      'Organise housekeeping trolleys for maximum ergonomic efficiency',
      'Execute thorough bathroom sanitation and bedroom turnaround steps',
      'Report maintenance faults and handle guest lost-and-found items'
    ],
    modules: [
      'Module 1: Hotel Housekeeping Department Structure',
      'Module 2: Trolley Management & Linen Stock Controls',
      'Module 3: Room Cleaning Sequence & Sanitisation Standards',
      'Module 4: Maintenance Reporting & Guest Lost Property Handling'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '3 Weeks',
    level: 'Foundational',
    physicalAvailableSeptember: true,
    careerPathways: ['Hotel Room Attendant', 'Linen Keeper', 'Guest House Housekeeper']
  },
  {
    id: 'tea-lady-professional-cleaning',
    title: 'Tea Lady & Professional Cleaning',
    category: 'Hospitality & Housekeeping',
    normalPrice: 2000,
    specialPrice: 1500,
    physicalPrice: 3250,
    registrationFee: 300,
    description: 'Develop professional workplace cleaning, presentation and service-support skills.',
    overview: 'Master boardroom beverage catering, tea/coffee machine maintenance, executive office hygiene, and dignified corporate workspace upkeep.',
    targetAudience: [
      'Office cleaners, canteen staff, and corporate service support staff'
    ],
    learningOutcomes: [
      'Serve beverages and refreshments for executive board meetings with poise',
      'Maintain office kitchen hygiene, refrigerators, and coffee machinery',
      'Clean high-touch office equipment without damaging electronics'
    ],
    modules: [
      'Module 1: Boardroom Etiquette & Executive Beverage Hospitality',
      'Module 2: Office Kitchen Sanitation & Appliance Maintenance',
      'Module 3: Workspace & Restroom Disinfection Standards',
      'Module 4: Professional Image, Punctuality & Workplace Respect'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '3 Weeks',
    level: 'Foundational',
    physicalAvailableSeptember: true,
    careerPathways: ['Corporate Office Hostess', 'Boardroom Assistant', 'Commercial Cleaning Specialist']
  },

  // 4. HOME & FAMILY SERVICES
  {
    id: 'cooking-baking-families',
    title: 'Cooking & Baking for Families',
    category: 'Home & Family Services',
    normalPrice: 1200,
    specialPrice: 800,
    physicalPrice: 2500,
    registrationFee: 300,
    description: 'Develop practical cooking and baking skills for household and family environments.',
    overview: 'Learn wholesome, family-friendly meal planning, kid-approved nutritious lunches, dinner staples, baking basics, and accommodating food allergies.',
    targetAudience: [
      'Domestic workers, nannies, au pairs, and private home cooks'
    ],
    learningOutcomes: [
      'Plan balanced weekly family menus and grocery shopping lists',
      'Prepare healthy breakfasts, lunches, and versatile family dinners',
      'Bake simple breads, muffins, and family treats with confidence'
    ],
    modules: [
      'Module 1: Kitchen Hygiene & Family Nutrition Essentials',
      'Module 2: Breakfast & Lunchbox Preparation for School & Work',
      'Module 3: Flavorful Family Dinners: Roasts, Stews & Pastas',
      'Module 4: Baking Fundamentals: Breads, Scones & Simple Cakes'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '3 Weeks',
    level: 'Foundational',
    physicalAvailableSeptember: true,
    careerPathways: ['Private Family Cook', 'Domestic Cook & Baker']
  },
  {
    id: 'domestic-helper-training',
    title: 'Domestic Helper Training',
    category: 'Home & Family Services',
    normalPrice: 1200,
    specialPrice: 800,
    physicalPrice: 1250,
    registrationFee: 300,
    description: 'Develop professional household skills covering cleaning, organisation, household support and workplace standards.',
    overview: 'Flawless Institution’s foundational flagship programme. Elevates household work from informal chores into a respected, structured, and highly valued profession.',
    targetAudience: [
      'Household workers, domestic staff, and residential housekeepers'
    ],
    learningOutcomes: [
      'Create and execute structured daily and weekly cleaning routines',
      'Use cleaning agents safely and protect delicate appliances and finishes',
      'Communicate with employers professionally and establish mutual trust'
    ],
    modules: [
      'Module 1: Professional Mindset & Work Ethic in the Home',
      'Module 2: Deep Cleaning Techniques Room-by-Room',
      'Module 3: Organization, Decluttering & Kitchen Systems',
      'Module 4: Communication, Contracts & Employment Standards'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '3 Weeks',
    level: 'Foundational',
    popular: true,
    physicalAvailableSeptember: true,
    careerPathways: ['Certified Professional Domestic Worker', 'Housekeeper']
  },
  {
    id: 'laundry-care',
    title: 'Laundry Care & Garment Management',
    category: 'Home & Family Services',
    normalPrice: 1200,
    specialPrice: 800,
    physicalPrice: 2250,
    registrationFee: 300,
    description: 'Develop practical knowledge of garment care, laundry management, organisation and household standards.',
    overview: 'Learn fabric identification, wash-care symbols, stain removal chemistry, steam ironing, shirt pressing, folding techniques, and luxury closet staging.',
    targetAudience: [
      'Domestic helpers, housekeepers, and personal valet assistants'
    ],
    learningOutcomes: [
      'Read and apply all garment care symbols without ruining delicate fabrics',
      'Master tough stain removal (grease, red wine, coffee, sweat, ink)',
      'Iron dress shirts, pleated skirts, and formal suits to hotel perfection'
    ],
    modules: [
      'Module 1: Fabric Types & Wash Symbol Deciphering',
      'Module 2: Stain Removal Science & Safe Detergent Usage',
      'Module 3: Ironing, Steaming & Pressing Masterclass',
      'Module 4: Wardrobe Organization, Seasonal Storing & Folding Art'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '3 Weeks',
    level: 'Foundational',
    physicalAvailableSeptember: true,
    careerPathways: ['Garment Care Specialist', 'Laundress / Valet']
  },
  {
    id: 'basic-gardening',
    title: 'Basic Gardening & Yard Maintenance',
    category: 'Home & Family Services',
    normalPrice: 1500,
    specialPrice: 1000,
    physicalPrice: 1250,
    registrationFee: 300,
    description: 'Develop foundational gardening and garden-maintenance skills.',
    overview: 'Learn lawn mowing, edge trimming, seasonal pruning, soil nourishment, composting, watering schedules, and safe petrol/electric power tool operation.',
    targetAudience: [
      'Gardeners, estate groundskeepers, and property caretakers'
    ],
    learningOutcomes: [
      'Operate lawn mowers, weed trimmers, and shears safely',
      'Prune shrubs, rose bushes, and trees at appropriate seasonal times',
      'Identify weed infestations and implement water-wise irrigation'
    ],
    modules: [
      'Module 1: Garden Tool Safety & Power Equipment Maintenance',
      'Module 2: Lawn Care, Mowing, Weeding & Aeration',
      'Module 3: Pruning, Planting & Soil Fertilisation',
      'Module 4: Water-Wise Practices & Seasonal Garden Planning'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '3 Weeks',
    level: 'Foundational',
    physicalAvailableSeptember: true,
    careerPathways: ['Residential Gardener', 'Grounds Maintenance Worker']
  },

  // 5. EDUCATION & DEVELOPMENT
  {
    id: 'homework-assistance',
    title: 'Homework Assistance & Academic Routines',
    category: 'Education & Development',
    normalPrice: 800,
    specialPrice: 600,
    physicalPrice: 1250,
    registrationFee: 300,
    description: 'Develop practical skills for supporting children with homework, organisation and learning routines.',
    overview: 'Train au pairs and nannies to create distraction-free homework environments, encourage reading comprehension, and maintain positive study habits.',
    targetAudience: [
      'Au pairs, nannies, after-school care coordinators'
    ],
    learningOutcomes: [
      'Establish productive after-school homework routines',
      'Guide primary school mathematics, reading, and spelling exercises',
      'Encourage self-discipline without doing the child’s work for them'
    ],
    modules: [
      'Module 1: Creating an Inspiring Study Environment',
      'Module 2: Effective Questioning & Reading Support',
      'Module 3: Managing Homework Stress & Frustration',
      'Module 4: Tracking School Projects & Communicating with Parents'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '2 Weeks',
    level: 'Foundational',
    physicalAvailableSeptember: true,
    careerPathways: ['After-School Tutor Assistant', 'Au Pair Study Facilitator']
  },
  {
    id: 'educare-fundamentals-ecd',
    title: 'Educare Fundamentals — ECD',
    category: 'Education & Development',
    normalPrice: 3000,
    specialPrice: 2500,
    physicalPrice: 3550,
    registrationFee: 300,
    description: 'Build foundational knowledge in early childhood development and educational support.',
    overview: 'A deep dive into early childhood education for practitioners in creches, preschools, and private early learning pods, covering cognitive development, literacy, and numeracy foundations.',
    targetAudience: [
      'Creche teachers, ECD center assistants, au pairs seeking early education grounding'
    ],
    learningOutcomes: [
      'Design structured daily lesson plans and playful learning activities',
      'Foster phonics, language acquisition, and early math readiness',
      'Assess developmental milestones and communicate child progress to parents'
    ],
    modules: [
      'Module 1: Early Childhood Psychology & Brain Development',
      'Module 2: Literacy, Storytelling & Early Number Concepts',
      'Module 3: Classroom Management & Play-Based Learning',
      'Module 4: Inclusive Education, Safety & Parent Reporting'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '6 - 8 Weeks',
    level: 'Intermediate',
    popular: true,
    featured: true,
    physicalAvailableSeptember: true,
    careerPathways: ['ECD Teacher Assistant', 'Educare Facilitator', 'Preschool Support Specialist']
  },
  {
    id: 'sensory-craft-stimulating-activities',
    title: 'Sensory Craft & Stimulating Activities',
    category: 'Education & Development',
    normalPrice: 1200,
    specialPrice: 800,
    physicalPrice: 1250,
    registrationFee: 300,
    description: 'Develop practical activity knowledge designed to encourage creativity, engagement and development.',
    overview: 'Learn how to create hands-on sensory bins, DIY playdough, tactile games, and gross-motor challenges using affordable household materials.',
    targetAudience: [
      'Au pairs, nannies, early childhood teachers, and parents'
    ],
    learningOutcomes: [
      'Create 20+ sensory and motor-skill activities using low-cost materials',
      'Stimulate sensory integration in toddlers and young children',
      'Channel excess energy into constructive creative craft projects'
    ],
    modules: [
      'Module 1: Sensory Integration & Motor Development in Children',
      'Module 2: DIY Sensory Bins, Tactile Materials & Safe Formulations',
      'Module 3: Creative Art, Recycled Crafts & Motor Skill Challenges',
      'Module 4: Age-Graded Activity Planning & Clean-Up Routines'
    ],
    format: 'Online & Physical (Fourways)',
    duration: '3 Weeks',
    level: 'Foundational',
    physicalAvailableSeptember: true,
    careerPathways: ['Child Activity Coordinator', 'Creative Play Facilitator']
  }
];

export const CATEGORIES = [
  'All Programmes',
  'Care & Support',
  'Business & Professional',
  'Hospitality & Housekeeping',
  'Home & Family Services',
  'Education & Development'
] as const;
