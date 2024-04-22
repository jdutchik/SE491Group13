import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Survey.css';

const Survey = () => {
  const navigate = useNavigate();

  const submitClicked = () => {
    window.location.href = '/';
  };
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const [patientData, setPatientData] = useState({
    name: '',
    gender: '',
    skin_tone: ''
  });

  const [dob, setDob] = useState({
    day: '',
    month: '',
    year: ''
  });

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePatientInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleDobChange = (e) => {
    const { name, value } = e.target;
    setDob({ ...dob, [name]: value });
  };

  const handleSurveySubmit = async (e) => {
    e.preventDefault();

    const formattedDob = `${dob.year}-${dob.month.padStart(2, '0')}-${dob.day.padStart(2, '0')}`;
    
    const completePatientData = {
      ...userData,
      ...patientData,
      dob: formattedDob
    };

    try {
      const response = await fetch('http://localhost:3001/survey/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completePatientData),
      });

      if (response.ok) {
        console.log('Patient data submitted successfully');
        navigate('/'); // Redirect to homepage upon successful submission
      } else {
        console.error('Failed to submit patient data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="surveyContainer">
      <form className="userForm" onSubmit={handleSurveySubmit}>
        <div className="userDebrief">
          <h1>Welcome! Let's get started 👋</h1>
          <p className="intro">
            To ensure accurate determination of allergies,
            it is crucial for users to input correct and comprehensive information.
            Please provide precise details about the patient's name, age, gender, race, weight, diet,
            and any relevant geographical information. Accurate data enables our Artificial
            Intelligence model to come to a more informed
            conclusion on the patient's potential allergies. Additionally,
            if you have a change in any of the listed info in the future, please consider
            updating this information to help deliver personalized and reliable results.
            Your cooperation in providing accurate
            information plays a pivotal role in optimizing the effectiveness of the allergy
            determination process.
          </p>
        </div>

        <div className="questions">
          <div className="double">
            <div className="first">
              <h>Email</h>
              <input type="text" name="email" value={userData.email} onChange={handleUserInputChange} placeholder="example@gmail.com" />
            </div>
            <div className="last">
              <h>Name</h>
              <input type="text" name="name" value={patientData.name} onChange={handlePatientInputChange} placeholder="Full Legal Name" />
            </div>
          </div>

          <div className="double">
            <div className="first">
              <h>Username</h>
              <input type="text" name="username" value={userData.username} onChange={handleUserInputChange} placeholder="Enter Username" />
            </div>
            <div className="last">
              <h>Password</h>
              <input type="text" name="password" value={userData.password} onChange={handleUserInputChange} placeholder="Enter Password" />
            </div>
          </div>

          <div className="triple">
            <div className="questionDefault">
              <h>Date of Birth</h>
              <div className="DOB">
                <input type="text" name="day" value={dob.day} onChange={handleDobChange} placeholder="DD" />
                <input type="text" name="month" value={dob.month} onChange={handleDobChange} placeholder="MM" />
                <input type="text" name="year" value={dob.year} onChange={handleDobChange} placeholder="YYYY" />
              </div>
            </div>

            <div className="questionDefault">
              <h>Gender</h>
              <select name="gender" value={patientData.gender} onChange={handlePatientInputChange} className="genderInput">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="skintone">
            <h>Skin Tone</h>
            <div className="options">
              <label>
                <input type="radio" name="skin_tone" value="Dark" onChange={handlePatientInputChange} checked={patientData.skin_tone === 'Dark'} /> Dark
              </label>
              <label>
                <input type="radio" name="skin_tone" value="Brown" onChange={handlePatientInputChange} checked={patientData.skin_tone === 'Brown'} /> Brown
              </label>
              <label>
                <input type="radio" name="skin_tone" value="Olive" onChange={handlePatientInputChange} checked={patientData.skin_tone === 'Olive'} /> Olive
              </label>
              <label>
                <input type="radio" name="skin_tone" value="Medium" onChange={handlePatientInputChange} checked={patientData.skin_tone === 'Medium'} /> Medium
              </label>
              <label>
                <input type="radio" name="skin_tone" value="Fair" onChange={handlePatientInputChange} checked={patientData.skin_tone === 'Fair'} /> Fair
              </label>
              <label>
                <input type="radio" name="skin_tone" value="Light" onChange={handlePatientInputChange} checked={patientData.skin_tone === 'Light'} /> Light
              </label>
            </div>
          </div>

          <button type="submit" className="surveySubmit" onClick={submitClicked}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Survey;
