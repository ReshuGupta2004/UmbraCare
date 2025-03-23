// client/src/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={styles.dashboardContainer}>
      <h2 style={styles.heading}>UmbraCare Dashboard</h2>
      <div style={styles.buttonContainer}>
        <Link to="/pregnancy-postpartum-tracker" style={styles.button}>Pregnancy & Postpartum Tracker</Link>
        <Link to="/period-tracker" style={styles.button}>Period Tracker</Link>
        <Link to="/ivf-tracker" style={styles.button}>IVF Tracker</Link>
        <Link to="/notifications" style={styles.button}>Notifications</Link>
        <Link to="/profile" style={styles.button}>User Profile</Link>
        <Link to="/doctor-consultation" style={styles.button}>Doctor Consultation</Link>
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
  },
  heading: {
    fontSize: '28px',
    color: '#ff8c00',
    marginBottom: '30px',
    fontWeight: '600',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '400px',
  },
  button: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '15px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'background-color 0.3s',
  },
};

export default Dashboard;