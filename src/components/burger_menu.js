import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import line from '../img/line.png'; 
import shareImg from '../img/share_img.png'; 
import phoneImg from '../img/phone_img.png'; 

import '../styles/burger_menu.css'; 

function BurgerMenu() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const toggleMenu = () => {
    setMobileMenuOpen(prev => !prev);
    setActiveDropdown(null);
  };

  const toggleDropdown = (menuName) => {
    setActiveDropdown(prev => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        burgerRef.current && !burgerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header>
      <div className="top-navigation">
        <div className="logo-title">
          <p>Diamond Festival</p>
        </div>

        <div 
          className={`burger ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          ref={burgerRef} 
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggleMenu(); }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav_main ${isMobileMenuOpen ? 'active' : ''}`} ref={menuRef} aria-hidden={!isMobileMenuOpen}>
          <ul className="nav_top">
            <li className="home">
              <img src={line} className="line" alt="line" />
              <Link to="/">home</Link>
            </li>

            <li>
              <Link to="/table">tickets</Link>
            </li>

            <li>
              <Link to="/poll">lineup</Link>
            </li>

            <li>
              <a
                href="#"
                className="dropdown-link"
                onClick={e => {
                  e.preventDefault();
                  toggleDropdown('account');
                }}
                aria-expanded={activeDropdown === 'account'}
              >
                account
              </a>
              <ul className={`dropdown-menu ${activeDropdown === 'account' ? 'active' : ''}`}>
                <li><Link to="/registration">registration</Link></li>
                <li><Link to="/login">login</Link></li>
                <li><a href="#">forgot password</a></li>
                <li><Link to="/my_page">need help</Link></li>
              </ul>
            </li>
          </ul>

          <div className="nav_side">
            <a href="#"><img src={shareImg} alt="Share_image" /></a>
            <a href="#"><img src={phoneImg} alt="Phone_image" /></a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default BurgerMenu;
