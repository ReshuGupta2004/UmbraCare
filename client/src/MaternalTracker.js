// client/src/MaternalTracker.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MaternalTracker = () => {
  const [isIVFMode, setIsIVFMode] = useState(false);
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [medication, setMedication] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [consumption, setConsumption] = useState('');
  const [result, setResult] = useState('');

  // Load notifications from localStorage
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem('notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleSubmitMaternal = (e) => {
    e.preventDefault();
    if (!weight || !bloodPressure) {
      setResult('Please enter both weight and blood pressure.');
      return;
    }
    setResult(`Weight: ${weight} kg, Blood Pressure: ${bloodPressure} mmHg`);
  };

  const handleSubmitIVF = (e) => {
    e.preventDefault();
    if (!medication || !appointmentDate || !consumption) {
      setResult('Please fill in all fields.');
      return;
    }

    // Add medication reminder to notifications
    const medicationReminder = `${medication} - ${new Date().toISOString()}`;
    setNotifications((prev) => [...prev, medicationReminder]);

    // Add appointment reminder to notifications
    const appointmentReminder = `Appointment on ${appointmentDate.toDateString()} - ${new Date().toISOString()}`;
    setNotifications((prev) => [...prev, appointmentReminder]);

    // Food consumption logic
    let consumptionStatus = '';
    const consumptionLower = consumption.toLowerCase();
    if (['coffee', 'alcohol', 'soda'].includes(consumptionLower)) {
      consumptionStatus = 'Emergency';
    } else if (['chocolate', 'tea', 'processed food'].includes(consumptionLower)) {
      consumptionStatus = 'Cautious';
    } else {
      consumptionStatus = 'Normal';
    }

    setResult(
      `Medication Reminder: ${medication}, Appointment: ${appointmentDate.toDateString()}, Consumption: "${consumption}" - ${consumptionStatus}`
    );

    // Trigger medication reminder alert after 5 seconds
    setTimeout(() => {
      alert(`Reminder: ${medication}`);
    }, 5000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.trackerContainer}>
        <h2 style={styles.heading}>Maternal Tracker</h2>
        <div style={styles.toggleContainer}>
          <button
            onClick={() => setIsIVFMode(false)}
            style={{
              ...styles.toggleButton,
              backgroundColor: !isIVFMode ? '#ff8c00' : '#ccc',
            }}
          >
            Maternal Health
          </button>
          <button
            onClick={() => setIsIVFMode(true)}
            style={{
              ...styles.toggleButton,
              backgroundColor: isIVFMode ? '#ff8c00' : '#ccc',
            }}
          >
            IVF Tracker
          </button>
        </div>

        {!isIVFMode ? (
          <form onSubmit={handleSubmitMaternal} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Weight (kg):</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Blood Pressure (mmHg):</label>
              <input
                type="text"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                style={styles.input}
                placeholder="e.g., 120/80"
                required
              />
            </div>
            <button type="submit" style={styles.button}>Submit</button>
          </form>
        ) : (
          <form onSubmit={handleSubmitIVF} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Medication Reminder:</label>
              <input
                type="text"
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                style={styles.input}
                placeholder="e.g., Take folic acid at 8 AM"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Appointment Date:</label>
              <Calendar
                onChange={setAppointmentDate}
                value={appointmentDate}
                style={styles.calendar}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Consumption of Food/Drinks:</label>
              <input
                type="text"
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
                style={styles.input}
                placeholder="e.g., coffee"
                required
              />
            </div>
            <button type="submit" style={styles.button}>Submit</button>
          </form>
        )}
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
  toggleContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  toggleButton: {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
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
  calendar: {
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
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

export default MaternalTracker;