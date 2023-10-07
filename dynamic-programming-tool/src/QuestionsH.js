import React from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png'
import profilePic from './Images/profile.png';
import "./Styles/TopDown.css";
import Navbar from "./Navbar";

function QuestionsH(){
    return(
        <div className="top-down">
            <Navbar placeholder=""></Navbar>

            <div className="top-down-container">
                <div className="top-down-side-container">
                <h1>Question</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porttitor pulvinar est, vitae fringilla orci euismod vel. In convallis finibus rutrum. Nam et ante id velit ultrices faucibus sit amet sed odio. Duis dignissim pellentesque justo, nec interdum odio tempor in. Nulla pellentesque lectus id facilisis sollicitudin. Quisque mattis purus quis condimentum lobortis. Fusce fringilla molestie metus vitae commodo. Maecenas tincidunt aliquam semper. In vehicula nulla nibh, nec blandit mi dignissim in.</p>
                    
                </div>
                <div className="top-down-main-container">
                    <h1>Answer</h1>
                    <button type = "submit" className = "question-button">SUBMIT</button>
                </div>
            </div>
        </div>
    );
}

export default QuestionsH;