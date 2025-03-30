// // import React, { useState, useMemo } from 'react';
// // import SymptomSelector from './SymptomSelector';

// // const DetectIrregularities = () => {
// //   // console.log('handleCheckIrregularities is:', typeof handleCheckIrregularities);
// //   const [results, setResults] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);

// //   const predictionLabels = useMemo(() => ({
// //     "0": "Normal cycle",
// //     "1": "Mild irregularity",
// //     "2": "Moderate irregularity",
// //     "3": "Severe irregularity"
// //   }), []);

// //   const handleCheckIrregularities = async (formData) => {
// //     setIsLoading(true);
// //     setError(null);
    
// //     // Validate inputs
// //     if (!formData.cycleLength || !formData.ovulationDay) {
// //       setError("Please fill in all fields");
// //       setIsLoading(false);
// //       return;
// //     }

// //     if (parseInt(formData.ovulationDay) > parseInt(formData.cycleLength)) {
// //       setError("Ovulation day cannot exceed cycle length");
// //       setIsLoading(false);
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://localhost:8000/predict', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           cycle_length: parseInt(formData.cycleLength),
// //           ovulation_day: parseInt(formData.ovulationDay),
// //           symptoms: formData.symptoms
// //         }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({}));
// //         throw new Error(errorData.detail || `Server error: ${response.status}`);
// //       }

// //       const data = await response.json();

// //       setResults({
// //         prediction: predictionLabels[data.prediction] || "Unknown prediction",
// //         confidence: `${(Number(data.confidence || 0) * 100).toFixed(1)}%`,
// //         irregularities: data.irregularities || [],
// //         inputData: formData
// //       });

// //     } catch (err) {
// //       setError(err.message || "Failed to check for irregularities");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const resetForm = () => {
// //     setResults(null);
// //     setError(null);
// //   };

// //   return (
// //     <div style={styles.container}>
// //       {isLoading && (
// //         <div style={styles.loading}>
// //           <p>Analyzing your cycle...</p>
// //         </div>
// //       )}
      
// //       {results ? (
// //         <div style={styles.resultsContainer}>
// //           <h3 style={styles.resultHeading}>Cycle Analysis Results</h3>
          
// //           {error && <div style={styles.error}>{error}</div>}
          
// //           <div style={results.prediction !== "Normal cycle" ? styles.alertWarning : styles.alertSuccess}>
// //             <h4>{results.prediction}</h4>
// //             <p>Confidence: {results.confidence}</p>
// //             <ul style={styles.reasonsList}>
// //               {results.irregularities.map((reason, index) => (
// //                 <li key={index}>{reason}</li>
// //               ))}
// //             </ul>
// //           </div>
          
// //           <h4 style={styles.inputHeading}>Your Input:</h4>
// //           <ul style={styles.inputList}>
// //             <li>Cycle Length: {results.inputData.cycleLength} days</li>
// //             <li>Ovulation Day: Day {results.inputData.ovulationDay}</li>
// //             <li>Symptoms: {results.inputData.symptoms.join(", ") || "None"}</li>
// //           </ul>
          
// //           <button 
// //             onClick={resetForm} 
// //             style={{
// //               ...styles.backButton,
// //               ...(isLoading && styles.disabledButton)
// //             }}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? 'Processing...' : 'Check Another Cycle'}
// //           </button>
// //         </div>
// //       ) : (
// //         <SymptomSelector 
// //           onCheck={handleCheckIrregularities}
// //           isLoading={isLoading}
// //           error={error}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// import React, { useState, useMemo } from 'react';
// import SymptomSelector from './SymptomSelector';

