import React from 'react';
import PropTypes from 'prop-types';

const SymptomSelector = ({ 
  onCheck, 
  isLoading, 
  error,
  cycleLength,
  ovulationDay,
  selectedSymptoms,
  setCycleLength,
  setOvulationDay,
  setSelectedSymptoms
}) => {
  const symptoms = [
    "chronic pelvic pain", "delayed cycle", "fatigue", 
    "heavy bleeding", "irregular spotting", "light flow",
    "mild cramps", "mood swings", "normal flow", 
    "painful periods", "severe cramps", "weight gain"
  ];

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(i => i !== symptom) : [...prev, symptom]
    );
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onCheck(); }} style={styles.form}>
      {error && <div style={styles.error}>{error}</div>}
      
      <div style={styles.inputRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Cycle Length (days)</label>
          <input 
            type="number" 
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            style={styles.input} 
            required min="15" max="45"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Ovulation Day</label>
          <input 
            type="number" 
            value={ovulationDay}
            onChange={(e) => setOvulationDay(e.target.value)}
            style={styles.input} 
            required min="1" max="35"
          />
        </div>
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Symptoms</label>
        <div style={styles.symptomsContainer}>
          {symptoms.map((symptom, index) => (
            <label key={index} style={styles.symptomItem}>
              <input
                type="checkbox"
                checked={selectedSymptoms.includes(symptom)}
                onChange={() => handleSymptomToggle(symptom)}
              />
              {symptom}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" style={styles.button} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Check Irregularities'}
      </button>
    </form>
  );
};


SymptomSelector.propTypes = {
  onCheck: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '500px',
    margin: '0 auto',
  },
  inputRow: {
    display: 'flex',
    gap: '30px',
  },
  formGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontSize: '16px',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownHeader: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
  },
  dropdownList: {
    position: 'absolute',
    width: '100%',
    maxHeight: '200px',
    overflowY: 'auto',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
    zIndex: 10,
    marginTop: '5px',
  },
  dropdownItem: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  selectedItem: {
    backgroundColor: '#f5f5f5',
  },
  checkbox: {
    marginRight: '10px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#ff8c00',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: '#d32f2f',
    backgroundColor: '#fde7e7',
    padding: '10px',
    borderRadius: '4px',
    textAlign: 'center',
  },
};

export default SymptomSelector;