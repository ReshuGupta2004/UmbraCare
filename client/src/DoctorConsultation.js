// client/src/DoctorConsultation.js
import React from 'react';

const DoctorConsultation = () => {
  return (
    <div style={styles.container}>
      <div style={styles.consultationContainer}>
        <h2 style={styles.heading}>Doctor Consultation</h2>
        <p style={styles.info}>
          Schedule a consultation with a gynecologist or nutritionist. This feature is coming soon!
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
    fontFamily: "'Poppins', sans-serif",
    boxSizing: 'border-box',
  },
  consultationContainer: {
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
    fontSize: '28px',
    color: '#ff8c00',
    marginBottom: '20px',
    fontWeight: '600',
  },
  info: {
    fontSize: '16px',
    color: '#333',
  },
};

export default DoctorConsultation;