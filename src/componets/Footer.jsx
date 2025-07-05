import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import AvinyaLogo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState("");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  const services = [
    { name: "Demo", href: "#" },
    { name: "Demo", href: "#" },
    { name: "Demo", href: "#" },
    { name: "Demo", href: "#" },
    { name: "Demo", href: "#" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <img
                  className="w-auto h-[80px] sm:h-[100px] lg:h-[100px] object-contain transition-all duration-300"
                  src={AvinyaLogo}
                  alt="avinya logo"
                />
              </Link>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Crafting digital experiences that inspire, engage, and transform
              businesses worldwide with cutting-edge technology and creative
              excellence.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-gray-800 hover:bg-[#8b2727] hover:text-[#d2af6f] rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-300"
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
                    className="text-gray-300 hover:text-[#d2af6f] transition-colors duration-300 cursor-pointer"
                  >
                    {link.name}
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
                    className="text-gray-300 hover:text-[#d2af6f] transition-colors duration-300 cursor-pointer"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Stay Connected</h4>

            {/* Newsletter */}
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter for updates
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#d2af6f] focus:outline-none transition-colors duration-300 text-white placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-white text-black hover:text-[#d2af6f] hover:bg-[#8b2727] px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-[#d2af6f] transition-colors duration-300 cursor-pointer">
                <Mail size={16} />
                <Link target="_blank" to="mailto:avinyaelectricals@gmail.com" className="text-sm">avinyaelectricals@gmail.com</Link>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-[#d2af6f] transition-colors duration-300 cursor-pointer">
                <Phone size={16} />
                <Link to="tel:+918799360195" target="_blank" className="text-sm">+91 87993 60195</Link>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-[#d2af6f] transition-colors duration-300 cursor-pointer">
                <MapPin size={16} />
                <Link target="_blank" to="https://maps.app.goo.gl/BefToyT4nEjuPh2x8" className="text-sm">Vapi, Gujarat</Link>
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
              <a
                href="#"
                className="text-gray-400 hover:text-[#d2af6f] transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#d2af6f] transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#d2af6f] transition-colors duration-300"
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

export default Footer;
