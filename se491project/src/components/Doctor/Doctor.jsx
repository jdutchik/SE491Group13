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
                <div className="docname">{doctorInfo.doctor.name}</div>
                <div className="uni">{doctorInfo.doctor.university}</div>
                <div className="workplace">{doctorInfo.doctor.workplace}</div>

                <div className="userButtons">
                    <div className="button" onClick={signOutClicked}>Sign Out</div>
                </div>
            </div>

            <div className="patientInfo">
                <div className="search">
                    <img src={searchIcon} alt="" />
                    <input type='searchBar' placeholder='Enter Patient Name' />
                </div>

                <div className="patientResults">
                    <div className="patient">
                        <div className="patientImg">
                            <div className="picture">
                                <img src={person}></img>
                            </div>
                        </div>
                        <div className="patientSum">
                            <div className="patientQuickInfo">{doctorInfo.patient.name} ({doctorInfo.patient.age}{doctorInfo.patient.gender})</div>
                            <p>is prone to be allergic to</p>
                            <div className="allergen">{doctorInfo.allergen.name}</div>
                        </div>
                    </div>

                    <div className="patient">
                        <div className="patientImg">
                            <div className="picture">
                                <img src={person}></img>
                            </div>
                        </div>
                        <div className="patientSum">
                            <div className="patientQuickInfo">{doctorInfo.patient.name} ({doctorInfo.patient.age}{doctorInfo.patient.gender})</div>
                            <p>is prone to be allergic to</p>
                            <div className="allergen">{doctorInfo.allergen.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Doctor