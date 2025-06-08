// // client/src/PregnancyPostpartumTracker.js
// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import axios from 'axios';
// import { Toaster } from "react-hot-toast";
// import { toast } from "react-hot-toast";
// import { FaCalendarAlt } from 'react-icons/fa';

// const PregnancyPostpartumTracker = () => {
//   const [mode, setMode] = useState('pregnancy');
//   const [week, setWeek] = useState('');
//   const [deliveryDate, setDeliveryDate] = useState(new Date());
//   const [showDeliveryCalendar, setShowDeliveryCalendar] = useState(false);
//   const [menopauseSymptoms, setMenopauseSymptoms] = useState('');
//   const [medication, setMedication] = useState('');
//   const [appointment, setAppointment] = useState('');
//   const [showAppointmentCalendar, setShowAppointmentCalendar] = useState(false); 
//   const [result, setResult] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [healthData, setHealthData] = useState({
//     Age: "",
//     SystolicBP: "",
//     DiastolicBP: "",
//     BS: "",
//     BodyTemp: "",
//     HeartRate: "",
//     Week: ""
//   });

//   useEffect(() => {
//     const subscriptionStatus = localStorage.getItem('isSubscribed');
//     setIsSubscribed(subscriptionStatus === 'true');
//   }, []);

//   const handlePregnancySubmit = (e) => {
//     e.preventDefault();
//     if (!week) {
//       setResult('Please enter the current week of pregnancy.');
//       return;
//     }
//     const fetalInsights = getFetalDevelopmentInsights(parseInt(week));
//     setResult(`Week ${week}: ${fetalInsights}`);
//   };

//   const handlePostpartumSubmit = (e) => {
//     e.preventDefault();
//     const today = new Date('2025-03-22');
//     const diffTime = Math.abs(today - deliveryDate);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     const weeksSinceDelivery = Math.floor(diffDays / 7);
//     const firstPeriodEstimate = 6 + weeksSinceDelivery;
//     setResult(`Based on your delivery date (${deliveryDate.toDateString()}), you are ${weeksSinceDelivery} weeks postpartum. Your first period is expected around ${firstPeriodEstimate} weeks postpartum.`);
//   };

//   const handleMenopauseSubmit = (e) => {
//     e.preventDefault();
//     if (!menopauseSymptoms) {
//       setResult('Please enter your symptoms.');
//       return;
//     }
//     const guidance = getMenopauseGuidance(menopauseSymptoms.toLowerCase());
//     setResult(`Symptoms: ${menopauseSymptoms}. Guidance: ${guidance}`);
//   };

//   const handleMedicationSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No token found. Please log in again.');

//       await axios.post(
//         '${process.env.BACKEND_URL}/api/notifications',
//         { type: 'medication_reminder', message: `Medication Reminder: ${medication}` },
//         { headers: { 'x-auth-token': token } }
//       );
//       await axios.post(
//         '${process.env.BACKEND_URL}/api/notifications',
//         { type: 'appointment_reminder', message: `Next Appointment: ${appointment}` },
//         { headers: { 'x-auth-token': token } }
//       );
//       setResult(`Medication Reminder: ${medication}\nNext Appointment: ${appointment}`);
//       setShowPopup(true);
//       toast.success('Reminder added successfully!');
//       setTimeout(() => setShowPopup(false), 3000);
//     } catch (err) {
//       console.error('Error saving data:', err.response?.data || err.message);
//       setResult(`Error saving data: ${err.response?.data?.msg || err.message}`);
//       toast.error('Error saving data!');
//     }
//   };

//   const handleHealthDataChange = (e) => {
//     const { name, value } = e.target;
//     setHealthData({
//       ...healthData,
//       [name]: parseFloat(value) || 0
//     });
//   };

// const handleHealthDataSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("No token found. Please log in again.");

//     const response = await axios.post(
//       "https://pregnancy-model-api.onrender.com/predict",
//       healthData,
//       { headers: { "Content-Type": "application/json", "x-auth-token": token } }
//     );

//     setResult(`Risk Level: ${response.data.risk}`);
//     setShowPopup(true);
//     setTimeout(() => setShowPopup(false), 3000);
//   } catch (err) {
//     console.error("Error predicting health data:", err.response?.data || err.message);
//     setResult(`Error: ${err.response?.data?.detail || err.message}`);
//   }
// };


