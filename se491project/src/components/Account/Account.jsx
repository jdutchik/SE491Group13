import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import './Account.css';

import person from '../Assets/user.png';

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
                    <div className="userInfo">Skin Tone: {accountInfo.patient.skin_tone}</div>
                    <div className="userInfo">
                        Geographical Info: {accountInfo.patient.city}, {accountInfo.patient.state} from the {accountInfo.patient.country}
                    </div>
                    <div className="userInfo">Skin Conditions: {accountInfo.patient.skin_conditions}</div>
                </div>

                <div className="results">
                    You are allerigic to:
                    <div className="finalResult">{accountInfo.allergen.name}</div>
                </div>
            </div>
        </div>
    )
}

export default Account