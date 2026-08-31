import React, { useState } from 'react';
import { Course } from '../data/coursesData';
import { 
  X, Check, ShieldCheck, CreditCard, Landmark, CheckCircle2, 
  ArrowRight, Download, BookOpen, AlertCircle, Sparkles, MapPin, Globe, Lock 
} from 'lucide-react';
import { SEPTEMBER_PHYSICAL_INTAKE, GRADUATION_INFO } from '../data/siteData';

interface EnrolmentCheckoutModalProps {
  course: Course | null;
  onClose: () => void;
  onSuccessEnrol: (course: Course, studentData: any) => void;
}

export const EnrolmentCheckoutModal: React.FC<EnrolmentCheckoutModalProps> = ({ 
  course, 
  onClose, 
  onSuccessEnrol 
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [learningMode, setLearningMode] = useState<'Online' | 'Physical'>('Online');
  const [paymentMethod, setPaymentMethod] = useState<'instant-eft' | 'credit-card' | 'payfast' | 'bank-transfer'>('instant-eft');
  const [isProcessing, setIsProcessing] = useState(false);
  const [studentId, setStudentId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    idOrPassport: '',
    email: '',
    phone: '',
    city: 'Johannesburg',
    currentOccupation: '',
    emergencyContact: '',
    notes: '',
    agreedToTerms: false
  });

  if (!course) return null;

  const totalAmount = course.specialPrice + course.registrationFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.agreedToTerms) {
      alert('Please fill in all required fields and accept the course terms.');
      return;
    }
    setStep('payment');
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedId = `FI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setStudentId(generatedId);
      setIsProcessing(false);
      setStep('success');
      onSuccessEnrol(course, { ...formData, learningMode, studentId: generatedId, totalPaid: totalAmount });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#0e0e12] border border-[#d4af37]/40 rounded-2xl w-full max-w-2xl max-h-[94vh] overflow-y-auto shadow-2xl text-neutral-200 font-sans-body"
        id="enrolment-checkout-modal"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#121218]/95 backdrop-blur-md border-b border-neutral-800 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37] text-black font-cinzel font-bold flex items-center justify-center text-xs">
              FI
            </div>
            <div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Flawless Academy Enrolment</div>
              <h2 className="text-base sm:text-lg font-cinzel font-bold text-white leading-tight">
                {step === 'details' && 'Student Registration'}
                {step === 'payment' && 'Secure Course Checkout'}
                {step === 'success' && 'Enrolment Confirmed!'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-enrol-modal-btn"
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 md:p-8">
          {/* Progress Indicator */}
          {step !== 'success' && (
            <div className="flex items-center justify-between max-w-md mx-auto mb-8 text-xs">
              <div className={`flex items-center gap-2 ${step === 'details' ? 'text-[#f3e1a9] font-bold' : 'text-emerald-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'details' ? 'bg-[#d4af37] text-black' : 'bg-emerald-500 text-black'}`}>
                  1
                </span>
                <span>Student Info</span>
              </div>
              <div className="flex-1 h-[1px] bg-neutral-800 mx-3"></div>
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#f3e1a9] font-bold' : 'text-neutral-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'payment' ? 'bg-[#d4af37] text-black' : 'bg-neutral-800 text-neutral-400'}`}>
                  2
                </span>
                <span>Payment & Access</span>
              </div>
            </div>
          )}

          {/* STEP 1: STUDENT REGISTRATION FORM */}
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {/* Selected Course Banner */}
              <div className="bg-[#15151d] p-4 rounded-xl border border-neutral-800 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block">Selected Programme</span>
                  <div className="text-sm sm:text-base font-cinzel font-bold text-white mt-0.5">{course.title}</div>
                  <div className="text-xs text-neutral-400 mt-1">Duration: {course.duration} • {course.category}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-[#f3e1a9] font-cinzel">R{totalAmount.toLocaleString()}</div>
                  <div className="text-[10px] text-neutral-400">Incl. R300 Reg. Fee</div>
                </div>
              </div>

              {/* Mode Selection if physical is available */}
              {course.physicalAvailableSeptember && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 block">
                    Choose Your Preferred Learning Format:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setLearningMode('Online')}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        learningMode === 'Online'
                          ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                          : 'border-neutral-800 bg-[#121217] text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-semibold text-xs text-white">
                        <Globe className="w-4 h-4 text-[#d4af37]" />
                        <span>100% Online Self-Paced</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Learn anywhere across South Africa with continuous video lessons and digital modules.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLearningMode('Physical')}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        learningMode === 'Physical'
                          ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                          : 'border-neutral-800 bg-[#121217] text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-semibold text-xs text-white">
                        <MapPin className="w-4 h-4 text-[#d4af37]" />
                        <span>Fourways Physical Training</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Commences <strong>7 September 2026</strong>. Structured in-person classroom and practical labs.
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* Student Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Full Legal Name & Surname <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Nomvula Dlamini"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                  <span className="text-[10px] text-neutral-500 block mt-0.5">As it should appear on your Certificate</span>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    ID / Passport Number <span className="text-neutral-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="idOrPassport"
                    placeholder="South African ID or Passport"
                    value={formData.idOrPassport}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Email Address <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. nomvula@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                  <span className="text-[10px] text-neutral-500 block mt-0.5">Learning portal access details will be sent here</span>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Mobile / WhatsApp Number <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +27 65 123 4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    City / Province
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Fourways, Johannesburg"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Current Occupation / Background
                  </label>
                  <input
                    type="text"
                    name="currentOccupation"
                    placeholder="e.g. Household Professional, Seeking Career Shift"
                    value={formData.currentOccupation}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="bg-[#121217] p-3.5 rounded-xl border border-neutral-800 space-y-2 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer text-neutral-300">
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    required
                    checked={formData.agreedToTerms}
                    onChange={handleInputChange}
                    className="mt-0.5 accent-[#d4af37] w-4 h-4 rounded"
                  />
                  <span className="leading-snug text-[11px]">
                    I understand that Flawless Academy courses are practical skills training programmes with an annual November Graduation in Fourways, and I acknowledge the strict <strong>No Refunds policy</strong>.
                  </span>
                </label>
              </div>

              {/* Action */}
              <button
                type="submit"
                id="submit-student-info-btn"
                className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <span>Proceed to Payment (R{totalAmount.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD & SUMMARY */}
          {step === 'payment' && (
            <div className="space-y-6">
              {/* Order Breakdown */}
              <div className="bg-[#15151d] p-5 rounded-xl border border-[#d4af37]/30 space-y-3">
                <div className="text-xs font-cinzel font-bold text-white uppercase tracking-wider">
                  Payment Summary
                </div>
                <div className="space-y-1.5 text-xs border-b border-neutral-800 pb-3">
                  <div className="flex justify-between text-neutral-300">
                    <span>{course.title} ({learningMode} Mode)</span>
                    <span className="font-semibold text-white">R{course.specialPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Student Registration Fee</span>
                    <span className="font-semibold text-white">R{course.registrationFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 text-[11px]">
                    <span>Promotional Savings Applied</span>
                    <span>-R{(course.normalPrice - course.specialPrice).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <div>
                    <span className="text-sm font-bold text-white">Total Amount Due:</span>
                    <div className="text-[10px] text-neutral-400">Student: {formData.fullName} ({formData.email})</div>
                  </div>
                  <span className="text-2xl font-cinzel font-bold text-[#f3e1a9]">
                    R{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-neutral-300">
                  Select Payment Method:
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('instant-eft')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      paymentMethod === 'instant-eft'
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-white'
                        : 'border-neutral-800 bg-[#121217] text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs text-white">
                      <Landmark className="w-4 h-4 text-[#d4af37]" />
                      <span>Instant EFT / Ozow</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-1">Capitec, FNB, Standard Bank, Nedbank, Absa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit-card')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      paymentMethod === 'credit-card'
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-white'
                        : 'border-neutral-800 bg-[#121217] text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs text-white">
                      <CreditCard className="w-4 h-4 text-[#d4af37]" />
                      <span>Debit / Credit Card</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-1">Visa, Mastercard (3D Secure Protected)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('payfast')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      paymentMethod === 'payfast'
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-white'
                        : 'border-neutral-800 bg-[#121217] text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs text-white">
                      <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                      <span>PayFast Secure Gateway</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-1">Direct online checkout & QR scan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank-transfer')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      paymentMethod === 'bank-transfer'
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-white'
                        : 'border-neutral-800 bg-[#121217] text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs text-white">
                      <Lock className="w-4 h-4 text-[#d4af37]" />
                      <span>Direct Institutional EFT</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-1">Manual bank transfer with proof of payment</span>
                  </button>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900/60 p-3 rounded-lg border border-neutral-800">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>256-Bit SSL Encrypted Transaction. Immediate portal credentials generated.</span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="w-1/3 py-3 px-4 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900 border border-neutral-700 hover:bg-neutral-800"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleCompletePayment}
                  id="complete-payment-btn"
                  className="w-2/3 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition-all flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      Processing Enrolment...
                    </span>
                  ) : (
                    <>
                      <span>Complete & Access Portal</span>
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS & STUDENT PORTAL ONBOARDING */}
          {step === 'success' && (
            <div className="text-center space-y-6 py-2">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border-2 border-[#d4af37] text-[#f3e1a9] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#d4af37]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest">
                  Welcome to Flawless Academy
                </span>
                <h3 className="text-2xl font-cinzel font-bold text-white">
                  Enrolment & Access Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                  Congratulations, <strong className="text-white">{formData.fullName}</strong>! You are officially registered for <strong>{course.title}</strong>.
                </p>
              </div>

              {/* Digital Student Card Preview */}
              <div className="bg-gradient-to-br from-[#1c1c24] via-[#141419] to-[#0c0c10] border border-[#d4af37]/40 rounded-2xl p-6 max-w-md mx-auto text-left shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-[#d4af37]/10 rounded-full blur-xl"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">Flawless Institution</div>
                    <div className="font-cinzel text-base font-bold text-white">STUDENT CREDENTIAL</div>
                  </div>
                  <span className="text-[10px] bg-[#d4af37] text-black px-2 py-0.5 rounded font-bold uppercase">
                    Active Student
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between border-b border-neutral-800 pb-1">
                    <span className="text-neutral-400">Student ID:</span>
                    <strong className="text-[#f3e1a9] font-mono">{studentId}</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-800 pb-1">
                    <span className="text-neutral-400">Programme:</span>
                    <strong className="text-white text-right line-clamp-1">{course.title}</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-800 pb-1">
                    <span className="text-neutral-400">Learning Mode:</span>
                    <strong className="text-emerald-400">{learningMode}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Graduation Target:</span>
                    <strong className="text-[#f3e1a9]">November Fourways Ceremony</strong>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-[#121217] p-4 rounded-xl border border-neutral-800 text-xs text-neutral-400 text-left space-y-1.5 max-w-md mx-auto">
                <div className="font-semibold text-white text-xs mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> What Happens Next:
                </div>
                <p>1. Your digital receipt and syllabus package have been dispatched to <strong>{formData.email}</strong>.</p>
                <p>2. You can immediately access your course modules and self-assessments in the Flawless Student Portal.</p>
                {learningMode === 'Physical' && (
                  <p className="text-emerald-300 font-medium">3. Fourways in-person orientation begins 7 September 2026. Classroom access pass confirmed.</p>
                )}
              </div>

              {/* Next Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <button
                  onClick={onClose}
                  id="close-success-btn"
                  className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Launch Student Learning Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