//   const getFetalDevelopmentInsights = (week) => {
//     if (week >= 1 && week <= 4) return 'Your baby is a tiny embryo, forming the neural tube and heart.';
//     if (week >= 5 && week <= 8) return 'Your babys major organs are forming, and the heart begins to beat.';
//     if (week >= 9 && week <= 12) return 'Your baby is now a fetus, with facial features and limbs developing.';
//     if (week >= 13 && week <= 16) return 'Your baby can make facial expressions and may start sucking their thumb.';
//     if (week >= 17 && week <= 20) return 'You might feel your babys first movements, and they can hear sounds.';
//     if (week >= 21 && week <= 24) return 'Your babys lungs are developing, and they are practicing breathing movements.';
//     if (week >= 25 && week <= 28) return 'Your babys eyes can open, and they are gaining more fat.';
//     if (week >= 29 && week <= 32) return 'Your babys brain is growing rapidly, and they are getting ready for birth.';
//     if (week >= 33 && week <= 36) return 'Your baby is gaining weight and preparing for delivery.';
//     if (week >= 37 && week <= 40) return 'Your baby is full-term and ready to meet you!';
//     return 'Please enter a valid week (1-40).';
//   };

//   const getMenopauseGuidance = (symptoms) => {
//     if (symptoms.includes('hot flashes')) return 'Try to stay cool, wear light clothing, and avoid triggers like spicy foods.';
//     if (symptoms.includes('mood swings')) return 'Practice stress-relief techniques like meditation or yoga, and consider talking to a therapist.';
//     if (symptoms.includes('sleep issues')) return 'Establish a bedtime routine, avoid caffeine, and create a calming sleep environment.';
//     return 'Consult a doctor for personalized advice on managing your symptoms.';
//   };

  

//   return (
//     <div style={styles.container}>
//       <div style={styles.trackerContainer}>
//         <h2 style={styles.heading}>Pregnancy & Postpartum Tracker</h2>
//         <div style={styles.toggleContainer}>
//           <button onClick={() => setMode('pregnancy')} style={{ ...styles.toggleButton, backgroundColor: mode === 'pregnancy' ? '#ff8c00' : '#ccc' }}>Pregnancy</button>
//           <button onClick={() => setMode('postpartum')} style={{ ...styles.toggleButton, backgroundColor: mode === 'postpartum' ? '#ff8c00' : '#ccc' }}>Postpartum</button>
//           <button onClick={() => setMode('medication')} style={{ ...styles.toggleButton, backgroundColor: mode === 'medication' ? '#ff8c00' : '#ccc' }}>Medication Reminder</button>
//           <button onClick={() => setMode('menopause')} style={{ ...styles.toggleButton, backgroundColor: mode === 'menopause' ? '#ff8c00' : '#ccc' }}>Menopause Insights</button>
//           {isSubscribed && (
//             <button onClick={() => setMode('health-data')} style={{ ...styles.toggleButton, backgroundColor: mode === 'health-data' ? '#ff8c00' : '#ccc' }}>Health Data</button>
//           )}
//         </div>

//         {mode === 'pregnancy' && (
//           <form onSubmit={handlePregnancySubmit} style={styles.form}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Current Week of Pregnancy:</label>
//               <input type="number" value={week} onChange={(e) => setWeek(e.target.value)} style={styles.input} placeholder="e.g., 12" min="1" max="40" required />
//             </div>
//             <button type="submit" style={styles.button}>Get Insights</button>
//           </form>
//         )}

//         {mode === 'postpartum' && (
//           <form onSubmit={handlePostpartumSubmit} style={styles.form}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Delivery Date:</label>
//               <div style={styles.calendarInputContainer}>
//                 <input
//                   type="text"
//                   value={deliveryDate.toDateString()}
//                   readOnly
//                   style={styles.input}
//                   placeholder="Select delivery date"
//                 />
//                 <FaCalendarAlt
//                   style={styles.calendarIcon}
//                   onClick={() => setShowDeliveryCalendar(!showDeliveryCalendar)}
//                 />
//               </div>
//               {showDeliveryCalendar && (
//                 <Calendar onChange={(date) => { setDeliveryDate(date); setShowDeliveryCalendar(false); }} value={deliveryDate} style={styles.calendar} />
//               )}
//             </div>
//             <button type="submit" style={styles.button}>Track Recovery</button>
//           </form>
//         )}

