// client/src/IVFTracker.js
import React, { useState } from 'react';
import axios from 'axios';

const IVFTracker = () => {
  const [medication, setMedication] = useState('');
  const [appointment, setAppointment] = useState('');
  const [result, setResult] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      console.log('Token:', token);

      // Send medication reminder to backend
      const medResponse = await axios.post(
        'http://localhost:5000/api/notifications',
        {
          type: 'ivf_medication',
          message: `Medication Reminder: ${medication}`,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      console.log('Medication Response:', medResponse.data);

      // Send appointment reminder to backend
      const apptResponse = await axios.post(
        'http://localhost:5000/api/notifications',
        {
          type: 'ivf_appointment',
          message: `Next Appointment: ${appointment}`,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      console.log('Appointment Response:', apptResponse.data);

      setResult(`Medication Reminder: ${medication}\nNext Appointment: ${appointment}`);
      setShowPopup(true); // Show popup
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
    } catch (err) {
      console.error('Error saving IVF data:', err.response?.data || err.message);
      setResult(`Error saving data: ${err.response?.data?.msg || err.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.trackerContainer}>
        <h2 style={styles.heading}>IVF Tracker</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Medication Reminder:</label>
            <input
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              style={styles.input}
              placeholder="e.g., Take Follicle Stimulating Hormone at 8 AM"
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Next Appointment:</label>
            <input
              type="text"
              value={appointment}
              onChange={(e) => setAppointment(e.target.value)}
              style={styles.input}
              placeholder="e.g., Ultrasound on 2025-03-25"
              required
            />
          </div>
          <button type="submit" style={styles.button}>Set Reminder</button>
        </form>
        {result && <p style={styles.result}>{result}</p>}
        {showPopup && (
          <div style={styles.popup}>
            <p>Reminder added successfully!</p>
          </div>
        )}
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
  trackerContainer: {
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5px',
  },
  label: {
    fontSize: '16px',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
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
  },
  result: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#333',
    whiteSpace: 'pre-wrap',
  },
  popup: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
};

export default IVFTracker;