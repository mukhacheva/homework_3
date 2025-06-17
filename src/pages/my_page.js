import React, { useState } from 'react';
import '../styles/my_page.css';
import { Link } from 'react-router-dom';
import BurgerMenu from '../components/burger_menu.js';

import casset from '../img/casset.png';
import road_sign from '../img/sign.png';
import cd from '../img/cd.png';

export default function Home() {
  const [userData, setUserData] = useState({
    username: 'Katya',
    email: 'katya@example.com',
    phone: '+7 999 123 45 67',
    genre: 'rock',
    birth_date: '01.01.2000',
    subscription: true,
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...userData });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    setUserData(formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData({ ...userData });
    setEditMode(false);
  };

  return (
    <div>
      <BurgerMenu />

      <main>
        <div className="person_info">
          <div className="info_block hello">
            <h1>Hello, {userData.username}!</h1>
            <p>It's you:</p>

            {!editMode ? (
              <>
                <ul>
                  <li>{userData.email}</li>
                  <li>{userData.phone}</li>
                  <li>{userData.genre}</li>
                  <li>{userData.birth_date}</li>
                  <li>Subscription: {userData.subscription ? '1' : '0'}</li>
                </ul>

                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => {
                    setFormData({ ...userData });
                    setEditMode(true);
                  }}
                >
                  Change data
                </button>
              </>
            ) : (
              <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
                <label>
                  Email: <br />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Phone: <br />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Genre: <br />
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Birth Date: <br />
                  <input
                    type="text"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Subscription: <br />
                  <input
                    type="checkbox"
                    name="subscription"
                    checked={formData.subscription}
                    onChange={handleChange}
                  />
                </label>

                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                  <button type="button" onClick={handleSave} className="save-btn">
                    Save
                  </button>
                  <button type="button" onClick={handleCancel} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            )}
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
