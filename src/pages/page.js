// pages/Home.jsx
import React from 'react';
import '../styles/page.css';
import { Link } from 'react-router-dom'; 

import line from '../img/line.png';
import redPhoneImg from '../img/phone_img_red.png';
import envelopeImg from '../img/envelope_img.png';

import BurgerMenu from '../components/burger_menu.js';
import ContactForm from '../components/auth_form.js';
import ContentSlider from '../components/content_slider.js';

export default function Home() {
  return (
    <div>
      <BurgerMenu/>
      <ContentSlider/>

      <main>
        <div className="square">
          <div className="naming">
            <h1>Diamond <p>Festival</p></h1>
          </div>
          <div className="naming_text">
            <p>3 days of music, love and celebration</p>
          </div>
          <div className="naming_tickets">
            <p>GET YOUR TICKETS</p>
          </div>
        </div>

        <div className="auth">
          <p>CONTACT</p>
          <img src={line} className="line_2" alt="line" />

          <div className="auth2">
            <div className="adress">
              <p>Manhattan, New York, NY, United States</p>
              <div className="number">
                <img src={redPhoneImg} className="red_phone_img" alt="red phone" />
                <p>+1-985-2451730</p>
              </div>
              <div className="email">
                <img src={envelopeImg} className="envelope_img" alt="envelope" />
                <p>Festival@music.com</p>
              </div>
            </div>


            <ContactForm/>
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
