// pages/Home.jsx
import React from 'react';
import '../styles/page.css';
import { Link } from 'react-router-dom'; 

// Импортируем изображения
import line from '../img/line.png';
import headerImg from '../img/img_1.jpg';
// import shareImg from '../img/share_img.png';
// import phoneImg from '../img/phone_img.png';
import redPhoneImg from '../img/phone_img_red.png';
import envelopeImg from '../img/envelope_img.png';

import BurgerMenu from '../components/burger_menu.js';
import ContactForm from '../components/auth_form.js';

export default function Home() {
  return (
    <div>
      <BurgerMenu/>

      {/* Используем импортированное изображение */}
      <img src={headerImg} className="header_img" alt="Header image" />

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
                {/* Используем импортированное изображение */}
                <img src={redPhoneImg} className="red_phone_img" alt="red phone" />
                <p>+1-985-2451730</p>
              </div>
              <div className="email">
                {/* Используем импортированное изображение */}
                <img src={envelopeImg} className="envelope_img" alt="envelope" />
                <p>Festival@music.com</p>
              </div>
            </div>


            <ContactForm/>
            {/* <div className="auth_form">
              <form action="#" method="POST">
                <div className="form_row">
                  <input type="text" id="name" name="name" required placeholder="Name" />
                  <input type="tel" id="phone" name="phone" required placeholder="Phone" />
                </div>

                <div className="form_row">
                  <input type="email" id="email" name="email" required placeholder="Email adress" />
                </div>

                <div className="form_row">
                  <textarea id="message" name="message" required placeholder="Enter your message"></textarea>
                </div>

                <div className="form_row">
                  <button type="submit">Contact Us</button>
                </div>
              </form>
            </div> */}
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
