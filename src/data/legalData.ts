export interface LegalSection {
  id: string;
  title: string;
  lastUpdated: string;
  summary: string;
  content: {
    sectionNumber?: number;
    heading: string;
    body: string[];
    bulletPoints?: string[];
  }[];
}

export const TERMS_AND_CONDITIONS: LegalSection = {
  id: 'terms-conditions',
  title: 'Terms & Conditions',
  lastUpdated: 'September 2026',
  summary: 'These Terms and Conditions govern your use of the Flawless Institution™ website and your purchase or use of any courses, programmes, products, consultations, training, household services, advisory services, events, publications, resources or other services offered by Flawless Institution™.',
  content: [
    {
      sectionNumber: 1,
      heading: 'About Flawless Institution™',
      body: [
        'Flawless Institution™ is a private professional institution providing services across three core areas:',
        'Flawless Institution™ was established in 2016 and is based in Fourways, South Africa, serving clients and professionals across South Africa and beyond.'
      ],
      bulletPoints: [
        'People: Professional education, training, skills development and professional development.',
        'Homes: Professional household staffing, household assessments, private household training, household advisory and household team development.',
        'Businesses: Entrepreneurship education, business advisory, business development and founder support.'
      ]
    },
    {
      sectionNumber: 2,
      heading: 'Definitions',
      body: [
        'For purposes of these Terms and Conditions:'
      ],
      bulletPoints: [
        '"Flawless Institution™", "Flawless", "we", "us" or "our" means Flawless Institution™ and its authorised representatives.',
        '"Website" means the official Flawless Institution™ website and related online platforms operated by or on behalf of Flawless Institution™.',
        '"Client" means any person or organisation purchasing or using our services.',
        '"Student" means an individual enrolled in a Flawless Academy programme.',
        '"Household Professional" means an individual providing or developing professional household-related services.',
        '"Employer" means a private individual, household, family, organisation or other person seeking household staffing or related services.',
        '"Services" means any education, training, staffing, consultation, assessment, advisory, business, speaking, event or other service provided by Flawless Institution™.'
      ]
    },
    {
      sectionNumber: 3,
      heading: 'Acceptance of these Terms',
      body: [
        'These Terms and Conditions apply to all users of the website and to all purchases and bookings unless a separate written agreement expressly provides otherwise.',
        'Where a specific service has additional terms, those terms will apply together with these Terms and Conditions.',
        'By completing an online purchase or booking, you confirm that the information you have provided is accurate and that you are authorised to enter into the relevant transaction.'
      ]
    },
    {
      sectionNumber: 4,
      heading: 'Use of the Website',
      body: [
        'You agree to use the website lawfully and responsibly. You may not:',
        'We reserve the right to restrict or terminate access where we reasonably believe that the website is being misused.'
      ],
      bulletPoints: [
        'Use the website for unlawful purposes.',
        'Attempt to gain unauthorised access to our systems.',
        'Interfere with the operation or security of the website.',
        'Introduce malicious software or harmful code.',
        'Misrepresent your identity.',
        'Submit false, misleading or fraudulent information.',
        'Copy, reproduce or commercially exploit our content without permission.',
        'Use our website or content to compete unlawfully with Flawless Institution™.',
        'Attempt to obtain services through fraudulent payment or false information.'
      ]
    },
    {
      sectionNumber: 5,
      heading: 'Website Information',
      body: [
        'We make reasonable efforts to ensure that information published on the website is accurate and current. However, information may change from time to time. This may include course availability, course descriptions, prices, promotional offers, training dates, physical class arrangements, service availability, events, staffing availability, and website content.',
        'We reserve the right to correct errors, update information and make reasonable changes to our services.'
      ]
    },
    {
      sectionNumber: 6,
      heading: 'Online Purchases',
      body: [
        'Where products or services are purchased through the website, the customer is responsible for reviewing the product or service description, applicable price and relevant terms before completing the transaction.',
        'A transaction will be processed according to the information displayed at the time of purchase, subject to applicable law.',
        'Where an order cannot be fulfilled, we will communicate with the customer and take appropriate steps in accordance with applicable law.'
      ]
    },
    {
      sectionNumber: 7,
      heading: 'Prices',
      body: [
        'All prices displayed on the website are stated in South African Rand unless otherwise indicated.',
        'Prices may change from time to time.',
        'A promotional price applies only for the period and under the conditions specified in the relevant promotion.',
        'A previous price, special offer or payment arrangement does not create an entitlement to the same price in the future.'
      ]
    },
    {
      sectionNumber: 8,
      heading: 'Payment',
      body: [
        'Payment must be made using the payment method made available by Flawless Institution™.',
        'Where a service or promotion requires full payment, the booking is only confirmed once the full amount has been received.',
        'Payment is considered received when successfully cleared through the applicable payment method.',
        'Flawless Institution™ may decline or delay access to a service where payment has not been successfully completed.'
      ]
    },
    {
      sectionNumber: 9,
      heading: 'Payment Plans',
      body: [
        'Payment plans are not automatically available.',
        'A payment plan will only apply where Flawless Institution™ has expressly offered one for a particular service, programme or promotion.',
        'Where a promotion states that full payment is required, the customer may not assume that instalment payments will be accepted.',
        'Any approved payment arrangement must be confirmed by Flawless Institution™ in writing.'
      ]
    },
    {
      sectionNumber: 10,
      heading: 'Flawless Academy',
      body: [
        'Flawless Academy is the professional education and training division of Flawless Institution™.',
        'Courses are designed to provide practical knowledge, skills development and professional development.',
        'Unless a specific programme states otherwise: No previous experience is required; No specific educational background is required; No previous professional experience is required; Full payment is required to secure enrolment.',
        'Certain specialised programmes may have additional requirements where legally, practically or professionally necessary.'
      ]
    },
    {
      sectionNumber: 11,
      heading: 'Online Learning',
      body: [
        'Students enrolled in online programmes will receive access to the applicable learning materials and platform according to the programme purchased.',
        'Students are responsible for: maintaining their login details securely; having appropriate internet access and compatible devices; completing their learning requirements; keeping their account information accurate; and not sharing their course access with another person.',
        'Course access is personal to the registered student unless otherwise authorised in writing.'
      ]
    },
    {
      sectionNumber: 12,
      heading: 'Physical Classes',
      body: [
        'Physical classes are currently available in Fourways only.',
        'Physical training is offered for selected programmes and is subject to: course availability, confirmed bookings, class arrangements, minimum or appropriate group sizes, and venue availability.',
        'Flawless Institution™ reserves the right to reasonably change class dates, venues or arrangements where circumstances require. Where a significant change affects a confirmed booking, the student will be notified.'
      ]
    },
    {
      sectionNumber: 13,
      heading: 'Course Completion',
      body: [
        'Students are responsible for completing the requirements applicable to their selected programme.',
        'Course completion may depend on participation, completion of learning material, assessments, assignments, practical requirements or other requirements specified for the particular programme.',
        'Failure to complete applicable requirements may affect eligibility for certification.'
      ]
    },
    {
      sectionNumber: 14,
      heading: 'Certificates',
      body: [
        'Students who successfully complete the applicable Flawless Academy programme may receive a Flawless Academy certificate.',
        'Certificates recognise completion of the relevant Flawless training programme.',
        'Unless expressly stated otherwise, a Flawless Academy certificate: is not a government qualification; is not a professional licence; does not constitute a guarantee of employment; does not guarantee acceptance into another institution; and does not guarantee a specific salary or career outcome.'
      ]
    },
    {
      sectionNumber: 15,
      heading: 'Employment and Professional Opportunities',
      body: [
        'Flawless Institution™ does not guarantee employment, placement or income.',
        'Flawless Institution™ does not operate as an open job-placement platform for the general public.',
        'Where appropriate opportunities arise, eligible Flawless Professionals within our ecosystem may be considered for relevant opportunities based on factors including employer requirements, professional suitability, experience, references, availability, skills, role requirements and other relevant selection criteria.',
        'Final selection and employment decisions remain with the employer. Completion of a Flawless Academy course does not automatically entitle a person to employment or placement.'
      ]
    },
    {
      sectionNumber: 16,
      heading: 'Professional Responsibility',
      body: [
        'Students and Household Professionals are responsible for representing their experience, qualifications, references, work history and abilities accurately.',
        'Providing false, misleading or fraudulent information may result in withdrawal of consideration for opportunities, cancellation of participation or other appropriate action.'
      ]
    },
    {
      sectionNumber: 17,
      heading: 'Household Staffing Services',
      body: [
        'Flawless Institution™ provides professional household staffing solutions to private employers and households.',
        'Our staffing process may include: (1) Understanding employer requirements; (2) Establishing the role profile; (3) Identifying potentially suitable Flawless Professionals; (4) Reviewing available information; (5) Presenting suitable professionals for consideration; (6) Supporting the employer\'s selection process; (7) Supporting applicable onboarding arrangements.',
        'We do not guarantee that a suitable professional will always be available.'
      ]
    },
    {
      sectionNumber: 18,
      heading: 'Employer Selection',
      body: [
        'The employer is responsible for the final decision to interview, select and employ a Household Professional.',
        'The employer is responsible for ensuring that the employment relationship complies with applicable laws and contractual requirements.',
        'Where applicable, employers should conduct appropriate checks and verification before employing a Household Professional.',
        'Flawless Institution™ does not become the employer of a Household Professional merely because we introduce or present that professional, unless a separate written agreement expressly provides otherwise.'
      ]
    },
    {
      sectionNumber: 19,
      heading: 'Household Assessments',
      body: [
        'Household Assessments are professional advisory services designed to identify areas for improvement within a household.',
        'Depending on the service purchased, an assessment may consider staffing structure, role clarity, household operations, professional standards, communication, team performance, training requirements, household management, and other relevant matters.',
        'An assessment provides professional observations and recommendations based on the information and circumstances available at the time. It does not guarantee a particular outcome.'
      ]
    },
    {
      sectionNumber: 20,
      heading: 'Private Household Training',
      body: [
        'Private Household Training is designed to develop existing household teams according to the needs of the household.',
        'Training may include: professional housekeeping, executive housekeeping, household operations, laundry and garment care, cooking and kitchen standards, nanny professionalism, caregiving support, guest service and etiquette, communication and teamwork, confidentiality and professional conduct, and household standards.',
        'Specific training content, delivery method, duration and fees will be confirmed with the client.'
      ]
    },
    {
      sectionNumber: 21,
      heading: 'Household Advisory',
      body: [
        'Household advisory services provide professional guidance relating to household structure, staffing, management, team development and professional standards.',
        'Advice is based on the information supplied by the client and the scope of the service purchased.',
        'Clients remain responsible for decisions they make following an advisory engagement.'
      ]
    },
    {
      sectionNumber: 22,
      heading: 'Flawless Enterprise',
      body: [
        'Flawless Enterprise provides business education, coaching and advisory services.',
        'Services may include: Business Start-Up Advisory, Business Strategy, Business Growth Advisory, Marketing and Client Acquisition, Offer and Pricing Strategy, Business Systems, Founder Coaching, and Business Masterclasses.',
        'Business advisory and coaching services do not guarantee revenue, profitability, investment, clients, contracts, business growth or any particular financial result.'
      ]
    },
    {
      sectionNumber: 23,
      heading: 'Speaking and Events',
      body: [
        'Speaking engagements, workshops, masterclasses and events are subject to availability.',
        'Where applicable, separate arrangements may apply regarding speaking fees, travel, accommodation, venue, duration, equipment, cancellation, rescheduling and other event requirements.'
      ]
    },
    {
      sectionNumber: 24,
      heading: 'Digital Products and Resources',
      body: [
        'Digital resources, workbooks, templates, guides, publications and other electronic materials purchased from Flawless Institution™ are intended for the purchaser\'s personal use unless expressly stated otherwise.',
        'You may not: resell our materials; share paid materials with unauthorised persons; upload materials to public platforms; reproduce materials commercially; claim our materials as your own; or modify and sell our materials as your own product.'
      ]
    },
    {
      sectionNumber: 25,
      heading: 'Intellectual Property',
      body: [
        'All intellectual property belonging to or licensed to Flawless Institution™—including Flawless Institution™ branding, Flawless Academy branding, Flawless Enterprise branding, logos, names, taglines, website content, training material, course content, workbooks, templates, publications, videos, presentations, written content, original methodologies and other proprietary materials—is protected by applicable intellectual-property laws.',
        'No intellectual property may be reproduced, distributed, modified, published or commercially exploited without prior written permission.'
      ]
    },
    {
      sectionNumber: 26,
      heading: 'Trademark and Brand Use',
      body: [
        'The names Flawless Institution™, Flawless Academy, Flawless Enterprise, associated logos, slogans and other brand identifiers may not be used without written authorisation.',
        'You may not represent yourself as an employee, representative, partner, trainer, agent or authorised representative of Flawless Institution™ unless you have been formally authorised to do so.'
      ]
    },
    {
      sectionNumber: 27,
      heading: 'Confidentiality',
      body: [
        'Flawless Institution™ recognises the importance of confidentiality, particularly in relation to private households, employers, Household Professionals, students and business clients.',
        'We will take reasonable steps to protect confidential information provided to us, subject to legal obligations and the requirements of providing the requested service.'
      ]
    },
    {
      sectionNumber: 28,
      heading: 'Personal Information',
      body: [
        'Personal information submitted through our website or in connection with our services will be handled in accordance with our Privacy Policy / POPIA Privacy Notice.',
        'Flawless Institution™ will process personal information for legitimate business, service-delivery, administrative and legal purposes in accordance with applicable law.',
        'The South African Information Regulator identifies POPIA as establishing minimum requirements for the lawful processing of personal information by public and private bodies.'
      ]
    },
    {
      sectionNumber: 29,
      heading: 'Third-Party Services',
      body: [
        'Our website may use third-party platforms or services, including payment providers, learning platforms, communication platforms, hosting providers and external websites.',
        'Third-party services may have their own terms and privacy policies. Flawless Institution™ is not responsible for matters outside our reasonable control arising from the operation of an independent third-party platform.'
      ]
    },
    {
      sectionNumber: 30,
      heading: 'Website Security',
      body: [
        'We take reasonable measures to maintain the security of our website and information systems.',
        'However, no online system can be guaranteed to be completely secure.',
        'You are responsible for keeping your account credentials confidential and notifying us if you suspect unauthorised access to your account.'
      ]
    },
    {
      sectionNumber: 31,
      heading: 'Website Availability',
      body: [
        'We aim to maintain reliable website access but do not guarantee that the website will always be available, uninterrupted or error-free.',
        'Access may occasionally be interrupted because of maintenance, updates, technical issues, security measures, hosting problems, internet interruptions or events outside our reasonable control.'
      ]
    },
    {
      sectionNumber: 32,
      heading: 'Refunds and Cancellations',
      body: [
        'Flawless Institution™ operates a non-refundable payment policy, subject to any rights that cannot lawfully be excluded under South African law.',
        'Payments for courses, consultations, training, events, digital products, resources and other services are therefore generally non-refundable once the transaction has been confirmed.',
        'However, this provision does not seek to remove or limit any statutory consumer rights that apply to a particular transaction under the Consumer Protection Act.',
        'Where a specific service has separate cancellation or rescheduling terms, those terms will also apply.'
      ]
    },
    {
      sectionNumber: 33,
      heading: 'Promotional Offers',
      body: [
        'Promotional offers are subject to the specific conditions communicated with the promotion.',
        'Unless expressly stated otherwise: promotional prices are available only for the stated promotional period; promotions cannot automatically be extended; promotions cannot automatically be transferred to another person; promotions may not be combined with other offers; and full payment may be required to secure promotional pricing.',
        'Flawless Institution™ reserves the right to end a promotion when the advertised promotional period expires.'
      ]
    },
    {
      sectionNumber: 34,
      heading: 'No Guarantee of Results',
      body: [
        'Flawless Institution™ provides education, professional development, staffing and advisory services.',
        'We do not guarantee: employment, placement, a particular salary, business revenue, business profitability, client acquisition, promotion, contracts, investment, staffing outcomes, career advancement, or any specific financial or professional result.',
        'Outcomes depend on circumstances including individual effort, employer decisions, market conditions, economic circumstances, business conditions and other factors outside our control.'
      ]
    },
    {
      sectionNumber: 35,
      heading: 'Testimonials and Results',
      body: [
        'Testimonials, case studies and examples published by Flawless Institution™ represent the experiences of the individuals or organisations concerned.',
        'They should not be interpreted as guarantees that another person will achieve the same outcome.'
      ]
    },
    {
      sectionNumber: 36,
      heading: 'Client Responsibilities',
      body: [
        'Clients agree to provide accurate and complete information relevant to the service being requested.',
        'Clients are responsible for promptly notifying Flawless Institution™ if relevant information changes.',
        'We may rely on information supplied by the client when delivering services.'
      ]
    },
    {
      sectionNumber: 37,
      heading: 'Limitation of Liability',
      body: [
        'To the maximum extent permitted by applicable law, Flawless Institution™ will not be liable for losses arising from matters outside our reasonable control or for indirect or consequential losses where such limitation is legally permissible.',
        'Nothing in these Terms is intended to exclude or limit liability where South African law prohibits such exclusion or limitation.'
      ]
    },
    {
      sectionNumber: 38,
      heading: 'Indemnity',
      body: [
        'To the extent permitted by law, you agree to take responsibility for losses, claims or costs arising from your unlawful use of the website, misuse of our intellectual property, fraudulent conduct or breach of these Terms.',
        'This clause does not limit any rights or remedies that a consumer may have under applicable law.'
      ]
    },
    {
      sectionNumber: 39,
      heading: 'Termination',
      body: [
        'Flawless Institution™ may suspend or terminate access to the website, online platforms or certain services where there is reasonable evidence of: fraud, abuse, unauthorised access, misuse of our intellectual property, serious breach of these Terms, unlawful conduct, or conduct that creates a material risk to Flawless Institution™, its clients, students or professionals.',
        'Any termination will be subject to applicable law and the rights of the parties.'
      ]
    },
    {
      sectionNumber: 40,
      heading: 'Changes to Services',
      body: [
        'Flawless Institution™ may reasonably modify, improve, discontinue or replace services, programmes, content or website features.',
        'Where a material change affects a confirmed paid service, we will take reasonable steps to communicate the change and address the situation appropriately.'
      ]
    },
    {
      sectionNumber: 41,
      heading: 'Dispute Resolution',
      body: [
        'If you have a concern regarding a service, we encourage you to contact Flawless Institution™ first so that the matter can be reviewed and addressed where possible.',
        'Nothing in this clause prevents a consumer from exercising any statutory rights or remedies available under applicable South African law.'
      ]
    },
    {
      sectionNumber: 42,
      heading: 'Governing Law',
      body: [
        'These Terms and Conditions are governed by the laws of the Republic of South Africa.',
        'Any dispute will be handled in accordance with applicable South African law and the appropriate legal or dispute-resolution processes.'
      ]
    },
    {
      sectionNumber: 43,
      heading: 'Severability',
      body: [
        'If any provision of these Terms is found to be unlawful, invalid or unenforceable, that provision will be interpreted or amended to the minimum extent necessary, where legally possible, and the remaining provisions will continue to apply.'
      ]
    },
    {
      sectionNumber: 44,
      heading: 'Entire Agreement',
      body: [
        'These Terms, together with any applicable service-specific terms, quotation, booking confirmation, invoice and written agreement, constitute the agreement governing the relevant transaction, subject to applicable law.',
        'Where there is a conflict between these Terms and a specific written agreement, the specific written agreement will apply to the extent of the conflict.'
      ]
    },
    {
      sectionNumber: 45,
      heading: 'Updates to these Terms',
      body: [
        'Flawless Institution™ may update these Terms and Conditions from time to time.',
        'The most current version will be published on the website with the applicable effective date. Users should review the Terms periodically.'
      ]
    },
    {
      sectionNumber: 46,
      heading: 'Contact Information',
      body: [
        'FLAWLESS INSTITUTION™ — Fourways, South Africa',
        'Employers & Private Clients: Teldah Siyawamwaya | Tel: +27 83 872 2001 | Email: info@flawlessinstitution.co.za',
        'Flawless Academy & Training: Precious | Tel: +27 65 944 9409 | Email: training@flawlessinstitution.co.za'
      ]
    }
  ]
};

