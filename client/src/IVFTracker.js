// client/src/IVFTracker.js
import React, { useState } from 'react';

const IVFTracker = () => {
  const [transferDate, setTransferDate] = useState('');
  const [transferType, setTransferType] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transferDate || !transferType) {
      setResult('Please select a date and type of transfer.');
      return;
    }

    const selectedDate = new Date(transferDate);
    // Removed unused diffDays calculation
    let pregnancyDuration = '';
    if (transferType === 'day3') {
      pregnancyDuration = 'Pregnant for 2 weeks and 3 days';
    } else if (transferType === 'day5') {
      pregnancyDuration = 'Pregnant for 2 weeks and 5 days';
    } else if (transferType === 'eggRetrieval') {
      pregnancyDuration = 'Pregnant for 2 weeks';
    }

    setResult(`Date of Transfer: ${selectedDate.toDateString()}, Type of Transfer: ${transferType.replace('day', 'Day ').replace('eggRetrieval', 'Day of Egg Retrieval')}, ${pregnancyDuration}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.trackerContainer}>
        <h2 style={styles.heading}>IVF Tracker</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Date of Transfer:</label>
            <input
              type="date"
              value={transferDate}
              onChange={(e) => setTransferDate(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Type of Transfer:</label>
            <select
              value={transferType}
              onChange={(e) => setTransferType(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">Select Type</option>
              <option value="day3">Day 3 Embryo Transfer</option>
              <option value="day5">Day 5 Embryo Transfer</option>
              <option value="eggRetrieval">Day of Egg Retrieval</option>
            </select>
          </div>
          <button type="submit" style={styles.button}>Calculate</button>
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
    paddingTop: '80px',
    paddingBottom: '20px',
    backgroundColor: '#f5f5f5',
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

export default IVFTracker;