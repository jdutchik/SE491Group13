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

                <div className='paragraph'> 
                    Find peace of mind with our new and exciting Artificial Intelligence 
                    allergy detection service!
                    Begin your journey by filling out a brief survey. Then all you need to do 
                    is get in contact with your doctor or physician for the results. It is that easy!
                </div>
        </div>
    )
}

export default SignUp