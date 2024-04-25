import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Survey.css';

const symptoms = [
  "Sensitive skin allergist diagnosed",
  "Sensitive skin self diagnosed",
  "Allergic contact dermatitis",
  "Eczema atopic skin",
  "Dry chapped skin",
  "Acne pimples",
  "Skin allergies",
  "Rosacea",
  "Discoloration hyperpigmentation",
  "Fine lines wrinkles",
  "Psoriasis",
  "I have celiacs disease and need my products to be gluten free",
  "Blackheads whiteheads",
  "Coconut",
  "Textile Dye Mix",
  "Gluten",
  "Respiratory",
  "Patchy rash",
  "Tbd",
  "Congestion",
  "Contact dermatitis",
  "Ffa",
  "Dermatologist",
  "Rash",
  "Balsam Peru",
  "I",
  "Itching",
  "Rashes",
  "Mystery body rash",
  "PPD",
  "My gf gets rashes so I need to change my products",
  "Alopecia",
  "AP93",
  "Dry skin",
  "Cocamidopropyl Betaine",
  "Metal",
  "Ethylenediamine Dihydrochloride, Potassium Dichromate",
  "Nickel",
  "Low level allergy to Balsam of Peru",
  "Allergies",
  "Glutaral & iodopropynl butyl carbamate",
  "Balsam of Peru allergic",
  "Licus planus",
  "Lip inflammation",
  "Hives",
  "Lichen Sclerosis",
  "Dry Lips",
  "Occasional rash outbreaks",
  "Propolis",
  "Allergic to Cocamidopropyl Betaine",
  "Surgical site healing issues",
  "Urticaria",
  "Polysorbate 80",
  "Fragrance",
  "Contact Dermatitis",
  "Red, peeling, itchy, burning lips",
  "Celiac",
  "Perioral dermatitis",
  "Scalp",
  "Scalp issues",
  "Hives on legs",
  "Itchy scalp with hair loss",
  "Allergic reaction",
  "Excema",
  "Dermatitis Herpetiformis (dermatologist diagnosed)",
  "Allergic to polyethylene glycol (peg)",
  "Oral lichen Plans"
];

const Survey = () => {
  const navigate = useNavigate();


  const initialSymptoms = symptoms.map(symptom => ({
    name: symptom,
    isSelected: false
}));
const [symptomList, setSymptomList] = useState(initialSymptoms);

const toggleSymptomSelection = (index) => {
    console.log(`Toggling symptom at index: ${index}`);
    const newSymptoms = [...symptomList];
    newSymptoms[index].isSelected = !newSymptoms[index].isSelected;
    setSymptomList(newSymptoms);
};

  const submitClicked = () => {
    console.log('Submit button clicked');
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
    skin_tone: '',
    state: ''
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

    // Formatting the date of birth as before
    const formattedDob = `${dob.year}-${dob.month.padStart(2, '0')}-${dob.day.padStart(2, '0')}`;

    // Constructing the complete symptoms string
    const selectedSymptoms = symptomList
        .filter(symptom => symptom.isSelected)
        .map(symptom => symptom.name)
        .join(', '); // Join the selected symptoms with a comma and space

    // Constructing the complete data object including the symptoms
    const completePatientData = {
        ...userData,
        ...patientData,
        dob: formattedDob,
        symptoms: selectedSymptoms // Append the selected symptoms as a string
    };

    console.log('Complete Patient Data:', completePatientData);

    try {
      console.log('Making fetch call to server');

      const response = await fetch('http://ec2-54-87-221-186.compute-1.amazonaws.com:4000/survey/patients', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: JSON.stringify(completePatientData),
    });
    console.log(`Response status: ${response.status}`);

        if (response.ok) {
            console.log('Patient data submitted successfully');
            navigate('/'); // Redirect to homepage upon successful submission
        } else {
          console.log('Patient data FAILED TO SUBMIT');
            console.error('Failed to submit patient data');
        }
    } catch (error) {
      console.log('other error');
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

            <div className="questionDefault">
              <h>State</h>
              <select name="state" value={patientData.state} onChange={handlePatientInputChange} className="stateInput">
                {["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
                  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
                  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
                  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
                  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
                  .map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
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

          <div className="questionDefault">
                    <h>Skin Symptoms</h>
                    <div className="symptom-list">
                        {symptomList.map((symptom, index) => (
                            <div key={index} className="symptom-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={symptom.isSelected}
                                        onChange={() => toggleSymptomSelection(index)}
                                    />
                                    {symptom.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

          <button type="submit" className="surveySubmit" onClick={submitClicked}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Survey;