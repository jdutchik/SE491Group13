import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import './Login.css';
import Account from "../Account/Account";

import userEmoji from '../Assets/legoUser.png';
import passwordEmoji from '../Assets/passwordLock.png';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [visibility, updateVisibility] = useState('correctCreds')

    const usernameChange = (event) => {
        setUsername(event.target.value);
    }

    const passwordChange = (event) => {
        setPassword(event.target.value);
    }

    const login = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to log in');
            }

            const data = await response.json();

            if (data.message === 'Login successful') {
                updateVisibility('correctCreds');
                navigate('/account', { state: { username } });
            } 
            
            else {
                updateVisibility('incorrectCreds');
            }
        } 
        
        catch (error) {
            console.error('Login Error:', error.message);
        }
    };

    return (
        <div className='loginContainer'>
            <div className='header'>
                <div className='titleText'>Enter Patient Creditionals</div>
            </div>

            <div className='inputs'>
                <div className='userInput'>
                    <img src={userEmoji} alt="" />
                    <input type='text' value={username} onChange={usernameChange} placeHolder='Enter Username' />
                </div>

                <div className='userInput'>
                    <img src={passwordEmoji} alt="" />
                    <input type='password' onChange={passwordChange} placeHolder='Enter Password' />
                </div>
            </div>

            <div className='submit'>
                <div className="login" onClick={login}>Login</div>
            </div>

            <div className={visibility}>
                Patient Creditionals are Incorrect
            </div>
        </div>
    )
}

export default Login