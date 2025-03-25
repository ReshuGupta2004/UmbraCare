// client/src/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.heading}>Welcome to Your Dashboard</h2>
        <p style={styles.text}>Track your health journey with ease.</p>
        <div style={styles.buttonContainer}>
          <Link to="/pregnancy-postpartum-tracker" style={styles.button}>
            Pregnancy & Postpartum Tracker
          </Link>
          <Link to="/period-tracker" style={styles.button}>
            Period Tracker
          </Link>
          <Link to="/ivf-tracker" style={styles.button}>
            IVF Tracker
          </Link>
          <Link to="/notifications" style={styles.button}>
            Notifications
          </Link>
          <Link to="/profile" style={styles.button}>
            Profile
          </Link>
          <Link to="/doctor-info" style={styles.button}>
            Doctor Info
          </Link>
        </div>
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
    fontFamily: "'Poppins', sans-serif",
    boxSizing: 'border-box',
    paddingTop: '80px', // Added padding to account for navbar
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '800px',
  },
  heading: {
    fontSize: '28px',
    color: '#ff8c00',
    marginBottom: '20px',
    fontWeight: '600',
  },
  text: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  button: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    textDecoration: 'none',
    textAlign: 'center',
  },
};

export default Dashboard;