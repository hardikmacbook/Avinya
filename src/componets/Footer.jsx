import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
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
    { name: "Electrical Solutions", href: "#" },
    { name: "Installation Services", href: "#" },
    { name: "Maintenance", href: "#" },
    { name: "Consulting", href: "#" },
    { name: "Emergency Support", href: "#" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="bg-slate-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo & Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link to="/" className="inline-block">
                <img
                  className="h-12 w-auto object-contain"
                  src={AvinyaLogo}
                  alt="Avinya Logo"
                />
              </Link>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
              Professional electrical solutions with cutting-edge technology and reliable service for businesses and homes.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Linkedin, href: "#" }
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-600 text-sm hover:text-gray-900 hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-gray-600 text-sm hover:text-gray-900 hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Stay Updated</h4>
            
            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-gray-600 text-xs mb-3">
                Get the latest updates and offers
              </p>
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white text-sm py-2 px-4 rounded-lg hover:bg-gray-800 hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Subscribe</span>
                  <Send size={14} />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <a
                href="mailto:avinyaelectricals@gmail.com"
                className="flex items-center space-x-2 text-gray-600 text-xs hover:text-gray-900 transition-colors duration-200"
              >
                <Mail size={14} />
                <span>avinyaelectricals@gmail.com</span>
              </a>
              <a
                href="tel:+918799360195"
                className="flex items-center space-x-2 text-gray-600 text-xs hover:text-gray-900 transition-colors duration-200"
              >
                <Phone size={14} />
                <span>+91 87993 60195</span>
              </a>
              <a
                href="https://maps.app.goo.gl/BefToyT4nEjuPh2x8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 text-xs hover:text-gray-900 transition-colors duration-200"
              >
                <MapPin size={14} />
                <span>Vapi, Gujarat</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="text-gray-500 text-xs">
              © 2025 Avinya Electricals. All rights reserved.
            </div>
            <div className="flex space-x-4 text-xs">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;