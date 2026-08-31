export interface SpeakingTopic {
  id: string;
  title: string;
  summary: string;
  description: string;
  keyPoints: string[];
  bestFor: string[];
  category: 'Household & Private Staff' | 'Business & Entrepreneurship' | 'Leadership & Purpose';
}

export const SPEAKING_TOPICS: SpeakingTopic[] = [
  {
    id: 'household-professionalism',
    title: 'HOUSEHOLD PROFESSIONALISM',
    category: 'Household & Private Staff',
    summary: 'Understanding the standards, skills, conduct and mindset required to build a professional household workforce.',
    description: 'A transformative keynote breaking the myth of informal domestic labour and establishing the rigorous codes of conduct, discretion, presentation, and work ethics required in contemporary high-expectation homes.',
    keyPoints: [
      'Redefining domestic employment into respected professional careers',
      'The silent currency: Trust, confidentiality, and emotional boundaries',
      'Standard Operating Procedures (SOPs) for home environments',
      'Communication and conflict prevention in private spaces'
    ],
    bestFor: ['Residential Estate Associations', 'Household Employers', 'Domestic Staff Seminars', 'Hospitality Groups']
  },
  {
    id: 'the-exceptional-household',
    title: 'THE EXCEPTIONAL HOUSEHOLD',
    category: 'Household & Private Staff',
    summary: 'Practical insights for creating better household systems, stronger teams and higher professional standards.',
    description: 'Geared towards employers, estate managers, and homeowners who want to transform chaotic domestic dynamics into harmonious, high-performing household ecosystems.',
    keyPoints: [
      'Architecting realistic household routines and job descriptions',
      'Preventing employer burnout and domestic turnover',
      'Fair remuneration structures, contracts, and legal compliance in SA',
      'Cultivating dignity and mutual respect across cultural differences'
    ],
    bestFor: ['High-Net-Worth Homeowners', 'Estate Living Conferences', 'Family Office Forums', 'Private Clients']
  },
  {
    id: 'what-employers-really-expect',
    title: 'WHAT EMPLOYERS REALLY EXPECT',
    category: 'Household & Private Staff',
    summary: 'Helping Household Professionals understand expectations and develop the qualities that create stronger professional relationships.',
    description: 'An eye-opening workshop for household professionals that bridges the gap between worker assumptions and employer reality, detailing the unwritten rules of excellence.',
    keyPoints: [
      'Proactivity vs. passive waiting: Becoming an indispensable team member',
      'Managing private household assets and delicate surfaces',
      'Handling feedback and corrective guidance constructively',
      'Long-term career longevity and building exceptional references'
    ],
    bestFor: ['Candidate Orientation Sessions', 'Staff Training Days', 'Community Empowerment Workshops']
  },
  {
    id: 'from-experience-to-enterprise',
    title: 'FROM EXPERIENCE TO ENTERPRISE',
    category: 'Business & Entrepreneurship',
    summary: 'How knowledge, skills and experience can become the foundation for entrepreneurship.',
    description: 'Drawing from her own transition from a working Household Professional to Founder of an institution, Teldah shares how frontline industry experience is the most potent seed for building a viable business.',
    keyPoints: [
      'Uncovering hidden market opportunities from within your current job',
      'Validating business concepts without capital-heavy venture funding',
      'Converting organic word-of-mouth into structured revenue models',
      'Navigating the psychological transition from employee to business owner'
    ],
    bestFor: ['Entrepreneurship Incubators', 'Women in Business Summits', 'SME Forums', 'Youth Business Networks']
  },
  {
    id: 'building-a-business-clients-will-pay-for',
    title: 'BUILDING A BUSINESS THAT CLIENTS WILL PAY FOR',
    category: 'Business & Entrepreneurship',
    summary: 'Practical lessons around value, positioning, offers, pricing, marketing and client acquisition.',
    description: 'A no-nonsense business masterclass addressing why so many passionate entrepreneurs struggle to get paid what they are worth, and how to structure offers that command real market authority.',
    keyPoints: [
      'Moving from hourly trading to outcome-based high-value positioning',
      'Crafting compelling service packages that eliminate price haggling',
      'The psychology of premium client acquisition and retention',
      'Establishing credibility and institutional trust from day one'
    ],
    bestFor: ['Startup Founders', 'Service Business Owners', 'Freelancers & Consultants', 'Chamber of Commerce Events']
  },
  {
    id: 'from-struggle-to-strategy',
    title: 'FROM STRUGGLE TO STRATEGY',
    category: 'Leadership & Purpose',
    summary: 'Turning challenges and difficult experiences into clarity, growth and purposeful action.',
    description: 'An inspiring yet deeply practical address on how personal hardship, industry friction, and lack of resources can be transmuted into strategic assets for purposeful growth.',
    keyPoints: [
      'Reframing systemic obstacles as competitive intelligence',
      'Developing emotional resilience during seasons of obscurity',
      'Building disciplined daily habits when outcomes seem distant',
      'Maintaining unwavering faith when the blueprint is incomplete'
    ],
    bestFor: ['Leadership Conferences', 'Corporate Women Retreats', 'Inspirational Keynotes', 'Annual Conventions']
  },
  {
    id: 'building-beyond-the-founder',
    title: 'BUILDING BEYOND THE FOUNDER',
    category: 'Business & Entrepreneurship',
    summary: 'Why entrepreneurs must eventually move beyond doing everything themselves and develop systems that allow their businesses to grow.',
    description: 'Addresses the founder’s bottleneck: how to design standard operating procedures, delegate with confidence, and build an enduring institution that flourishes independently.',
    keyPoints: [
      'Recognising the operational trap of founder-dependence',
      'Documenting knowledge into repeatable institutional curricula',
      'Empowering team leaders and maintaining quality control',
      'Transitioning from an operator to a visionary steward'
    ],
    bestFor: ['Growth-Stage SME Leaders', 'Executive Masterclasses', 'Business Acceleration Cohorts']
  },
  {
    id: 'professionalism-that-creates-opportunities',
    title: 'PROFESSIONALISM THAT CREATES OPPORTUNITIES',
    category: 'Leadership & Purpose',
    summary: 'Exploring how communication, presentation, reliability, attitude and professional conduct can influence opportunities and long-term success.',
    description: 'A powerful session highlighting why technical competence is only 20% of career advancement, while personal conduct, punctuality, and emotional poise unlock the remaining 80%.',
    keyPoints: [
      'The anatomy of professional presence and reputation capital',
      'Verbal clarity, body language, and digital communication hygiene',
      'Reliability: The rarest competitive advantage in modern business',
      'How consistent excellence turns modest roles into monumental open doors'
    ],
    bestFor: ['Graduate Induction Programmes', 'Corporate Staff Assemblies', 'Skills Development Days']
  },
  {
    id: 'purpose-leadership-personal-development',
    title: 'PURPOSE, LEADERSHIP & PERSONAL DEVELOPMENT',
    category: 'Leadership & Purpose',
    summary: 'Practical conversations around personal growth, leadership, responsibility, confidence and purposeful action.',
    description: 'A grounding exploration of leadership founded on stewardship, personal accountability, and responding faithfully to the sphere of influence placed before you.',
    keyPoints: [
      'Defining stewardship: Leading with service rather than self-elevation',
      'Overcoming imposter syndrome through competence and values',
      'Balancing ambition with moral integrity and spiritual conviction',
      'Leaving a generational legacy through institutional impact'
    ],
    bestFor: ['Faith & Business Gatherings', 'Executive Leadership Retreats', 'Community Leadership Summits']
  }
];

