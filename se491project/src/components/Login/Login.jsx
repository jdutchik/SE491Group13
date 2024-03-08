import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import './Login.css';
import Account from "../Account/Account";

import userEmoji from '../Assets/legoUser.png';
import passwordEmoji from '../Assets/passwordLock.png';
import codeEmoji from '../Assets/doctorTool.png';
import facebook from '../Assets/facebook.png';
import twitter from '../Assets/twitter.png';
import github from '../Assets/github.png';
import web from '../Assets/web.png';

const Login = () => {
    const navigate = useNavigate();

    const [isDoctor, setIsDoctor] = useState(false);
    const [code, setCode] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [visibility, updateVisibility] = useState('correctCreds')

    const handleIsDoc = () => {
        setIsDoctor(!isDoctor);
    }

    const codeChange = (event) => {
        setCode(event.target.value);
    }

    const usernameChange = (event) => {
        setUsername(event.target.value);
    }

    const passwordChange = (event) => {
        setPassword(event.target.value);
    }

    var request = "";

    const login = async () => {
        try {
            if (isDoctor) {
                request = 'http://localhost:3001/login/doctor';
            }

            else {
                request = 'http://localhost:3001/login';
            }

            const response = await fetch(request, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    code,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to log in');
            }

            const data = await response.json();

            if (data.message === 'Login successful') {
                updateVisibility('correctCreds');

                if (isDoctor) {
                    navigate('/doctor', { state: { code } });
                }

                else {
                    navigate('/account', { state: { username } });
                }
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
        <div className="full">
            <div className='loginContainer'>
                <div className='header'>
                    <div className='titleText'>Enter User Creditionals</div>
                </div>

                <div className='inputs'>
                    {isDoctor ? (
                        <div className='userInput'>
                            <img src={codeEmoji} alt="" />
                            <input type='text' value={code} onChange={codeChange} placeHolder='Enter Doctor Code' />
                        </div>
                    ) : (
                        <div className='userInput'>
                            <img src={userEmoji} alt="" />
                            <input type='text' value={username} onChange={usernameChange} placeHolder='Enter Username' />
                        </div>
                    )}

                    <div className='userInput'>
                        <img src={passwordEmoji} alt="" />
                        <input type='password' onChange={passwordChange} placeHolder='Enter Password' />
                    </div>
                </div>

                <div className='submit'>
                    <div className="login" onClick={login}>Login</div>
                </div>

                <div className="doctorSwitch" onClick={handleIsDoc}>
                    {!isDoctor ? (<p>Doctor? Click Here</p>
                    ) : (
                        <p>Patient? Click Here</p>
                    )}
                </div>

                <div className={visibility}>
                    Creditionals are Incorrect
                </div>
            </div>

            <div class="social">
                <div class="icon facebook">
                    <div class="tooltip">Facebook</div>
                    <img src={facebook} alt="" />
                </div>

                <div class="icon twitter">
                    <div class="tooltip">Twitter</div>
                    <img src={twitter} alt="" />
                </div>

                <div class="icon github">
                    <div class="tooltip">Github</div>
                    <img src={github} alt="" />
                </div>

                <div class="icon website">
                    <div class="tooltip">Class Website</div>
                    <img src={web} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login