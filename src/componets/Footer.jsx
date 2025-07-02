import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Send } from 'lucide-react';

export default function CleanFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-50 text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo & Slogan Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">B</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black">BrandLogo</h3>
                <p className="text-sm text-gray-600">Innovation Unleashed</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-8">
              Transforming ideas into digital experiences that inspire and engage. We craft the future, one pixel at a time.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-black">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Portfolio', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-black hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-black">Services</h4>
            <ul className="space-y-4">
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Branding', 'Digital Marketing', 'Consulting'].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-black hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-black">Stay Connected</h4>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                />
                <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
              
              <button
                onClick={handleSubscribe}
                disabled={isSubscribed}
                className="w-full bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubscribed ? (
                  <span>Subscribed!</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Subscribe Now</span>
                  </>
                )}
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-5 h-5 text-black" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5 text-black" />
                <span>hello@brandlogo.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-5 h-5 text-black" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
              © 2025 BrandLogo. All rights reserved.
            </div>
            <div className="flex space-x-8 text-sm">
              <a 
                href="#" 
                className="text-gray-500 hover:text-black hover:translate-x-1 transition-all duration-300 inline-block"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-black hover:translate-x-1 transition-all duration-300 inline-block"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-black hover:translate-x-1 transition-all duration-300 inline-block"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}