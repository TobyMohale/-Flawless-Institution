/**
 * Flawless Institution™ - Official EFT Payment Options & Banking Records
 * Fourways, Johannesburg, South Africa
 */

export interface EftBankDetails {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  branchCode: string;
}

export interface MukuruDetails {
  provider: string;
  accountHolder: string;
  accountNumber: string;
  linkedNumber: string;
  linkedNumberRaw: string;
}

export interface ProofOfPaymentContact {
  team: string;
  whatsappDisplay: string;
  whatsappRaw: string;
  whatsappUrl: string;
  instructionText: string;
  detailsRequired: string;
  importantNotice: string;
}

export const EFT_PAYMENT_CONFIG = {
  title: 'EFT PAYMENT OPTIONS',
  subtitle: 'Official bank transfer and remittance channels for Flawless Institution course registrations',
  
  fnb: {
    title: 'FNB BANK TRANSFER',
    bankName: 'First National Bank (FNB)',
    accountHolder: 'Zim Angels',
    accountNumber: '62797216647',
    branchCode: '250655',
    accountType: 'Cheque / Business Account',
  },

  mukuru: {
    title: 'MUKURU',
    provider: 'Mukuru Money Transfer & Wallet',
    accountHolder: 'Teldah Siyawamwaya',
    accountNumber: '51672409431',
    linkedNumber: '+27 83 872 2001',
    linkedNumberRaw: '27838722001',
  },

  proofOfPayment: {
    title: 'PROOF OF PAYMENT',
    team: 'Training & Support Team',
    whatsappDisplay: '+27 65 944 9409',
    whatsappRaw: '27659449409',
    instructionText: 'After completing your payment, please send your proof of payment to our Training & Support Team:',
    detailsRequired: 'Please include your full Name and the Course or Courses you have booked when submitting your proof of payment.',
    importantNotice: 'Important: Your booking will be processed once payment and proof of payment have been received.',
    getWhatsAppLink: (studentName?: string, courseTitle?: string, reference?: string) => {
      let text = 'Hi Flawless Training & Support Team, I have completed my course payment.';
      if (studentName) text += `\nFull Name: ${studentName}`;
      if (courseTitle) text += `\nCourse(s) Booked: ${courseTitle}`;
      if (reference) text += `\nReference: ${reference}`;
      text += '\nPlease find attached my proof of payment.';
      return `https://wa.me/27659449409?text=${encodeURIComponent(text)}`;
    }
  }
};
