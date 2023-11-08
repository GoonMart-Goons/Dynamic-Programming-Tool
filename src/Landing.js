import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Landing.css";
import dpGif from './Images/dp.gif';
import dpLogo from './Images/dp2.png';


function Landing() {
    // Create and configure link elements
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Amaranth&family=Luckiest+Guy&family=Sansita&display=swap';

    // Append link elements to the document head
    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(link);
    
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