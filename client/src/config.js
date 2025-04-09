// client/src/config.js
import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import { Link } from 'react-router-dom';

const config = {
  initialMessages: [
    createChatBotMessage('Hello! I’m Bhoomi, your maternal health assistant. How can I help you today?'),
  ],
  widgets: [
    {
      widgetName: 'ivfLink',
      widgetFunc: () => <Link to="/ivf-tracker">Go to IVF Tracker</Link>,
    },
    {
      widgetName: 'periodLink',
      widgetFunc: () => <Link to="/period-tracker">Go to Period Tracker</Link>,
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#ff69b4',
    },
    chatButton: {
      backgroundColor: '#ff69b4',
    },
  },
};

export default config;