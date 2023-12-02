import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import './Account.css';

import person from '../Assets/user.png';

const Account = () => {
    const location = useLocation();
    const { username } = location.state || {};

    const [accountInfo, setAccountInfo] = useState(null);

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
        } 

        catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    useEffect(() => {
        getAccountInfo();
    }, [username]);

    return (
        <div className="accountContainer">
            <div className="quickInfo">
                <div className="picture">
                    <img src={person}></img>
                </div>
                <div className="name">Jane Doe ({username})</div>
                <div className="email">{accountInfo.user.email}</div>
                <div className="age">Age: </div>
                <div className="age">Gender: </div>
                <div className="userButtons">
                    <div className="button" onClick={updateClicked}>Update</div>
                    <div className="button" onClick={signOutClicked}>Sign Out</div>
                </div>
            </div>

            <div className="accountInfo">
                <div className="info">
                    <div className="userInfo">Skin Tone: </div>
                    <div className="userInfo">Geographical Info: </div>
                    <div className="userInfo">Skin Conditions: </div>
                </div>

                <div className="results">
                    You are allerigic to:
                    <div className="finalResult">EVERYTHING</div>
                </div>
            </div>
        </div>
    )
}

export default Account