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
import AvinyaLogo from "../../assets/images/text-logo.png";
import { Link } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/shop" },
    { name: "Contact", href: "/contact" },
    { name: "Projects", href: "/blog" },
  ];

  const services = [
    { name: "Residential Electrical", href: "#" },
    { name: "Commercial Solutions", href: "#" },
    { name: "Industrial Wiring", href: "#" },
    { name: "Emergency Services", href: "#" },
    { name: "Maintenance", href: "#" },
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
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="">
              <Link to="/" className="inline-block">
                <img
                  className="h-40 w-45 object-contain"
                  src={AvinyaLogo}
                  alt="Avinya Electricals"
                />
              </Link>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Professional electrical solutions with reliable service and expert craftsmanship for residential and commercial needs.
              </p>
              
              <div className="space-y-3">
                <a
                  href="mailto:avinyaelectricals@gmail.com"
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Mail size={14} />
                  </div>
                  <span className="text-sm">avinyaelectricals@gmail.com</span>
                </a>
                
                <a
                  href="tel:+918799360195"
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Phone size={14} />
                  </div>
                  <span className="text-sm">+91 87993 60195</span>
                </a>
                
                <a
                  href="https://maps.app.goo.gl/BefToyT4nEjuPh2x8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MapPin size={14} />
                  </div>
                  <span className="text-sm">Vapi, Gujarat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-6 text-lg">Company</h3>
            <ul className="space-y-4">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-black hover:text-[#8b2727] transition-colors duration-200 relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#8b2727] after:left-0 after:-bottom-1 after:transition-all after:duration-200 hover:after:w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-6 text-lg">Services</h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-black hover:text-[#8b2727] transition-colors duration-200 relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#8b2727] after:left-0 after:-bottom-1 after:transition-all after:duration-200 hover:after:w-full"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-6 text-lg">Newsletter</h3>
            
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                Stay updated with our latest services and electrical safety tips.
              </p>
              
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none text-gray-900 placeholder-gray-500 transition-all duration-200"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#8b2727] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#d2af6f] transition-colors duration-200 flex items-center justify-center space-x-2 group cursor-pointer hover:text-black"
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center space-x-2 text-green-600 py-3">
                  <CheckCircle size={20} />
                  <span className="font-medium">Thank you for subscribing!</span>
                </div>
              )}
            </div>

            {/* Social Media */}
            <div className="pt-6">
              <p className="text-sm font-medium text-gray-900 mb-3">Follow Us</p>
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
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-lg flex items-center justify-center text-gray-600 transition-all duration-200"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              © 2025 <span className="font-semibold">Avinya Electricals</span>. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
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