export const PRIVACY_POLICY: LegalSection = {
  id: 'privacy-policy',
  title: 'Privacy Policy & POPIA Notice',
  lastUpdated: 'September 2026',
  summary: 'This Privacy Policy sets out how Flawless Institution™ collects, processes, protects and stores personal information in strict compliance with the Protection of Personal Information Act No. 4 of 2013 (POPIA) and the guidelines of the South African Information Regulator.',
  content: [
    {
      heading: '1. Commitment to Privacy and Discretion',
      body: [
        'At Flawless Institution™, we recognize the profound value of confidentiality and privacy, particularly given our work with high-profile families, private households, corporate leaders, and professional domestic staff.',
        'We adhere to the 8 Condition principles of lawful processing set out in POPIA: Accountability, Processing Limitation, Purpose Specification, Further Processing Limitation, Information Quality, Openness, Security Safeguards, and Data Subject Participation.'
      ]
    },
    {
      heading: '2. Information We Collect',
      body: [
        'We collect personal information directly when you enrol in a course, submit an employment requirement, request advisory services, book a speaking engagement, or purchase products.',
        'Depending on the service, this information may include:'
      ],
      bulletPoints: [
        'Identifying & Contact Data: Full legal name, South African ID or Passport number, email address, physical address, and telephone numbers.',
        'Student Records: Course enrolments, module progression, assignment submissions, evaluation results, and graduation eligibility records.',
        'Household Staffing Profiles: Curriculum Vitae, employment history, verifiable professional references, background assessments, role preferences, and identity verification.',
        'Private Household & Employer Requirements: Household structure, staffing specifications, scheduling requirements, location details, and confidentiality preferences.',
        'Financial & Transactional Records: Proof of payment, transaction references, invoice records, and billing details. Note: Full payment card details are processed directly by PCI-DSS compliant payment gateways and are never stored on our local servers.'
      ]
    },
    {
      heading: '3. Purpose of Processing',
      body: [
        'Personal information is processed strictly for legitimate institutional purposes, including:',
        'Processing online and physical course enrolments and maintaining student academic records.',
        'Screening, profiling, and presenting suitable Household Professionals to private employers.',
        'Delivering bespoke private household training, assessments, and advisory reports.',
        'Administering the Annual Flawless Graduation and issuing official institutional completion certificates.',
        'Complying with South African statutory, tax, and regulatory record-keeping obligations.'
      ]
    },
    {
      heading: '4. Third-Party Sharing and Cross-Border Transfers',
      body: [
        'We do not sell, rent, or trade your personal information to third parties.',
        'Information is shared only with verified service providers acting on our instructions (such as secure cloud infrastructure providers, SMS/email transactional dispatchers, and banking payment clearing engines), or when required by statutory authorities or court order.',
        'Any cross-border transfer of data complies with Section 72 of POPIA, ensuring recipient jurisdictions maintain adequate data protection safeguards.'
      ]
    },
    {
      heading: '5. Security Safeguards',
      body: [
        'Flawless Institution™ implements physical, electronic, and procedural safeguards to protect personal information against loss, unauthorized access, destruction, or disclosure.',
        'Access to confidential employer and student records is restricted to authorized personnel bound by strict non-disclosure obligations.'
      ]
    },
    {
      heading: '6. Your Rights under POPIA',
      body: [
        'As a data subject under South African law, you have the right to:',
        'Request confirmation of whether we hold personal information about you.',
        'Request access to the record of your personal information (subject to the provisions of PAIA).',
        'Request the correction, destruction, or deletion of personal information that is inaccurate, irrelevant, excessive, or out of date.',
        'Object to the processing of personal information on reasonable grounds relating to your particular situation.',
        'Lodge a complaint with the South African Information Regulator (complaints.IR@justice.gov.za).'
      ]
    },
    {
      heading: '7. Information Officer Contact',
      body: [
        'For any inquiries, requests for access, or data corrections under POPIA, please contact:',
        'The Information Officer, Flawless Institution™, Fourways, South Africa',
        'Email: info@flawlessinstitution.co.za | Tel: +27 83 872 2001'
      ]
    }
  ]
};

