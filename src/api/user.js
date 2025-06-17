// src/api/user.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен в заголовки запросов
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Обновляем токен при 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/jwt/refresh/`, {
            refresh: refreshToken,
          });
          const newAccess = response.data.access;
          localStorage.setItem('access_token', newAccess);
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// Функция регистрации
export const registerUser = async (formData) => {
  const payload = {
    email: formData.email,
    username: formData.username,
    password: formData.password,
    phone: formData.phone.replace(/\D/g, ''),
    birth_date: formData.birth_date.split('.').reverse().join('-'),
  };

  try {
    const response = await api.post('/auth/users/', payload); 
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Registration failed' };
  }
};

// Отправка контактной формы
export const sendContactForm = async (formData) => {
  const payload = {
    name: formData.name,
    phone: formData.phone.replace(/\D/g, ''), // только цифры
    email: formData.email,
    text: formData.message,
  };

  try {
    const response = await api.post('/contact/', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Message sending failed' };
  }
};


export default api;


