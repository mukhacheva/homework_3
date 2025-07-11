import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB'; // английская локаль
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/register_form.css';
import api from '../api/user';

registerLocale('en', enGB);

export const registerUser = (data) => {
  return api.post('/api/auth/users/', data);
};

function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birth_date: null, // теперь это Date объект
  });

  const [errors, setErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value.trim()) error = 'Email is required!';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email format!';
        else if (value.length > 254) error = 'Email must be 254 characters or fewer!';
        break;
      case 'username':
        if (!value.trim()) error = 'Username is required!';
        else if (!/^[\w.@+-]+$/.test(value)) error = 'Only letters, digits and @/./+/-/_ allowed!';
        else if (value.length > 150) error = 'Username must be 150 characters or fewer!';
        break;
      case 'password':
        if (!value.trim()) error = 'Password is required!';
        else if (value.length < 1 || value.length > 64) error = 'Password must be between 1 and 64 characters!';
        break;
      case 'confirmPassword':
        if (!value.trim()) error = 'Please confirm your password!';
        else if (value !== formData.password) error = 'Passwords do not match!';
        break;
      case 'phone':
        const digits = value.replace(/\D/g, '');
        if (digits && digits.length !== 11) error = 'Phone must be 11 digits!';
        else if (digits && !/^8|7/.test(digits)) error = 'Phone must start with 8 or 7!';
        break;
      case 'birth_date':
        if (!value) error = 'Date of birth is required!';
        break;
      default:
        break;
    }

    return error;
  };

  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, '');
    if (digits.length === 10 && digits.startsWith('9')) digits = '7' + digits;
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);

    let formatted = '+7';
    if (digits.length >= 1) formatted += '(' + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ') ' + digits.slice(4, 7);
    if (digits.length >= 7) formatted += '-' + digits.slice(7, 9);
    if (digits.length >= 9) formatted += '-' + digits.slice(9, 11);

    return formatted;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'phone') formattedValue = formatPhone(value);

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    const error = validateField(name, formattedValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, birth_date: date }));
    const error = validateField('birth_date', date);
    setErrors((prev) => ({ ...prev, birth_date: error }));
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
      setShowPolicyModal(true);
    }
  };

  const confirmRegistration = async () => {
    const dataToSend = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      phone: formData.phone.replace(/\D/g, ''),
      birth_date: formData.birth_date ? formData.birth_date.toISOString().split('T')[0] : null, // формат YYYY-MM-DD
    };

    try {
      await registerUser(dataToSend);
      setIsSuccessModalOpen(true);
      setFormData({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        phone: '',
        birth_date: null,
      });
      setAgreedToPolicy(false);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
    } finally {
      setShowPolicyModal(false);
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
              <DatePicker
                selected={formData.birth_date}
                onChange={handleDateChange}
                locale="en"
                placeholderText="Date of Birth"
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                className="date-picker-input"
              />
              {errors.birth_date && <span className="error">{errors.birth_date}</span>}
            </div>
          </div>

          <div className="form_row">
            <label>
              <input
                type="checkbox"
                checked={agreedToPolicy}
                onChange={() => setAgreedToPolicy(!agreedToPolicy)}
              />
              I agree with the Privacy Policy
            </label>
          </div>

          <div className="form_row">
            <button type="submit" disabled={!agreedToPolicy}>
              Register
            </button>
          </div>
        </form>
      </div>

      {showPolicyModal && (
        <Modal onClose={() => setShowPolicyModal(false)}>
          <h2>Privacy Policy Agreement</h2>
          <p>By clicking "Agree", you confirm that you have read and accepted our Privacy Policy.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={confirmRegistration}>Agree</button>
            <button onClick={() => setShowPolicyModal(false)}>Cancel</button>
          </div>
        </Modal>
      )}

      {isSuccessModalOpen && (
        <Modal onClose={() => setIsSuccessModalOpen(false)}>
          <h2>You're successfully registered, sweetie! ☆*:.｡.o(≧▽≦)o.｡.:*☆</h2>
        </Modal>
      )}
    </>
  );
}

export default RegistrationForm;