export const REFUND_POLICY: LegalSection = {
  id: 'refund-policy',
  title: 'Refund & Cancellation Policy',
  lastUpdated: 'September 2026',
  summary: 'This policy sets out the payment, cancellation, and refund terms applicable to all courses, programmes, consultations, assessments, and services provided by Flawless Institution™.',
  content: [
    {
      heading: '1. Strict Non-Refundable Payment Policy',
      body: [
        'Flawless Institution™ operates a strict non-refundable payment policy.',
        'All payments made for Flawless Academy courses, physical class bookings, private household training, household staffing search retainers, household assessments, advisory sessions, consultations, masterclasses, speaking bookings, workbooks, and digital store downloads are final and non-refundable once confirmed.'
      ]
    },
    {
      heading: '2. Consumer Protection Act (CPA) Notice',
      body: [
        'Our terms are structured in accordance with the laws of the Republic of South Africa, including the Consumer Protection Act No. 68 of 2008 (CPA).',
        'Nothing in this policy seeks to unlawfully exclude or limit any statutory consumer right that cannot legally be waived or modified by contract.',
        'Where direct marketing applies under Section 16 of the CPA, statutory 5-business-day cooling-off provisions will be respected upon written notice, provided access to proprietary course materials or completed services has not already been delivered or initiated.'
      ]
    },
    {
      heading: '3. Flawless Academy Courses & Physical Class Rescheduling',
      body: [
        'Course bookings are secured strictly upon receipt of cleared funds.',
        'For Fourways physical class enrolments, seats are strictly limited per cohort. If a student is unable to attend their scheduled intake due to documented medical or emergency circumstances, Flawless Institution™ may, at its sole discretion, approve a transfer to a subsequent scheduled cohort.',
        'No cash refunds will be provided for unattended sessions, missed classes, or voluntary withdrawal after registration.'
      ]
    },
    {
      heading: '4. Non-Transferability and Promotional Terms',
      body: [
        'Enrolments and course access licences are strictly personal to the registered candidate and cannot be assigned, transferred, or shared with third parties without prior written consent.',
        'Special promotional rates, launch specials, or discounted course bundles apply exclusively during the advertised promotional window and cannot be applied retroactively or converted into cash credits.'
      ]
    },
    {
      heading: '5. Cancellation of Bespoke Household & Advisory Engagements',
      body: [
        'Private Household Training and Household Assessment engagements involve dedicated resource allocation and curriculum preparation.',
        'Clients requesting date adjustments for in-home training must provide a minimum of 7 business days written notice. Retainers and booking fees remain non-refundable.'
      ]
    },
    {
      heading: '6. Queries & Resolution',
      body: [
        'If you have any questions regarding your booking or payment confirmation, please contact our administration department:',
        'Flawless Academy & Training: Precious | Tel: +27 65 944 9409 | Email: training@flawlessinstitution.co.za',
        'General Administration: info@flawlessinstitution.co.za'
      ]
    }
  ]
};

