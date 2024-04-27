import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import './Doctor.css';

import person from '../Assets/user.png';
import searchIcon from '../Assets/search.png'

const Doctor = () => {
    const location = useLocation();
    const { username } = location.state || {};

    const [loading, setLoading] = useState(true);
    const [doctorInfo, setDoctorInfo] = useState(null);

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
            const response = await fetch(`http://ec2-54-87-221-186.compute-1.amazonaws.com:3001/patient/${username}`, {
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
                    <input type='searchBar' placeHolder='Enter Patient Name' />
                    <div className='search-button' onClick={getPatientInfo}>Search</div>
                </div>

                <div className="patient">
                    <div className="basic-info">
                        <div className="patientImg">
                            <div className="picture">
                                <img src={person}></img>
                            </div>
                        </div>
                        <h1>Full Legal Name (username)</h1>
                        <h2>Contact info: email</h2>
                    </div>

                    <div className="specific-info">
                        <h1>Specified Inputs Inputs</h1>
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