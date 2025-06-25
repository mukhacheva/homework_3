// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page from './pages/page';  // Главная страница
import TablePage from './pages/table';  // Страница с таблицей
import MusicPoll from './pages/poll'; //Страница с опросом
import RegistrationPage from './pages/registration'; //Страница с регистрацией
import LoginPage from './pages/login'; //Страница со входом

import MyPage from './pages/my_page'; //Личный кабинет

import NewsPage from './pages/news'; //Страница с новостями

import TicketsPage from './pages/tickets'; //Страниц с покупкой билетов

function App() {
  return (
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<Page />} />
        
        {/* Страница с таблицей */}
        <Route path="/table" element={<TablePage />} />

        {/* Страница с опросом */}
        <Route path="/poll" element={<MusicPoll />} />

        {/* Страница регистрации */}
        <Route path="/registration" element={<RegistrationPage />} />

        {/* Страница входа */}
        <Route path="/login" element={<LoginPage />} />


        {/* Страница кабинета */}
        <Route path="/my_page" element={<MyPage />} />

        {/* Страница новостей */}
        <Route path="/news" element={<NewsPage />} />

        {/* Страница покупки билетов */}
        <Route path="/tickets" element={<TicketsPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