export const DISCLAIMER: LegalSection = {
  id: 'disclaimer',
  title: 'Institutional Disclaimer',
  lastUpdated: 'September 2026',
  summary: 'Important legal notices regarding our educational status, non-guarantee of employment, business advisory scope, and professional representations.',
  content: [
    {
      heading: '1. No Guarantee of Employment or Placement',
      body: [
        'Flawless Institution™ is a private professional education, household solutions, and business advisory institution. It is not an open employment bureau, placement agency, or job guarantee service for the general public.',
        'Enrolling in or successfully graduating from any Flawless Academy programme does not guarantee employment, job placement, promotion, visa/immigration approval, or a specific level of remuneration.',
        'Where suitable household staffing opportunities arise within our private employer network, eligible Flawless Professionals may be considered based on employer requirements, background checks, references, and professional suitability. Final selection and hiring decisions rest solely with the prospective employer.'
      ]
    },
    {
      heading: '2. Skills Training Status & Certification',
      body: [
        'Programmes offered by Flawless Academy are practical skills-training courses formulated to develop hands-on capability, standards of excellence, and professional etiquette in private household and service roles.',
        'Unless expressly stated otherwise in writing, Flawless Academy certificates certify completion of institutional practical training and do not constitute government-regulated qualifications, university degrees, or state occupational licences.'
      ]
    },
    {
      heading: '3. Business Advisory & Coaching Disclaimer',
      body: [
        'Services provided by Flawless Enterprise (including business advisory, founder coaching, masterclasses, pricing strategies, and system reviews) provide strategic education, insight, and frameworks based on over 16 years of practical industry experience.',
        'Flawless Enterprise does not offer legal, accounting, tax, or registered financial investment advice.',
        'We do not guarantee specific business turnover, profitability, investor funding, client acquisition rates, or commercial results. Business outcomes depend on macroeconomic circumstances, execution, individual leadership, and external factors beyond our control.'
      ]
    },
    {
      heading: '4. Household Assessments & Advisory Recommendations',
      body: [
        'Household Assessments and advisory reports provide professional observations and practical recommendations based on the information, household dynamics, and staff observations available at the time of engagement.',
        'Flawless Institution™ cannot be held liable for internal disputes, staff turnover, or household management decisions taken following the delivery of advisory guidance.'
      ]
    },
    {
      heading: '5. Testimonials and Professional Representations',
      body: [
        'Testimonials, graduate stories, case studies, and client endorsements presented across our website, publications, and promotional material reflect individual experiences and do not constitute a representation that future clients or students will experience identical results.'
      ]
    }
  ]
};

