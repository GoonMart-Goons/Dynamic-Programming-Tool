import React from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png'
import profilePic from './Images/profile.png';
import "./Styles/TopDown.css";
import Navbar from "./Navbar";

//Can Sum Question test
import { getQuestion, getAnswer } from "./Algos/canSum";

function QuestionsH(){
    const questionText = getQuestion()
    const serializedTree = getAnswer()

    return(
        <div className="top-down">
            <Navbar placeholder=""></Navbar>

            <div className="top-down-container">
                <div className="top-down-side-container">
                <h1>Question</h1>
                <p>{questionText}</p>

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