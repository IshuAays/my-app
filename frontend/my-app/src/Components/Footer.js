import { useState } from 'react';

import { Facebook, Twitter, Instagram, Linkedin, Mail, ChevronDown, ChevronUp } from "lucide-react";

export default function Footer() {
  const [expandedSection, setExpandedSection] = useState(null); // Removed type annotation

  const toggleSection = (section) => { // Removed type annotation
    setExpandedSection(expandedSection === section ? null : section);
  };

  const FooterSection = ({ title, children, name }) => ( // Removed type annotations
    <div className="border-b border-gray-700 md:border-none">
      <button 
        className="flex justify-between items-center w-full py-2 md:py-0 text-left md:hidden"
        onClick={() => toggleSection(name)}
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {expandedSection === name ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div className={`${expandedSection === name ? 'block' : 'hidden'} md:block`}>
        <h3 className="hidden md:block text-lg font-semibold text-white mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );

  return (
    <footer className="bg-gray-900 text-gray-300 text-sm sm:text-base w-screen pl-10 pr-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Aays Analytics</h2>
            <p className="text-xs sm:text-sm">We are dedicated to providing the best service to our customers and making the world a better place.</p>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.facebook.com/AaysAnalytics/" target='_blank' className="hover:text-white"><Facebook size={20} /></a>
              <a href="https://x.com/AaysAnalytics?t=7GUNb-JusVebcIedarfqWg&s=09" target='_blank' className="hover:text-white"><Twitter size={20} /></a>
              <a href="https://www.instagram.com/lifeataays/" target='_blank' className="hover:text-white"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/company/aays-analytics/" target='_blank' className="hover:text-white"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <FooterSection title="Quick Links" name="quickLinks">
            <ul className="space-y-2 mb-4 md:mb-0">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="https://www.aaysanalytics.com/about" target='_blank' className="hover:text-white">About</a></li>
              <li><a href="https://www.aaysanalytics.com/Blog" target='_blank' className="hover:text-white">Blog</a></li>
              <li><a href="https://www.aaysanalytics.com/contact" target='_blank' className="hover:text-white">Contact</a></li>
            </ul>
          </FooterSection>
          
          <FooterSection title="CAPABILITIES" name="CAPABILITIES">
            <ul className="space-y-2 mb-4 md:mb-0">
              <li><a href="https://www.aaysanalytics.com/ai-and-data-engineering" target='_blank' className="hover:text-white">Data Engineering</a></li>
              <li><a href="https://www.aaysanalytics.com/ai-innovations-enterprise-solutions" target='_blank' className="hover:text-white">AI Innovation</a></li>
            </ul>
          </FooterSection>
          
          <FooterSection title="Newsletter" name="newsletter">
            <p className="text-xs sm:text-sm mb-4">Stay up to date with our latest news and products.</p>

          </FooterSection>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-xs sm:text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Aays Analytics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
