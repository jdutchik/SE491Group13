import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import './Account.css';

import person from '../Assets/user.png';
import globe from '../Assets/globe.png';
import graph from '../Assets/graph.png';

const Account = () => {
    const location = useLocation();
    const { username } = location.state || {};

    const [accountInfo, setAccountInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateClicked = () => {
        window.location.href = '/Survey';
    };

    const signOutClicked = () => {
        window.location.href = '/';
    };

    const getAccountInfo = async () => {
        try {
            const response = await fetch(`http://localhost:3001/account/${username}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setAccountInfo(data);

            console.log(accountInfo);

            if (accountInfo != null) {
                setLoading(false);
            }
        } 

        catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    useEffect(() => {
        getAccountInfo();
    }, []);

    if (loading) {
        getAccountInfo();
        return <div>Loading...</div>
    }

    return (
        <div className="accountContainer">
            <div className="quickInfo">
                <div className="picture">
                    <img src={person}></img>
                </div>
                <div className="name">{accountInfo.patient.name} ({username})</div>
                <div className="email">{accountInfo.user.email}</div>
                <div className="age">Age: {accountInfo.patient.age}</div>
                <div className="age">Gender: {accountInfo.patient.gender}</div>
                <div className="userButtons">
                    <div className="button" onClick={updateClicked}>Update</div>
                    <div className="button" onClick={signOutClicked}>Sign Out</div>
                </div>
            </div>

            <div className="accountInfo">
                <div className="info">
                    <div className="userInfo">Skin Tone: <br></br> {accountInfo.patient.skin_tone}
                    <img src={graph}></img>
                    (placeholder for stats)
                    </div>
                    <div className="userInfo">Skin Conditions: <br></br> {accountInfo.patient.skin_conditions}
                    <img src={graph}></img>
                    (placeholder for stats)
                    </div>
                    <div className="userInfo">
                        Geographical Info: <br></br> {accountInfo.patient.city}, {accountInfo.patient.state} from the {accountInfo.patient.country}
                        <img src={globe}></img>
                    </div>
                </div>

                <div className="doctor">
                    <div className="doctorContainer">
                        Your Doctor
                        <div className="docpicture">
                            <img src={person}></img>
                        </div>
                        <div className="doctorInfo">
                            <div className="doctorname">{accountInfo.doctor.name}</div>
                            <div className="doctorWork">{accountInfo.doctor.workplace}</div>
                        </div>
                    </div>
                    <div className="doctorTitle">☎️ Contact Your Doctor For Your Calculated Results</div>
                </div>
            </div>
        </div>
    )
}

export default Account