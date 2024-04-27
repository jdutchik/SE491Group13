import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import './Doctor.css';

import person from '../Assets/user.png';
import searchIcon from '../Assets/search.png'

const Doctor = () => {
    const location = useLocation();
    const { username } = location.state || {};

    const test_person = {
        email : "john@example.com",
        name : "John Doe",
        username : "jd1234",
        password : "dc",
        dob : "2000-05-16",
        gender : "Male",
        state : "IA",
        skin_tone : "Dark",
        symptoms : "Acne pimples",
        ingredients : "Ingredient 1601",
    };

    const [loading, setLoading] = useState(true);
    const [patient_loading, setPatientLoading] = useState(false);

    const [doctorInfo, setDoctorInfo] = useState(null);

    const [patient_username, setPatientUsername] = useState(null);
    const [patientInfo, setPatientInfo] = useState(test_person);

    const signOutClicked = () => {
        window.location.href = '/';
    };

    const getDoctorInfo = async () => {
        try {
            const response = await fetch(`http://ec2-54-87-221-186.compute-1.amazonaws.com:3001/doctor/${username}`, {
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
            const response = await fetch(`http://ec2-54-87-221-186.compute-1.amazonaws.com:3001/patient/${patient_username}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch doctor data');
            }

            const data = await response.json();
            setPatientInfo(data[0]);

            if (patientInfo != null) {
                setPatientLoading(false);
            }
        }

        catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

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
                    <input type='searchBar' placeHolder='Enter Patient Username' onChange={({ target: { value } }) => setPatientUsername(value)}/>
                    <div className='search-button' onClick={getPatientInfo}>Search</div>
                </div>

                <div className="patient">
                    <div className="basic-info">
                        <div className="patientImg">
                            <div className="picture">
                                <img src={person}></img>
                            </div>
                        </div>
                        <h1>{patientInfo.name} ({patientInfo.username})</h1>
                        <h2>Contact info: {patientInfo.email}</h2>
                    </div>

                    <div className="specific-info">
                        <h1>Specified Inputs</h1>
                        STATE
                        skin tone
                        symptons
                        Gender
                        DOB
                    </div>

                    <div className="allergic-info">
                        avoid
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Doctor