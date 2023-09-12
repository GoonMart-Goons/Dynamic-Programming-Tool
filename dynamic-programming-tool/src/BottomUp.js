import React from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png';
import profilePic from './Images/profile.png';
import "./Styles/TopDown.css";
import Navbar from "./Navbar";

function BottomUp(){
    return(
        <div className="top-down">
            {/*<div className="top-down-logo-container">*/}
            {/*    <Link to = "/">*/}
            {/*        <img className="top-down-logo" src = {dpLogo} alt = "logo" />*/}
            {/*    </Link>*/}
            {/*    <div className="headerTitles">*/}
            {/*        <h1 className="title">Bottom-Up</h1>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <Navbar placeholder=""></Navbar>

            <div className="top-down-container">
                <div className="top-down-side-container">
                        <div className="profile-container">
                            <img className="profile-pic" src = {profilePic} alt="profile pic"/>
                            <div className="profile-details-container">
                                <h1>Tek Seven</h1>
                                <h3>detektiv57@gmail.com</h3>
                            </div>
                        </div>
                    <button type = "submit" className = "top-down-button">Easy</button>
                    <button type = "submit" className = "top-down-button">Medium</button>
                    <button type = "submit" className = "top-down-button">Hard</button>
                    <button type = "submit" className = "top-down-button">Final Test</button>
                </div>
                <div className="top-down-main-container">
                    <h1>General Theory</h1>
                    <p>Nunc sagittis augue dui, quis auctor ligula scelerisque vitae. Donec a mi sed ipsum viverra aliquet. Proin sit amet venenatis nulla, eget volutpat nisi. Maecenas auctor, lacus non laoreet ornare, ipsum neque dapibus urna, eu posuere leo felis ac mauris. Nullam lacinia nulla lobortis, scelerisque felis quis, molestie tellus. Maecenas mi quam, egestas ac rutrum id, auctor vel erat. Donec vitae justo fermentum, scelerisque risus id, mattis orci. Praesent semper posuere porta.</p>
                    <h1>Memoisation</h1>
                    <p>Suspendisse vestibulum venenatis libero, sed feugiat mi consequat at. Vivamus elementum ut dui id ornare. Suspendisse aliquet metus sit amet nisl blandit varius. Ut non tempus lectus. Nunc ac nisl placerat, elementum enim ac, ultricies velit. Mauris vel aliquam lectus. Cras facilisis congue sapien, sed vestibulum dolor volutpat sit amet. Suspendisse dui elit, congue et aliquam eu, mattis eget sapien. Sed sed dapibus diam. Praesent vel libero id libero mattis egestas. Nullam efficitur nisl cursus velit pellentesque, ac fermentum leo sagittis. Donec rutrum posuere risus ac faucibus. Nam eget justo pharetra, semper purus eget, gravida leo.</p>
                </div>
            </div>
        </div>
    );
}

export default BottomUp;