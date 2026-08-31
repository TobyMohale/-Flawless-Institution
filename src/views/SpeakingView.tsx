import React, { useState, useRef } from 'react';
import { 
  Mic, Sparkles, Send, CheckCircle2, Calendar, MapPin, 
  Users, Clock, Globe, Briefcase, Award, ArrowRight, Building, Check, Copy 
} from 'lucide-react';
import { 
  SPEAKING_TOPICS, SPEAKING_FORMATS, WHO_CAN_INVITE, 
  MASTERCLASS_TOPICS, FOUNDER_CONTACT, SpeakingTopic 
} from '../data/speakingData';
import { BACKGROUND_IMAGES } from '../data/assetsData';

interface SpeakingViewProps {
  onOpenSpeakingEnquiry: (topic?: string) => void;
}

export const SpeakingView: React.FC<SpeakingViewProps> = ({ onOpenSpeakingEnquiry }) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedTopicModal, setSelectedTopicModal] = useState<SpeakingTopic | null>(null);

  // In-page form state
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
    audienceType: 'Private Household Employers & Estate Residents',
    preferredTopic: SPEAKING_TOPICS[0].title,
    speakingFormat: 'Keynote Presentation',
    duration: '45 - 60 Minutes',
    engagementType: 'In-person engagement',
    objectives: ''
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <div className="space-y-20 pb-20 font-sans-body">
      {/* 1. TOP HEADER & PROMINENT BUTTON #1 */}
      <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-28 border-b border-[#d4af37]/20 bg-[#09090c]">
        {/* Atmospheric Keynote Stage Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={BACKGROUND_IMAGES.speaking}
            alt="Speaking Stage Backdrop"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/80 to-[#0a0a0d]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0d] via-transparent to-[#0a0a0d]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#17171f]/90 backdrop-blur-md border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest shadow-xl">
            <Mic className="w-3.5 h-3.5 text-[#d4af37]" /> Keynotes • Masterclasses • Executive Workshops
          </div>

          <div className="space-y-3 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-tight leading-tight drop-shadow-md">
              SPEAKING & THOUGHT LEADERSHIP
            </h1>
            <div className="text-lg sm:text-2xl font-cinzel font-semibold text-[#f3e1a9]">
              TELDAH SIYAWAMWAYA
            </div>
            <div className="text-xs sm:text-sm text-neutral-300 font-medium tracking-wide">
              Founder | Speaker | Coach | Household Industry Expert
            </div>
            <div className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
              Experience. Insight. Practical Wisdom.
            </div>
          </div>

          <p className="text-xs sm:text-base text-neutral-200 max-w-3xl mx-auto leading-relaxed">
            With more than 16 years of experience within the household staffing industry, entrepreneurship and professional development, Teldah brings a practical, experience-led perspective to conversations that matter. Her speaking combines real-world experience, professional insight and practical strategies designed to educate, challenge thinking and inspire meaningful action.
          </p>

          {/* REQUIRED PROMINENT BUTTON #1: At the top of the Speaking page */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={scrollToForm}
              id="speaking-top-invite-btn"
              className="w-full sm:w-auto py-4 px-9 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-xl shadow-[#d4af37]/25 transition-all flex items-center justify-center gap-2 uppercase tracking-wider font-cinzel"
            >
              <Sparkles className="w-4 h-4" />
              <span>INVITE TELDAH TO SPEAK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE TELDAH PERSPECTIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111117] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
              The Teldah Perspective
            </span>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
              REAL EXPERIENCE. REAL LESSONS. PRACTICAL ACTION.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Teldah’s perspective has been shaped by more than 16 years of experience within the household staffing industry and by building Flawless from its beginnings in 2016. Her journey provides a unique, unvarnished perspective across:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['People', 'Professionalism', 'Households', 'Entrepreneurship', 'Leadership', 'Growth'].map((term, i) => (
                <span key={i} className="text-xs font-semibold bg-[#1a1a24] text-[#f3e1a9] border border-[#d4af37]/30 px-3 py-1 rounded-full">
                  • {term}
                </span>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-serif italic text-base pt-2">
              “Her objective is not simply to inspire an audience for a moment. It is to leave people with knowledge, perspective and practical actions they can take forward.”
            </p>
          </div>

          <div className="bg-[#171722] border border-neutral-800 rounded-2xl p-6 text-center space-y-3">
            <div className="font-cinzel text-3xl font-bold text-white">16+</div>
            <div className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">Years of Domain Authority</div>
            <p className="text-[11px] text-neutral-400">
              From frontline domestic worker to institutional leader, business coach, and national keynote speaker.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SPEAKING TOPICS (ALL 9 TOPICS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
            Keynotes & Curriculum
          </span>
          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white">
            Speaking Topics & Masterclasses
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Content and format can be tailored to the audience, event objectives, and desired outcomes across business, residential, and leadership platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPEAKING_TOPICS.map((topic, idx) => (
            <div
              key={topic.id}
              className="bg-[#121217] border border-neutral-800 hover:border-[#d4af37]/60 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group"
              id={`topic-card-${topic.id}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-0.5 rounded">
                    {topic.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">0{idx + 1}</span>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#f3e1a9] transition-colors leading-snug">
                  {topic.title}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {topic.summary}
                </p>

                <div className="pt-2 border-t border-neutral-800/80 space-y-1">
                  <div className="text-[10px] text-neutral-500 uppercase font-semibold">Key Discussion Areas:</div>
                  {topic.keyPoints.slice(0, 2).map((kp, kIdx) => (
                    <div key={kIdx} className="flex items-start gap-1.5 text-[11px] text-neutral-400">
                      <span className="text-[#d4af37] font-bold">•</span>
                      <span className="line-clamp-1">{kp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 flex items-center justify-between">
                <button
                  onClick={() => setSelectedTopicModal(topic)}
                  className="text-xs text-[#d4af37] font-semibold hover:underline flex items-center gap-1"
                >
                  View Details & Outline →
                </button>
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, preferredTopic: topic.title }));
                    scrollToForm();
                  }}
                  className="text-[11px] font-bold bg-[#1d1d28] hover:bg-[#d4af37] hover:text-black text-neutral-200 px-2.5 py-1.5 rounded-lg border border-neutral-700 transition-all"
                >
                  Select Topic
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* REQUIRED PROMINENT BUTTON #2: After the Speaking Topics section */}
        <div 
          className="bg-gradient-to-r from-[#17140d] via-[#241e12] to-[#17140d] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xl"
          id="speaking-after-topics-callout"
        >
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
            Ready to Feature Teldah at Your Next Event?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
            Whether for a 45-minute keynote address, a half-day masterclass, or an executive conference panel.
          </p>
          <div>
            <button
              onClick={scrollToForm}
              id="speaking-mid-invite-btn"
              className="py-3.5 px-8 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-lg shadow-[#d4af37]/20 uppercase tracking-wider font-cinzel"
            >
              INVITE TELDAH TO SPEAK
            </button>
          </div>
        </div>
      </section>

      {/* 4. SPEAKING FORMATS & WHO CAN INVITE TELDAH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Speaking Formats */}
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
                Engagement Structures
              </span>
              <h3 className="text-2xl font-cinzel font-bold text-white mt-1">
                Speaking Formats
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Teldah is available for selected engagements tailored to audience requirements.
              </p>
            </div>

            <div className="space-y-3">
              {SPEAKING_FORMATS.map((fmt, idx) => (
                <div key={idx} className="bg-[#121217] p-4 rounded-xl border border-neutral-800 space-y-1">
                  <div className="text-xs font-cinzel font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                    {fmt.title}
                  </div>
                  <p className="text-xs text-neutral-300 pl-3.5 leading-relaxed">
                    {fmt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Who Can Invite Teldah */}
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
                Audiences & Organisations
              </span>
              <h3 className="text-2xl font-cinzel font-bold text-white mt-1">
                Who Can Invite Teldah?
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Speaking engagements are ideal for a diverse array of sectors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WHO_CAN_INVITE.map((item, idx) => (
                <div key={idx} className="bg-[#121217] p-4 rounded-xl border border-neutral-800 space-y-1">
                  <div className="text-xs font-semibold text-[#f3e1a9]">
                    {item.name}
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRIVATE MASTERCLASSES CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#14141e] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
            <div>
              <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
                Private Masterclasses
              </span>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mt-1">
                GO BEYOND THE PRESENTATION.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl">
                For organisations seeking a deeper learning experience, Flawless Institution can develop tailored masterclasses around specific challenges or operational objectives.
              </p>
            </div>

            <button
              onClick={scrollToForm}
              className="py-3 px-6 rounded-xl text-xs font-bold bg-[#1e1e2c] border border-[#d4af37]/60 text-[#f3e1a9] hover:bg-[#d4af37] hover:text-black transition-all shrink-0"
            >
              ENQUIRE ABOUT A MASTERCLASS
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MASTERCLASS_TOPICS.map((topic, idx) => (
              <div key={idx} className="bg-[#0e0e14] p-3 rounded-lg border border-neutral-800 text-xs text-neutral-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                <span>{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. REQUIRED PROMINENT BUTTON #3 & DEDICATED ENQUIRY FORM AT THE BOTTOM */}
      <section ref={formRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="speaking-booking-section">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest font-cinzel">
            Booking & Reservation
          </span>
          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white">
            INVITE TELDAH TO SPEAK
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            BRING EXPERIENCE, INSIGHT & PRACTICAL WISDOM TO YOUR AUDIENCE. <br />
            Please complete the enquiry form below to check availability and schedule a discovery call.
          </p>
        </div>

        {/* The Full Speaking Enquiry Form */}
        <div className="bg-[#101016] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Your Name <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
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
                    placeholder="Organisation Name"
                    value={formData.organisation}
                    onChange={handleInputChange}
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
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
                    placeholder="name@organisation.co.za"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Contact Number <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+27 (0) ... "
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    placeholder="e.g. Leadership Forum"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Event Date <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Event Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Fourways, Sandton or Virtual"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
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
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>Under 50 Attendees</option>
                    <option>50 - 150 Attendees</option>
                    <option>150 - 500 Attendees</option>
                    <option>500+ Attendees</option>
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
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>Private Household Employers & Estate Residents</option>
                    <option>Household Staff & Domestic Workers</option>
                    <option>Business Owners & Entrepreneurs</option>
                    <option>Corporate Executives & HR Leaders</option>
                    <option>Hospitality & Hotel Managers</option>
                    <option>Educational & Faith Community</option>
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
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>In-person engagement</option>
                    <option>Online presentation</option>
                    <option>Hybrid</option>
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
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>Keynote Presentation</option>
                    <option>Conferences & Panels</option>
                    <option>Private Masterclasses</option>
                    <option>Workshops</option>
                    <option>Employer Education Session</option>
                    <option>Entrepreneurship Session</option>
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
                    className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>45 - 60 Minutes</option>
                    <option>90 Minutes</option>
                    <option>Half-Day (3 - 4 Hours)</option>
                    <option>Full-Day (6+ Hours)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Preferred Topic <span className="text-[#d4af37]">*</span>
                </label>
                <select
                  name="preferredTopic"
                  value={formData.preferredTopic}
                  onChange={handleInputChange}
                  className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  {SPEAKING_TOPICS.map(t => (
                    <option key={t.id} value={t.title}>
                      {t.title} ({t.category})
                    </option>
                  ))}
                  <option value="Bespoke Custom Topic">Bespoke / Custom Topic</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Please tell us about your event and what you would like the audience to gain:
                </label>
                <textarea
                  name="objectives"
                  rows={4}
                  placeholder="Share details on event goals, specific challenges, expected audience mindset, or venue requirements..."
                  value={formData.objectives}
                  onChange={handleInputChange}
                  className="w-full bg-[#16161f] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                ></textarea>
              </div>

              {/* REQUIRED PROMINENT BUTTON #3: Bottom with the enquiry form */}
              <button
                type="submit"
                disabled={isSubmitting}
                id="speaking-bottom-submit-btn"
                className="w-full py-4 px-8 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 shadow-xl shadow-[#d4af37]/25 transition-all flex items-center justify-center gap-2 uppercase tracking-wider font-cinzel disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Transmitting Speaking Enquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT SPEAKING ENQUIRY</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#f3e1a9] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#d4af37]" />
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-white">
                Speaking Enquiry Submitted Successfully
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                Thank you, {formData.name}. Teldah Siyawamwaya’s executive office has received your request and will follow up shortly.
              </p>
              <div className="font-mono text-sm text-[#f3e1a9] bg-[#14141d] p-3 rounded-lg border border-neutral-800 max-w-xs mx-auto">
                Ref: {bookingRef}
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-[#d4af37] underline"
              >
                Submit another enquiry
              </button>
            </div>
          )}
        </div>
      </section>

      {/* DIRECT CONTACT & LOCATION FOOTNOTE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121218] border border-neutral-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            <strong className="text-white font-cinzel block text-sm">SPEAKING ENQUIRIES</strong>
            <span>Teldah Siyawamwaya • Founder & Director</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-neutral-300">
            <span>+27 65 944 9409</span>
            <span>•</span>
            <span>training@flawlessinstitution.co.za</span>
            <span>•</span>
            <span>Fourways, South Africa</span>
          </div>
        </div>
      </section>

      {/* Topic Outline Detail Modal */}
      {selectedTopicModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#101016] border border-[#d4af37]/50 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-neutral-200">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded">
                  {selectedTopicModal.category}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-white mt-1">
                  {selectedTopicModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTopicModal(null)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {selectedTopicModal.description}
            </p>

            <div className="space-y-2">
              <div className="text-xs font-bold text-[#f3e1a9] uppercase font-cinzel">Core Discussion Takeaways:</div>
              {selectedTopicModal.keyPoints.map((kp, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>{kp}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <div className="text-xs font-bold text-neutral-400 uppercase">Ideal Audience & Event Types:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedTopicModal.bestFor.map((bf, i) => (
                  <span key={i} className="text-xs bg-neutral-900 text-neutral-300 px-2.5 py-1 rounded border border-neutral-800">
                    {bf}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedTopicModal(null)}
                className="py-2.5 px-4 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, preferredTopic: selectedTopicModal.title }));
                  setSelectedTopicModal(null);
                  scrollToForm();
                }}
                className="py-2.5 px-5 rounded-lg bg-[#d4af37] text-black font-bold text-xs uppercase"
              >
                Select & Book This Topic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
