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
        } else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(value)) {
          error = 'You can use only letter! Example: Flora Winx';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone is required! Example: 89765432100';
        } else if (!/^\d{11}$/.test(value)) {
          error = 'Phone must be only 11 digits! Example: 89765432100';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="auth_form">
        <form onSubmit={handleSubmit}>
          <div className="form_row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form_row">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form_row">
            <textarea
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <span className="error">{errors.message}</span>}
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
