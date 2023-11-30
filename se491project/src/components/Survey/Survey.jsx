import React from 'react';
import './Survey.css';

const Survey = () => {

    return (
        <div className="surveyContainer">
            <form className="userForm">
                <div className="userDebrief">
                    <h1 className="header">
                        Welcome! Let's get started 👋
                    </h1>
                    <p className="intro">
                        To ensure accurate determination of allergies,
                        it is crucial for users to input correct and comprehensive information.
                        Please provide precise details about the patient's name, age, gender, race, weight,
                        any geographical info. Accurate data, such as the type of allergen, severity of the
                        reaction, and diet. This data enables our Artificial Intelligience model
                        to come to a more informed
                        conclusion on the patient's allergies. Additionally,
                        if you have a history of changes in any of the listed info, please consider
                        updating this information to help deliver personalized and reliable results.
                        Your cooperation in providing accurate
                        information plays a pivotal role in optimizing the effectiveness of the allergy
                        determination process.
                    </p>
                </div>

                <div className="questions">
                    {/* Name input field */}
                    <div className="questionName">
                        Enter Patient Full Legal Name
                        <input
                            className="questionInput"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Age input field */}
                    <div className="questionAge">
                        Email
                        <input
                            className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-teal-500 focus:ring-teal-500"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                        />
                    </div>

                    {/* gender input field */}
                    <div className="questionGender">
                        Gender
                        <select className="genderInput">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* Terms of service*/}
                    <div className="questionRace">
                        Patient'sRace
                        <div className="raceInput">
                           
                        </div>
                    </div>

                    {/* Terms of service*/}
                    <div className="questionWeight">
                        Patient's Weight
                        <div className="genderInput">
                           
                        </div>
                    </div>

                    {/* Terms of service*/}
                    <div className="questionRace">
                        Patient's Gender
                        <div className="genderInput">
                           
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Survey;