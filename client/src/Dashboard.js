// client/src/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
// import './Dashboard.css';
import { FaBaby, FaCalendarAlt, FaFlask, FaUserMd } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.mainHeading}>Welcome to Umbracare</h1>
        <p style={styles.subHeading}>Your journey to better begins here</p>
        
        {/* <div style={styles.measurementBox}>
          <h3 style={styles.measurementHeading}>Add Measurements</h3>
          <div style={styles.measurementButtonContainer}>
            <button style={styles.measurementButton}>Weight</button>
            <button style={styles.measurementButton}>Height</button>
          </div>
        </div> */}
        
        <div style={styles.buttonGrid}>
          <Link to="/pregnancy-postpartum-tracker" style={styles.gridButton}>
            <FaBaby style={styles.icon} />
            <span>Pregnancy & Postpartum Tracker</span>
          </Link>
          <Link to="/period-tracker" style={styles.gridButton}>
            <FaCalendarAlt style={styles.icon} />
            <span>Period Tracker</span>
          </Link>
          <Link to="/ivf-tracker" style={styles.gridButton}>
            <FaFlask style={styles.icon} />
            <span>IVF Tracker</span>
          </Link>
          <Link to="/doctor-info" style={styles.gridButton}>
            <FaUserMd style={styles.icon} />
            <span>Doctor Info</span>
          </Link>
        </div>
        
        <div style={styles.newsletterBox}>
          <h3 style={styles.newsletterHeading}>Subscribe to Our Newsletter</h3>
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
  content: {
    // backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '10px',
    // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1400px',
  },
  mainHeading: {
    fontSize: '38px',
    color: 'black',
    marginBottom: '10px',
    fontWeight: '600',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  measurementBox: {
    backgroundColor: '#fff8e6',
    border: '2px solid #ff8c00',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'row',
    gap: '15px',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  measurementHeading: {
    color: '#ff8c00',
    fontSize: '20px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  measurementButtonContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  measurementButton: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '8px 15px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px',
    marginBottom: '30px',
    '@media (max-width: 1000px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 600px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  gridButton: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '15px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    height: '220px',
  },
  icon: {
    fontSize: '40px',
    marginBottom: '15px',
  },
  newsletterBox: {
    backgroundColor: 'rgb(255, 140, 0)',
    borderRadius: '8px',
    padding: '10px',
    height: '100%',
    width: '300px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  newsletterHeading: {
    color: 'black',
    fontSize: '15px',
    // marginBottom: '15px',

  },
 
};

export default Dashboard;