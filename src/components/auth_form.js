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

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '');

    if (digits.length === 11 && (digits.startsWith('8') || digits.startsWith('7'))) {
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
    }

    return value;
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required! Example: Kyle Gallner';
        } else if (/[^A-Za-z\s]/.test(value)) {
          error = 'Only Latin letters and spaces are allowed! Example: Flora Winx';
        }
        break;
      case 'phone':
        const digits = value.replace(/\D/g, '');
        if (!digits.trim()) {
          error = 'Phone is required! Example: 89765432100';
        } else if (digits.length !== 11) {
          error = 'Phone must be 11 digits! Example: 89765432100';
        } else if (!/^(7|8|\+7)/.test(digits)) {
          error = 'Phone must start with 7, 8, or +7!';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required! Example: KyleGallner@gmail.com';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Invalid email! Example: KyleGallner@gmail.com';
        } else if (/[\u0400-\u04FF]/.test(value)) {
          error = 'Email cannot contain Cyrillic characters!';
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === 'phone') {
      updatedValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));

    const error = validateField(name, updatedValue);
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
      // Форма успешно отправлена
      setIsModalOpen(true);
      
      // Сброс данных формы
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
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
