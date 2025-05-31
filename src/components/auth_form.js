import React, { useState } from 'react';
import Modal from './modal'; 
import '../styles/auth_form.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required! Example: Kyle Gallner';
        } else if (/^\s/.test(value)) {
          error = 'Name cannot start with a space';
        } else if (/[А-Яа-яЁё]/.test(value)) {
          error = 'Russian letters are not allowed in name';
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = 'You can use only Latin letters and spaces! Example: Flora Winx';
        }
        break;

      case 'phone':
        const digits = value.replace(/\D/g, '');
        if (!digits) {
          error = 'Phone is required! Example: 89765432100';
        } else if (digits.length !== 11) {
          error = 'Phone must be exactly 11 digits! Example: 89765432100';
        } else if (!/^8|7/.test(digits)) {
          error = 'Phone must start with 8 or 7';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required! Example: KyleGallner@gmail.com';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Invalid email! Example: KyleGallner@gmail.com';
        }
        break;

      case 'message':
        if (!value.trim()) error = 'You did not text any message!';
        break;

      default:
        break;
    }

    return error;
  };

  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, '');

    if (digits.length === 10 && digits.startsWith('9')) {
      digits = '7' + digits;
    }

    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1);
    }

    if (digits.length > 0) {
      let formatted = '+7';

      if (digits.length >= 1) {
        formatted += '(' + digits.slice(1, 4);
      }
      if (digits.length >= 4) {
        formatted += ') ' + digits.slice(4, 7);
      }
      if (digits.length >= 7) {
        formatted += '-' + digits.slice(7, 9);
      }
      if (digits.length >= 9) {
        formatted += '-' + digits.slice(9, 11);
      }

      return formatted;
    }

    return value;
  };

  const handleChange = (e) => {
    const { name } = e.target;
    let value = e.target.value;

    if (name === 'phone') {
      value = formatPhone(value);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Отправляем данные на сервер
      fetch('https://webhook.site/9ab99e89-28b9-4023-9d83-6d4620f825a5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Success:', data);
          setIsModalOpen(true);
          setFormData({ name: '', phone: '', email: '', message: '' });
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Something went wrong. Please try again later.');
        });
    }
  };

  return (
    <>
      <div className="auth_form">
        <form onSubmit={handleSubmit}>
          <div className="form_row">
            <div className="input_wrapper">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="input_wrapper">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={18}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>

          <div className="form_row">
            <div className="input_wrapper">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>

          <div className="form_row">
            <div className="input_wrapper">
              <textarea
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <span className="error">{errors.message}</span>}
            </div>
          </div>

          <div className="form_row">
            <button type="submit">Contact Us</button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Hello! Thank you for messaging us, cutie!^^</h2>
        </Modal>
      )}
    </>
  );
}

export default ContactForm;