export const SPEAKING_FORMATS = [
  {
    title: 'Keynote Presentations',
    description: 'High-impact 45 to 60-minute opening or closing addresses designed to set an elevated tone, challenge conventions, and inspire purposeful action.',
    icon: 'Sparkles'
  },
  {
    title: 'Conferences & Panels',
    description: 'Insightful panel participation and conference session delivery bringing deep domain authority on household ecosystems, staffing, and entrepreneurship.',
    icon: 'Users'
  },
  {
    title: 'Masterclasses & Workshops',
    description: 'Half-day or full-day immersive, interactive sessions delivering structured frameworks, case studies, and actionable operational blueprints.',
    icon: 'GraduationCap'
  },
  {
    title: 'Employer Education Sessions',
    description: 'Private briefings for residential estates, family offices, and executive communities on managing household staff, contracts, and standards.',
    icon: 'Home'
  },
  {
    title: 'Entrepreneurship & Business Sessions',
    description: 'Hands-on strategy sessions for early-stage and growing business owners on positioning, service packaging, pricing, and scaling systems.',
    icon: 'Briefcase'
  },
  {
    title: 'Private & Online Presentations',
    description: 'Tailored executive briefings, webinars, and international virtual engagements delivered with full digital presentation polish.',
    icon: 'Globe'
  }
];

export const WHO_CAN_INVITE = [
  { name: 'Businesses & Corporate Firms', desc: 'Seeking insights on service excellence, employee professionalism, and workplace support.' },
  { name: 'Private Organisations & Family Offices', desc: 'Managing high-end private residences and requiring guidance on household systems.' },
  { name: 'Entrepreneurship Networks & Incubators', desc: 'Looking for real-world lessons on turning frontline experience into viable enterprises.' },
  { name: 'Professional Associations', desc: 'Hosting industry conferences and continuing professional development events.' },
  { name: 'Residential & Lifestyle Estates', desc: 'Empowering estate homeowners and domestic workers with standard-setting workshops.' },
  { name: 'Hospitality & Tourism Organisations', desc: 'Elevating front-line housekeeping, butler services, and guest service standards.' },
  { name: 'Educational & Training Organisations', desc: 'Equipping vocational students and graduates with practical workplace conduct and readiness.' },
  { name: 'Community & Faith Organisations', desc: 'Inspiring members around purpose, stewardship, resilience, and personal growth.' }
];

export const MASTERCLASS_TOPICS = [
  'Professional Development & Mindset',
  'Household Management Systems & Protocols',
  'Employer Education & Legal/Ethical Standards',
  'Entrepreneurship: From Skill to Enterprise',
  'Business Growth & Systems Beyond the Founder',
  'Stewardship, Leadership & Values',
  'Elevating Household Service Standards',
  'Personal Accountability & Career Velocity'
];

export const FOUNDER_CONTACT = {
  name: 'Teldah Siyawamwaya',
  title: 'Founder & Director',
  institution: 'Flawless Institution',
  experience: '16+ Years Industry Experience',
  established: 2016,
  phone: '+27 65 944 9409',
  email: 'training@flawlessinstitution.co.za',
  location: 'Fourways, South Africa',
  serviceArea: 'Serving South Africa and beyond'
};
