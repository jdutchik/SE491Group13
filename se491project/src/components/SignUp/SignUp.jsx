import React from "react";
import './SignUp.css';

import sneezeImg from '../Assets/allergyMonster.PNG';
import signup from '../Assets/checklist.png';

const SignUp = () => {
    const signUpClicked = () => {
        window.location.href = '/Survey';
    };

    return (
        <div className='signUpContainer'>
           <img src={sneezeImg}></img>
           <div className='SignUpInfo'>
                <div className='signUpInfo'> Are allergies putting a damper on your day? <br></br>
                Do you find yourself constantly battling sneezing, hives, or red eyes? <br></br>
                <br></br>
                Find peace of mind with our new and exciting Artificial Intelligence 
                allergy detection service!
                Begin your journey by filling out a brief survey, and reach out to your doctor.
                Simple! 
                </div>
                <div className="fullButton" onClick={signUpClicked}>
                    <img src={signup} alt="" />
                    <div className="signUpButton">Sign Up For Free Today!</div>
                </div>
           </div>
        </div>
    )
}

export default SignUp