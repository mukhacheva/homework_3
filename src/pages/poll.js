import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/music_poll.css';


import BurgerMenu from '../components/burger_menu.js';
import MusicPoll from '../components/music_poll.js';
import ContentSlider from '../components/content_slider.js';

export default function Home() {
  return (
    <div>
      <BurgerMenu/>
      <ContentSlider/>  

      <MusicPoll/>
      
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
