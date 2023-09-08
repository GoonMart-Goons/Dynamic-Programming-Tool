import React from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png';
import profilePic from './Images/profile.png';
import "./Styles/TopDown.css";

function TopDown(){
    return(
        <div className="top-down">
            <div className="top-down-logo-container">
                <Link to = "/">
                    <img className="top-down-logo" src = {dpLogo} alt = "logo" />
                </Link>
                <div className="headerTitles">
                    <h1 className="title">Top-down</h1>
                </div>
            </div>

            <div className="top-down-container">
                <div className="top-down-side-container">
                        <div className="profile-container">
                            <img className="profile-pic" src = {profilePic} alt="profile pic"/>
                            <div className="profile-details-container">
                                <h1>Tek Seven</h1>
                                <h3>detektiv57@gmail.com</h3>
                            </div>
                        </div>
                    <button type = "submit" className = "home-button">Easy</button>
                    <button type = "submit" className = "home-button">Medium</button>
                    <button type = "submit" className = "home-button">Hard</button>
                    <button type = "submit" className = "home-button">Final Test</button>
                </div>
                <div className="top-down-main-container">
                    <h1>Practice</h1>
                </div>
            </div>
        </div>
    );
}

export default TopDown;