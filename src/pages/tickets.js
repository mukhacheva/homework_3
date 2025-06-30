import React, { useEffect, useState } from 'react';
import api from '../api/user';
import '../styles/tickets.css';

import BurgerMenu from '../components/burger_menu';
import ContentSlider from '../components/content_slider';

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sortedTickets, setSortedTickets] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState(null);

  useEffect(() => {
    api.get('/user/me/')
      .then(res => {
        setFavoriteGenre(res.data.genre);
      })
      .catch(() => console.log('Failed to load user data'));
  }, []);

  useEffect(() => {
    api.get('/tickets/')
      .then(res => {
        const allTickets = res.data;

        if (favoriteGenre) {
          const sorted = [
            ...allTickets.filter(ticket => ticket.event.artist.genres.includes(favoriteGenre)),
            ...allTickets.filter(ticket => !ticket.event.artist.genres.includes(favoriteGenre)),
          ];
          setSortedTickets(sorted);
        } else {
          setSortedTickets(allTickets);
        }

        setTickets(allTickets);
      })
      .catch(() => setMessage('Failed to load tickets.'));
  }, [favoriteGenre]);

  const sortTickets = (type) => {
    let sorted = [...sortedTickets];

    switch (type) {
      case 'name':
        sorted.sort((a, b) => a.event.name.localeCompare(b.event.name));
        break;
      case 'priceAsc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'date':
        sorted.sort((a, b) => new Date(a.event.date_time) - new Date(b.event.date_time));
        break;
      default:
        break;
    }

    setSortType(type);
    setSortedTickets(sorted);
  };

  const handleQuantityChange = (ticketId, value) => {
    setQuantities(prev => ({
      ...prev,
      [ticketId]: Number(value),
    }));
  };

  const handleReserve = (ticketId) => {
    const quantity = quantities[ticketId] || 1;

    if (quantity > 3) {
      setErrorMessage('You cannot reserve more than 3 tickets per account.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    api.post('/purchase/', { 
      ticket_id: ticketId,
      quantity: quantity,
    })
      .then(() => {
        setMessage('Ticket reserved successfully!');

        setTickets(prevTickets => 
          prevTickets.map(t =>
            t.id === ticketId 
              ? { ...t, remaining_quantity: t.remaining_quantity - quantity } 
              : t
          )
        );

        setSortedTickets(prevSorted => 
          prevSorted.map(t =>
            t.id === ticketId 
              ? { ...t, remaining_quantity: t.remaining_quantity - quantity } 
              : t
          )
        );

        setQuantities(prev => ({
          ...prev,
          [ticketId]: 1,
        }));

        setTimeout(() => setMessage(''), 3000);
      })
      .catch(err => {
        console.log(err.response?.data);
        setMessage(err.response?.data?.non_field_errors?.[0] || 'Reservation failed.');
        setTimeout(() => setMessage(''), 3000);
      });
  };

  return (
    <div>
      <BurgerMenu />
      <ContentSlider />

      <main>
        <div className="tickets-section">
          <h1>Available Tickets</h1>

          {errorMessage && (
            <div className="error-notification">
              {errorMessage}
            </div>
          )}

          <div className="sorting-buttons">
            <button
              className={`sort-name ${sortType === 'name' ? 'active' : ''}`}
              onClick={() => sortTickets('name')}
            >
              Sort by Name
            </button>

            <button
              className={`sort-price-asc ${sortType === 'priceAsc' ? 'active' : ''}`}
              onClick={() => sortTickets('priceAsc')}
            >
              Sort by Price &#8593;
            </button>

            <button
              className={`sort-price-desc ${sortType === 'priceDesc' ? 'active' : ''}`}
              onClick={() => sortTickets('priceDesc')}
            >
              Sort by Price &#8595;
            </button>

            <button
              className={`sort-date ${sortType === 'date' ? 'active' : ''}`}
              onClick={() => sortTickets('date')}
            >
              Sort by Date
            </button>
          </div>

          {message && <p className="message">{message}</p>}

          <div className="tickets-grid">
            {sortedTickets.map(ticket => (
              <div key={ticket.id} className="ticket-card">
                <p><strong>Event:</strong> {ticket.event.name}</p>
                <p><strong>Venue:</strong> {ticket.event.venue.name}</p>
                <p><strong>Date:</strong> {new Date(ticket.event.date_time).toLocaleString()}</p>
                <p><strong>Price:</strong> {ticket.price} ₽</p>
                <p><strong>Available:</strong> {ticket.remaining_quantity}</p>

                <label>
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    max={ticket.remaining_quantity}
                    value={quantities[ticket.id] || 1}
                    onChange={(e) => handleQuantityChange(ticket.id, e.target.value)}
                  />
                </label>

                <button onClick={() => handleReserve(ticket.id)}>Reserve</button>
              </div>
            ))}
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
          <p>Copyright © 2025 All rights reserved - Diamond Festival</p>
        </div>
      </footer>
    </div>
  );
}
