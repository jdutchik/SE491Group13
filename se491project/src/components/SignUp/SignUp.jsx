import React from "react";
import './SignUp.css';

import sneezeImg from '../Assets/sneeze.jpg';

const SignUp = () => {
    return (
        <div className='signUpContainer'>
           <img src={sneezeImg}></img>
           <div className='SignUpInfo'>
                <div className='signUpInfo'>Allergies Becoming A Problem?</div>
                <div className="signUpButton">Sign Up</div>
           </div>
        </div>
    )
}

export default SignUp