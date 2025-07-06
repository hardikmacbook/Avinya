import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Zap } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setFormData({ fullName: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-8">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
              Contact
            </h1>
            <div className="w-24 h-1 bg-gray-900 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Avinya Electricals - Your trusted partner for all electrical solutions. 
              Let's discuss your project requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-gray-100 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gray-50 px-8 py-8 border-b border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Message</h2>
                <p className="text-gray-600 text-lg">Tell us about your electrical needs</p>
              </div>
              
              <div className="p-8">
                <div className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-900 transition-all duration-300 text-lg placeholder-gray-400"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-900 transition-all duration-300 text-lg placeholder-gray-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-900 transition-all duration-300 text-lg placeholder-gray-400 resize-none"
                      placeholder="Describe your electrical requirements, installation needs, or any questions you have..."
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 text-white py-5 px-8 rounded-2xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-300 flex items-center justify-center space-x-3 font-bold text-lg shadow-xl disabled:opacity-50 group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
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

          {/* Contact Info & Map */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Get In Touch</h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Phone</h4>
                    <p className="text-gray-600 mb-2">Ready to help you</p>
                    <p className="text-xl font-bold text-gray-900">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Email</h4>
                    <p className="text-gray-600 mb-2">Quick response guaranteed</p>
                    <p className="text-xl font-bold text-gray-900">info@avinyaelectricals.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Address</h4>
                    <p className="text-gray-600 mb-2">Come see our showroom</p>
                    <p className="text-gray-900 font-medium">Shop No. 15, Electrical Market</p>
                    <p className="text-gray-600">Ring Road, Surat, Gujarat 395002</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Hours</h4>
                    <p className="text-gray-600 mb-2">When we're available</p>
                    <div className="space-y-1">
                      <p className="text-gray-900 font-medium">Mon - Sat: 9 AM to 7 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="border-2 border-gray-100 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 bg-gray-50 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Location</h3>
                <p className="text-gray-600">Visit our showroom</p>
              </div>
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.653!2d72.831!3d21.1959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAvinya%20Electricals!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Avinya Electricals Location"
                />
              </div>
              <div className="p-6 bg-gray-50">
                <a
                  href="https://www.google.com/maps/place/Avinya+Electricals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-900 hover:text-gray-700 transition-colors font-bold group"
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