import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt } from 'react-icons/fa';

const TrackPeriodLength = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [age, setAge] = useState('');
  const [cycleNumber, setCycleNumber] = useState('');
  const [conceptionCycle, setConceptionCycle] = useState('no');
  const [result, setResult] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult('');

    try {
      const response = await fetch("http://localhost:8002/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: parseFloat(age),
          cycle_number: parseFloat(cycleNumber),
          conception_cycle: conceptionCycle,
          last_period_date: startDate.toISOString().split('T')[0]
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Prediction failed");
      }

      const data = await response.json();
      
      const nextPeriodDate = new Date(data.next_period);
      const formattedDate = nextPeriodDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      setResult(`
        Your next period is predicted to start around ${formattedDate}.
        Predicted cycle length: ${data.predicted_cycle_length.toFixed(1)} days
        Fertility Status: ${data.fertility_score >= 0.7 ? 'High' : 'Moderate'} fertility
      `);
      
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Last Period Start Date:</label>
        <div style={styles.calendarInput}>
          <input
            type="text"
            value={startDate.toDateString()}
            readOnly
            style={styles.input}
          />
          <FaCalendarAlt
            onClick={() => setShowCalendar(!showCalendar)}
            style={styles.calendarIcon}
          />
          {showCalendar && (
            <Calendar
              onChange={(date) => {
                setStartDate(date);
                setShowCalendar(false);
              }}
              value={startDate}
              style={styles.calendar}
            />
          )}
        </div>
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Your Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={styles.input}
          placeholder="e.g., 30"
          min="18"
          max="50"
          required
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Current Cycle Number:</label>
        <input
          type="number"
          value={cycleNumber}
          onChange={(e) => setCycleNumber(e.target.value)}
          style={styles.input}
          placeholder="e.g., 3"
          min="1"
          required
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Trying to Conceive?</label>
        <select
          value={conceptionCycle}
          onChange={(e) => setConceptionCycle(e.target.value)}
          style={styles.input}
          required
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      <button 
        type="submit" 
        style={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Predicting...' : 'Predict Period & Fertility'}
      </button>
      {result && (
        <div style={styles.result}>
            {result.split('\n').map((line, i) => (
                <p key={i} style={{ margin: i > 0 ? '8px 0 0' : '0' }}>{line}</p>
                ))}
        </div>
        )}
    </form>
  );
};

const styles = {
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
  calendarInput: {
    position: 'relative',
    width: '100%',
  },
  calendarIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#ff8c00',
    fontSize: '20px',
  },
  calendar: {
    position: 'absolute',
    zIndex: 1000,
    top: '100%',
    left: 0,
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
    margin: '20px auto',
    padding: '15px',
    fontSize: '16px',
    color: '#333',
    whiteSpace: 'pre-line',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 140, 0, 0.2)',
    width: 'fit-content',
    maxWidth: '90%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
};

export default TrackPeriodLength;