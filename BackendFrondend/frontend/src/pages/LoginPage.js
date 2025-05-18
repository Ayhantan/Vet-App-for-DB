// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../components/logo2.png';
import vet from '../components/vet.png';



function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/login', form)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/owners');
      })
      .catch(() => {
        setError('Invalid username or password');
      });
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src={logo} alt="Logo" className="login-logo" />
        <h1 className="login-welcome">Well Come to Smart Veterinary Clinic</h1>
        <p className="login-desc">Login with your Username and Password.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Kullanıcı Adı"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Parola"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
      <div className="login-right">
        <img src={vet} alt="Vet Illustration" className="vet-image" />
      </div>
    </div>
  );
}

export default LoginPage;
