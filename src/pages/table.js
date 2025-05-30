// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/table.css';

import BurgerMenu from '../components/burger_menu.js';
import MusicPoll from '../components/music_poll.js';
import ContentSlider from '../components/content_slider.js';

export default function Home() {
  return (
    <div>
      <BurgerMenu/>
      <ContentSlider/>

      <main>
        <table className="my-table">
          <tbody>
            {/* Первая строка */}
            <tr>
              <td></td>
              <td></td>
              <td rowSpan="2"><p>Объединены</p></td>
              <td></td>
              <td></td>
            </tr>
            {/* Вторая строка */}
            <tr>
              <td></td>
              <td></td>
              <td colSpan="2"><p>Объединены</p></td>
            </tr>
            {/* Третья строка */}
            <tr>
              <td></td>
              <td rowSpan="3"><p>Объединены</p></td>
              <td rowSpan="2"><p>Объединены</p></td>
              <td></td>
              <td rowSpan="5"><p>Объединены</p></td>
            </tr>
            {/* Четвертая строка */}
            <tr>
              <td rowSpan="2"><p>Объединены</p></td>
              <td></td>
            </tr>
            {/* Пятая строка */}
            <tr>
              <td rowSpan="3"><p>Объединены</p></td>
              <td></td>
            </tr>
            {/* Шестая строка */}
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* Седьмая строка */}
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
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
