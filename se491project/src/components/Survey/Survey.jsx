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
  const [startDate, setStartDate] = useState(new Date());
  const [state, setState] = useState(null);

  // patient name
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [full_name, setFull_Name] = useState(null);

  // everything else
  const [gender, setGender] = useState(null);
  const [skin_tone, setSkin_Tone] = useState(null);
  const [symptoms, setSymptoms] = useState(null);
  
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
    const event_state = event.target.dataset.name;
    setState(event_state);
  };

  const navigate = useNavigate();


  const initialSymptoms = symptoms.map(symptom => ({
    name: symptom,
    isSelected: false
}));
const [symptomList, setSymptomList] = useState(initialSymptoms);

const toggleSymptomSelection = (index) => {
    const newSymptoms = [...symptomList];
    newSymptoms[index].isSelected = !newSymptoms[index].isSelected;
    setSymptomList(newSymptoms);
};

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

    const dob_to_string = startDate.toDateString().split(" ");
    const dob_sql = dob_to_string[3] + '-' + (startDate.getMonth()+1) + '-' + dob_to_string[2];


    // Constructing the complete symptoms string
    const selectedSymptoms = symptomList
        .filter(symptom => symptom.isSelected)
        .map(symptom => symptom.name)
        .join(', '); // Join the selected symptoms with a comma and space

    // Constructing the complete data object including the symptoms
    const completePatientData = {
      "email" : email,
      "name" : full_name,
      "username" : username,
      "password" : password,
      "dob" : dob_sql,
      "gender" : gender,
      "state" : state,
      "skin_tone" : patientData[skin_tone],
      "symptoms" : "Dry chapped skin"
    };

    console.log('Complete Patient Data:', completePatientData);

    try {
      const response = await fetch('http://localhost:3001/survey/patient', {
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
            Please provide precise details about the patient's name, age, gender, skin tone,
            geographical information, and any symptoms you are experiencing. Accurate data enables our Artificial
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

          {/* Name input field */}
          <div className="first-six">
            <div className="user-info">
              <div className="basic">
                <h>Email</h>
                <input type="text" placeholder="example@gmail.com" onChange={({ target: { value } }) => setEmail(value)}/>
              </div>

              <div className="basic">
                <h>Username</h>
                <input type="text" placeholder="Enter Username" onChange={({ target: { value } }) => setUsername(value)}/>
              </div>
            </div>

              <div className="basic">
                <h>Password</h>
                <input type="text" placeholder="Enter Password" onChange={({ target: { value } }) => setPassword(value)}/>
              </div>
            </div>

            <div class="patient-info">
              {/* Age input field */}
              <div className="name-gender">
                <div className="name">
                  <h>Full Patient Name</h>
                  <input type="text" placeholder="Enter Full Patient Name" onChange={({ target: { value } }) => setFull_Name(value)}/>
                </div>

                {/* gender input field */}
                <div className="gender">
                  <h>Gender</h>
                  <select className="genderInput" onChange={({ target: { value } }) => setGender(value)}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

          <div className="location">
            <h>Home State</h>
            <USAMap onClick={mapHandler} customize={{ [state]: { fill: 'navy' } }}/>
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