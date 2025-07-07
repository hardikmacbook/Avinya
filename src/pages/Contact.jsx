import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Zap, Building2, Users, Shield, Award } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);

  const offices = [
    {
      name: "Vapi Office",
      phone: "+91 87993 60195",
      email: "avinyaelectricals@gmail.com",
      address: "C-106, 1st Floor, City Center, Silvassa - Vapi Rd, Bhadakmora, Phase 1, GIDC, Vapi, Gujarat 396195",
      mapUrl: "https://maps.app.goo.gl/MDosEmQbCgSExxmQA",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.583480187053!2d72.92287887534829!3d20.358818681128056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0cf76e189a241%3A0xa033c44944bd0706!2sAvinya%20Electricals!5e0!3m2!1sen!2sin!4v1751862032833!5m2!1sen!2sin",
      hours: "Mon - Sat: 9 AM to 6:30 PM"
    },
    {
      name: "Surat Office",
      phone: "+91 80005 29452",
      email: "sales.avinyaelectricals@gmail.com",
      address: "1st Floor,118, Avdhut Nagar, Chikuvadi, Raman Nagar, Katargam, Surat, Gujarat 395004",
      mapUrl: "https://maps.app.goo.gl/wNUcrz5rTTNaf8YYA",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.285405345006!2d72.8225313757201!3d21.220528180477167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41fe46592ed7b741%3A0x7e424164b3d18ec1!2sAVINYA%20ELECTRICALS%20-%20SURAT!5e0!3m2!1sen!2sin!4v1751866128614!5m2!1sen!2sin",
      hours: "Mon - Sat: 9 AM to 6:30 PM"
    }
  ];

  const services = [
    "Electrical Installation",
    "Industrial Wiring",
    "Power Systems",
    "Lighting Solutions",
    "Maintenance & Repair",
    "Emergency Services",
    "Consultation",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ fullName: '', email: '', phone: '', company: '', service: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/5 to-slate-900/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
          <div className="text-center">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
              Contact us
            </span>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24 pt-10">
        

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50">
              <div className="bg-gradient-to-r from-slate-50 to-white px-6 sm:px-8 py-6 sm:py-8 border-b border-slate-200/50">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Send Message</h2>
                <p className="text-slate-600 text-base sm:text-lg">Tell us about your electrical project requirements</p>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="space-y-6 sm:space-y-8">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="group">
                      <label htmlFor="fullName" className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-200 focus:ring-0 focus:border-[#8b2727] transition-all duration-300 text-base sm:text-lg placeholder-slate-400 group-hover:border-slate-300 outline-none"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-200 focus:ring-0 focus:border-[#8b2727] transition-all duration-300 text-base sm:text-lg placeholder-slate-400 group-hover:border-slate-300 outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="group">
                      <label htmlFor="phone" className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-200 focus:ring-0 focus:border-[#8b2727] transition-all duration-300 text-base sm:text-lg placeholder-slate-400 group-hover:border-slate-300 outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="company" className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-200 focus:ring-0 focus:border-[#8b2727] transition-all duration-300 text-base sm:text-lg placeholder-slate-400 group-hover:border-slate-300 outline-none"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label htmlFor="service" className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                      Service Required
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-200 focus:ring-0 focus:border-[#8b2727] transition-all duration-300 text-base sm:text-lg text-slate-700 group-hover:border-slate-300 outline-none"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-200 focus:ring-0 focus:border-[#8b2727] transition-all duration-300 text-base sm:text-lg placeholder-slate-400 resize-none group-hover:border-slate-300 outline-none"
                      placeholder="Describe your electrical project requirements, timeline, and any specific needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#8b2727] text-white py-4 sm:py-5 px-6 sm:px-8 rounded-2xl hover:from-slate-800 hover:to-slate-600 focus:ring-4 focus:ring-slate-300 transition-all duration-300 flex items-center justify-center space-x-3 font-bold text-base sm:text-lg shadow-2xl disabled:opacity-50 group transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer hover:bg-[#d2af6f] hover:text-black"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Office Information */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            
            {/* Office Selector */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/50">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8">Our Offices</h3>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                {offices.map((office, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveOffice(index)}
                    className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 ${
                      activeOffice === index
                        ? 'bg-slate-900 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {office.name}
                  </button>
                ))}
              </div>
              
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-4 sm:space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-100 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-300">
                      <Phone className="w-6 h-6 text-slate-700" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 text-base sm:text-lg">Phone</h4>
                    <p className="text-sm sm:text-base text-slate-600 mb-2">Call us directly</p>
                    <a 
                      href={`tel:${offices[activeOffice].phone}`}
                      className="text-lg sm:text-xl font-bold text-slate-900 hover:text-slate-700 transition-colors"
                    >
                      {offices[activeOffice].phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-100 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-300">
                      <Mail className="w-6 h-6 text-slate-700" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 text-base sm:text-lg">Email</h4>
                    <p className="text-sm sm:text-base text-slate-600 mb-2">Quick response guaranteed</p>
                    <a 
                      href={`mailto:${offices[activeOffice].email}`}
                      className="text-lg sm:text-xl font-bold text-slate-900 hover:text-slate-700 transition-colors break-all"
                    >
                      {offices[activeOffice].email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-100 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-300">
                      <MapPin className="w-6 h-6 text-slate-700" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 text-base sm:text-lg">Address</h4>
                    <p className="text-sm sm:text-base text-slate-600 mb-2">Visit our location</p>
                    <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
                      {offices[activeOffice].address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-100 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-300">
                      <Clock className="w-6 h-6 text-slate-700" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 text-base sm:text-lg">Business Hours</h4>
                    <p className="text-sm sm:text-base text-slate-600 mb-2">When we're available</p>
                    <div className="space-y-1">
                      <p className="text-sm sm:text-base text-slate-900 font-medium">{offices[activeOffice].hours}</p>
                      <p className="text-sm sm:text-base text-slate-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50">
              <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200/50">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{offices[activeOffice].name}</h3>
                <p className="text-sm sm:text-base text-slate-600">Find us on the map</p>
              </div>
              <div className="relative">
                <iframe 
                  src={offices[activeOffice].embedUrl}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${offices[activeOffice].name} Location`}
                  className="transition-all duration-500"
                />
              </div>
              <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-50 to-white">
                <a
                  href={offices[activeOffice].mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-slate-900 hover:text-slate-700 transition-colors font-bold group"
                >
                  <MapPin className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}