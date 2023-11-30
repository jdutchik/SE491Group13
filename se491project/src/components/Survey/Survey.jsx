import React from 'react';
import './Survey.css';

const Survey = () => {

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
                        <h>Enter Patient Full Legal Name</h>
                        <input type="text" placeholder="Full Legal Name" />
                    </div>

                    {/* Age input field */}
                    <div className="questionDefault">
                        <h>Enter Patient Age</h>
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
                        <h>Enter Patient's Race</h>
                        <input type='text' placeholder="Race" />
                    </div>

                    {/* weight input field*/}
                    <div className="questionDefault">
                        <h>Enter Patient's Weight</h>
                        <input type='text' placeholder="Weight" />
                    </div>

                    {/* gender input field*/}
                    <div className="questionDefault">
                        <h>Enter Patient's Geographical Info</h>
                        <input type='text' placeholder="Info" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Survey;