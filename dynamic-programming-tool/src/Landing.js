import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Landing.css";
import dpGif from './Images/dp.gif';
import dpLogo from './Images/dp2.png';


function Landing() {
    return (
        <div className = "landing">
             
            <div className="landing-background">
             <img src={dpGif} alt="Background GIF" />
            </div>


            <div class="home-heads">
                <h1 class="home-head1" id="home-h1"><img src = {dpLogo} alt = "logo" /></h1>
                <span className="home-head2"><Link to = "/login" className="home-head2">LOGIN</Link>
                <Link to = "/Register" className="home-head2"> | REGISTER</Link></span>
            </div>
            
            
            <div className = "header-option">
                <span className = "header-optionLineTwo">Log In</span>
            </div>
            
        </div> 
    );
}


export default Landing;