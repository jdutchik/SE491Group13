import React from "react";
import './SignAndLogin.css';

import userEmoji from '../Assets/legoUser.png';
import emailEmoji from '../Assets/emailIcon.png';
import passwordEmoji from '../Assets/passwordLock.png';

const SignAndLogin = () => {
    return (
        <div className='container'>
            <div className='header'>
                <div className='titleText'>Enter Creditionals</div>
            </div>

            <div className='inputs'>
                <div className='userInput'>
                    <img src={userEmoji} alt="" />
                    <input type="text" />
                </div>

                <div className='userInput'>
                    <img src={emailEmoji} alt=""/>
                    <input type="email" />
                </div>

                <div className='userInput'>
                    <img src={passwordEmoji} alt="" />
                    <input type="password" />
                </div>
            </div>

            <div className='submit'>
                <div className="signUp">Sign Up</div>
                <div className="Login">Login</div>
            </div>
        </div>
    )
}

export default SignAndLogin