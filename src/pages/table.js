// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/table.css';

// Импортируем изображения
import lineImg from '../img/line.png';
import headerImg from '../img/img_1.jpg';
import shareImg from '../img/share_img.png';
import phoneImg from '../img/phone_img.png';

export default function Home() {
  return (
    <div>
      <header>
        <div className="logo-title"><p>Diamond Festival</p></div>
        <nav className="nav_main">
          <div className="nav_top">
            <div className="home">
              {/* Используем импортированное изображение */}
              <img src={lineImg} className="line" alt="line" />
              <Link to="/">home</Link> {/* Ссылка на главную */}
            </div>
            <Link to="/table">tickets</Link> {/* Ссылка на страницу с таблицей */}
            <a href="#">lineup</a>
            <a href="#">contact</a>
          </div>
          <div className="nav_side">
            <a href="#"><img src={shareImg} alt="Share_image" /></a>
            <a href="#"><img src={phoneImg} alt="Phone_image" /></a>
          </div>
        </nav>
      </header>

      {/* Используем импортированное изображение */}
      <img src={headerImg} className="header_img" alt="Header image" />

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
