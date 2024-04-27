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
                    Are allergies putting a damper on your day? <br></br>
                    Do you find yourself constantly battling sneezing, hives, or red eyes? <br></br>
                    Do you find yourself a victim of the <span class="fun">WICKED</span> Allergy Monster? <br></br>
                </div>

                <div className="fullButton" onClick={signUpClicked}>
                    <img src={signup} alt="" />
                    <div className="signUpButton">Complete Your Survey Today!</div>
                </div>
        </div>
    )
}

export default SignUp