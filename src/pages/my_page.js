import React, { useState, useEffect } from 'react';
import '../styles/my_page.css';
import { Link } from 'react-router-dom';
import BurgerMenu from '../components/burger_menu.js';

import casset from '../img/casset.png';
import road_sign from '../img/sign.png';
import cd from '../img/cd.png';

export default function Home() {
  // Временные данные
  const [userData, setUserData] = useState({
    username: 'Katya',
    email: 'katya@example.com',
    phone: '+7 999 123 45 67',
    genre: 'rock',
    birth_date: '01.01.2000',
    subscription: true
  });

  useEffect(() => {
    // fetch('/api/userdata')
    //   .then(res => res.json())
    //   .then(data => setUserData(data))
    //   .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <BurgerMenu />

      <main>
        <div className="person_info">
          <div className="info_block hello">
            <h1>Hello, {userData.username}!</h1>
            <p>It's you:</p>
            <ul>
              <li>{userData.email}</li>
              <li>{userData.phone}</li>
              <li>{userData.genre}</li>
              <li>{userData.birth_date}</li>
              <li>Subscription: {userData.subscription ? '1' : '0'}</li>
            </ul>
          </div>
        </div>

        <div className="white_part"></div>

        <div className="pictures">
          <div className="picture_1">
            <img src={casset} alt="music casset" className="profile-img" />
          </div>

          <div className="picture_2">
            <img src={road_sign} alt="road_sign" className="profile-img" />
          </div>

          <div className="picture_3">
            <img src={cd} alt="cd" className="profile-img" />
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