//         {mode === 'medication' && (
//           <form onSubmit={handleMedicationSubmit} style={styles.form}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Medication Reminder:</label>
//               <input type="text" value={medication} onChange={(e) => setMedication(e.target.value)} style={styles.input} placeholder="e.g., Take Follicle Stimulating Hormone at 8 AM" required />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Next Appointment:</label>
//               <div style={styles.calendarInputContainer}>
//                 <input
//                   type="text"
//                   value={appointment}
//                   readOnly
//                   style={styles.input}
//                   placeholder="Select appointment date"
//                 />
//                 <FaCalendarAlt
//                   style={styles.calendarIcon}
//                   onClick={() => setShowAppointmentCalendar(!showAppointmentCalendar)}
//                 />
//               </div>
//               {showAppointmentCalendar && (
//                 <Calendar
//                   onChange={(date) => {
//                     setAppointment(date.toDateString());
//                     setShowAppointmentCalendar(false);
//                   }}
//                   value={appointment ? new Date(appointment) : new Date()}
//                   style={styles.calendar}
//                 />
//               )}
//             </div>
//             <button type="submit" style={styles.button}>Set Reminder</button>
//           </form>
//         )}

//         {mode === 'menopause' && (
//           <form onSubmit={handleMenopauseSubmit} style={styles.form}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Symptoms (e.g., hot flashes, mood swings):</label>
//               <textarea value={menopauseSymptoms} onChange={(e) => setMenopauseSymptoms(e.target.value)} style={styles.textarea} placeholder="Enter your symptoms here..." required />
//             </div>
//             <button type="submit" style={styles.button}>Get Guidance</button>
//           </form>
//         )}

//         {mode === 'health-data' && isSubscribed && (
//           <form onSubmit={handleHealthDataSubmit} style={styles.form}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Age:</label>
//               <input type="number" name="Age" value={healthData.Age} onChange={handleHealthDataChange} style={styles.input} min="0" />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Systolic BP:</label>
//               <input type="number" name="SystolicBP" value={healthData.SystolicBP} onChange={handleHealthDataChange} style={styles.input} min="0" />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Diastolic BP:</label>
//               <input type="number" name="DiastolicBP" value={healthData.DiastolicBP} onChange={handleHealthDataChange} style={styles.input} min="0" />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Blood Sugar:</label>
//               <input type="number" name="BS" value={healthData.BS} onChange={handleHealthDataChange} style={styles.input} min="0" />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Body Temperature:</label>
//               <input type="number" name="BodyTemp" value={healthData.BodyTemp} onChange={handleHealthDataChange} style={styles.input} min="0" step="0.1" />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Heart Rate:</label>
//               <input type="number" name="HeartRate" value={healthData.HeartRate} onChange={handleHealthDataChange} style={styles.input} min="0" />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Pregnancy Week:</label>
//               <input type="number" name="Week" value={healthData.Week} onChange={handleHealthDataChange} style={styles.input} min="0" max="40" />
//             </div>
//             <button type="submit" style={styles.button}>Submit Health Data</button>
//           </form>
//         )}

//         {result && <p style={styles.result}>{result}</p>}
//         {showPopup && (
//           <div style={styles.popup}>
//             <p>Reminder added successfully!</p>
//           </div>
//         )}
//       </div>
//       <Toaster 
//   position="top-right"
//   reverseOrder={false}
//   toastOptions={{
//     style: {
//       zIndex: 9999,
//     },
//   }} />
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     fontFamily: "'Poppins', sans-serif",
//     boxSizing: 'border-box',
//   },
//   trackerContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     padding: '40px',
//     borderRadius: '10px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     textAlign: 'center',
//     border: '2px solid #ff8c00',
//     width: '100%',
//     maxWidth: '600px',
//   },
//   heading: {
//     fontSize: '28px',
//     color: '#ff8c00',
//     marginBottom: '20px',
//     fontWeight: '600',
//   },
//   toggleContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     gap: '10px',
//     marginBottom: '20px',
//     flexWrap: 'nowrap',
//     overflowX: 'auto',
//     whiteSpace: 'nowrap',
//   },
//   toggleButton: {
//     padding: '8px 12px',
//     fontSize: '14px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//     flexShrink: 0,
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     gap: '5px',
//   },
//   label: {
//     fontSize: '16px',
//     color: '#333',
//   },
//   input: {
//     padding: '10px',
//     fontSize: '16px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     width: '100%',
//     boxSizing: 'border-box',
//   },
//   textarea: {
//     padding: '10px',
//     fontSize: '16px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     width: '100%',
//     boxSizing: 'border-box',
//     minHeight: '100px',
//   },
//   calendar: {
//     width: '100%',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//   },
//   calendarInputContainer: {
//     position: 'relative',
//     width: '100%',
//   },
//   calendarIcon: {
//     position: 'absolute',
//     right: '10px',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     fontSize: '20px',
//     color: '#ff8c00',
//     cursor: 'pointer',
//   },
//   button: {
//     backgroundColor: '#ff8c00',
//     color: '#fff',
//     padding: '10px 20px',
//     fontSize: '16px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//     textDecoration: 'none',
//     textAlign: 'center',
//   },
//   result: {
//     marginTop: '20px',
//     fontSize: '16px',
//     color: '#333',
//   },
//   popup: {
//     position: 'fixed',
//     top: '20px',
//     right: '20px',
//     backgroundColor: '#4caf50',
//     color: '#fff',
//     padding: '10px 20px',
//     borderRadius: '5px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//     zIndex: 1000,
//   },
// };

