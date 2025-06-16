import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000',  
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (formData) => {
  const payload = {
    email: formData.email,
    username: formData.username,
    password: formData.password,
    phone: formData.phone.replace(/\D/g, ''),
    birth_date: formData.birth_date.split('.').reverse().join('-'),  
  };

  try {
    const response = await API.post('/auth/users/', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Registration failed' };
  }
};
