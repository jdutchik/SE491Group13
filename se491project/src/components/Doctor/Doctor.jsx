import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';

import './Doctor.css';

import person from '../Assets/user.png';
import searchIcon from '../Assets/search.png'

const Doctor = () => {
    const location = useLocation();
    const { username } = location.state || {};

    const test_person = {
        email: "john@example.com",
        name: "John Doe",
        username: "jd1234",
        password: "dc",
        dob: "2000-05-16",
        gender: "Male",
        state: "IA",
        skin_tone: "Dark",
        symptoms: "Acne pimples",
        ingredients: "Ingredient 1601",
    };

    const test_string = "North American Standard RISA kimberly damron Mayo Clinic Bakery Mayo Clinic Oral Flavorings/Oral Hygiene"

    const [loading, setLoading] = useState(true);
    const [patient_loading, setPatientLoading] = useState(true);

    const [products, setProducts] = useState([]);

    const [doctorInfo, setDoctorInfo] = useState(null);

    const [patient_username, setPatientUsername] = useState(null);
    const [patientInfo, setPatientInfo] = useState(test_person);

    const [foundPatient, setFoundPatient] = useState(true)

    const [modelLoading, setModelLoading] = useState("Click to Analyze and Run Patient Inputs")

    const signOutClicked = () => {
        window.location.href = '/';
    };

    const getDoctorInfo = async () => {
        try {
            const response = await fetch(`http://ec2-52-23-238-114.compute-1.amazonaws.com:3001/doctor/${username}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch doctor data');
            }

            const data = await response.json();
            setDoctorInfo(data[0]);

            if (doctorInfo != null) {
                setLoading(false);
            }
        }

        catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const getPatientInfo = async () => {
        try {
            const response = await fetch(`http://ec2-52-23-238-114.compute-1.amazonaws.com:3001/patient/${patient_username}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch doctor data');
            }

            const data = await response.json();
            setPatientInfo(data[0]);
            console.log("after set patient info:")
            console.log(patientInfo)  // Log to check what's being set
            setPatientLoading(true);
            setModelLoading("Click to Analyze and Run Patient Inputs");
            setFoundPatient(false)
        }

        catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const getAllergenResults = async (e) => {
        setModelLoading("Loading...");

        try {
            const response = await fetch(`http://ec2-52-23-238-114.compute-1.amazonaws.com:3001/products/${patientInfo.username}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch Allergen Results data');
            }

            const data = await response.json();

            setProducts(data.slice(0, Math.min(5, data.length)));
            setPatientLoading(false);


            // Call getPatientInfo again to update the state with new allergen information
        
      
        }

        catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    }

    useEffect(() => {
        getDoctorInfo();
    }, []);

    if (loading) {
        getDoctorInfo();
        return <div>Loading...</div>
    }

    return (
        <div className="doctorContain">

            <div className="quickInfo">
                <div className="picture">
                    <img src={person}></img>
                </div>
                <div className="doctor-title">
                    <h1>Doctor {doctorInfo.legalName}</h1>
                    ({doctorInfo.username})
                    <div className="doc-code">
                        <h2>Code (Share ONLY with patients):</h2> {doctorInfo.docCode}
                    </div>
                </div>
                <div className="userButtons">
                    <div className="button" onClick={signOutClicked}>Sign Out</div>
                </div>
            </div>

            <div className="patientResults">
                <div className="search">
                    <img src={searchIcon} alt="" />
                    <input type='searchBar' placeHolder='Enter Patient Username' onChange={({ target: { value } }) => setPatientUsername(value)} />
                    <div className='search-button' onClick={getPatientInfo}>Search</div>
                </div>

                {foundPatient ? (<div className="noPatient"> Search Patient Above ☝️</div>) : (
                    <div className="patient">
                        <div className="basic-info">
                            <div className="patientImg">
                                <div className="picture">
                                    <img src={person}></img>
                                </div>
                            </div>
                            <h1>{patientInfo.name}</h1> ({patientInfo.username})
                            <h2>Contact info: {patientInfo.email}</h2>
                        </div>

                        <div className="specific-info">
                            <h1>Patient Info:</h1>
                            <div className="lil"><div className="head">Date of Birth: &nbsp;</div>{patientInfo.dob}</div>
                            <div className="lil"><div className="head">Location: &nbsp;</div>{patientInfo.state}</div>
                            <div className="lil"><div className="head">Gender: &nbsp;</div>{patientInfo.gender}</div>
                            <div className="lil"><div className="head">Skin Tone: &nbsp;</div>{patientInfo.skin_tone}</div>
                            <div className="lil"><div className="head">Symptoms: &nbsp;</div>{patientInfo.symptoms}</div>
                            <div className="lil"><div className="head">Allergens: &nbsp;</div>{patientInfo.ingredients}</div>
                            <div className="refresh-button-container">
                             <button onClick={getPatientInfo} className="refresh-button">Refresh Patient Info</button>
                            </div>
                        </div>

                        <div className="allergic-info">
                            <h1>List of Products Patient Should Avoid:</h1>
                            <div className="results">
                                {patient_loading ? (<div className="resultsButton" onClick={getAllergenResults}>{modelLoading}
                                </div>)
                                    :
                                    (<div className="productResults">{products}</div>)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Doctor