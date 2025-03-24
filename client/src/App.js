import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios'; // Add this import
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import PregnancyPostpartumTracker from './PregnancyPostpartumTracker';
import PeriodTracker from './PeriodTracker';
import IVFTracker from './IVFTracker';
import UserProfile from './UserProfile';
import Chatbot from './Chatbot';
import DoctorInfo from './DoctorInfo';
import Notifications from './Notifications';
import Layout from './Layout';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await axios.get('http://localhost:5000/api/users/me', {
            headers: { 'x-auth-token': token },
          });
          setIsLoggedIn(true);
        } catch (err) {
          console.error('Token validation failed:', err.response?.data);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }
      }
    };
    validateToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <Layout setIsLoggedIn={setIsLoggedIn}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/pregnancy-postpartum-tracker" element={<PregnancyPostpartumTracker />} />
                  <Route path="/period-tracker" element={<PeriodTracker />} />
                  <Route path="/ivf-tracker" element={<IVFTracker />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="/doctor-info" element={<DoctorInfo />} />
                  <Route path="/notifications" element={<Notifications />} />
                </Routes>
              </Layout>
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;