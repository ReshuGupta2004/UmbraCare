// client/src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import backgroundImage from './background.jpg';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/login', {
      email,
      password,
    });
    setMessage(response.data);
    if (response.data === 'Login successful') {
      setIsLoggedIn(true);
      navigate('/dashboard');
    }
  } catch (error) {
    setMessage('Error: ' + (error.response?.data || 'Something went wrong'));
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Welcome to UmbraCare</h2>
        <p style={styles.subheading}>Login to track your maternal health journey</p>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={{ ...styles.message, color: message.includes('Error') ? 'red' : 'green' }}>
          {message}
        </p>
        <p style={styles.registerLink}>
          Don't have an account? <a href="/register" style={styles.link}>Register here</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: '40% 60%',
    backgroundRepeat: 'no-repeat',
    fontFamily: "'Poppins', sans-serif",
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    border: '2px solid #ff8c00',
  },
  heading: {
    fontSize: '28px',
    color: '#ff8c00',
    marginBottom: '10px',
    fontWeight: '600',
  },
  subheading: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ff8c00',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  message: {
    marginTop: '15px',
    fontSize: '14px',
  },
  registerLink: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666',
  },
  link: {
    color: '#ff8c00',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default Login;