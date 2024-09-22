import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AaysLogo from '../assets/images/AaysLogo.png';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const NavBar = ({ isLoggedIn }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`fixed w-full top-0 z-10 text-white text-lg font-medium transition-colors duration-300 ${
        isScrolled ? 'bg-black' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link to="https://www.aaysanalytics.com/" target='_blank'>
            <img src={AaysLogo} alt="Aays Logo" className="h-10 mr-4 hover:cursor-pointer" />
          </Link>
        </div>
        {/* Hamburger Icon for mobile view */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none text-white text-3xl">
            {isMenuOpen ? <RxCross1 /> : <GiHamburgerMenu />} {/* Replace '+' with a hamburger icon if needed */}
          </button>
        </div>
        {/* Full Menu - Hidden on small screens, shown on medium and larger screens */}
        <nav className="hidden md:flex space-x-10 px-3">
          <Link to="/" className="group relative hover:cursor-pointer">
            Home
            <div className="h-1 w-9 rounded bg-white absolute -bottom-1 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </Link>
          <Link to="/powerbi-report" className="group relative hover:cursor-pointer">
            Leave Tracker
            <div className="h-1 w-9 rounded bg-white absolute -bottom-1 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </Link>
          <Link to="/HR-stuff" className="group relative hover:cursor-pointer">
            HR
            <div className="h-1 w-9 rounded bg-white absolute -bottom-1 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </Link>
          {isLoggedIn ? (
            <Link to="/dashboard" className="group relative hover:cursor-pointer">
              Profile
              <div className="h-1 w-9 rounded bg-white absolute -bottom-1 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          ) : (
            <Link to="/userlogin" className="group relative hover:cursor-pointer">
              Login
              <div className="h-1 w-9 rounded bg-white absolute -bottom-1 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          )}
        </nav>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black w-full text-center py-5 z-50">
          <nav className="flex flex-col space-y-4">
            <Link to="/" onClick={toggleMenu} className="hover:cursor-pointer">
              Home
            </Link>
            <Link to="/powerbi-report" onClick={toggleMenu} className="hover:cursor-pointer">
              Leave Tracker
            </Link>
            <Link to="/HR-stuff" onClick={toggleMenu} className="hover:cursor-pointer">
              HR
            </Link>
            {isLoggedIn ? (
              <Link to="/dashboard" onClick={toggleMenu} className="hover:cursor-pointer">
                Profile
              </Link>
            ) : (
              <Link to="/userlogin" onClick={toggleMenu} className="hover:cursor-pointer">
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default NavBar;
