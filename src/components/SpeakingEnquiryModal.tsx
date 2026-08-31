import React, { useState } from 'react';
import { 
  X, Sparkles, Send, CheckCircle2, Calendar, MapPin, 
  Users, Clock, Mic, Mail, Phone, Building, Copy, Check 
} from 'lucide-react';
import { SPEAKING_TOPICS, FOUNDER_CONTACT } from '../data/speakingData';

interface SpeakingEnquiryModalProps {
  initialTopic?: string;
  onClose: () => void;
}

export const SpeakingEnquiryModal: React.FC<SpeakingEnquiryModalProps> = ({
  initialTopic,
  onClose
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    eventName: '',
    eventDate: '',
    location: '',
    attendees: '50 - 150 Attendees',
    audienceType: 'Business & Corporate Leaders',
    preferredTopic: initialTopic || SPEAKING_TOPICS[0].title,
    speakingFormat: 'Keynote Presentation (45 - 60 mins)',
    duration: '45 - 60 Minutes',
    engagementType: 'In-person engagement',
    objectives: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const ref = `TELDAH-SPK-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(ref);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(bookingRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#0e0e13] border border-[#d4af37]/40 rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl text-neutral-200 font-sans-body"
        id="speaking-enquiry-modal"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#121218]/95 backdrop-blur-md border-b border-neutral-800 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#8f7023] p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0a0d] rounded-[9px] flex items-center justify-center text-[#f3e1a9]">
                <Mic className="w-5 h-5 text-[#d4af37]" />
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#d4af37] font-semibold tracking-wider uppercase">Thought Leadership Booking</div>
              <h2 className="text-base sm:text-lg font-cinzel font-bold text-white leading-tight">
                Invite Teldah Siyawamwaya to Speak
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-speaking-modal-btn"
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 md:p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Introduction Banner */}
              <div className="bg-[#15151e] border border-[#d4af37]/30 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start justify-between gap-4">
                <div>
                  <div className="font-cinzel text-sm sm:text-base font-bold text-white">
                    Bring Experience, Insight & Practical Wisdom to Your Audience
                  </div>
                  <p className="text-xs text-neutral-300 mt-1">
                    Teldah is available for selected keynotes, masterclasses, conferences, and private executive sessions across South Africa and internationally.
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0 text-xs text-neutral-400">
                  <div className="text-[#f3e1a9] font-medium">+27 65 944 9409</div>
                  <div>Fourways, South Africa</div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Your Full Name <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Dr. Arthur Mthembu"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Organisation / Company <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="text"
                    name="organisation"
                    required
                    placeholder="e.g. Residential Estate Association / Corporate Group"
                    value={formData.organisation}
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
                    placeholder="e.g. organiser@company.co.za"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Contact / WhatsApp Number <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +27 82 123 4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Event / Conference Name
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    placeholder="e.g. Annual Estate Living Summit 2026"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Target Event Date <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Event Location / City
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Sandton, Johannesburg (or Online Webinar)"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Expected Number of Attendees
                  </label>
                  <select
                    name="attendees"
                    value={formData.attendees}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>Under 50 Attendees (Executive / Masterclass)</option>
                    <option>50 - 150 Attendees</option>
                    <option>150 - 500 Attendees</option>
                    <option>500+ Attendees (Large Convention)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Audience Type
                  </label>
                  <select
                    name="audienceType"
                    value={formData.audienceType}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>Private Household Employers & Estate Residents</option>
                    <option>Household Staff & Domestic Professionals</option>
                    <option>Business Owners & Entrepreneurs</option>
                    <option>Corporate Executives & HR Leaders</option>
                    <option>Hospitality & Hotel Managers</option>
                    <option>Community & Faith Organisations</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Engagement Format
                  </label>
                  <select
                    name="engagementType"
                    value={formData.engagementType}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>In-person engagement</option>
                    <option>Online presentation / Webinar</option>
                    <option>Hybrid event</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Speaking Format
                  </label>
                  <select
                    name="speakingFormat"
                    value={formData.speakingFormat}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>Keynote Presentation</option>
                    <option>Conference / Panel Discussion</option>
                    <option>Private Masterclass (Half-Day / Full-Day)</option>
                    <option>Interactive Workshop</option>
                    <option>Employer Education Session</option>
                    <option>Entrepreneurship Strategy Session</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Estimated Duration
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>45 - 60 Minutes (Standard Keynote)</option>
                    <option>90 Minutes (Keynote + Interactive Q&A)</option>
                    <option>Half-Day Masterclass (3 - 4 Hours)</option>
                    <option>Full-Day Immersion (6+ Hours)</option>
                  </select>
                </div>
              </div>

              {/* Preferred Topic */}
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Preferred Topic <span className="text-[#d4af37]">*</span>
                </label>
                <select
                  name="preferredTopic"
                  value={formData.preferredTopic}
                  onChange={handleInputChange}
                  className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  {SPEAKING_TOPICS.map(topic => (
                    <option key={topic.id} value={topic.title}>
                      {topic.title} ({topic.category})
                    </option>
                  ))}
                  <option value="Tailored Bespoke Topic">Other / Custom Tailored Topic</option>
                </select>
              </div>

              {/* Objectives & Audience Takeaway */}
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Tell us about your event and what you would like the audience to gain:
                </label>
                <textarea
                  name="objectives"
                  rows={3}
                  placeholder="Share event objectives, specific theme, attendee challenges, or desired transformation..."
                  value={formData.objectives}
                  onChange={handleInputChange}
                  className="w-full bg-[#15151c] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                id="submit-speaking-enquiry-btn"
                className="w-full py-4 px-6 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition-all flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Transmitting Speaking Docket...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT SPEAKING ENQUIRY</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Submission Confirmation Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border-2 border-[#d4af37] text-[#f3e1a9] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#d4af37]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest">
                  Enquiry Received
                </span>
                <h3 className="text-2xl font-cinzel font-bold text-white">
                  Speaking Enquiry Submitted Successfully
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your enquiry for <strong>{formData.preferredTopic}</strong> has been transmitted to Teldah Siyawamwaya’s office.
                </p>
              </div>

              {/* Booking Reference Card */}
              <div className="bg-[#15151e] border border-[#d4af37]/30 rounded-2xl p-6 max-w-md mx-auto text-left shadow-xl space-y-3">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                  <span className="text-xs text-neutral-400">Enquiry Reference:</span>
                  <div className="flex items-center gap-2">
                    <strong className="text-[#f3e1a9] font-mono text-sm">{bookingRef}</strong>
                    <button
                      onClick={handleCopyRef}
                      className="p-1 rounded bg-neutral-900 text-neutral-400 hover:text-white"
                      title="Copy Reference"
                    >
                      {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-neutral-300">
                  <div><strong>Organisation:</strong> {formData.organisation}</div>
                  <div><strong>Format:</strong> {formData.speakingFormat}</div>
                  <div><strong>Proposed Date:</strong> {formData.eventDate || 'Pending Finalisation'}</div>
                  <div><strong>Engagement:</strong> {formData.engagementType}</div>
                </div>
              </div>

              <div className="text-xs text-neutral-400 max-w-md mx-auto">
                Our office will review the schedule and reach out via <strong>{formData.email}</strong> or <strong>{formData.phone}</strong> within 24–48 business hours with availability and engagement terms.
              </div>

              <button
                onClick={onClose}
                id="close-speaking-success-btn"
                className="py-3 px-8 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider"
              >
                Return to Site
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
