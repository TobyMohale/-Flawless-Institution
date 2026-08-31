export interface Pillar {
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: string;
  link: string;
}

export const INSTITUTIONAL_PILLARS: Pillar[] = [
  {
    title: 'PEOPLE',
    subtitle: 'Professional Education & Development',
    description: 'Equipping individuals with certified skills, professional ethics, and personal mentorship to unlock upward career mobility and dignified livelihoods.',
    deliverables: [
      'Flawless Academy certified courses',
      'Professional coaching & career mentorship',
      'Workplace readiness & interview preparation',
      'Annual November Graduation Ceremony recognition'
    ],
    icon: 'UserCheck',
    link: 'flawless-academy'
  },
  {
    title: 'HOMES',
    subtitle: 'Household Staffing & Advisory',
    description: 'Elevating residential living environments through vetted household staffing, structured operating procedures, and private staff development.',
    deliverables: [
      'Bespoke household staffing placements',
      'Private staff in-home training & auditing',
      'Household management standard operating procedures (SOPs)',
      'Employer-employee advisory & contract structuring'
    ],
    icon: 'Home',
    link: 'private-households'
  },
  {
    title: 'BUSINESSES',
    subtitle: 'Entrepreneurship & Practical Advisory',
    description: 'Transforming technical expertise and frontline experience into sustainable, systemised enterprises with strong market positioning and revenue models.',
    deliverables: [
      'Entrepreneurship education & venture building',
      'Business coaching for service entrepreneurs',
      'Systems design to build beyond the founder',
      'High-value offer packaging & client acquisition'
    ],
    icon: 'TrendingUp',
    link: 'flawless-enterprise'
  }
];

export const FOUNDATION_VALUES = [
  {
    title: 'FAITH',
    desc: 'We acknowledge God as the ultimate source of our vision and purpose. God is at the centre of our journey and the true CEO of Flawless.',
    scriptureOrNote: 'Stewardship & Obedience'
  },
  {
    title: 'EXCELLENCE',
    desc: 'We pursue high standards in our work and professional conduct, ensuring our candidates and solutions stand head and shoulders above industry norms.',
    scriptureOrNote: 'Royal Standards in Every Detail'
  },
  {
    title: 'INTEGRITY',
    desc: 'We value honesty, responsibility, trust and accountability in all relationships, especially in the sanctity of private residential spaces.',
    scriptureOrNote: 'Uncompromising Moral Grounding'
  },
  {
    title: 'SERVICE',
    desc: 'We seek to create meaningful value through practical solutions, treating every opportunity as a divine assignment to uplift others.',
    scriptureOrNote: 'Purpose in Action'
  },
  {
    title: 'GROWTH',
    desc: 'We believe people, households and businesses can continually develop through disciplined learning, structured training, and commitment.',
    scriptureOrNote: 'Lifelong Elevation'
  },
  {
    title: 'PURPOSE',
    desc: 'We believe experience becomes profoundly powerful when it is used intentionally to solve real human and societal needs.',
    scriptureOrNote: 'Turning Experience to Impact'
  }
];

export const STORY_TIMELINE = [
  {
    year: '2010 - 2015',
    title: 'Frontline Household Experience',
    description: 'Teldah works for over six years as a dedicated Household Professional, placing advertisements for additional part-time employment and experiencing the industry from the inside.'
  },
  {
    year: '2015 - 2016',
    title: 'The Organic Shift to Referrals',
    description: 'Employers begin approaching Teldah asking for reliable household staff. Without an elaborate business plan, she connects community members with households out of a pure desire to serve.'
  },
  {
    year: '2016',
    title: 'Establishment of Flawless',
    description: 'Flawless is officially founded while Teldah is still employed. Upon leaving, her own replacement is a candidate from her burgeoning company.'
  },
  {
    year: '2017 - 2021',
    title: 'Evolution from Staffing to Education',
    description: 'Recognising that placement alone was insufficient, Flawless develops structured skills curricula, coaching, mentorship, and employer advisory services.'
  },
  {
    year: 'Present Day',
    title: 'Flawless Institution',
    description: 'Flawless expands into a multi-dimensional institution serving People, Homes, and Businesses across South Africa and beyond, hosting annual graduations and thought leadership masterclasses.'
  }
];

export const SEPTEMBER_PHYSICAL_INTAKE = {
  intakeName: 'September 2026 Physical Training Intake',
  status: 'NOW OPEN',
  commencementDate: '7 September 2026',
  location: 'Fourways, Johannesburg, South Africa',
  description: 'Structured face-to-face classroom learning for selected high-touch programmes where hands-on practical training is essential.',
  features: [
    'Direct in-person training with master instructors',
    'Practical laboratory scenarios (Butler silver service, baby care, executive bed-making)',
    'Classroom peer networking and group masterclasses',
    'Direct qualification for the prestigious Annual November Graduation Ceremony in Fourways'
  ]
};

export const GRADUATION_INFO = {
  ceremony: 'Annual Flawless Graduation Ceremony',
  month: 'November Annual Ceremony',
  location: 'Fourways, Johannesburg, South Africa',
  description: 'All students who successfully complete their training receive a Flawless Academy Certificate during the annual Flawless Graduation. Your training culminates in a milestone you can proudly display on your professional journey.',
  badgeText: 'Annual November Graduation in Fourways'
};

export const FOUNDER_CONTACT = {
  phone: '+27 65 944 9409',
  email: 'training@flawlessinstitution.co.za',
  speakingEmail: 'speaking@flawlessinstitution.co.za',
  location: 'Fourways, South Africa',
  title: 'Founder & Director, Flawless Institution',
  name: 'Teldah Siyawamwaya'
};

