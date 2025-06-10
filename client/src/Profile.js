// client/src/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    medicalHistory: '',
    menstrualHistory: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found. Please log in again.');

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, {
          headers: { 'x-auth-token': token },
        });
        setUser(response.data);
        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          medicalHistory: response.data.medicalHistory || '',
          menstrualHistory: response.data.menstrualHistory || '',
        });
      } catch (err) {
        console.error('Error fetching user profile:', err.response?.data || err.message);
        setError(`Error fetching profile: ${err.response?.data?.msg || err.message}`);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/me`,
        formData,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      setUser(response.data);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000); // Clear success message after 3 seconds
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message);
      setError(`Error updating profile: ${err.response?.data?.msg || err.message}`);
    }
  };

  if (!user && error) return <div style={styles.container}>{error}</div>;
  if (!user) return <div style={styles.container}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.profileContainer}>
        <h2 style={styles.heading}>User Profile</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        {!isEditing ? (
          <div style={styles.viewMode}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                value={user.name || 'Not provided'}
                readOnly
                style={styles.readOnlyInput}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                value={user.email || 'Not provided'}
                readOnly
                style={styles.readOnlyInput}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Medical History:</label>
              <textarea
                value={user.medicalHistory || 'e.g., Allergies, past surgeries, chronic conditions...'}
                readOnly
                style={{
                  ...styles.readOnlyTextarea,
                  color: user.medicalHistory ? '#333' : '#999',
                }}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Menstrual History:</label>
              <textarea
                value={user.menstrualHistory || 'e.g., Average cycle length, last period date, any irregularities...'}
                readOnly
                style={{
                  ...styles.readOnlyTextarea,
                  color: user.menstrualHistory ? '#333' : '#999',
                }}
              />
            </div>
            <button onClick={() => setIsEditing(true)} style={styles.button}>Update Profile</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Medical History:</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                style={styles.textarea}
                placeholder="e.g., Any allergies, chronic conditions, or past surgeries"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Menstrual History:</label>
              <textarea
                name="menstrualHistory"
                value={formData.menstrualHistory}
                onChange={handleChange}
                style={styles.textarea}
                placeholder="e.g., Average cycle length, last period date, any irregularities"
              />
            </div>
            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.button}>Save Changes</button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
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
    boxSizing: 'border-box',
    paddingTop: '80px', // To account for the fixed navbar
  },
  profileContainer: {
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
  viewMode: {
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5px',
  },
  label: {
    fontSize: '16px',
    color: '#333',
    fontWeight: '500',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
  },
  readOnlyInput: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#f9f9f9', // Light gray background to indicate read-only
    color: '#333',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '100px',
  },
  readOnlyTextarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '100px',
    backgroundColor: '#f9f9f9', // Light gray background to indicate read-only
  },
  button: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%', // Full-width button to match screenshot
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#333',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginLeft: '10px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  error: {
    fontSize: '16px',
    color: 'red',
    marginBottom: '20px',
  },
  success: {
    fontSize: '16px',
    color: '#4caf50',
    marginBottom: '20px',
  },
};

export default Profile;