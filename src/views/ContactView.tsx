import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, 
  Sparkles, Clock, Globe, MessageSquare 
} from 'lucide-react';
import { FOUNDER_CONTACT } from '../data/siteData';

interface ContactViewProps {
  onOpenSpeakingEnquiry: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenSpeakingEnquiry }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Flawless Academy Enrolment',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-20 pb-20 font-sans-body">
      {/* Hero */}
      <section className="relative pt-12 pb-16 border-b border-[#d4af37]/20 bg-gradient-to-b from-[#09090c] via-[#121218] to-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#181822] border border-[#d4af37]/40 text-xs text-[#f3e1a9] font-cinzel uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5 text-[#d4af37]" /> Connect With Us
          </div>

          <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight">
            CONTACT FLAWLESS INSTITUTION
          </h1>

          <p className="text-sm sm:text-lg text-neutral-300 font-serif italic max-w-2xl mx-auto leading-relaxed">
            “We welcome enquiries from prospective students, private households, corporate partners, and conference organizers.”
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121218] border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">Institutional Campus & Office</h3>
                <p className="text-xs text-neutral-400 mt-1">Fourways, Johannesburg, South Africa</p>
              </div>

              <div className="space-y-4 text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#181824] text-[#d4af37] border border-neutral-800 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Direct & WhatsApp Helpline</strong>
                    <a href={`tel:${FOUNDER_CONTACT.phone}`} className="text-[#f3e1a9] hover:underline">
                      {FOUNDER_CONTACT.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#181824] text-[#d4af37] border border-neutral-800 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Academy Admissions</strong>
                    <a href="mailto:training@flawlessinstitution.co.za" className="text-[#f3e1a9] hover:underline">
                      training@flawlessinstitution.co.za
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#181824] text-[#d4af37] border border-neutral-800 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Training Hub</strong>
                    <span>Fourways, Sandton Region, Gauteng, South Africa</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <button
                  onClick={onOpenSpeakingEnquiry}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#9e7b25] text-black hover:brightness-110 uppercase tracking-wider font-cinzel"
                >
                  Invite Teldah to Speak
                </button>
              </div>
            </div>
          </div>

          {/* Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#101016] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="font-cinzel text-xl font-bold text-white">Send Us a Message</h3>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-300 block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#15151c] border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-300 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="name@email.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#15151c] border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-300 block mb-1">Contact Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+27 82 123 4567"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#15151c] border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-300 block mb-1">Department</label>
                      <select
                        value={formData.department}
                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                        className="w-full bg-[#15151c] border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      >
                        <option>Flawless Academy Enrolment</option>
                        <option>September Fourways Physical Training</option>
                        <option>Private Household Advisory & SOPs</option>
                        <option>Speaking & Masterclass Bookings</option>
                        <option>Enterprise Mentorship</option>
                        <option>General Media & Partnerships</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Your Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How can Flawless Institution assist you?"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#15151c] border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl text-xs font-bold bg-[#d4af37] text-black hover:bg-[#f3e1a9] uppercase tracking-wider transition-all"
                  >
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-cinzel text-xl font-bold text-white">Message Dispatched</h4>
                  <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                    Thank you. We have received your message and will respond promptly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
