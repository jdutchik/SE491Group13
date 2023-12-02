import React from "react";
import './SignUp.css';

import sneezeImg from '../Assets/sneeze.jpg';

const SignUp = () => {
    const signUpClicked = () => {
        window.location.href = '/Survey';
    };

    return (
        <div className='signUpContainer'>
           <img src={sneezeImg}></img>
           <div className='SignUpInfo'>
                <div className='signUpInfo'>Allergies Becoming A Problem?</div>
                <div className="signUpButton" onClick={signUpClicked}>Sign Up</div>
           </div>
        </div>
    )
}

export default SignUp