// export default PregnancyPostpartumTracker;


import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { FaCalendarAlt } from 'react-icons/fa';

const PregnancyPostpartumTracker = () => {
  const [mode, setMode] = useState('pregnancy');
  const [week, setWeek] = useState('');
  const [age, setAge] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [diastolicBP, setDiastolicBP] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [bodyTemp, setBodyTemp] = useState('');
  const [heartRate, setHeartRate] = useState('');

  // const [week, setWeek] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showDeliveryCalendar, setShowDeliveryCalendar] = useState(false);
  const [menopauseSymptoms, setMenopauseSymptoms] = useState('');
  const [medication, setMedication] = useState('');
  const [appointment, setAppointment] = useState('');
  const [showAppointmentCalendar, setShowAppointmentCalendar] = useState(false); // State for appointment calendar
  const [result, setResult] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // const handlePregnancySubmit = (e) => {
  //   e.preventDefault();
  //   if (!week) {
  //     setResult('Please enter the current week of pregnancy.');
  //     return;
  //   }
  //   const fetalInsights = getFetalDevelopmentInsights(parseInt(week));
  //   setResult(`Week ${week}: ${fetalInsights}`);
  // };
  // const handlePregnancySubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!week) {
  //     setResult('Please enter the current week of pregnancy.');
  //     return;
  //   }
  
  //   // Optionally show fetal development
  //   const fetalInsights = getFetalDevelopmentInsights(parseInt(week));
  //   setResult(`Week ${week}: ${fetalInsights}`);
  
  //   // 👇 Send POST request to your FastAPI model
  //   try {
  //     const response = await fetch("http://localhost:8002/predict", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         Age: parseFloat(age),
  //         SystolicBP: parseFloat(systolicBP),
  //         DiastolicBP: parseFloat(diastolicBP),
  //         BS: parseFloat(bloodSugar),
  //         BodyTemp: parseFloat(bodyTemp),
  //         HeartRate: parseFloat(heartRate),
  //         Week: parseInt(week) // optional, not used in model
  //       })
  //     });
  
  //     const data = await response.json();
  
  //     if (data.risk) {
  //       setResult(prev => `${prev}\nPredicted Risk Level: ${data.risk}`);
  //     } else {
  //       setResult("Prediction failed. Please try again.");
  //     }
  
  //   } catch (error) {
  //     console.error("Error calling API:", error);
  //     setResult("Error: Could not connect to the prediction service.");
  //   }
  // };
  const handlePregnancySubmit = async (e) => {
    e.preventDefault();
  
    if (!week) {
      setResult("Please enter the current week of pregnancy.");
      return;
    }
  
    const fetalInsights = getFetalDevelopmentInsights(parseInt(week));
    setResult(`Week ${week}: ${fetalInsights}`);
  
    try {
      const response = await fetch("https://pregnancy-model-api.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: parseFloat(age),
          systolic_bp: parseFloat(systolicBP),
          diastolic_bp: parseFloat(diastolicBP),
          blood_glucose: parseFloat(bloodSugar) / 10,
          body_temp: parseFloat(bodyTemp),
          heart_rate: parseFloat(heartRate),
          week: parseInt(week)
        })
      });
  
      const data = await response.json();
      console.log("Full API Response:", data);
  
      if (data && data.risk !== undefined) {
        setResult(prev => `${prev}\nPredicted Risk Level: ${data.risk}`);
      } else {
        setResult(`Prediction failed. API response: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Error calling API:", error);
      setResult("Error: Could not connect to the prediction service.");
    }
  };
  
  

  const handlePostpartumSubmit = (e) => {
    e.preventDefault();
    const today = new Date('2025-03-22');
    const diffTime = Math.abs(today - deliveryDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeksSinceDelivery = Math.floor(diffDays / 7);
    const firstPeriodEstimate = 6 + weeksSinceDelivery;
    setResult(`Based on your delivery date (${deliveryDate.toDateString()}), you are ${weeksSinceDelivery} weeks postpartum. Your first period is expected around ${firstPeriodEstimate} weeks postpartum.`);
  };

  const handleMenopauseSubmit = (e) => {
    e.preventDefault();
    if (!menopauseSymptoms) {
      setResult('Please enter your symptoms.');
      return;
    }
    const guidance = getMenopauseGuidance(menopauseSymptoms.toLowerCase());
    setResult(`Symptoms: ${menopauseSymptoms}. Guidance: ${guidance}`);
  };

  const handleMedicationSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in again.');

      await axios.post(
        `${process.env.BACKEND_URL}/api/notifications`,
        { type: 'medication_reminder', message: `Medication Reminder: ${medication}` },
        { headers: { 'x-auth-token': token } }
      );
      await axios.post(
        `${process.env.BACKEND_URL}/api/notifications`,
        { type: 'appointment_reminder', message: `Next Appointment: ${appointment}` },
        { headers: { 'x-auth-token': token } }
      );
      setResult(`Medication Reminder: ${medication}\nNext Appointment: ${appointment}`);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error('Error saving data:', err.response?.data || err.message);
      setResult(`Error saving data: ${err.response?.data?.msg || err.message}`);
    }
  };

  const getFetalDevelopmentInsights = (week) => {
    if (week >= 1 && week <= 4) return 'Your baby is a tiny embryo, forming the neural tube and heart.';
    if (week >= 5 && week <= 8) return 'Your baby’s major organs are forming, and the heart begins to beat.';
    if (week >= 9 && week <= 12) return 'Your baby is now a fetus, with facial features and limbs developing.';
    if (week >= 13 && week <= 16) return 'Your baby can make facial expressions and may start sucking their thumb.';
    if (week >= 17 && week <= 20) return 'You might feel your baby’s first movements, and they can hear sounds.';
    if (week >= 21 && week <= 24) return 'Your baby’s lungs are developing, and they’re practicing breathing movements.';
    if (week >= 25 && week <= 28) return 'Your baby’s eyes can open, and they’re gaining more fat.';
    if (week >= 29 && week <= 32) return 'Your baby’s brain is growing rapidly, and they’re getting ready for birth.';
    if (week >= 33 && week <= 36) return 'Your baby is gaining weight and preparing for delivery.';
    if (week >= 37 && week <= 40) return 'Your baby is full-term and ready to meet you!';
    return 'Please enter a valid week (1-40).';
  };

  const getMenopauseGuidance = (symptoms) => {
    if (symptoms.includes('hot flashes')) return 'Try to stay cool, wear light clothing, and avoid triggers like spicy foods.';
    if (symptoms.includes('mood swings')) return 'Practice stress-relief techniques like meditation or yoga, and consider talking to a therapist.';
    if (symptoms.includes('sleep issues')) return 'Establish a bedtime routine, avoid caffeine, and create a calming sleep environment.';
    return 'Consult a doctor for personalized advice on managing your symptoms.';
  };

  return (
    <div style={styles.container}>
      <div style={styles.trackerContainer}>
        <h2 style={styles.heading}>Pregnancy & Postpartum Tracker</h2>
        <div style={styles.toggleContainer}>
          <button onClick={() => {setMode('pregnancy'); setResult('')}} style={{ ...styles.toggleButton, backgroundColor: mode === 'pregnancy' ? '#ff8c00' : '#ccc' }}>Pregnancy</button>
          <button onClick={() => {setMode('postpartum') ; setResult('')}} style={{ ...styles.toggleButton, backgroundColor: mode === 'postpartum' ? '#ff8c00' : '#ccc' }}>Postpartum</button>
          <button onClick={() => {setMode('medication'); setResult('')}} style={{ ...styles.toggleButton, backgroundColor: mode === 'medication' ? '#ff8c00' : '#ccc' }}>Medication Reminder</button>
          <button onClick={() => {setMode('menopause'); setResult('')}} style={{ ...styles.toggleButton, backgroundColor: mode === 'menopause' ? '#ff8c00' : '#ccc' }}>Menopause Insights</button>
        </div>

        {/* {mode === 'pregnancy' && (
          <form onSubmit={handlePregnancySubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Current Week of Pregnancy:</label>
              <input type="number" value={week} onChange={(e) => setWeek(e.target.value)} style={styles.input} placeholder="e.g., 12" min="1" max="40" required />
            </div>
            <button type="submit" style={styles.button}>Get Insights</button>
          </form>
        )} */}
        {mode === 'pregnancy' && (
        <form onSubmit={handlePregnancySubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Current Week of Pregnancy:</label>
            <input
              type="number"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              style={styles.input}
              placeholder="e.g., 12"
              min="1"
              max="40"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={styles.input}
              placeholder="e.g., 28"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Systolic BP (mmHg):</label>
            <input
              type="number"
              value={systolicBP}
              onChange={(e) => setSystolicBP(e.target.value)}
              style={styles.input}
              placeholder="e.g., 120"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Diastolic BP (mmHg):</label>
            <input
              type="number"
              value={diastolicBP}
              onChange={(e) => setDiastolicBP(e.target.value)}
              style={styles.input}
              placeholder="e.g., 80"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Blood Sugar Level (mg/dL):</label>
            <input
              type="number"
              value={bloodSugar}
              onChange={(e) => setBloodSugar(e.target.value)}
              style={styles.input}
              placeholder="e.g., 90"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Body Temperature (°C):</label>
            <input
              type="number"
              step="0.1"
              value={bodyTemp}
              onChange={(e) => setBodyTemp(e.target.value)}
              style={styles.input}
              placeholder="e.g., 36.6"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Heart Rate (bpm):</label>
            <input
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              style={styles.input}
              placeholder="e.g., 75"
              required
            />
          </div>

          <button type="submit" style={styles.button}>Get Insights</button>
        </form>
        )}

        {mode === 'postpartum' && (
          <form onSubmit={handlePostpartumSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Delivery Date:</label>
              <div style={styles.calendarInputContainer}>
                <input
                  type="text"
                  value={deliveryDate.toDateString()}
                  readOnly
                  style={styles.input}
                  placeholder="Select delivery date"
                />
                <FaCalendarAlt
                  style={styles.calendarIcon}
                  onClick={() => setShowDeliveryCalendar(!showDeliveryCalendar)}
                />
              </div>
              {showDeliveryCalendar && (
                <Calendar onChange={(date) => { setDeliveryDate(date); setShowDeliveryCalendar(false); }} value={deliveryDate} style={styles.calendar} />
              )}
            </div>
            <button type="submit" style={styles.button}>Track Recovery</button>
          </form>
        )}

        {mode === 'medication' && (
          <form onSubmit={handleMedicationSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Medication Reminder:</label>
              <input type="text" value={medication} onChange={(e) => setMedication(e.target.value)} style={styles.input} placeholder="e.g., Take Follicle Stimulating Hormone at 8 AM" required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Next Appointment:</label>
              <div style={styles.calendarInputContainer}>
                <input
                  type="text"
                  value={appointment}
                  readOnly
                  style={styles.input}
                  placeholder="Select appointment date"
                />
                <FaCalendarAlt
                  style={styles.calendarIcon}
                  onClick={() => setShowAppointmentCalendar(!showAppointmentCalendar)}
                />
              </div>
              {showAppointmentCalendar && (
                <Calendar
                  onChange={(date) => {
                    setAppointment(date.toDateString());
                    setShowAppointmentCalendar(false);
                  }}
                  value={appointment ? new Date(appointment) : new Date()}
                  style={styles.calendar}
                />
              )}
            </div>
            <button type="submit" style={styles.button}>Set Reminder</button>
          </form>
        )}

        {mode === 'menopause' && (
          <form onSubmit={handleMenopauseSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Symptoms (e.g., hot flashes, mood swings):</label>
              <textarea value={menopauseSymptoms} onChange={(e) => setMenopauseSymptoms(e.target.value)} style={styles.textarea} placeholder="Enter your symptoms here..." required />
            </div>
            <button type="submit" style={styles.button}>Get Guidance</button>
          </form>
        )}

        {result && <p style={styles.result}>{result}</p>}
        {showPopup && (
          <div style={styles.popup}>
            <p>Reminder added successfully!</p>
          </div>
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
  toggleContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
  toggleButton: {
    padding: '8px 12px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    flexShrink: 0,
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
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '100px',
  },
  calendar: {
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  calendarInputContainer: {
    position: 'relative',
    width: '100%',
  },
  calendarIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '20px',
    color: '#ff8c00',
    cursor: 'pointer',
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
    textDecoration: 'none',
    textAlign: 'center',
  },
  result: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#333',
  },
  popup: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
};

export default PregnancyPostpartumTracker;