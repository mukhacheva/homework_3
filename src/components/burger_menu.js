import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import line from '../img/line.png'; 
import shareImg from '../img/share_img.png'; 
import phoneImg from '../img/phone_img.png'; 

import '../styles/burger_menu.css'; 

function BurgerMenu() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) && 
        burgerRef.current && !burgerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false); 
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
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
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav_main ${isMobileMenuOpen ? 'active' : ''}`} ref={menuRef}>
          <div className="nav_top">
            <div className="home">
              <img src={line} className="line" alt="line" />
              <Link to="/">home</Link>
            </div>
            <Link to="/table">tickets</Link>
            <a href="#">lineup</a>
            <a href="#">contact</a>
          </div>

          <div className="nav_side">
            <a href="#"><img src={shareImg} alt="Share_image" /></a>
            <a href="#"><img src={phoneImg} alt="Phone_image" /></a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default BurgerMenu;
