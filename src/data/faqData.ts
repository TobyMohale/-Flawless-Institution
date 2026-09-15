export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 
    | 'General'
    | 'Employers & Private Households'
    | 'Flawless Academy'
    | 'Fees & Payments'
    | 'Confidentiality & Privacy'
    | 'Flawless Enterprise'
    | 'Speaking & Thought Leadership'
    | 'Contact';
  bulletPoints?: string[];
  contactDetails?: {
    name?: string;
    role?: string;
    phone?: string;
    email?: string;
  }[];
}

export const FAQ_CATEGORIES = [
  'All',
  'General',
  'Employers & Private Households',
  'Flawless Academy',
  'Fees & Payments',
  'Confidentiality & Privacy',
  'Flawless Enterprise',
  'Speaking & Thought Leadership',
  'Contact',
] as const;

export const FAQ_LIST: FAQItem[] = [
  // GENERAL
  {
    id: 1,
    category: 'General',
    question: 'What is Flawless Institution™?',
    answer: 'Flawless Institution™ is a Private Professional Education, Household Solutions and Business Advisory Institution.\n\nWe provide professional training, household staffing and advisory solutions for private households, professional development for individuals, and business education and advisory for entrepreneurs.\n\nEmpowering People. Elevating Homes. Building Businesses.'
  },
  {
    id: 2,
    category: 'General',
    question: 'When was Flawless Institution™ established?',
    answer: 'Flawless Institution™ was established in 2016 by Founder and Director Teldah Siyawamwaya.\n\nThe Institution is built on more than 16 years of practical experience in the household staffing and professional development industry.'
  },
  {
    id: 3,
    category: 'General',
    question: 'Where is Flawless Institution™ based?',
    answer: 'Flawless Institution™ is based in Fourways, South Africa, and provides services online and to clients across South Africa and beyond.'
  },

  // EMPLOYERS & PRIVATE HOUSEHOLDS
  {
    id: 4,
    category: 'Employers & Private Households',
    question: 'Does Flawless Institution™ provide household staffing?',
    answer: 'Yes. We provide professional household staffing solutions for private employers and households.\n\nOur focus is not simply filling a vacancy. We help employers make informed staffing decisions based on the requirements of the household, the role, professional suitability, experience, references and overall fit.'
  },
  {
    id: 5,
    category: 'Employers & Private Households',
    question: 'What types of Household Professionals can Flawless assist with?',
    answer: 'Depending on availability and suitability, we may assist with roles including:',
    bulletPoints: [
      'Nannies and Au Pairs',
      'Caregivers and Elderly Care Professionals',
      'Housekeepers and Domestic Professionals',
      'Executive Housekeepers',
      'Household Managers',
      'Butlers',
      'Personal Assistants',
      'Chefs and Chef Assistants',
      'Garden and Property Support Professionals',
      'Professional Cleaners',
      'Hospitality and Service Professionals',
      'Other specialised household roles'
    ]
  },
  {
    id: 6,
    category: 'Employers & Private Households',
    question: 'How does the Flawless staffing process work?',
    answer: 'The process generally begins with understanding the employer\'s requirements.\n\nWe then establish the role profile, identify suitable professionals within our ecosystem, review suitability and experience, and present appropriate professionals for the employer\'s consideration.\n\nThe employer remains responsible for the final selection and hiring decision.'
  },
  {
    id: 7,
    category: 'Employers & Private Households',
    question: 'Does Flawless Institution™ guarantee a placement?',
    answer: 'No.\n\nWe do not guarantee employment or placement.\n\nOnly suitable Flawless Professionals who meet the employer\'s requirements and are available may be considered for relevant opportunities.\n\nIf we do not have a suitable professional available, we will communicate this honestly rather than present an unsuitable person.'
  },
  {
    id: 8,
    category: 'Employers & Private Households',
    question: 'Can Flawless assess my existing household staff?',
    answer: 'Yes.\n\nOur Household Assessment service can help identify areas relating to staffing, performance, professionalism, household operations, role clarity, communication and overall household standards.'
  },
  {
    id: 9,
    category: 'Employers & Private Households',
    question: 'Can Flawless train my existing household staff?',
    answer: 'Yes.\n\nPrivate Household Training is designed for employers who want to develop the capabilities and professionalism of their existing household team.\n\nTraining can be customised according to the needs of the household.'
  },
  {
    id: 10,
    category: 'Employers & Private Households',
    question: 'Can Flawless help improve the performance of my household team?',
    answer: 'Yes.\n\nWe can assist with professional development, role clarity, communication, standards, teamwork, household operations and other areas affecting household performance.\n\nThe appropriate solution will depend on the household\'s specific circumstances.'
  },
  {
    id: 11,
    category: 'Employers & Private Households',
    question: 'Does Flawless provide ongoing household advisory services?',
    answer: 'Yes.\n\nPrivate households may engage Flawless for ongoing advisory, household management support, staff development and strategic household solutions.\n\nThese services are tailored according to the requirements of each household.'
  },
  {
    id: 12,
    category: 'Employers & Private Households',
    question: 'Does Flawless work with high-profile or high-privacy households?',
    answer: 'Yes.\n\nWe understand that some households require a higher level of discretion, professionalism, confidentiality and carefully considered staffing.\n\nSpecific requirements can be discussed privately during consultation.'
  },

  // FLAWLESS ACADEMY
  {
    id: 13,
    category: 'Flawless Academy',
    question: 'What is Flawless Academy?',
    answer: 'Flawless Academy is the professional education and training division of Flawless Institution™.\n\nIt provides practical skills training and professional development across areas including household services, caregiving, hospitality, business and other professional fields.'
  },
  {
    id: 14,
    category: 'Flawless Academy',
    question: 'Do you have physical classes?',
    answer: 'Yes. Physical classes are currently available in Fourways only.\n\nPhysical training is offered for selected programmes and is subject to course availability and confirmed bookings.\n\nOnline training is also available for students who prefer to study remotely.'
  },
  {
    id: 15,
    category: 'Flawless Academy',
    question: 'Are Flawless Academy courses available online?',
    answer: 'Yes.\n\nOur online courses allow students to enrol, access their learning materials and complete their training remotely.'
  },
  {
    id: 16,
    category: 'Flawless Academy',
    question: 'Do I need previous experience or educational qualifications to enrol?',
    answer: 'No.\n\nThere are no entry requirements for Flawless Academy courses.\n\nYou do not need previous experience, qualifications, educational background or professional experience to enrol.\n\nThe only requirement for booking a course is full payment of the applicable course fee.\n\nOnce full payment has been received, your enrolment can be processed.'
  },
  {
    id: 17,
    category: 'Flawless Academy',
    question: 'Are Flawless Academy courses accredited?',
    answer: 'Flawless Academy courses are skills-training programmes and do not require accreditation to provide practical professional education.\n\nThe courses are designed to develop practical knowledge, skills and professional standards.'
  },
  {
    id: 18,
    category: 'Flawless Academy',
    question: 'Do students receive certificates?',
    answer: 'Yes.\n\nStudents who successfully complete their course receive a Flawless Academy certificate.\n\nCertificates are issued as part of the Flawless graduation process.'
  },
  {
    id: 19,
    category: 'Flawless Academy',
    question: 'Does completing a Flawless course guarantee employment?',
    answer: 'No.\n\nCompleting a Flawless Academy course does not guarantee employment, placement or a particular income.\n\nOur purpose is to provide professional education, practical skills and professional development.'
  },
  {
    id: 20,
    category: 'Flawless Academy',
    question: 'Does Flawless Institution™ offer jobs to the general public?',
    answer: 'No.\n\nFlawless Institution™ is not an open job-placement platform and does not offer or guarantee jobs to the general public.\n\nWhere suitable opportunities arise, eligible Flawless Professionals within our ecosystem may be considered for relevant opportunities based on employer requirements, professional suitability, experience, references and availability.\n\nFinal selection remains with the employer.'
  },
  {
    id: 21,
    category: 'Flawless Academy',
    question: 'Can I register with Flawless Institution™ just to look for a job?',
    answer: 'No.\n\nFlawless does not operate a general job-registration or job-seeker database.\n\nOur focus is professional education, development and providing appropriate household solutions to employers.'
  },

  // FEES & PAYMENTS
  {
    id: 22,
    category: 'Fees & Payments',
    question: 'Are Flawless Institution™ services refundable?',
    answer: 'No.\n\nAll payments made for Flawless Institution™ services, courses, programmes, consultations, resources and bookings are non-refundable, subject to any rights provided by applicable law.'
  },
  {
    id: 23,
    category: 'Fees & Payments',
    question: 'Does Flawless offer payment plans?',
    answer: 'Payment plans are only available where Flawless Institution™ has specifically made a payment-plan option available for a particular service or programme.\n\nPromotional offers may have their own payment terms.\n\nWhere full payment is required to secure a booking, the booking will only be confirmed once full payment has been received.'
  },

  // CONFIDENTIALITY & PRIVACY
  {
    id: 24,
    category: 'Confidentiality & Privacy',
    question: 'Is my information kept confidential?',
    answer: 'Yes.\n\nWe take confidentiality and professional discretion seriously.\n\nInformation provided by employers, private households, professionals and clients is handled responsibly and in accordance with applicable privacy and data-protection requirements (including POPIA).'
  },

  // FLAWLESS ENTERPRISE
  {
    id: 25,
    category: 'Flawless Enterprise',
    question: 'Does Flawless help entrepreneurs start or grow businesses?',
    answer: 'Yes.\n\nFlawless Enterprise provides business education, coaching and advisory services for entrepreneurs and business owners.',
    bulletPoints: [
      'Business Start-Up Advisory',
      'Business Strategy',
      'Business Growth Advisory',
      'Marketing and Client Acquisition',
      'Offer and Pricing Strategy',
      'Business Systems',
      'Founder Coaching',
      'Business Masterclasses'
    ]
  },

  // SPEAKING & THOUGHT LEADERSHIP
  {
    id: 26,
    category: 'Speaking & Thought Leadership',
    question: 'Is Teldah Siyawamwaya available for speaking engagements?',
    answer: 'Yes.\n\nTeldah Siyawamwaya is available for selected speaking engagements, conferences, workshops, masterclasses, business events and professional development programmes.\n\nSpeaking topics include entrepreneurship, business growth, professional excellence, household standards, leadership, personal development and building sustainable businesses.\n\nSpeaking enquiries can be submitted through the Flawless Institution™ website.'
  },

  // CONTACT
  {
    id: 27,
    category: 'Contact',
    question: 'How do I contact Flawless Institution™?',
    answer: 'You can reach out directly to the respective institutional department:',
    contactDetails: [
      {
        role: 'Employers & Private Clients',
        name: 'Teldah Siyawamwaya',
        phone: '+27 83 872 2001',
        email: 'info@flawlessinstitution.co.za'
      },
      {
        role: 'Flawless Academy & Training',
        name: 'Precious',
        phone: '+27 65 944 9409',
        email: 'training@flawlessinstitution.co.za'
      }
    ]
  }
];
