import React, { useState } from 'react';
import '../styles/login_form.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    nickname: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';

    if (!value.trim()) {
      error = `${name === 'nickname' ? 'Nickname' : 'Password'} is required`;
    } else {
      if (name === 'nickname') {
        if (value.length > 150) {
          error = 'Nickname must be at most 150 characters';
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Replace with your login logic
      console.log('Logging in with', formData);
    }
  };

  return (
    <div className="auth_form">
      <form onSubmit={handleSubmit}>
        <div className="form_row">
          <div className="input_wrapper">
            <input
              type="text"
              name="nickname"
              placeholder="Nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
            {errors.nickname && <span className="error">{errors.nickname}</span>}
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
  );
}

export default LoginForm;
