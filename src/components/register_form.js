import React, { useState } from 'react';
import Modal from './modal';
import '../styles/register_form.css';
import { registerUser } from '../api/user';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: 'katya@example.com',
    username: 'Katya',
    password: 'password123',
    confirmPassword: 'password123',
    phone: '+7(999)123-45-67',
    birth_date: '01.01.2000'
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value.trim()) {
          error = 'Email is required!';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Invalid email format!';
        } else if (value.length > 254) {
          error = 'Email must be 254 characters or fewer!';
        }
        break;

      case 'username':
        if (!value.trim()) {
          error = 'Username is required!';
        } else if (!/^[\w.@+-]+$/.test(value)) {
          error = 'Only letters, digits and @/./+/-/_ allowed!';
        } else if (value.length > 150) {
          error = 'Username must be 150 characters or fewer!';
        }
        break;

      case 'password':
        if (!value.trim()) {
          error = 'Password is required!';
        } else if (value.length < 1 || value.length > 64) {
          error = 'Password must be between 1 and 64 characters!';
        }
        break;

      case 'confirmPassword':
        if (!value.trim()) {
          error = 'Please confirm your password!';
        } else if (value !== formData.password) {
          error = 'Passwords do not match!';
        }
        break;

      case 'phone':
        const digits = value.replace(/\D/g, '');
        if (digits && digits.length !== 11) {
          error = 'Phone must be 11 digits!';
        } else if (digits && !/^8|7/.test(digits)) {
          error = 'Phone must start with 8 or 7!';
        }
        break;

      case 'birth_date':
        if (value && !/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
          error = 'Use format DD.MM.YYYY!';
        }
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

    let formatted = '+7';
    if (digits.length >= 1) formatted += '(' + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ') ' + digits.slice(4, 7);
    if (digits.length >= 7) formatted += '-' + digits.slice(7, 9);
    if (digits.length >= 9) formatted += '-' + digits.slice(9, 11);

    return formatted;
  };

  const formatDOB = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    const parts = [];

    if (digits.length > 0) {
      parts.push(digits.slice(0, 2));
    }
    if (digits.length > 2) {
      parts.push(digits.slice(2, 4));
    }
    if (digits.length > 4) {
      parts.push(digits.slice(4, 8));
    }

    return parts.join('.');
  };

  const handleChange = (e) => {
    const { name } = e.target;
    let value = e.target.value;

    if (name === 'phone') {
      value = formatPhone(value);
    }

    if (name === 'birth_date') {
      value = formatDOB(value);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const dataToSend = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        phone: formData.phone.replace(/\D/g, ''),
        birth_date: formData.birth_date.split('.').reverse().join('-')
      };

      try {
        await registerUser(dataToSend);
        setIsModalOpen(true);
        setFormData({
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
          phone: '',
          birth_date: ''
        });
      } catch (err) {
        if (err.response?.data) {
          const apiErrors = {};
          for (const key in err.response.data) {
            apiErrors[key] = err.response.data[key][0];
          }
          setErrors(apiErrors);
        } else {
          alert('Something went wrong!');
        }
      }
    }
  };

  return (
    <>
      <div className="auth_form">
        <form onSubmit={handleSubmit}>
          <div className="form_row">
            <div className="input_wrapper">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="input_wrapper">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>
          </div>

          <div className="form_row">
            <div className="input_wrapper">
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="input_wrapper">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form_row">
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

            <div className="input_wrapper">
              <input
                type="text"
                name="birth_date"
                placeholder="Date of Birth"
                value={formData.birth_date}
                onChange={handleChange}
                maxLength={10}
              />
              {errors.birth_date && <span className="error">{errors.birth_date}</span>}
            </div>
          </div>

          <div className="form_row">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>You're successfully registered, sweetie! ☆*:.｡.o(≧▽≦)o.｡.:*☆</h2>
        </Modal>
      )}
    </>
  );
}

export default RegistrationForm;
