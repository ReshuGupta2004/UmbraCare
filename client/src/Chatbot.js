// client/src/Chatbot.js
import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa'; // Using a robot icon from react-icons

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.chatbotContainer}>
      {isOpen && (
        <div style={styles.chatbotWindow}>
          <h3 style={styles.chatbotHeading}>UmbraCare Chatbot</h3>
          <p style={styles.chatbotText}>Hello! How can I assist you today?</p>
          {/* Add chatbot functionality here later */}
          <button onClick={toggleChatbot} style={styles.closeButton}>Close</button>
        </div>
      )}
      <div style={styles.chatbotIcon} onClick={toggleChatbot}>
        <FaRobot size={30} />
      </div>
    </div>
  );
};

const styles = {
  chatbotContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000, // Ensure it appears above other elements
  },
  chatbotIcon: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '15px',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatbotWindow: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '300px',
    maxHeight: '400px',
    overflowY: 'auto',
    marginBottom: '10px',
    border: '2px solid #ff8c00',
  },
  chatbotHeading: {
    fontSize: '20px',
    color: '#ff8c00',
    marginBottom: '10px',
    fontWeight: '600',
  },
  chatbotText: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '15px',
  },
  closeButton: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Chatbot;