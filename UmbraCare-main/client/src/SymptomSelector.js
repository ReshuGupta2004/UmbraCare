// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// const SymptomSelector = ({ onCheck }) => {
//   const [selectedSymptoms, setSelectedSymptoms] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [cycleLength, setCycleLength] = useState('');
//   const [ovulationDay, setOvulationDay] = useState('');

//   const symptoms = [
//     "chronic pelvic pain",
//     "delayed cycle",
//     "fatigue",
//     "heavy bleeding",
//     "irregular spotting",
//     "light flow",
//     "mild cramps",
//     "mood swings",
//     "normal flow",
//     "painful periods",
//     "severe cramps",
//     "weight gain"
//   ];

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleSymptomToggle = (symptom) => {
//     setSelectedSymptoms(prev => 
//       prev.includes(symptom) 
//         ? prev.filter(item => item !== symptom) 
//         : [...prev, symptom]
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate inputs
//     if (!cycleLength || !ovulationDay) {
//       setError('Please fill in all fields');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setError(null);
      
//       if (typeof onCheck !== 'function') {
//         throw new Error('Form submission handler not configured properly');
//       }

//       await onCheck({
//         cycleLength,
//         ovulationDay,
//         symptoms: selectedSymptoms
//       });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={styles.form}>
//       {error && <div style={styles.error}>{error}</div>}
      
//       <div style={styles.inputRow}>
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Cycle Length (days)</label>
//           <input 
//             type="number" 
//             value={cycleLength}
//             onChange={(e) => setCycleLength(e.target.value)}
//             style={styles.input} 
//             required
//             min="15"
//             max="45"
//           />
//         </div>
        
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Ovulation Day</label>
//           <input 
//             type="number" 
//             value={ovulationDay}
//             onChange={(e) => setOvulationDay(e.target.value)}
//             style={styles.input} 
//             required
//             min="1"
//             max="35"
//           />
//         </div>
//       </div>
      
//       <div style={styles.formGroup}>
//         <label style={styles.label}>Symptoms (select multiple)</label>
//         <div style={styles.dropdownContainer}>
//           <div 
//             style={styles.dropdownHeader}
//             onClick={toggleDropdown}
//           >
//             {selectedSymptoms.length > 0 
//               ? selectedSymptoms.join(", ") 
//               : "Select symptoms..."}
//             <span style={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
//           </div>
          
//           {isOpen && (
//             <div style={styles.dropdownList}>
//               {symptoms.map((symptom, index) => (
//                 <div 
//                   key={index}
//                   style={{
//                     ...styles.dropdownItem,
//                     ...(selectedSymptoms.includes(symptom) && styles.selectedItem)
//                   }}
//                   onClick={() => handleSymptomToggle(symptom)}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedSymptoms.includes(symptom)}
//                     readOnly
//                     style={styles.checkbox}
//                   />
//                   {symptom}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <button 
//         type="submit" 
//         style={styles.button}
//         disabled={isLoading}
//       >
//         {isLoading ? 'Checking...' : 'Check for Irregularities'}
//       </button>
//     </form>
//   );
// };

// // Prop type validation
// // SymptomSelector.propTypes = {
// //   onCheck: PropTypes.func.isRequired
// // };

// // Default prop (for development)
// SymptomSelector.defaultProps = {
//   onCheck: (data) => {
//     console.warn('No onCheck handler provided. Form data:', data);
//     return Promise.resolve();
//   }
// };

// SymptomSelector.propTypes = {
//   onCheck: PropTypes.func.isRequired,
//   isLoading: PropTypes.bool,
//   error: PropTypes.func
// };

// const styles = {
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px',
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     maxWidth: '500px',
//     margin: '0 auto',
//   },
//   inputRow: {
//     display: 'flex',
//     gap: '30px',
//   },
//   formGroup: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '5px',
//   },
//   label: {
//     fontSize: '16px',
//     color: '#333',
//   },
//   input: {
//     padding: '10px',
//     fontSize: '16px',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     width: '100%',
//   },
//   dropdownContainer: {
//     position: 'relative',
//   },
//   dropdownHeader: {
//     padding: '10px',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
//   dropdownList: {
//     position: 'absolute',
//     width: '100%',
//     maxHeight: '200px',
//     overflowY: 'auto',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     backgroundColor: 'white',
//     zIndex: 10,
//     marginTop: '5px',
//   },
//   dropdownItem: {
//     padding: '10px',
//     display: 'flex',
//     alignItems: 'center',
//     cursor: 'pointer',
//   },
//   selectedItem: {
//     backgroundColor: '#f5f5f5',
//   },
//   checkbox: {
//     marginRight: '10px',
//   },
//   button: {
//     padding: '12px',
//     backgroundColor: '#ff8c00',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
//     cursor: 'pointer',
//   },
//   error: {
//     color: '#d32f2f',
//     backgroundColor: '#fde7e7',
//     padding: '10px',
//     borderRadius: '4px',
//     textAlign: 'center',
//   },
// };

// export default SymptomSelector;


import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SymptomSelector = ({ 
  onCheck = (data) => {
    console.warn('No onCheck handler provided. Form data:', data);
    return Promise.resolve();
  },
  isLoading = false,
  error = null
}) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cycleLength, setCycleLength] = useState('');
  const [ovulationDay, setOvulationDay] = useState('');

  const symptoms = [
    "chronic pelvic pain",
    "delayed cycle",
    "fatigue",
    "heavy bleeding",
    "irregular spotting",
    "light flow",
    "mild cramps",
    "mood swings",
    "normal flow",
    "painful periods",
    "severe cramps",
    "weight gain"
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(item => item !== symptom) 
        : [...prev, symptom]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!cycleLength || !ovulationDay) {
      console.error('Please fill in all fields');
      return;
    }

    try {
      await onCheck({
        cycleLength,
        ovulationDay,
        symptoms: selectedSymptoms
      });
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <div style={styles.error}>{error}</div>}
      
      <div style={styles.inputRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Cycle Length (days)</label>
          <input 
            type="number" 
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            style={styles.input} 
            required
            min="15"
            max="45"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Ovulation Day</label>
          <input 
            type="number" 
            value={ovulationDay}
            onChange={(e) => setOvulationDay(e.target.value)}
            style={styles.input} 
            required
            min="1"
            max="35"
          />
        </div>
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Symptoms (select multiple)</label>
        <div style={styles.dropdownContainer}>
          <div 
            style={styles.dropdownHeader}
            onClick={toggleDropdown}
          >
            {selectedSymptoms.length > 0 
              ? selectedSymptoms.join(", ") 
              : "Select symptoms..."}
            <span style={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
          </div>
          
          {isOpen && (
            <div style={styles.dropdownList}>
              {symptoms.map((symptom, index) => (
                <div 
                  key={index}
                  style={{
                    ...styles.dropdownItem,
                    ...(selectedSymptoms.includes(symptom) && styles.selectedItem)
                  }}
                  onClick={() => handleSymptomToggle(symptom)}
                >
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.includes(symptom)}
                    readOnly
                    style={styles.checkbox}
                  />
                  {symptom}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button 
        type="submit" 
        style={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Checking...' : 'Check for Irregularities'}
      </button>
    </form>
  );
};

// SymptomSelector.propTypes = {
//   onCheck: PropTypes.func,
//   isLoading: PropTypes.bool,
//   error: PropTypes.string
// };

// import React from 'react';
// import PropTypes from 'prop-types';

// const SymptomSelector = ({ 
//   isLoading,
//   error,
//   cycleLength,
//   ovulationDay,
//   symptom1,
//   symptom2,
//   symptom3,
//   setCycleLength,
//   setOvulationDay,
//   setSymptom1,
//   setSymptom2,
//   setSymptom3,
//   onSubmit
// }) => {
//   const symptomOptions = [
//     "None of the above",
//     "chronic pelvic pain",
//     "delayed cycle",
//     "fatigue",
//     "heavy bleeding",
//     "irregular spotting",
//     "light flow",
//     "mild cramps"
//   ];

//   return (
//     <form onSubmit={onSubmit} style={styles.form}>
//       {error && <div style={styles.error}>{error}</div>}
      
//       <div style={styles.inputRow}>
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Cycle Length (days)</label>
//           <input 
//             type="number" 
//             value={cycleLength}
//             onChange={(e) => setCycleLength(e.target.value)}
//             style={styles.input} 
//             required min="15" max="45"
//           />
//         </div>
        
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Ovulation Day</label>
//           <input 
//             type="number" 
//             value={ovulationDay}
//             onChange={(e) => setOvulationDay(e.target.value)}
//             style={styles.input} 
//             required min="1" max="35"
//           />
//         </div>
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>Primary Symptom</label>
//         <select
//           value={symptom1}
//           onChange={(e) => setSymptom1(e.target.value)}
//           style={styles.input}
//         >
//           {symptomOptions.map((opt, index) => (
//             <option key={index} value={opt}>{opt}</option>
//           ))}
//         </select>
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>Secondary Symptom</label>
//         <select
//           value={symptom2}
//           onChange={(e) => setSymptom2(e.target.value)}
//           style={styles.input}
//         >
//           {symptomOptions.map((opt, index) => (
//             <option key={index} value={opt}>{opt}</option>
//           ))}
//         </select>
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>Tertiary Symptom</label>
//         <select
//           value={symptom3}
//           onChange={(e) => setSymptom3(e.target.value)}
//           style={styles.input}
//         >
//           {symptomOptions.map((opt, index) => (
//             <option key={index} value={opt}>{opt}</option>
//           ))}
//         </select>
//       </div>

//       <button type="submit" style={styles.button} disabled={isLoading}>
//         {isLoading ? 'Analyzing...' : 'Check Irregularities'}
//       </button>
//     </form>
//   );
// };

// SymptomSelector.propTypes = {
//   isLoading: PropTypes.bool,
//   error: PropTypes.string,
//   cycleLength: PropTypes.string,
//   ovulationDay: PropTypes.string,
//   symptom1: PropTypes.string,
//   symptom2: PropTypes.string,
//   symptom3: PropTypes.string,
//   setCycleLength: PropTypes.func,
//   setOvulationDay: PropTypes.func,
//   setSymptom1: PropTypes.func,
//   setSymptom2: PropTypes.func,
//   setSymptom3: PropTypes.func,
//   onSubmit: PropTypes.func
// };

// import React from 'react';
// import PropTypes from 'prop-types';

// const SymptomSelector = ({ 
//   isLoading,
//   error,
//   formData,
//   onInputChange,
//   onSubmit
// }) => {
//   const symptomOptions = [
//     "None of the above",
//     "chronic pelvic pain",
//     "delayed cycle",
//     "fatigue",
//     "heavy bleeding",
//     "irregular spotting",
//     "light flow",
//     "mild cramps"
//   ];

//   return (
//     <form onSubmit={onSubmit} style={styles.form}>
//       {error && <div style={styles.error}>{error}</div>}
      
//       <div style={styles.inputRow}>
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Cycle Length (days)</label>
//           <input 
//             type="number" 
//             value={formData.cycleLength}
//             onChange={(e) => onInputChange('cycleLength', e.target.value)}
//             style={styles.input} 
//             required min="15" max="45"
//           />
//         </div>
        
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Ovulation Day</label>
//           <input 
//             type="number" 
//             value={formData.ovulationDay}
//             onChange={(e) => onInputChange('ovulationDay', e.target.value)}
//             style={styles.input} 
//             required min="1" max="35"
//           />
//         </div>
//       </div>

//       {[1, 2, 3].map((num) => (
//         <div key={num} style={styles.formGroup}>
//           <label style={styles.label}>Symptom {num}</label>
//           <select
//             value={formData[`symptom${num}`]}
//             onChange={(e) => onInputChange(`symptom${num}`, e.target.value)}
//             style={styles.input}
//           >
//             {symptomOptions.map((opt, index) => (
//               <option key={index} value={opt}>{opt}</option>
//             ))}
//           </select>
//         </div>
//       ))}

//       <button type="submit" style={styles.button} disabled={isLoading}>
//         {isLoading ? 'Analyzing...' : 'Check Irregularities'}
//       </button>
//     </form>
//   );
// };

// import React from 'react';
// import PropTypes from 'prop-types';

// const SymptomSelector = ({ 
//   isLoading,
//   error,
//   formData = {}, // Default empty object to prevent undefined errors
//   onInputChange,
//   onSubmit
// }) => {
//   const symptomOptions = [
//     "None of the above",
//     "chronic pelvic pain",
//     "delayed cycle",
//     "fatigue",
//     "heavy bleeding",
//     "irregular spotting",
//     "light flow",
//     "mild cramps"
//   ];

//   return (
//     <form onSubmit={onSubmit} style={styles.form}>
//       {error && <div style={styles.error}>{error}</div>}
      
//       <div style={styles.inputRow}>
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Cycle Length (days)</label>
//           <input 
//             type="number" 
//             value={formData.cycleLength || ''}
//             onChange={(e) => onInputChange('cycleLength', e.target.value)}
//             style={styles.input} 
//             required 
//             min="15" 
//             max="45"
//           />
//         </div>
        
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Ovulation Day</label>
//           <input 
//             type="number" 
//             value={formData.ovulationDay || ''}
//             onChange={(e) => onInputChange('ovulationDay', e.target.value)}
//             style={styles.input} 
//             required 
//             min="1" 
//             max="35"
//           />
//         </div>
//       </div>

//       {[1, 2, 3].map((num) => (
//         <div key={num} style={styles.formGroup}>
//           <label style={styles.label}>{`Symptom ${num}`}</label>
//           <select
//             value={formData[`symptom${num}`] || 'None of the above'}
//             onChange={(e) => onInputChange(`symptom${num}`, e.target.value)}
//             style={styles.input}
//           >
//             {symptomOptions.map((opt, index) => (
//               <option key={index} value={opt}>{opt}</option>
//             ))}
//           </select>
//         </div>
//       ))}

//       <button 
//         type="submit" 
//         style={styles.button}
//         disabled={isLoading}
//       >
//         {isLoading ? 'Analyzing...' : 'Check Irregularities'}
//       </button>
//     </form>
//   );
// };

// SymptomSelector.propTypes = {
//   isLoading: PropTypes.bool,
//   error: PropTypes.string,
//   formData: PropTypes.shape({
//     cycleLength: PropTypes.string,
//     ovulationDay: PropTypes.string,
//     symptom1: PropTypes.string,
//     symptom2: PropTypes.string,
//     symptom3: PropTypes.string
//   }),
//   onInputChange: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired
// };

// SymptomSelector.defaultProps = {
//   formData: {
//     cycleLength: '',
//     ovulationDay: '',
//     symptom1: 'None of the above',
//     symptom2: 'None of the above',
//     symptom3: 'None of the above'
//   }
// };

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
    // justifyContent: 'space-between',
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