// client/src/PeriodTracker.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const PeriodTracker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState('');
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [periodEntries, setPeriodEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentEntryId, setCurrentEntryId] = useState(null);

  useEffect(() => {
    fetchPeriodEntries();
  }, []);

  const fetchPeriodEntries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/period-tracker`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setPeriodEntries(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching period entries:', err.response?.data || err.message);
      setError(`Error fetching period entries: ${err.response?.data?.msg || err.message}`);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      const periodData = {
        startDate,
        endDate
      };

      if (editMode && currentEntryId) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/period-tracker/${currentEntryId}`, periodData, {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        });
        toast.success('Period entry updated successfully!');
        setEditMode(false);
        setCurrentEntryId(null);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/period-tracker`, periodData, {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        });
        toast.success('Period entry added successfully!');
      }
      
      fetchPeriodEntries();
      setStartDate(new Date());
      setEndDate(null);

      // Calculate next period
      const nextPeriod = new Date(startDate);
      nextPeriod.setDate(startDate.getDate() + parseInt(cycleLength));
      setResult(`Your next period is expected around ${nextPeriod.toDateString()}.`);
    } catch (err) {
      console.error('Error saving period entry:', err.response?.data || err.message);
      toast.error(`Error: ${err.response?.data?.msg || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/period-tracker/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });

      toast.success('Period entry deleted successfully!');
      fetchPeriodEntries();
    } catch (err) {
      console.error('Error deleting period entry:', err.response?.data || err.message);
      toast.error(`Error: ${err.response?.data?.msg || err.message}`);
    }
  };

  const handleEdit = (entry) => {
    setStartDate(new Date(entry.startDate));
    setEndDate(entry.endDate ? new Date(entry.endDate) : null);
    setEditMode(true);
    setCurrentEntryId(entry._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.trackerContainer}>
        <h2 style={styles.heading}>Period Tracker</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Period Start Date:</label>
            <div style={styles.calendarInput}>
              <input
                type="text"
                value={startDate ? startDate.toDateString() : ''}
                readOnly
                style={styles.input}
              />
              <FaCalendarAlt
                onClick={() => setShowStartCalendar(!showStartCalendar)}
                style={styles.calendarIcon}
              />
              {showStartCalendar && (
                <Calendar
                  onChange={(date) => {
                    setStartDate(date);
                    setShowStartCalendar(false);
                  }}
                  value={startDate}
                  style={styles.calendar}
                />
              )}
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Period End Date (optional):</label>
            <div style={styles.calendarInput}>
              <input
                type="text"
                value={endDate ? endDate.toDateString() : ''}
                readOnly
                style={styles.input}
              />
              <FaCalendarAlt
                onClick={() => setShowEndCalendar(!showEndCalendar)}
                style={styles.calendarIcon}
              />
              {showEndCalendar && (
                <Calendar
                  onChange={(date) => {
                    setEndDate(date);
                    setShowEndCalendar(false);
                  }}
                  value={endDate}
                  style={styles.calendar}
                />
              )}
            </div>
          </div>
          {/* <div style={styles.formGroup}>
            <label style={styles.label}>Cycle Length (days):</label>
            <input
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              style={styles.input}
              min="21"
              max="35"
              required
            />
          </div> */}
          <button type="submit" style={styles.button}>
            {editMode ? 'Update Period' : 'Track Period'}
          </button>
          {editMode && (
            <button 
              type="button" 
              onClick={() => {
                setEditMode(false);
                setCurrentEntryId(null);
                setStartDate(new Date());
                setEndDate(null);
              }}
              style={styles.cancelButton}
            >
              Cancel Edit
            </button>
          )}
        </form>
        {result && <p style={styles.result}>{result}</p>}

        <div style={styles.entriesSection}>
          <h3 style={styles.subHeading}>Your Period History</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={styles.error}>{error}</p>
          ) : periodEntries.length === 0 ? (
            <p>No period entries found. Start tracking your periods!</p>
          ) : (
            <ul style={styles.entriesList}>
              {periodEntries.map((entry) => (
                <li key={entry._id} style={styles.entryItem}>
                  <div>
                    <strong>Start:</strong> {new Date(entry.startDate).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                    {entry.endDate && (
                      <span> | <strong>End:</strong> {new Date(entry.endDate).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    )}
                  </div>
                  <div style={styles.actionButtons}>
                    <button 
                      onClick={() => handleEdit(entry)} 
                      style={styles.editButton}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(entry._id)} 
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }} 
      />
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
  subHeading: {
    fontSize: '22px',
    color: '#ff8c00',
    marginTop: '30px',
    marginBottom: '15px',
    fontWeight: '500',
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
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
  },
  calendarInput: {
    position: 'relative',
    width: '100%',
  },
  calendarIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#ff8c00',
    fontSize: '20px',
  },
  calendar: {
    position: 'absolute',
    zIndex: 1000,
    top: '100%',
    left: 0,
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
  },
  cancelButton: {
    backgroundColor: '#999',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  },
  result: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#333',
  },
  entriesSection: {
    marginTop: '30px',
    textAlign: 'left',
  },
  entriesList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  entryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
    marginBottom: '5px',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  error: {
    color: '#ff4d4d',
    marginTop: '10px',
  },
};

export default PeriodTracker;