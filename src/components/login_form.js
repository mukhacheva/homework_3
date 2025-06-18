import React, { useState } from 'react';
import '../styles/login_form.css';
import api from '../api/user';
import Modal from './modal'; 

export const loginUser = (data) => {
  return api.post('api/auth/jwt/create/', data);
};

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const validateField = (name, value) => {
    let error = '';

    if (!value.trim()) {
      error = `${name === 'username' ? 'Username' : 'Password'} is required`;
    } else {
      if (name === 'username') {
        if (value.length > 150) {
          error = 'Username must be at most 150 characters';
        }
      }
      if (name === 'password') {
        if (value.length > 64) {
          error = 'Password must be at most 64 characters';
        }
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

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
      try {
        const response = await loginUser({
          username: formData.username,
          password: formData.password,
        });
        const { access, refresh } = response.data;

        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        setIsModalOpen(true); 

        setFormData({
          username: '',
          password: ''
        });

      } catch (err) {
        if (err.response?.data) {
          alert('Login failed: ' + JSON.stringify(err.response.data));
        } else {
          alert('Login failed: Unknown error');
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
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
          </div>

          <div className="form_row">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Welcome back, sunshine! (⌒‿⌒)</h2>
        </Modal>
      )}
    </>
  );
}

export default LoginForm;
