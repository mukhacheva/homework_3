import React from 'react';
import '../styles/registr_login.css';
import { Link } from 'react-router-dom'; 

import BurgerMenu from '../components/burger_menu.js';
import ContentSlider from '../components/content_slider.js';
import RegistrationForm from '../components/register_form.js';

export default function Home() {
  return (
    <div>
      <BurgerMenu/>
      <ContentSlider/>
    
    <main>
      <div className='ipa'>
        <div className="registration_wrapper">
          <div className="block_name">
            <h1>REGISTRATION</h1>
          </div>
          <RegistrationForm />
        </div>
      </div>
    </main>

      <footer>
        <nav className="foot_nav">
          <a href="#">HOME</a>
          <a href="#">TICKETS</a>
          <a href="#">LINEUP</a>
          <a href="#">CONTACT</a>
        </nav>
        <div className="foot_text">
          <p>Copyright @2025 All rights reserved - Diamond Festival</p>
        </div>
      </footer>
    </div>
  );
}