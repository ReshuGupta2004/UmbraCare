import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import TrackPeriodLength from './TrackPeriodLength';
import DetectIrregularities from './SymptomSelector';

const PeriodTracker = () => {
  const [activeTab, setActiveTab] = useState('track');

  return (
    <div style={styles.container}>
      <div style={styles.trackerContainer}>
        <h2 style={styles.heading}>Period Tracker</h2>
        
        <div style={styles.tabContainer}>
          <button 
            style={{ ...styles.tabButton, ...(activeTab === 'track' && styles.activeTab) }}
            onClick={() => setActiveTab('track')}
          >
            Track Period Length
          </button>
          <button 
            style={{ ...styles.tabButton, ...(activeTab === 'irregularities' && styles.activeTab) }}
            onClick={() => setActiveTab('irregularities')}
          >
            Detect Cycle Irregularities
          </button>
        </div>

        {activeTab === 'track' ? <TrackPeriodLength /> : <DetectIrregularities />}
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
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  tabButton: {
    padding: '10px 15px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  activeTab: {
    backgroundColor: '#ff8c00',
    color: 'white',
  },
};

export default PeriodTracker;