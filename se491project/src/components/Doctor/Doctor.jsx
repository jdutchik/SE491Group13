import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import './Doctor.css';

import person from '../Assets/user.png';
import searchIcon from '../Assets/search.png'

const Doctor = () => {
    const location = useLocation();
    const { code } = location.state || {};

    const [loading, setLoading] = useState(true);
    const [doctorInfo, setDoctorInfo] = useState(null);

    const signOutClicked = () => {
        window.location.href = '/';
    };

    const getDoctorInfo = async () => {
        {/*
        try {
            const response = await fetch(`http://localhost:3001/doctor/${code}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch doctor data');
            }

            const data = await response.json();
            setDoctorInfo(data);

            console.log(doctorInfo);

            if (doctorInfo != null) {
                setLoading(false);
            }
        }

        catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    */}
    };

    useEffect(() => {
        getDoctorInfo();
    }, []);

    if (loading) {
        //getDoctorInfo();
        //return <div>Loading...</div>
    }

    return (
        <div className="doctorContain">
            <div className="quickInfo">
                <div className="picture">
                    <img src={person}></img>
                </div>
                <div className="doctor_title">
                    Doctor
                </div>
                <div className="userButtons">
                    <div className="button" onClick={signOutClicked}>Sign Out</div>
                </div>
            </div>

            <div className="patientResults">
                <div className="search">
                    <img src={searchIcon} alt="" />
                    <input type='searchBar' placeHolder='Enter Patient Name' />
                </div>

                <div className="patient">
                    <div className="basic-info">
                        <div className="patientImg">
                            <div className="picture">
                                <img src={person}></img>
                            </div>
                        </div>
                            Full Legal Name (username)
                            Contact info: email
                            gender
                            DOB
                    </div>

                    <div className="specific-info">
                        STATE
                        skin tone
                        symptons
                    </div>

                    <div className="allergic-info">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Doctor