import React, { useState } from "react";
import './Login.css';

import userEmoji from '../Assets/legoUser.png';
import passwordEmoji from '../Assets/passwordLock.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [visibility, updateVisibility] = useState('correctCreds')

    const usernameChange = (event) => {
        setUsername(event.target.value);
    }

    const passwordChange = (event) => {
        setPassword(event.target.value);
    }

    const loginClicked = async (event) => {
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
                throw new Error('Failed to send message');
            }

            const data = await response.json();

            if (data.message == 'Login successful') {
                updateVisibility('correctCreds');
                window.location.href = '/Account';
            }

            else {
                updateVisibility('incorrectCreds');
            }
        }

        catch (error) {
            alert('Login Error: ' + error.message)
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
                <div className="login" onClick={loginClicked}>Login</div>
            </div>

            <div className={visibility}>
                Your password wrong ho
            </div>
        </div>
    )
}

export default Login