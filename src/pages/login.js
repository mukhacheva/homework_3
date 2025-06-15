import React from 'react';
import '../styles/page.css';
import { Link } from 'react-router-dom'; 

import BurgerMenu from '../components/burger_menu.js';
import ContentSlider from '../components/content_slider.js';
import LoginForm from '../components/login_form.js';

export default function Home() {
  return (
    <div>
      <BurgerMenu/>
      <ContentSlider/>
    
    <main>
      <div className='block_name'>
        <h1>LOGIN</h1>
      </div>
      <LoginForm/>
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