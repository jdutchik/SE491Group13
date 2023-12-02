import React, { useState, useEffect } from "react";
import axios from 'axios';

import './Account.css';

import person from '../Assets/user.png';

const Account = ({ username} ) => {
    const updateClicked = () => {
        window.location.href = '/Survey';
    };

    const signOutClicked = () => {
        window.location.href = '/';
    };

    const [accountInfo, setAccount] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/account/${username}')
            .then((response) => {
                setAccount(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [username]);

    return (
        <div className="accountContainer">
            <div className="quickInfo">
                <div className="picture">
                    <img src={person}></img>
                </div>
                <div className="name">Jane Doe</div>
                <div className="email">janedoe@iastate.edu</div>
                <div className="userButtons">
                    <div className="button" onClick={updateClicked}>Update</div>
                    <div className="button" onClick={signOutClicked}>Sign Out</div>

                    <h1>Data from MySQL Table</h1>
                    <p>Testing: {accountInfo.username}</p>
                </div>
            </div>

            <div className="accountInfo">
                <div className="info">
                    <div className="userInfo">Race: </div>
                    <div className="userInfo">Weight: </div>
                    <div className="userInfo">Geographical Info: </div>
                    <div className="userInfo">Diet: </div>
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