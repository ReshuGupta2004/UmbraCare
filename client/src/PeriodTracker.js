// client/src/PeriodTracker.js
import React, { useState } from 'react';
import backgroundImage from './background.jpg';

const PeriodTracker = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28); // Default cycle length
  const [prediction, setPrediction] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = new Date(startDate);
    const nextStart = new Date(start);
    nextStart.setDate(start.getDate() + parseInt(cycleLength));
    setPrediction(`Next period predicted: ${nextStart.toDateString()}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.trackerContainer}>
        <h2 style={styles.heading}>Period Tracker</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Cycle Length (days):</label>
            <input
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              style={styles.input}
              min="20"
              max="40"
              required
            />
          </div>
          <button type="submit" style={styles.button}>Track</button>
        </form>
        {prediction && <p style={styles.message}>{prediction}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 80px)',
    paddingTop: '80px',
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: '40% 60%',
    fontFamily: "'Poppins', sans-serif",
  },
  trackerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
    border: '2px solid #ff8c00',
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
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontSize: '16px',
    color: '#666',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ff8c00',
    borderRadius: '5px',
    outline: 'none',
  },
  button: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#ff8c00',
  },
};

export default PeriodTracker;