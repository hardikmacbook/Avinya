import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLuggageCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import AvinyaLogo from "../assets/images/logo.png";
import SetAddress from "./SetAddress";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();

  const navItems = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "shop", path: "/shop" },
    { name: "contact", path: "/contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 w-full transition-all duration-300 ease-in-out z-[100] items-center ${
          isScrolled
            ? "bg-white/15 backdrop-blur-md shadow-lg border-b border-white/30 items-center" 
            : "bg-white shadow-xl items-center"
        }`}
      >
        <div className="mx-auto max-w-[1200px] w-full px-4 sm:px-6 lg:px-8 relative z-[101]">
          <div className="flex items-center justify-between py-3">
            {/* Logo and Address section */}
            <div className="flex items-center gap-4 lg:gap-20">
              <Link to={"/"} onClick={closeMenu}>
                <img
                  className="w-[80px] sm:w-[100px] lg:w-[120px] h-[40px] sm:h-[50px] lg:h-[60px] object-contain transition-all duration-300"
                  src={AvinyaLogo}
                  alt="avinya logo"
                  width="120"
                  height="60"
                />
              </Link>

              {/* Address section - hidden on mobile */}
              <div className="hidden lg:block relative z-[102]">
                <SetAddress />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex">
              <nav className="flex gap-5 items-center">
                <ul className="flex gap-10 font-semibold text-xl capitalize items-center">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "border-b-3 border-[#d2af6f] transition-all text-red-900"
                              : ""
                          } text-black cursor-pointer hover:text-[#8b2727] transition-all duration-300 transform hover:scale-105`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-red-900 cursor-pointer relative group">
                  <Link
                    to={"/cart"}
                    className="transition-transform duration-300 group-hover:scale-110"
                  >
                    <FaLuggageCart className="text-2xl" />
                    <span className="text-xs px-1.5 rounded-full absolute bg-[#8b2727] -top-3 -right-5 text-white min-w-[20px] h-5 flex items-center justify-center transition-all duration-300 group-hover:bg-[#d2af6f] group-hover:text-black">
                      {cartCount ?? 0}
                    </span>
                  </Link>
                </div>

                <div className="px-3">
                  <SignedOut>
                    <SignInButton className="p-1 text-xl rounded-md px-3 bg-[#8b2727] text-white cursor-pointer hover:bg-[#d2af6f] hover:text-black transition-all duration-300 transform hover:scale-105" />
                  </SignedOut>
                  <SignedIn>
                    <div className="transition-transform duration-300 hover:scale-105">
                      <UserButton />
                    </div>
                  </SignedIn>
                </div>
              </nav>
            </div>

            {/* Mobile Menu Button and Cart */}
            <div className="flex items-center gap-4 lg:hidden">
              {/* Cart Icon for Mobile */}
              <div className="flex items-center gap-2 text-[#8b2727] cursor-pointer relative group">
                <Link
                  to={"/cart"}
                  onClick={closeMenu}
                  className="transition-transform duration-300 group-hover:scale-110"
                >
                  <FaLuggageCart className="text-xl sm:text-2xl" />
                  <span className="text-xs px-1.5 rounded-full absolute bg-[#8b2727] -top-2 -right-3 text-white min-w-[18px] h-4 flex items-center justify-center transition-all duration-300 group-hover:text-black group-hover:bg-[#d2af6f]">
                    {cartCount ?? 0}
                  </span>
                </Link>
              </div>

              {/* Auth buttons for mobile */}
              <div className="flex items-center">
                <SignedOut>
                  <SignInButton className="text-sm rounded-md px-2 py-1 bg-[#8b2727] text-white cursor-pointer hover:bg-[#d2af6f] transition-all duration-300 hover:text-black" />
                </SignedOut>
                <SignedIn>
                  <div className="transition-transform duration-300 hover:scale-105">
                    <UserButton />
                  </div>
                </SignedIn>
              </div>

              {/* Hamburger Menu Button */}
              <button
                onClick={toggleMenu}
                className="text-2xl text-gray-700 hover:text-red-900 transition-all duration-300 transform cursor-pointer focus:outline-none"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <FaBars
                    className={`absolute transition-all duration-300 ${
                      isMenuOpen
                        ? "opacity-0 rotate-180 scale-75"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <FaTimes
                    className={`absolute transition-all duration-300 ${
                      isMenuOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 rotate-180 scale-75"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
              isMenuOpen
                ? "max-h-[500px] opacity-100 pb-4 transform translate-y-0"
                : "max-h-0 opacity-0 transform -translate-y-4"
            }`}
          >
            {/* Address section for mobile */}
            <div
              className={`py-3 border-t border-gray-200 relative z-[102] transition-all duration-300 delay-100 ${
                isMenuOpen
                  ? "transform translate-x-0 opacity-100"
                  : "transform -translate-x-4 opacity-0"
              }`}
            >
              <SetAddress />
            </div>

            {/* Navigation Links */}
            <nav className="pt-2">
              <ul className="flex flex-col gap-2 font-semibold text-lg capitalize">
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className={`transition-all duration-300 transform ${
                      isMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isMenuOpen
                        ? `${(index + 2) * 100}ms`
                        : "0ms",
                    }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "text-[#8b2727] border-l-4 border-[#d2af6f] pl-4 bg-red-50"
                            : "text-black pl-4"
                        } block py-3 cursor-pointer hover:text-[#8b2727] hover:bg-gray-50 rounded-r-lg transition-all duration-300 hover:transform hover:translate-x-2 hover:shadow-md`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-[80px] sm:h-[88px] lg:h-[92px]"></div>
    </>
  );
};

export default Navbar;
