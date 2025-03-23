// client/src/PregnancyPostpartumTracker.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const PregnancyPostpartumTracker = () => {
  const [mode, setMode] = useState('pregnancy'); // pregnancy, postpartum, ivf, menopause
  const [week, setWeek] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [menopauseSymptoms, setMenopauseSymptoms] = useState('');
  const [result, setResult] = useState('');

  const handlePregnancySubmit = (e) => {
    e.preventDefault();
    if (!week) {
      setResult('Please enter the current week of pregnancy.');
      return;
    }
    const fetalInsights = getFetalDevelopmentInsights(parseInt(week));
    setResult(`Week ${week}: ${fetalInsights}`);
  };

  const handlePostpartumSubmit = (e) => {
    e.preventDefault();
    const today = new Date('2025-03-22'); // Current date as per context
    const diffTime = Math.abs(today - deliveryDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeksSinceDelivery = Math.floor(diffDays / 7);
    const firstPeriodEstimate = 6 + weeksSinceDelivery; // Typically 6-12 weeks post-delivery
    setResult(`Based on your delivery date (${deliveryDate.toDateString()}), you are ${weeksSinceDelivery} weeks postpartum. Your first period is expected around ${firstPeriodEstimate} weeks postpartum.`);
  };

  const handleMenopauseSubmit = (e) => {
    e.preventDefault();
    if (!menopauseSymptoms) {
      setResult('Please enter your symptoms.');
      return;
    }
    const guidance = getMenopauseGuidance(menopauseSymptoms.toLowerCase());
    setResult(`Symptoms: ${menopauseSymptoms}. Guidance: ${guidance}`);
  };

  const getFetalDevelopmentInsights = (week) => {
    if (week >= 1 && week <= 4) return 'Your baby is a tiny embryo, forming the neural tube and heart.';
    if (week >= 5 && week <= 8) return 'Your baby’s major organs are forming, and the heart begins to beat.';
    if (week >= 9 && week <= 12) return 'Your baby is now a fetus, with facial features and limbs developing.';
    if (week >= 13 && week <= 16) return 'Your baby can make facial expressions and may start sucking their thumb.';
    if (week >= 17 && week <= 20) return 'You might feel your baby’s first movements, and they can hear sounds.';
    if (week >= 21 && week <= 24) return 'Your baby’s lungs are developing, and they’re practicing breathing movements.';
    if (week >= 25 && week <= 28) return 'Your baby’s eyes can open, and they’re gaining more fat.';
    if (week >= 29 && week <= 32) return 'Your baby’s brain is growing rapidly, and they’re getting ready for birth.';
    if (week >= 33 && week <= 36) return 'Your baby is gaining weight and preparing for delivery.';
    if (week >= 37 && week <= 40) return 'Your baby is full-term and ready to meet you!';
    return 'Please enter a valid week (1-40).';
  };

  const getMenopauseGuidance = (symptoms) => {
    if (symptoms.includes('hot flashes')) return 'Try to stay cool, wear light clothing, and avoid triggers like spicy foods.';
    if (symptoms.includes('mood swings')) return 'Practice stress-relief techniques like meditation or yoga, and consider talking to a therapist.';
    if (symptoms.includes('sleep issues')) return 'Establish a bedtime routine, avoid caffeine, and create a calming sleep environment.';
    return 'Consult a doctor for personalized advice on managing your symptoms.';
  };

  return (
    <div style={styles.container}>
      <div style={styles.trackerContainer}>
        <h2 style={styles.heading}>Pregnancy & Postpartum Tracker</h2>
        <div style={styles.toggleContainer}>
          <button
            onClick={() => setMode('pregnancy')}
            style={{
              ...styles.toggleButton,
              backgroundColor: mode === 'pregnancy' ? '#ff8c00' : '#ccc',
            }}
          >
            Pregnancy
          </button>
          <button
            onClick={() => setMode('postpartum')}
            style={{
              ...styles.toggleButton,
              backgroundColor: mode === 'postpartum' ? '#ff8c00' : '#ccc',
            }}
          >
            Postpartum
          </button>
          <button
            onClick={() => setMode('ivf')}
            style={{
              ...styles.toggleButton,
              backgroundColor: mode === 'ivf' ? '#ff8c00' : '#ccc',
            }}
          >
            IVF Support
          </button>
          <button
            onClick={() => setMode('menopause')}
            style={{
              ...styles.toggleButton,
              backgroundColor: mode === 'menopause' ? '#ff8c00' : '#ccc',
            }}
          >
            Menopause Insights
          </button>
        </div>

        {mode === 'pregnancy' && (
          <form onSubmit={handlePregnancySubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Current Week of Pregnancy:</label>
              <input
                type="number"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                style={styles.input}
                placeholder="e.g., 12"
                min="1"
                max="40"
                required
              />
            </div>
            <button type="submit" style={styles.button}>Get Insights</button>
          </form>
        )}

        {mode === 'postpartum' && (
          <form onSubmit={handlePostpartumSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Delivery Date:</label>
              <Calendar
                onChange={setDeliveryDate}
                value={deliveryDate}
                style={styles.calendar}
              />
            </div>
            <button type="submit" style={styles.button}>Track Recovery</button>
          </form>
        )}

        {mode === 'ivf' && (
          <div style={styles.form}>
            <p style={styles.info}>
              IVF Support: For detailed IVF tracking, please visit the IVF Tracker section. You can set medication reminders, appointment dates, and track your progress with guidance from Bhoomi.
            </p>
            <Link to="/ivf-tracker" style={styles.button}>Go to IVF Tracker</Link>
          </div>
        )}

        {mode === 'menopause' && (
          <form onSubmit={handleMenopauseSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Symptoms (e.g., hot flashes, mood swings):</label>
              <textarea
                value={menopauseSymptoms}
                onChange={(e) => setMenopauseSymptoms(e.target.value)}
                style={styles.textarea}
                placeholder="Enter your symptoms here..."
                required
              />
            </div>
            <button type="submit" style={styles.button}>Get Guidance</button>
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
    flexWrap: 'wrap',
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
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '100px',
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
    textDecoration: 'none',
    textAlign: 'center',
  },
  info: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '15px',
  },
  result: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#333',
  },
};

export default PregnancyPostpartumTracker;