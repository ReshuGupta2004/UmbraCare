import React from 'react';
import DetectIrregularities from './DetectIrregularities';

// function ParentComponent() {
//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Menstrual Cycle Irregularity Detection</h1>
//       <div style={styles.content}>
//         <DetectIrregularities />
//       </div>
//     </div>
//   );
// }

function ParentComponent() {
    return (
      <div style={styles.container}>
        <h1>Menstrual Cycle Symptom Checker</h1>
        <DetectIrregularities />
      </div>
    );
  }

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    color: '#e91e63',
    textAlign: 'center',
    marginBottom: '30px',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
};

export default ParentComponent;