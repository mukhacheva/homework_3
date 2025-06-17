import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    setFormData({
      name: 'Kyle Gallner',
      phone: '+7(987)654-32-10',
      email: 'kylegallner@gmail.com',
      message: 'Hello, I love your site!'
    });
  }, []);

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
      setIsModalOpen(true);
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
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="contact-form__row">
            <div className="contact-form__field">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="contact-form__error">{errors.name}</span>}
            </div>

            <div className="contact-form__field">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={18}
              />
              {errors.phone && <span className="contact-form__error">{errors.phone}</span>}
            </div>
          </div>

          <div className="contact-form__row">
            <div className="contact-form__field">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="contact-form__error">{errors.email}</span>}
            </div>
          </div>

          <div className="contact-form__row">
            <div className="contact-form__field">
              <textarea
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <span className="contact-form__error">{errors.message}</span>}
            </div>
          </div>

          <div className="contact-form__row">
            <button type="submit" className="contact-form__submit">Contact Us</button>
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
