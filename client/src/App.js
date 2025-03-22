// client/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import MaternalTracker from './MaternalTracker';
import PeriodTracker from './PeriodTracker';
import IVFTracker from './IVFTracker';
import Notifications from './Notifications';
import UserProfile from './UserProfile';
import Chatbot from './Chatbot';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <Router>
      <div style={{ position: 'relative' }}>
        {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/maternal-tracker" element={isLoggedIn ? <MaternalTracker /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/period-tracker" element={isLoggedIn ? <PeriodTracker /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/ivf-tracker" element={isLoggedIn ? <IVFTracker /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={isLoggedIn ? <UserProfile /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
        {isLoggedIn && (
          <>
            <button onClick={toggleChatbot} style={styles.chatbotButton}>
              <FaRobot size={30} />
            </button>
            <div style={{
              ...styles.chatbotPanel,
              transform: isChatbotOpen ? 'translateX(0)' : 'translateX(100%)',
            }}>
              <button onClick={toggleChatbot} style={styles.closeButton}>Close</button>
              <Chatbot />
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

const styles = {
  chatbotButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#ff8c00',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
  chatbotPanel: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '300px',
    height: '100%',
    backgroundColor: '#fff',
    boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 999,
    padding: '20px',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  closeButton: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
};

export default App;