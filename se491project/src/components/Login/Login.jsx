import React from "react";
import './Login.css';

import userEmoji from '../Assets/legoUser.png';
import emailEmoji from '../Assets/emailIcon.png';
import passwordEmoji from '../Assets/passwordLock.png';

const Login = () => {
    return (
        <div className='container'>
            <div className='header'>
                <div className='titleText'>Enter Patient Creditionals</div>
            </div>

            <div className='inputs'>
                <div className='userInput'>
                    <img src={userEmoji} alt="" />
                    <input type='text' placeHolder='Patient Name'/>
                </div>

                <div className='userInput'>
                    <img src={emailEmoji} alt=""/>
                    <input type='email' placeHolder='Patient Email'/>
                </div>

                <div className='userInput'>
                    <img src={passwordEmoji} alt="" />
                    <input type='password' placeHolder='Password'/>
                </div>
            </div>

            <div className='submit'>
                <div className="login">Login</div>
            </div>
        </div>
    )
}

export default Login