import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import './Login.css';
import Account from "../Account/Account";

import userEmoji from '../Assets/legoUser.png';
import passwordEmoji from '../Assets/passwordLock.png';
import codeEmoji from '../Assets/doctorTool.png';
import docs from '../Assets/google-docs.png';
import news from '../Assets/news.png';
import github from '../Assets/github.png';
import web from '../Assets/web.png';

const Login = () => {
    const navigate = useNavigate();

    const [isDoctor, setIsDoctor] = useState(true);
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
                request = 'http://localhost:3001/login';
            }

            const response = await fetch(request, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to log in');
            }

            const data = await response.json();

            if (data.message === 'Login successful') {
                updateVisibility('correctCreds');
                navigate('/Doctor', { state: { username } });
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
                    <div className='titleText'>Enter Doctor Creditionals</div>
                </div>

                <div className='inputs'>

                    <div className='userInput'>
                        <img src={codeEmoji} alt="" />
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
                    Creditionals are Incorrect
                </div>
            </div>

            <div class="social">
                <div class="icon github">
                    <img src={github} alt="" />
                    <div class="tooltip"><a href="https://github.com/jdutchik/SE492Group13.git">GitHub</a></div>
                </div>

                <div class="icon website">
                    <img src={web} alt="" />
                    <div class="tooltip"><a href="https://sdmay24-13.sd.ece.iastate.edu/">Class Website</a></div>
                </div>

                <div class="icon document">
                    <img src={docs} alt="" />
                    <div class="tooltip"><a href="https://sdmay24-13.sd.ece.iastate.edu/Final_Design_Document_Team13.pdf">Design Document</a></div>
                </div>

                <div class="icon news">
                    <img src={news} alt="" />
                    <div class="tooltip"><a href="https://www.youtube.com/watch?v=KucyzXRjU2Y/">News Report</a></div>
                </div>
            </div>
        </div>
    )
}

export default Login