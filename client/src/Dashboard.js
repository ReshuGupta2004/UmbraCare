// client/src/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        <h1 style={styles.heading}>Welcome to UmbraCare</h1>
        <p style={styles.subheading}>Your personalized health tracking dashboard</p>
        <div style={styles.links}>
          <Link to="/pregnancy-postpartum-tracker" style={styles.link}>Pregnancy & Postpartum Tracker</Link>
          <Link to="/period-tracker" style={styles.link}>Period Tracker</Link>
          <Link to="/ivf-tracker" style={styles.link}>IVF Tracker</Link>
          <Link to="/notifications" style={styles.link}>Notifications</Link>
          <Link to="/profile" style={styles.link}>Profile</Link>
          <Link to="/doctor-info" style={styles.link}>Doctor Info</Link> {/* Updated from Doctor Consultation */}
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
    paddingTop: '80px',
  },
  dashboard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    border: '2px solid #ff8c00',
    width: '100%',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '32px',
    color: '#ff8c00',
    marginBottom: '10px',
    fontWeight: '600',
  },
  subheading: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '30px',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  link: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

export default Dashboard;