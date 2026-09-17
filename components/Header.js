import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(true);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route changes
  useEffect(() => {
    setToolsOpen(false);
    setMobileMenuOpen(false);
  }, [router.asPath]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setToolsOpen(false);
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="relative w-full border-b border-gray-100 bg-white/95 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Brand Logo */}
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="font-black text-2xl sm:text-3xl tracking-tighter text-black uppercase hover:opacity-85 transition-opacity"
          >
            PURE NEWS
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Tools Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setToolsOpen((prev) => !prev)}
              onMouseEnter={() => setToolsOpen(true)}
              aria-expanded={toolsOpen}
              className={`flex items-center space-x-1.5 text-sm font-bold transition-colors py-2 ${toolsOpen || router.pathname.startsWith("/election-countdown-clock")
                ? "text-[#1b7340]"
                : "text-gray-800 hover:text-[#1b7340]"
                }`}
            >
              <span>Tools</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${toolsOpen ? "rotate-180 text-[#1b7340]" : "text-gray-400"
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Desktop Simple Dropdown */}
            {toolsOpen && (
              <div
                onMouseLeave={() => setToolsOpen(false)}
                className="absolute left-0 mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-100 py-1.5 z-50 animate-fadeIn"
              >
                <Link
                  href="/election-countdown-clock"
                  onClick={() => setToolsOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-gray-800 hover:text-[#1b7340] hover:bg-gray-50 transition-colors"
                >
                  Election Countdown Clock
                </Link>
              </div>
            )}
          </div>
          {/* 
          <Link
            href="/about-us"
            className="text-sm font-bold text-gray-800 hover:text-[#1b7340] transition-colors"
          >
            About Us
          </Link> */}

          <a
            href="mailto:stevenmouk@gmail.com"
            className="text-sm font-bold text-gray-800 hover:text-[#1b7340] transition-colors"
          >
            Contact
          </a>

          {/* <a
            href="#newsletter"
            onClick={(e) => {
              if (router.pathname === "/") {
                e.preventDefault();
                const emailInput = document.querySelector("input[name='email']");
                if (emailInput) {
                  emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
                  emailInput.focus();
                }
              }
            }}
            className="px-4 py-2 bg-[#1b7340] text-white font-bold text-xs rounded-lg hover:bg-[#155b33] transition-colors shadow-sm"
          >
            Sign Up Now
          </a> */}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 shadow-xl animate-fadeIn">
          {/* Tools Expandable Section */}
          <div className="py-2 border-b border-gray-100">
            <button
              type="button"
              onClick={() => setMobileToolsOpen((prev) => !prev)}
              className="w-full flex items-center justify-between text-sm font-bold text-gray-800 hover:text-[#1b7340] py-1.5"
            >
              <span>Tools</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${mobileToolsOpen ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileToolsOpen && (
              <div className="pl-4 py-1 flex flex-col space-y-2">
                <Link
                  href="/election-countdown-clock"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-600 hover:text-[#1b7340] py-1 transition-colors"
                >
                  Election Countdown Clock
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-3 py-2 border-t border-gray-100">
            <Link
              href="/about-us"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-gray-800 hover:text-[#1b7340] py-1.5 transition-colors"
            >
              About Us
            </Link>

            <a
              href="mailto:stevenmouk@gmail.com"
              className="text-sm font-bold text-gray-800 hover:text-[#1b7340] py-1.5 transition-colors"
            >
              Contact
            </a>

            <div className="pt-2">
              <a
                href="#newsletter"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (router.pathname === "/") {
                    e.preventDefault();
                    const emailInput = document.querySelector("input[name='email']");
                    if (emailInput) {
                      emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
                      emailInput.focus();
                    }
                  }
                }}
                className="w-full block text-center py-3 bg-[#1b7340] text-white font-bold text-sm rounded-xl hover:bg-[#155b33] transition-colors shadow-sm"
              >
                Sign Up Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
