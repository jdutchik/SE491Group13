import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Survey.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import USAMap from "react-usa-map";

const Survey = () => {
  const [startDate, setStartDate] = useState(new Date());
  const years = [];
  for (let year = 1960; year <= 2024; year++) {
    years.push(year);
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const mapHandler = (event) => {
    alert(event.target.dataset.name);
  };
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

          {/* Name input field */}
          <div className="first-six">
            <div className="user-info">
              <div className="basic">
                <h>Email</h>
                <input type="text" placeholder="example@gmail.com" />
              </div>

              <div className="basic">
                <h>Username</h>
                <input type="text" placeholder="Enter Username" />
              </div>

              <div className="basic">
                <h>Password</h>
                <input type="text" placeholder="Enter Password" />
              </div>
            </div>

            <div class="patient-info">
              {/* Age input field */}
              <div className="name-gender">
                <div className="name">
                  <h>Full Patient Name</h>
                  <input type="text" placeholder="Enter Full Patient Name" />
                </div>

                {/* gender input field */}
                <div className="gender">
                  <h>Gender</h>
                  <select className="genderInput">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="DOB">
                <h>Date of Birth</h>
                <DatePicker
                  showIcon
                  inline
                  renderCustomHeader={({ date,
                    changeYear,
                    changeMonth }) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(value)}>
                        {years.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select value={months[date.getMonth()]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
          </div>

          <div className="location">
            <h>Home State</h>
            <USAMap onClick={mapHandler} />
          </div>

          {/* skin ton input field*/}
          <div className="skintone">
            <h>Skin Tone</h>
            <div className="options">
              <label>
                <div class="dark"></div>
                <input type="radio" name="skin_tone" value="Dark" onChange={handlePatientInputChange} checked={patientData.skin_tone === 'Dark'} /> Dark
              </label>

              <label>
                <div class="brown"></div>
                <input type="radio" name="skin_tone" value="Brown" onChange={handlePatientInputChange} checked={patientData.skin_tone === 'Brown'} /> Brown
              </label>

              <label>
                <div class="olive"></div>
                <input type="radio" name="skin_tone" value="Olive" onChange={handlePatientInputChange} checked={patientData.skin_tone === 'Olive'} /> Olive
              </label>

              <label>
                <div class="medium"></div>
                <input type="radio" name="skin_tone" value="Medium" onChange={handlePatientInputChange} checked={patientData.skin_tone === 'Medium'} /> Medium
              </label>

              <label>
                <div class="fair"></div>
                <input type="radio" name="skin_tone" value="Fair" onChange={handlePatientInputChange} checked={patientData.skin_tone === 'Fair'} /> Fair
              </label>

              <label>
                <div class="light"></div>
                <input type="radio" name="skin_tone" value="Light" onChange={handlePatientInputChange} checked={patientData.skin_tone === 'Light'} /> Light
              </label>
            </div>
          </div>

          {/* other input field*/}
          <div className="other">
            <h>Experiencing Any Unusual Symptoms?</h>
            <div className="other-options">
              <input type="checkbox" name="ssad" value="ssad"></input>
              <label for="ssad"> Sensitive Skin (allergist diagnosed)</label><br></br>

              <input type="checkbox" name="sssd" value="sssd"></input>
              <label for="sssd"> Sensitive Skin (self diagnosed)</label><br></br>

              <input type="checkbox" name="acd" value="acd"></input>
              <label for="acd"> Allergic Contact Dermatitis</label><br></br>

              <input type="checkbox" name="eas" value="eas"></input>
              <label for="eas"> Eczema Atopic Skin</label><br></br>

              <input type="checkbox" name="dcs" value="dcs"></input>
              <label for="dcs"> Dry Chapped Skin</label><br></br>

              <input type="checkbox" name="ap" value="ap"></input>
              <label for="ap"> Acne Pimples</label><br></br>

              <input type="checkbox" name="sa" value="sa"></input>
              <label for="sa"> Skin Allergies</label><br></br>

              <input type="checkbox" name="ros" value="ros"></input>
              <label for="ros"> Rosacea</label><br></br>

              <input type="checkbox" name="dh" value="dh"></input>
              <label for="dh"> Discoloration Hyperpigmentation</label><br></br>

              <input type="checkbox" name="flw" value="flw"></input>
              <label for="flw"> Fine Lines Wrinkles</label><br></br>

              <input type="checkbox" name="pso" value="pso"></input>
              <label for="pso"> Psoriasis</label><br></br>
            </div>
          </div>
          <button type="submit" className="surveySubmit" onClick={submitClicked}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Survey;
