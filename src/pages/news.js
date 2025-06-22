import React, { useEffect, useState } from 'react';
import api from '../api/user'; 
import '../styles/news_styles.css';

import BurgerMenu from '../components/burger_menu.js';
import ContentSlider from '../components/content_slider.js';

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const gradients = [
    'linear-gradient(to bottom, rgba(20, 20, 20, 0.4), rgba(20, 20, 20, 0.1))',
    'linear-gradient(to bottom, rgba(40, 30, 60, 0.4), rgba(40, 30, 60, 0.1))',
    'linear-gradient(to bottom, rgba(30, 50, 40, 0.4), rgba(30, 50, 40, 0.1))',
    'linear-gradient(to bottom, rgba(60, 40, 40, 0.4), rgba(60, 40, 40, 0.1))',
  ];

  useEffect(() => {
    api.get('/news/')
      .then(response => {
        const newsData = response.data.results || response.data;
        newsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setNews(newsData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading news:', err);
        setError('Failed to load news');
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith('http')) return image;
    return `http://127.0.0.1:8000${image}`;
  };

  return (
    <div>
      <a id="top"></a>
      <BurgerMenu />
      <ContentSlider />

      <main className="news_container">
        {loading && <p>Loading news...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && news.length === 0 && <p>No news available yet</p>}

        {!loading && !error && news.map((item, index) => (
          <div
            key={item.id}
            className="news_item"
            style={{ background: gradients[index % gradients.length] }}
          >
            <h2 className="news_title">{item.title || 'Untitled'}</h2>
            <p className="news_date"><i>{formatDate(item.created_at)}</i></p>
            <p
              className="news_text"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
            {item.image && (
              <img
                src={getImageUrl(item.image)}
                alt={item.title}
                className="news_image"
              />
            )}
          </div>
        ))}
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
      <a href="#top" className="scroll_to_top_link">&#8679;</a>
    </div>
  );
}
