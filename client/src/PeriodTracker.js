// client/src/PeriodTracker.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const PeriodTracker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextPeriod = new Date(startDate);
    nextPeriod.setDate(startDate.getDate() + parseInt(cycleLength));
    setResult(`Your next period is expected around ${nextPeriod.toDateString()}.`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.trackerContainer}>
        <h2 style={styles.heading}>Period Tracker</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Last Period Start Date:</label>
            <Calendar onChange={setStartDate} value={startDate} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Cycle Length (days):</label>
            <input
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              style={styles.input}
              min="21"
              max="35"
              required
            />
          </div>
          <button type="submit" style={styles.button}>Track Period</button>
        </form>
        {result && <p style={styles.result}>{result}</p>}
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
  },
};

export default PeriodTracker;