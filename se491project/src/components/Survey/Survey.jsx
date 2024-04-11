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
                    <div className="questionDefault">
                        <h>Enter Email</h>
                        <input type="text" placeholder="Email" />
                    </div>

                    {/* Name input field */}
                    <div className="questionDefault">
                        <h>Enter Username</h>
                        <input type="text" placeholder="Username" />
                    </div>

                    {/* Name input field */}
                    <div className="questionDefault">
                        <h>Enter Password</h>
                        <input type="text" placeholder="Password" />
                    </div>

                    {/* Name input field */}
                    <div className="questionDefault">
                        <h>Enter Patient's Name (Not Required for Calculations)</h>
                        <input type="text" placeholder="Full Legal Name" />
                    </div>

                    {/* Age input field */}
                    <div className="questionDefault">
                        <h>Enter Patient's Age</h>
                        <input type='text' placeholder="Age" />
                    </div>

                    {/* gender input field */}
                    <div className="questionDefault">
                        <h>Enter Patient Gender</h>
                        <select className="genderInput">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* race input field*/}
                    <div className="questionDefault">
                        <h>Enter Patient's Geographical Location</h>
                        <input type='text' placeholder="Geographical Location" />
                    </div>

                    {/* weight input field*/}
                    <div className="questionDefault">
                        <h>Enter Approximate Skin Tone (Ex: fair)</h>
                        <input type='text' placeholder="Skin Tone" />
                    </div>

                    {/* skin type input field*/}
                    <div className="questionDefault">
                        <h>Enter Any Patient's Skin Condition (dry, chapped, etc.)</h>
                        <select className="skinTypeInput">
                            <option>sensitive-skin-allergist-diagnosed</option>
                            <option>sensitive-skin-self-diagnosed</option>
                            <option>allergic-contact-dermatitis</option>
                            <option>eczema-atopic-skin</option>
                            <option>dry-chapped-skin</option>
                            <option>acne-pimples</option>
                            <option>skin-allergies</option>
                            <option>rosacea</option>
                            <option>discoloration-hyperpigmentation</option>
                            <option>fine-lines-wrinkles</option>
                            <option>psoriasis</option>
                            <option>Other:I%20have%20celiacs%20disease%20and%20need%20my%20products%20to%20be%20gluten%20free</option>
                            <option>blackheads-whiteheads</option>
                            <option>Other:Coconut</option>
                            <option>Other:</option>
                            <option>Other:Textile%20Dye%20Mix</option>
                            <option>Other:Gluten</option>
                            <option>Other:respiratory</option>
                            <option>Other:patchy%20rash</option>
                            <option>Other:Tbd</option>
                            <option>Other:Congestion</option>
                            <option>Other:Contact%20dermatitis%20</option>
                            <option>Other:Ffa</option>
                            <option>Other:Dermatologist%20</option>
                            <option>Other:Rash</option>
                            <option>Other:Balsam%20Peru</option>
                            <option>Other:I</option>
                            <option>Other:Itching</option>
                            <option>Other:Rashes%20</option>
                            <option>Other:mystery%20body%20rash</option>
                            <option>Other:PPD</option>
                            <option>Other:My%20gf%20gets%20rashes%20so%20I%20need%20to%20change%20my%20products</option>
                            <option>Other:Alopecia%20</option>
                            <option>Other:AP93</option>
                            <option>Other:Dry%20skin</option>
                            <option>Other:Cocamidopropyl%20Betaine</option>
                            <option>Other:Metal</option>
                            <option>Other:Ethylenediamine%20Dihydrochloride%2C%20Potassium%20Dichromate</option>
                            <option>Other:Nickel%20</option>
                            <option>Other:Other</option>
                            <option>Other:Low%20level%20allergy%20to%20Balsam%20of%20Peru</option>
                            <option>Other:Allergies%20</option>
                            <option>Other:glutaral%20%26%20iodopropynl%20butyl%20carbamate</option>
                            <option>Other:Balsam%20of%20Peru%20allergic%20</option>
                            <option>Other:licus%20planus</option>
                            <option>Other:lip%20inflammation</option>
                            <option>Other:hives</option>
                            <option>Other:Lichen%20Sclerosis</option>
                            <option>Other:Dry%20Lips</option>
                            <option>other</option>
                            <option>Other:Occassional%20rash%20outbreaks</option>
                            <option>Other:Propolis</option>
                            <option>Other:Allergic%20to%20Cocamidopropyl%20Betaine</option>
                            <option>Other:Surgical%20site%20healing%20issues</option>
                            <option>Other:Urticaria%20</option>
                            <option>Other:Polysorbate%2080</option>
                            <option>Other:Fragrance%20</option>
                            <option>Other:Contact%20Dermatitis</option>
                            <option>Other:Red%2C%20peeling%2C%20itchy%2C%20burning%20lips</option>
                            <option>Other:Celiac</option>
                            <option>Other:perioral%20dermatitis</option>
                            <option>Other:scalp</option>
                            <option>Other:scalp%20issues</option>
                            <option>Other:Hives%20on%20legs%20</option>
                            <option>Other:Itchy%20scalp%20with%20hair%20loss</option>
                            <option>Other:Allergic%20reaction%20</option>
                            <option>Other:Excema</option>
                            <option>Other:Dermatitis%20Herpetiformis%20%28dermatologist%20diagnosed%29</option>
                            <option>Other:Allergic%20to%20polyethylene%20glycol%20%28peg%29</option>
                            <option>Other:oral%20lichen%20Plans</option>
                        </select>
                    </div>
                </div>
            </form>

            <div className='surveySubmit' onClick={submitClicked}>Submit</div>
        </div>
    );
};

export default Survey;