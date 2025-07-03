import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

function Footer() {
  const [email, setEmail] = useState('');

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Portfolio', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const services = [
    { name: 'Web Development', href: '#' },
    { name: 'Mobile Apps', href: '#' },
    { name: 'UI/UX Design', href: '#' },
    { name: 'Digital Marketing', href: '#' },
    { name: 'SEO Services', href: '#' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex gap-12 overflow-x-auto">
          
          {/* Logo & Company Info */}
          <div className="min-w-[250px] space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center font-bold text-xl transform transition-all duration-300 hover:rotate-12 hover:scale-110">
                L
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">LogoName</h3>
                <p className="text-sm text-gray-400">Innovation Beyond Limits</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Crafting digital experiences that inspire, engage, and transform businesses worldwide with cutting-edge technology and creative excellence.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-gray-800 hover:bg-white hover:text-black rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-125 hover:rotate-12"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="min-w-[250px] space-y-6">
            <h4 className="text-xl font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer inline-block hover:translate-x-4 relative group"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="min-w-[250px] space-y-6">
            <h4 className="text-xl font-semibold text-white">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer inline-block hover:translate-x-4 relative group"
                  >
                    <span className="relative z-10">{service.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="min-w-[250px] space-y-6">
            <h4 className="text-xl font-semibold text-white">Stay Connected</h4>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">Subscribe to our newsletter for updates</p>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-white focus:outline-none transition-all duration-300 text-white placeholder-gray-400 focus:scale-105"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 group"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer transform hover:translate-x-3 group">
                <Mail size={16} className="transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm">hello@company.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer transform hover:translate-x-3 group">
                <Phone size={16} className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer transform hover:translate-x-3 group">
                <MapPin size={16} className="transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm">New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 LogoName. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 relative group">
                <span className="relative z-10">Privacy Policy</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 relative group">
                <span className="relative z-10">Terms of Service</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 relative group">
                <span className="relative z-10">Cookie Policy</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