// const DetectIrregularities = () => { 
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const predictionLabels = useMemo(() => ({
//     "0": "Normal cycle",
//     "1": "Mild irregularity",
//     "2": "Moderate irregularity",
//     "3": "Severe irregularity"
//   }), []);

//   const handleCheckIrregularities = async (formData) => {
//     setIsLoading(true);
//     setError(null);
    
//     // Validate inputs
//     if (!formData.cycleLength || !formData.ovulationDay) {
//       setError("Please fill in all fields");
//       setIsLoading(false);
//       return;
//     }

//     if (parseInt(formData.ovulationDay) > parseInt(formData.cycleLength)) {
//       setError("Ovulation day cannot exceed cycle length");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           cycle_length: parseInt(formData.cycleLength),
//           ovulation_day: parseInt(formData.ovulationDay),
//           symptoms: formData.symptoms
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.detail || `Server error: ${response.status}`);
//       }

//       const data = await response.json();

//       setResults({
//         prediction: predictionLabels[data.prediction] || "Unknown prediction",
//         confidence: `${(Number(data.confidence || 0) * 100).toFixed(1)}%`,
//         irregularities: data.irregularities || [],
//         inputData: formData
//       });

//     } catch (err) {
//       setError(err.message || "Failed to check for irregularities");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setResults(null);
//     setError(null);
//   };

//   return (
//     <div style={styles.container}>
//       {isLoading && (
//         <div style={styles.loading}>
//           <p>Analyzing your cycle...</p>
//         </div>
//       )}
      
//       {results ? (
//         <div style={styles.resultsContainer}>
//           <h3 style={styles.resultHeading}>Cycle Analysis Results</h3>
          
//           {error && <div style={styles.error}>{error}</div>}
          
//           <div style={results.prediction !== "Normal cycle" ? styles.alertWarning : styles.alertSuccess}>
//             <h4>{results.prediction}</h4>
//             <p>Confidence: {results.confidence}</p>
//             <ul style={styles.reasonsList}>
//               {results.irregularities.map((reason, index) => (
//                 <li key={index}>{reason}</li>
//               ))}
//             </ul>
//           </div>
          
//           <h4 style={styles.inputHeading}>Your Input:</h4>
//           <ul style={styles.inputList}>
//             <li>Cycle Length: {results.inputData.cycleLength} days</li>
//             <li>Ovulation Day: Day {results.inputData.ovulationDay}</li>
//             <li>Symptoms: {results.inputData.symptoms.join(", ") || "None"}</li>
//           </ul>
          
//           <button 
//             onClick={resetForm} 
//             style={{
//               ...styles.backButton,
//               ...(isLoading && styles.disabledButton)
//             }}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Processing...' : 'Check Another Cycle'}
//           </button>
//         </div>
//       ) : (
//         <SymptomSelector 
//           onCheck={handleCheckIrregularities}  // Use passed prop or fallback
//           isLoading={isLoading}
//           error={error}
//         />
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '600px',
//     margin: '0 auto',
//     padding: '20px',
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//   },
//   loading: {
//     textAlign: 'center',
//     padding: '20px',
//     color: '#ff8c00',
//     backgroundColor: '#fff9e6',
//     borderRadius: '8px',
//     marginBottom: '20px'
//   },
//   resultsContainer: {
//     backgroundColor: '#f9f9f9',
//     padding: '20px',
//     borderRadius: '8px',
//     border: '1px solid #eee',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//   },
//   resultHeading: {
//     color: '#e91e63',
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   alertWarning: {
//     backgroundColor: '#fff3cd',
//     padding: '15px',
//     borderRadius: '5px',
//     marginBottom: '20px',
//     color: '#856404',
//     borderLeft: '4px solid #ffc107'
//   },
//   alertSuccess: {
//     backgroundColor: '#d4edda',
//     padding: '15px',
//     borderRadius: '5px',
//     marginBottom: '20px',
//     color: '#155724',
//     borderLeft: '4px solid #28a745'
//   },
//   error: {
//     color: '#d32f2f',
//     backgroundColor: '#fde7e7',
//     padding: '15px',
//     borderRadius: '5px',
//     marginBottom: '20px',
//     textAlign: 'center',
//     borderLeft: '4px solid #f44336'
//   },
//   reasonsList: {
//     marginLeft: '20px',
//     paddingLeft: '0',
//     lineHeight: '1.6'
//   },
//   inputHeading: {
//     marginTop: '20px',
//     marginBottom: '10px',
//     color: '#333',
//     fontSize: '18px'
//   },
//   inputList: {
//     marginLeft: '20px',
//     paddingLeft: '0',
//     listStyleType: 'none',
//     lineHeight: '1.8'
//   },
//   backButton: {
//     padding: '12px 15px',
//     backgroundColor: '#e91e63',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     marginTop: '20px',
//     width: '100%',
//     fontSize: '16px',
//     transition: 'all 0.3s ease'
//   },
//   disabledButton: {
//     opacity: 0.7,
//     cursor: 'not-allowed'
//   }
// };

// export default DetectIrregularities;


import React, { useState, useMemo } from 'react';
import SymptomSelector from './SymptomSelector';

const DetectIrregularities = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const predictionLabels = useMemo(() => ({
    "0": "Normal cycle",
    "1": "Mild irregularity",
    "2": "Moderate irregularity",
    "3": "Severe irregularity"
  }), []);

  const handleCheckIrregularities = async (formData) => {
    setIsLoading(true);
    setError(null);
    
    // Validate inputs
    if (!formData.cycleLength || !formData.ovulationDay) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (parseInt(formData.ovulationDay) > parseInt(formData.cycleLength)) {
      setError("Ovulation day cannot exceed cycle length");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cycle_length: parseInt(formData.cycleLength),
          ovulation_day: parseInt(formData.ovulationDay),
          symptoms: formData.symptoms
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      const data = await response.json();
      
      setResults({
        prediction: predictionLabels[data.prediction] || "Unknown prediction",
        confidence: `${(Number(data.confidence || 0) * 100).toFixed(1)}%`,
        irregularities: data.irregularities || [],
        inputData: formData
      });

    } catch (err) {
      setError(err.message || "Failed to check for irregularities");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div style={styles.container}>
      {isLoading && (
        <div style={styles.loading}>
          <p>Analyzing your cycle...</p>
        </div>
      )}
      
      {results ? (
        <div style={styles.resultsContainer}>
          <h3 style={styles.resultHeading}>Cycle Analysis Results</h3>
          
          {error && <div style={styles.error}>{error}</div>}
          
          <div style={results.prediction !== "Normal cycle" ? styles.alertWarning : styles.alertSuccess}>
            <h4>{results.prediction}</h4>
            <p>Confidence: {results.confidence}</p>
            <ul style={styles.reasonsList}>
              {results.irregularities.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
          
          <h4 style={styles.inputHeading}>Your Input:</h4>
          <ul style={styles.inputList}>
            <li>Cycle Length: {results.inputData.cycleLength} days</li>
            <li>Ovulation Day: Day {results.inputData.ovulationDay}</li>
            <li>Symptoms: {results.inputData.symptoms.join(", ") || "None"}</li>
          </ul>
          
          <button 
            onClick={resetForm} 
            style={{
              ...styles.backButton,
              ...(isLoading && styles.disabledButton)
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Check Another Cycle'}
          </button>
        </div>
      ) : (
        <SymptomSelector 
          onCheck={handleCheckIrregularities}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

// import React, { useState } from 'react';
// import SymptomSelector from './SymptomSelector';

// const DetectIrregularities = () => {
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     cycleLength: '',
//     ovulationDay: '',
//     symptom1: 'None of the above',
//     symptom2: 'None of the above',
//     symptom3: 'None of the above'
//   });

//   const processSymptoms = () => {
//     const symptoms = [
//       formData.symptom1,
//       formData.symptom2,
//       formData.symptom3
//     ].filter(s => s !== 'None of the above');
    
//     return symptoms.join(', ') || 'No significant symptoms';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       if (parseInt(formData.ovulationDay) > parseInt(formData.cycleLength)) {
//         throw new Error('Ovulation day cannot exceed cycle length');
//       }

//       const response = await fetch('http://localhost:8000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           cycle_length: formData.cycleLength,
//           ovulation_day: formData.ovulationDay,
//           symptoms: processSymptoms()
//         })
//       });

//       if (!response.ok) throw new Error('Prediction failed');
      
//       const data = await response.json();
//       setResults({
//         prediction: data.prediction,
//         confidence: data.confidence,
//         irregularities: data.irregularities
//       });
      
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setResults(null);
//     setFormData({
//       cycleLength: '',
//       ovulationDay: '',
//       symptom1: 'None of the above',
//       symptom2: 'None of the above',
//       symptom3: 'None of the above'
//     });
//   };

//   return (
//     <div style={styles.container}>
//       {results ? (
//         <div style={styles.results}>
//           <h3>Analysis Results</h3>
//           <p>Prediction: {results.prediction}</p>
//           <p>Confidence: {results.confidence}%</p>
//           <div>
//             {results.irregularities.map((item, index) => (
//               <div key={index}>{item}</div>
//             ))}
//           </div>
//           <button onClick={resetForm}>New Analysis</button>
//         </div>
//       ) : (
//         <SymptomSelector
//           isLoading={isLoading}
//           error={error}
//           cycleLength={formData.cycleLength}
//           ovulationDay={formData.ovulationDay}
//           symptom1={formData.symptom1}
//           symptom2={formData.symptom2}
//           symptom3={formData.symptom3}
//           setCycleLength={(v) => setFormData(prev => ({...prev, cycleLength: v}))}
//           setOvulationDay={(v) => setFormData(prev => ({...prev, ovulationDay: v}))}
//           setSymptom1={(v) => setFormData(prev => ({...prev, symptom1: v}))}
//           setSymptom2={(v) => setFormData(prev => ({...prev, symptom2: v}))}
//           setSymptom3={(v) => setFormData(prev => ({...prev, symptom3: v}))}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   );
// };
// import React, { useState } from 'react';
// import SymptomSelector from './SymptomSelector';

// const DetectIrregularities = () => {
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     cycleLength: '',
//     ovulationDay: '',
//     symptom1: 'None of the above',
//     symptom2: 'None of the above',
//     symptom3: 'None of the above'
//   });

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const processSymptoms = () => {
//     const symptoms = [
//       formData.symptom1,
//       formData.symptom2,
//       formData.symptom3
//     ].filter(s => s !== 'None of the above');
    
//     return symptoms.length > 0 ? symptoms.join(', ') : 'No significant symptoms';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       // Validation
//       if (!formData.cycleLength || !formData.ovulationDay) {
//         throw new Error('Please fill in all required fields');
//       }
//       if (parseInt(formData.ovulationDay) > parseInt(formData.cycleLength)) {
//         throw new Error('Ovulation day cannot exceed cycle length');
//       }

//       // API call
//       const response = await fetch('http://localhost:8000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           cycle_length: formData.cycleLength,
//           ovulation_day: formData.ovulationDay,
//           symptoms: processSymptoms()
//         })
//       });

//       if (!response.ok) throw new Error('Prediction failed');
      
//       const data = await response.json();
//       setResults(data);
      
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setResults(null);
//     setFormData({
//       cycleLength: '',
//       ovulationDay: '',
//       symptom1: 'None of the above',
//       symptom2: 'None of the above',
//       symptom3: 'None of the above'
//     });
//   };

//   return (
//     <div style={styles.container}>
//       {results ? (
//         <div style={styles.results}>
//           <h3>Analysis Results</h3>
//           <p>Prediction: {results.prediction}</p>
//           <p>Confidence: {results.confidence}%</p>
//           <ul>
//             {results.irregularities?.map((item, i) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>
//           <button onClick={resetForm} style={styles.button}>
//             New Analysis
//           </button>
//         </div>
//       ) : (
//         <SymptomSelector
//           isLoading={isLoading}
//           error={error}
//           formData={formData}
//           onInputChange={handleInputChange}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   );
// };

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    color: '#ff8c00',
    backgroundColor: '#fff9e6',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  resultsContainer: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #eee',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  resultHeading: {
    color: '#e91e63',
    textAlign: 'center',
    marginBottom: '20px',
  },
  alertWarning: {
    backgroundColor: '#fff3cd',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px',
    color: '#856404',
    borderLeft: '4px solid #ffc107'
  },
  alertSuccess: {
    backgroundColor: '#d4edda',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px',
    color: '#155724',
    borderLeft: '4px solid #28a745'
  },
  error: {
    color: '#d32f2f',
    backgroundColor: '#fde7e7',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px',
    textAlign: 'center',
    borderLeft: '4px solid #f44336'
  },
  reasonsList: {
    marginLeft: '20px',
    paddingLeft: '0',
    lineHeight: '1.6'
  },
  inputHeading: {
    marginTop: '20px',
    marginBottom: '10px',
    color: '#333',
    fontSize: '18px'
  },
  inputList: {
    marginLeft: '20px',
    paddingLeft: '0',
    listStyleType: 'none',
    lineHeight: '1.8'
  },
  backButton: {
    padding: '12px 15px',
    backgroundColor: '#e91e63',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
    fontSize: '16px',
    transition: 'all 0.3s ease'
  },
  disabledButton: {
    opacity: 0.7,
    cursor: 'not-allowed'
  }
};
  
export default DetectIrregularities;