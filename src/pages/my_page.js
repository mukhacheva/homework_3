import React, { useState, useEffect } from 'react';
import '../styles/my_page.css';
import { Link } from 'react-router-dom';
import BurgerMenu from '../components/burger_menu.js';

import casset from '../img/casset.png';
import road_sign from '../img/sign.png';
import cd from '../img/cd.png';

import  api from '../api/user';

export const getCurrentUser = () => {
  return api.get('/api/auth/users/me/');
};

export const updateUserData = (data) => {
  return api.put('/api/auth/users/me/', data);
};

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        const data = response.data;

        const formattedPhone = formatPhone(data.phone || '');

        setUserData({
          ...data,
          phone: formattedPhone,
          birth_date: formatDate(data.birth_date),
        });
        setFormData({
          ...data,
          phone: formattedPhone,
          birth_date: formatDate(data.birth_date),
        });
      } catch (err) {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const [genres, setGenres] = useState([]);

  useEffect(() => {
  const fetchGenres = async () => {
    try {
      const response = await api.get('/genres/'); 
      setGenres(response.data);
    } catch (err) {
      console.error('Failed to load genres', err);
    }
  };

  fetchGenres();
}, []);

  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, '');
    if (digits.length === 10 && digits.startsWith('9')) {
      digits = '7' + digits;
    }
    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1);
    }

    let formatted = '+7';
    if (digits.length >= 1) formatted += '(' + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ') ' + digits.slice(4, 7);
    if (digits.length >= 7) formatted += '-' + digits.slice(7, 9);
    if (digits.length >= 9) formatted += '-' + digits.slice(9, 11);

    return formatted;
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}.${month}.${year}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

const handleSave = async () => {
  try {
    const toSend = {
      ...formData,
      phone: formData.phone.replace(/\D/g, ''), 
      birth_date: formData.birth_date.split('.').reverse().join('-'), 
    };

    const response = await updateUserData(toSend);
    const updated = response.data;

    const formatted = {
      ...updated,
      phone: formatPhone(updated.phone),
      birth_date: formatDate(updated.birth_date),
    };

    setUserData(formatted);
    setFormData(formatted);
    setEditMode(false);
  } catch (err) {
    setError('Failed to update user data');
    console.error(err);
  }
};

  const handleCancel = () => {
    setFormData({ ...userData });
    setEditMode(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
                  <li>
                    {
                      genres.find((g) => g.id === userData.genre)?.genre_name
                      || userData.genre 
                    }
                  </li>
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
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                  >
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.genre_name}
                      </option>
                    ))}
                  </select>
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
