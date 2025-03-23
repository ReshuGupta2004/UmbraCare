// client/src/Chatbot.js
import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import { FaRobot } from 'react-icons/fa';

const ChatbotComponent = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div style={styles.chatbotContainer}>
      {showChatbot && (
        <div style={styles.chatbot}>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        style={styles.chatbotButton}
      >
        <FaRobot size={30} />
      </button>
    </div>
  );
};

const styles = {
  chatbotContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  },
  chatbot: {
    width: '300px',
    height: '400px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  chatbotButton: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
};

export default ChatbotComponent;