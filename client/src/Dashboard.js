// client/src/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './background.jpg'; // Ensure this image exists

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.dashboardContainer}>
        <h1 style={styles.heading}>UmbraCare Dashboard</h1>
        <div style={styles.optionsContainer}>
          <Link to="/maternal-tracker" style={styles.option}>
            Maternal Tracker
          </Link>
          <Link to="/period-tracker" style={styles.option}>
            Period Tracker
          </Link>
          <Link to="/ivf-tracker" style={styles.option}>
            IVF Tracker
          </Link> {/* Changed from Chatbot */}
          <Link to="/notifications" style={styles.option}>
            Notifications
          </Link>
          <Link to="/profile" style={styles.option}>
            User Profile
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
    paddingTop: '80px',
    paddingBottom: '20px',
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: '40% 60%',
    backgroundRepeat: 'no-repeat',
    fontFamily: "'Poppins', sans-serif",
    boxSizing: 'border-box',
  },
  dashboardContainer: {
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
    marginBottom: '30px',
    fontWeight: '600',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  option: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '15px 30px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Dashboard;