export const PAIA_MANUAL: LegalSection = {
  id: 'paia-manual',
  title: 'PAIA Manual (Access to Information)',
  lastUpdated: 'September 2026',
  summary: 'Manual prepared in accordance with Section 51 of the Promotion of Access to Information Act No. 2 of 2000 (PAIA) for Flawless Institution™.',
  content: [
    {
      heading: '1. Introduction to the PAIA Manual',
      body: [
        'The Promotion of Access to Information Act No. 2 of 2000 (PAIA) gives effect to the constitutional right of access to any information held by the State and any information that is held by another person and that is required for the exercise or protection of any rights.',
        'This manual provides an overview of the records held by Flawless Institution™ as a private body and outlines the procedure for requesting access to such records.'
      ]
    },
    {
      heading: '2. Particulars of the Private Body',
      body: [
        'Name of Body: Flawless Institution™ (Pty) Ltd',
        'Physical Location: Fourways, Johannesburg, Gauteng, Republic of South Africa',
        'Information Officer: Teldah Siyawamwaya (Founder & Director)',
        'Telephone: +27 83 872 2001',
        'Email Address: info@flawlessinstitution.co.za',
        'Website: www.flawlessinstitution.co.za'
      ]
    },
    {
      heading: '3. Guide on How to Use PAIA',
      body: [
        'The South African Information Regulator has compiled a comprehensive guide containing information required by any person wishing to exercise any right contemplated by PAIA.',
        'This guide is available from the Information Regulator in each official language:',
        'Website: https://inforegulator.org.za | Email: enquiries@inforegulator.org.za'
      ]
    },
    {
      heading: '4. Records Automatically Available to the Public',
      body: [
        'The following categories of records are automatically available on our website without the need to submit a formal PAIA request:',
        'Course prospectuses, brochures, and curriculum outlines.',
        'Published fee structures and promotional schedules.',
        'Website Terms and Conditions, Privacy Notice, and Institutional Disclaimers.',
        'Public articles, thought leadership publications, and event details.'
      ]
    },
    {
      heading: '5. Categories of Records Held by Flawless Institution™',
      body: [
        'Access to non-public records may be requested subject to the grounds for refusal stipulated in PAIA:',
        'Corporate & Governance: Statutory incorporation records, founding documents, and director resolutions.',
        'Financial & Tax: Annual financial statements, tax records, VAT records, banking records, and payment confirmations.',
        'Academic & Student Records: Student enrolment files, curriculum modules, assessment scores, and graduation registers.',
        'Human Resources & Professional Registry: Staff employment contracts, trainer credentials, background verifications, and candidate reference files.',
        'Commercial Contracts: Service level agreements with private employers, confidentiality agreements, supplier contracts, and vendor records.'
      ]
    },
    {
      heading: '6. Procedure for Requesting Access to Records',
      body: [
        'To request access to a record, the requester must complete the prescribed Form 2 (available on the Information Regulator website) and submit it to our Information Officer at info@flawlessinstitution.co.za.',
        'The request must provide sufficient detail to enable the Information Officer to identify the record and the requester.',
        'The requester must specify the right they are seeking to exercise or protect and explain why the requested record is required for that purpose.',
        'The prescribed request fee must be paid before the request is evaluated, as set out in the PAIA regulations.'
      ]
    },
    {
      heading: '7. Grounds for Refusal of Access',
      body: [
        'In terms of Chapter 4 of PAIA, access to records may be refused on grounds including:',
        'Mandatory protection of the privacy of a third party who is a natural person (including deceased persons).',
        'Mandatory protection of the commercial information of a third party.',
        'Mandatory protection of confidential information of third parties protected by an agreement.',
        'Mandatory protection of the safety of individuals and protection of property.',
        'Mandatory protection of records privileged from production in legal proceedings.'
      ]
    }
  ]
};

export const LEGAL_SECTIONS_MAP: Record<string, LegalSection> = {
  'terms-conditions': TERMS_AND_CONDITIONS,
  'privacy-policy': PRIVACY_POLICY,
  'refund-policy': REFUND_POLICY,
  'disclaimer': DISCLAIMER,
  'paia-manual': PAIA_MANUAL,
};
