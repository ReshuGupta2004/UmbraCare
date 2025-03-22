// client/src/Chatbot.js
import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const theme = {
  background: '#f5f5f5',
  fontFamily: "'Poppins', sans-serif",
  headerBgColor: '#ff8c00',
  headerFontColor: '#fff',
  headerFontSize: '20px',
  botBubbleColor: '#ff8c00',
  botFontColor: '#fff',
  userBubbleColor: '#333',
  userFontColor: '#fff',
};

const steps = [
  {
    id: '1',
    message: 'Hello! Welcome to UmbraCare. How can I assist you today?',
    trigger: 'options',
  },
  {
    id: 'options',
    options: [
      { value: 'maternal', label: 'Maternal Health', trigger: 'maternal' },
      { value: 'ivf', label: 'IVF Tracker', trigger: 'ivf' },
      { value: 'period', label: 'Period Tracker', trigger: 'period' },
      { value: 'custom', label: 'Ask a Question', trigger: 'custom-input' },
    ],
  },
  {
    id: 'maternal',
    message: 'I can help with maternal health tracking. Would you like to know about weight or blood pressure?',
    trigger: 'maternal-options',
  },
  {
    id: 'maternal-options',
    options: [
      { value: 'weight', label: 'Weight', trigger: 'maternal-weight' },
      { value: 'bp', label: 'Blood Pressure', trigger: 'maternal-bp' },
    ],
  },
  {
    id: 'maternal-weight',
    message: 'Please enter your weight in kg to track your maternal health.',
    trigger: 'options',
  },
  {
    id: 'maternal-bp',
    message: 'Please enter your blood pressure in mmHg (e.g., 120/80) to track your maternal health.',
    trigger: 'options',
  },
  {
    id: 'ivf',
    message: 'I can help with IVF tracking. Would you like to know about medication reminders or appointments?',
    trigger: 'ivf-options',
  },
  {
    id: 'ivf-options',
    options: [
      { value: 'medication', label: 'Medication Reminders', trigger: 'ivf-medication' },
      { value: 'appointment', label: 'Appointments', trigger: 'ivf-appointment' },
    ],
  },
  {
    id: 'ivf-medication',
    message: 'You can set a medication reminder in the IVF Tracker section. Would you like to go back to the main menu?',
    trigger: 'options',
  },
  {
    id: 'ivf-appointment',
    message: 'You can set an appointment date in the IVF Tracker section. Would you like to go back to the main menu?',
    trigger: 'options',
  },
  {
    id: 'period',
    message: 'I can help with period tracking. Would you like to predict your next period?',
    trigger: 'period-options',
  },
  {
    id: 'period-options',
    options: [
      { value: 'yes', label: 'Yes', trigger: 'period-start-date' },
      { value: 'no', label: 'No', trigger: 'options' },
    ],
  },
  {
    id: 'period-start-date',
    message: 'Please enter your last period start date (e.g., 2025-03-01).',
    trigger: 'period-start-date-input',
  },
  {
    id: 'period-start-date-input',
    user: true,
    validator: (value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return 'Please enter a valid date (e.g., 2025-03-01).';
      }
      return true;
    },
    trigger: 'period-end-date',
  },
  {
    id: 'period-end-date',
    message: 'Please enter your last period end date (e.g., 2025-03-05).',
    trigger: 'period-end-date-input',
  },
  {
    id: 'period-end-date-input',
    user: true,
    validator: (value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return 'Please enter a valid date (e.g., 2025-03-05).';
      }
      return true;
    },
    trigger: 'period-cycle-length',
  },
  {
    id: 'period-cycle-length',
    message: 'Please enter your cycle length in days (e.g., 28).',
    trigger: 'period-cycle-length-input',
  },
  {
    id: 'period-cycle-length-input',
    user: true,
    validator: (value) => {
      const cycleLength = parseInt(value, 10);
      if (isNaN(cycleLength) || cycleLength < 20 || cycleLength > 45) {
        return 'Please enter a valid cycle length between 20 and 45 days.';
      }
      return true;
    },
    trigger: 'period-calculate',
  },
  {
    id: 'period-calculate',
    message: ({ previousValue, steps }) => {
      const startDate = new Date(steps['period-start-date-input'].value);
      const cycleLength = parseInt(previousValue, 10);
      const nextPeriodDate = new Date(startDate);
      nextPeriodDate.setDate(startDate.getDate() + cycleLength);
      return `Based on your last period start date (${startDate.toDateString()}) and cycle length (${cycleLength} days), your next period is expected around ${nextPeriodDate.toDateString()}.`;
    },
    trigger: 'options',
  },
  {
    id: 'custom-input',
    message: 'Please type your question below.',
    trigger: 'user-input',
  },
  {
    id: 'user-input',
    user: true,
    trigger: 'custom-response',
  },
  {
    id: 'custom-response',
    message: ({ previousValue }) => {
      const userMessage = previousValue.toLowerCase();
      if (userMessage.includes('weight')) {
        return 'You can track your weight in the Maternal Tracker section under Maternal Health mode.';
      } else if (userMessage.includes('period')) {
        return 'You can predict your next period in the Period Tracker section by entering your last period start date, end date, and cycle length.';
      } else if (userMessage.includes('ivf') || userMessage.includes('medication') || userMessage.includes('appointment')) {
        return 'You can set medication reminders and appointment dates in the IVF Tracker section under Maternal Tracker.';
      } else if (userMessage.includes('chai') || userMessage.includes('tea')) {
        return 'During IVF or pregnancy, it’s best to limit caffeine intake. Drinking tea occasionally is usually fine, but consult your doctor for personalized advice.';
      } else {
        return "I'm sorry, I don't have an answer for that.";
      }
    },
    trigger: 'custom-follow-up',
  },
  {
    id: 'custom-follow-up',
    message: 'Would you like to try asking another question or go back to the main menu?',
    trigger: 'custom-follow-up-options',
  },
  {
    id: 'custom-follow-up-options',
    options: [
      { value: 'try-again', label: 'Try Another Question', trigger: 'custom-input' },
      { value: 'main-menu', label: 'Main Menu', trigger: 'options' },
    ],
  },
];

const Chatbot = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        steps={steps}
        headerTitle="UmbraCare Chatbot"
        botAvatar="https://img.icons8.com/color/48/000000/bot.png"
        userAvatar="https://img.icons8.com/color/48/000000/user.png"
        placeholder="Type your message..."
        style={{ width: '100%', height: '100%' }}
        contentStyle={{ height: 'calc(100% - 100px)' }}
        enableSmoothScroll={true}
      />
    </ThemeProvider>
  );
};

export default Chatbot;