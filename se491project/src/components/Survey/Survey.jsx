import React, { useState, useEffect } from 'react';
import './Survey.css';

const Survey = () => {
  const submitClicked = () => {
    window.location.href = '/';
  };

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    patient_id: 2
  });

  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    city: '',
    state: '',
    country: '',
    skin_tone: '',
    skin_conditions: '',
    allergen_id: 1,
    doctor_id: 1
  });

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePatientInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSurveySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/survey/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('User data updated successfully');
      } else {
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOrderFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/survey/patients', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        console.log('Order data updated successfully');
      } else {
        console.error('Failed to update order data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="surveyContainer">
      <form className="userForm">
        <div className="userDebrief">
          <h1> Welcome! Let's get started 👋</h1>
          <p className="intro">
            To ensure accurate determination of allergies,
            it is crucial for users to input correct and comprehensive information.
            Please provide precise details about the patient's name, age, gender, race, weight, diet,
            and any relevant geographical information. Accurate data enables our Artificial
            Intelligience model to come to a more informed
            conclusion on the patient's potential allergies. Additionally,
            if you have a change in any of the listed info in the future, please consider
            updating this information to help deliver personalized and reliable results.
            Your cooperation in providing accurate
            information plays a pivotal role in optimizing the effectiveness of the allergy
            determination process.
          </p>
        </div>

        <div className="questions">

          {/* Name input field */}
          <div className="double">
            <div className="first">
              <h>Email</h>
              <input type="text" placeholder="example@gmail.com" />
            </div>

            <div className="last">
              <h>Name</h>
              <input type="text" placeholder="Full Legal Name" />
            </div>
          </div>

          <div className="double">
            <div className="first">
              <h>Username</h>
              <input type="text" placeholder="Enter Username" />
            </div>

            <div className="last">
              <h>Password</h>
              <input type="text" placeholder="Enter Password" />
            </div>
          </div>

          {/* Age input field */}
          <div className="triple">
            <div className="questionDefault">
              <h>Date of Birth</h>
              <div className="DOB">
                <input type="text" placeholder="DD" />
                <input type="text" placeholder="MM" />
                <input type="text" placeholder="YYYY" />
              </div>
            </div>

            {/* gender input field */}
            <div className="questionDefault">
              <h>Gender</h>
              <select className="genderInput">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* location input field*/}
            <div className="questionDefault">
              <h>Country of Origin</h>
              <input type='text' placeholder="Country Name" />
            </div>
          </div>

          {/* skin ton input field*/}
          <div className="skintone">
            <h>Skin Tone</h>

            <div className="options">
              <label htmlFor="option"> Dark
                <div class="dark"></div>
                <input type="radio" name="radio" />
              </label>

              <label htmlFor="option"> Brown
                <div class="brown"></div>
                <input type="radio" name="radio" />
              </label>

              <label htmlFor="option"> Olive
                <div class="olive"></div>
                <input type="radio" name="radio" />
              </label>

              <label htmlFor="option"> Medium
                <div class="medium"></div>
                <input type="radio" name="radio" />
              </label>

              <label htmlFor="option"> Fair
                <div class="fair"></div>
                <input type="radio" name="radio" />
              </label>

              <label htmlFor="option"> Light
                <div class="light"></div>
                <input type="radio" name="radio" />
              </label>
            </div>
          </div>

          {/* gender input field*/}
          <div className="other">
            <h>Experiencing Any Unusual Symptoms? (Hives, Red Eyes, Dry Skin, etc.)</h>
            <input type='text' placeholder="List All Concerns Here" />
          </div>
        </div>
      </form>

      <div className='surveySubmit' onClick={submitClicked}>Submit</div>
    </div>
  );
};

export default Survey;