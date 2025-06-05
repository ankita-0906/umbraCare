import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import PregnancyPostpartumTracker from './PregnancyPostpartumTracker';
import PeriodTracker from './PeriodTracker';
import IVFTracker from './IVFTracker';
import Notifications from './Notifications';
import Profile from './Profile';
import DoctorInfo from './DoctorInfo';
import Navbar from './Navbar';
import SplashScreen from './SplashScreen';
import Chatbot from './Chatbot';
import AboutUs from './AboutUs';
import Newsletter from './Newsletter';
import FertilityTreatments from './FertilityTreatments';
import NutritionTips from './NutritionTips';
import MenstrualCycle from './MenstrualCycle'; // Add this import
// import FertilityTreatments from './FertilityTreatments';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div style={styles.appContainer}>
        <Toaster position="top-right" />
        {showSplash ? (
          <SplashScreen />
        ) : (
          <>
            {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
            <Routes>
              <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/pregnancy-postpartum-tracker" element={isLoggedIn ? <PregnancyPostpartumTracker /> : <Navigate to="/" />} />
              <Route path="/period-tracker" element={isLoggedIn ? <PeriodTracker /> : <Navigate to="/" />} />
              <Route path="/ivf-tracker" element={isLoggedIn ? <IVFTracker /> : <Navigate to="/" />} />
              <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Navigate to="/" />} />
              <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
              <Route path="/about" element={isLoggedIn ? <AboutUs /> : <Navigate to="/" />} />
              <Route path="/doctor-info" element={isLoggedIn ? <DoctorInfo /> : <Navigate to="/" />} />
              <Route path="/newsletter" element={isLoggedIn ? <Newsletter /> : <Navigate to="/" />} />

              <Route path="/fertility-treatments" element={isLoggedIn ? <FertilityTreatments /> : <Navigate to="/" />} />
              <Route path="/newsletter/nutrition-tips" element={isLoggedIn ? <NutritionTips /> : <Navigate to="/" />} />
              <Route path="/newsletter/menstrual-cycle" element={isLoggedIn ? <MenstrualCycle /> : <Navigate to="/" />} /> {/* Add this route */}
            </Routes>
            {isLoggedIn && <Chatbot />}
          </>
        )}
      </div>
    </Router>
  );
};

const styles = {
  appContainer: {
    minHeight: '100vh',
    backgroundImage: `url('/background.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },
};

export default App;