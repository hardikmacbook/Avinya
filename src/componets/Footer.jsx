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
  CheckCircle,
} from "lucide-react";
import AvinyaLogo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/shop" },
    { name: "Contact", href: "/contact" },
    { name: "Projects", href: "/blog" },
  ];

  const services = [
    { name: "Residential Wiring", href: "#" },
    { name: "Commercial Solutions", href: "#" },
    { name: "Smart Home Setup", href: "#" },
    { name: "Emergency Repairs", href: "#" },
    { name: "Safety Inspections", href: "#" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Newsletter signup:", email);
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative">
      {/* Main Footer */}
      <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Brand Section - Takes more space */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <Link to="/" className="inline-block group">
                  <img
                    className="h-16 w-auto object-contain filter brightness-0 invert group-hover:scale-105 transition-transform duration-300"
                    src={AvinyaLogo}
                    alt="Avinya Electricals"
                  />
                </Link>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">
                  Powering Your Future
                </h3>
                <p className="text-gray-300 leading-relaxed max-w-sm">
                  Expert electrical solutions with 15+ years of experience. 
                  From residential installations to commercial projects, 
                  we deliver excellence with every connection.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">500+</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">15+</div>
                  <div className="text-xs text-gray-400">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">24/7</div>
                  <div className="text-xs text-gray-400">Support</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-3">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 inline-block relative group"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <div className="absolute inset-0 bg-blue-600/20 rounded scale-0 group-hover:scale-100 transition-transform duration-300 -z-0"></div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-3 space-y-6">
              <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-3">
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 inline-block relative group"
                    >
                      <span className="relative z-10">{service.name}</span>
                      <div className="absolute inset-0 bg-blue-600/20 rounded scale-0 group-hover:scale-100 transition-transform duration-300 -z-0"></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Contact */}
            <div className="lg:col-span-3 space-y-6">
              <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-3">
                Stay Connected
              </h4>
              
              {/* Newsletter */}
              <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700">
                <h5 className="font-semibold text-white mb-2">Newsletter</h5>
                <p className="text-gray-400 text-sm mb-4">
                  Get updates on latest electrical technologies and safety tips
                </p>
                
                {!isSubscribed ? (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2 group"
                    >
                      <span>Subscribe Now</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center space-x-2 text-green-400 py-3">
                    <CheckCircle size={20} />
                    <span className="font-medium">Successfully subscribed!</span>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <a
                    href="mailto:avinyaelectricals@gmail.com"
                    className="flex items-center space-x-3 text-gray-300 hover:text-white group transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <Mail size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email Us</div>
                      <div className="text-xs text-gray-400">avinyaelectricals@gmail.com</div>
                    </div>
                  </a>
                  
                  <a
                    href="tel:+918799360195"
                    className="flex items-center space-x-3 text-gray-300 hover:text-white group transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                      <Phone size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Call Us</div>
                      <div className="text-xs text-gray-400">+91 87993 60195</div>
                    </div>
                  </a>
                  
                  <a
                    href="https://maps.app.goo.gl/BefToyT4nEjuPh2x8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-300 hover:text-white group transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Visit Us</div>
                      <div className="text-xs text-gray-400">Vapi, Gujarat</div>
                    </div>
                  </a>
                </div>

                {/* Social Media */}
                <div className="pt-4">
                  <p className="text-sm font-medium text-white mb-3">Follow Us</p>
                  <div className="flex space-x-3">
                    {[
                      { Icon: Facebook, color: "hover:bg-blue-600", href: "#" },
                      { Icon: Twitter, color: "hover:bg-sky-500", href: "#" },
                      { Icon: Instagram, color: "hover:bg-pink-600", href: "#" },
                      { Icon: Linkedin, color: "hover:bg-blue-700", href: "#" }
                    ].map(({ Icon, color, href }, index) => (
                      <a
                        key={index}
                        href={href}
                        className={`w-10 h-10 bg-gray-700 ${color} rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:scale-110 transition-all duration-300`}
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 <span className="font-semibold text-white">Avinya Electricals</span>. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
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