// client/src/Layout.js
import React from 'react';
import Navbar from './Navbar';
import Chatbot from './Chatbot';
import backgroundImage from './background.jpg';

const Layout = ({ children, setIsLoggedIn }) => {
  return (
    <div style={styles.container}>
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      <div style={styles.content}>{children}</div>
      <Chatbot />
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: '40% 60%',
    backgroundRepeat: 'no-repeat',
    fontFamily: "'Poppins', sans-serif",
    boxSizing: 'border-box',
  },
  content: {
    padding: '20px',
    paddingTop: '80px',
  },
};

export default Layout;