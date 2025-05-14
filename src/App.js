// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page from './pages/page';  // Главная страница
import TablePage from './pages/table';  // Страница с таблицей
import Poll from './pages/poll';  // Страница с опросом

function App() {
  return (
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<Page />} />
        
        {/* Страница с таблицей */}
        <Route path="/table" element={<TablePage />} />
        
        {/* Страница с опросом */}
        <Route path="/poll" element={<Poll />} />
      </Routes>
    </Router>
  );
}

export default App;
