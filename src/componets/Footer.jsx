import React, { useState } from 'react';
import { ChevronRight, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(null);

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
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo & Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl">
                L
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  LogoName
                </h3>
                <p className="text-sm text-gray-400 italic">Innovation Beyond Limits</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Crafting digital experiences that inspire, engage, and transform businesses worldwide with cutting-edge technology and creative excellence.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setIsHovered(`nav-${index}`)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <ChevronRight 
                      size={16} 
                      className={`mr-2 transition-transform duration-300 ${
                        isHovered === `nav-${index}` ? 'translate-x-2 text-blue-400' : ''
                      }`}
                    />
                    <span className={`transition-transform duration-300 ${
                      isHovered === `nav-${index}` ? 'translate-x-2' : ''
                    }`}>
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setIsHovered(`service-${index}`)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <ChevronRight 
                      size={16} 
                      className={`mr-2 transition-transform duration-300 ${
                        isHovered === `service-${index}` ? 'translate-x-2 text-purple-400' : ''
                      }`}
                    />
                    <span className={`transition-transform duration-300 ${
                      isHovered === `service-${index}` ? 'translate-x-2' : ''
                    }`}>
                      {service.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}