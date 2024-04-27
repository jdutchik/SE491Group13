import React from "react";
import './SignUp.css';

import signup from '../Assets/checklist.png';

const SignUp = () => {
    const signUpClicked = () => {
        window.location.href = '/Survey';
    };

    return (
        <div className='signUpContainer'>
            <div className='intro-signup'>
                 Please fill in the allergy survey to get started. <br></br><br></br>
                 Once done with the survey, 
                Please get in contact with your doctor or physician for the results.
            </div>

            <div className="fullButton" onClick={signUpClicked}>
                <img src={signup} alt="" />
                <div className="signUpButton">Click to Fill Allergy Survey</div>
            </div>

            
        </div>
    )
}

export default SignUp;
