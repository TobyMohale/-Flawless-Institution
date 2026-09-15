/**
 * Flawless Institution™ - Server Configuration & Environment
 * Headquarters: Fourways, Johannesburg, South Africa
 */
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: 3000,
  host: '0.0.0.0',
  appName: 'Flawless Institution™ API',
  apiVersion: 'v1',
  
  institution: {
    name: 'Flawless Institution',
    headquarters: 'Fourways, Johannesburg, South Africa',
    contactEmail: 'info@flawlessinstitution.co.za',
    phone: '+27 11 000 0000',
    foundedYear: 2016,
    director: 'Teldah Siyawamwaya',
    currency: 'ZAR',
    registrationFeeZAR: 300,
    annualGraduation: {
      month: 'November',
      venue: 'Fourways, Johannesburg',
      status: 'In-Person Certificate Conferral Only',
    },
    tax: {
      vatRegistered: true,
      vatNumber: '4790281944',
      companyRegistration: '2016/094821/07',
      address: 'Design Quarter District, Leslie Avenue, Fourways, Johannesburg, 2055, South Africa',
      taxRate: 0.15, // 15% South African VAT
    },
    banking: {
      bank: 'Standard Bank South Africa',
      accountName: 'Flawless Institution (Pty) Ltd',
      accountNumber: '022849103',
      branchCode: '051001',
      accountType: 'Current / Business Account',
      swiftCode: 'SBZA ZA JJ',
    },
  },

  payments: {
    payfast: {
      merchantId: process.env.PAYFAST_MERCHANT_ID || '10000100', // Standard sandbox merchant ID
      merchantKey: process.env.PAYFAST_MERCHANT_KEY || '46f0cd694581a',
      passphrase: process.env.PAYFAST_PASSPHRASE || 'flawless_passphrase_2026',
      sandbox: process.env.PAYFAST_SANDBOX !== 'false',
      processUrl: process.env.PAYFAST_SANDBOX !== 'false'
        ? 'https://sandbox.payfast.co.za/eng/process'
        : 'https://www.payfast.co.za/eng/process',
      validateUrl: process.env.PAYFAST_SANDBOX !== 'false'
        ? 'https://sandbox.payfast.co.za/eng/query/validate'
        : 'https://www.payfast.co.za/eng/query/validate',
    },
    ozow: {
      siteCode: process.env.OZOW_SITE_CODE || 'FLA-FLA-001',
      privateKey: process.env.OZOW_PRIVATE_KEY || 'flawless_ozow_secret_2026',
      apiKey: process.env.OZOW_API_KEY || 'flawless_ozow_api_key_2026',
      isTest: process.env.NODE_ENV !== 'production',
    },
  },

  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    isConfigured: Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)),
  },

  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
    fromEmail: process.env.RESEND_FROM_EMAIL || 'Flawless Institution <admissions@flawlessinstitution.co.za>',
    isConfigured: Boolean(process.env.RESEND_API_KEY),
  },

  corsOrigins: [
    'http://localhost:3000',
    process.env.APP_URL || '',
  ].filter(Boolean),

  security: {
    jwtSecret: process.env.JWT_SECRET || 'flawless-institution-secret-key-2026-fourways',
    jwtExpiresIn: '7d',
  },
};
