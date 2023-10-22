import React from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png'
import profilePic from './Images/profile.png';
import "./Styles/TopDown.css";
import Navbar from "./Navbar";
import GraphView from "./Components/graph";

//Get question to ask + its answer
import { getQuestion, getAnswer } from "./Algos/pickAlgo";
import { getUserAnswer } from "./Components/graph";

function QuestionsH(){
    const questionText = getQuestion()
    const serializedTree = getAnswer()
    var userAns

    return(
        <div className="top-down">
            <Navbar placeholder=""></Navbar>

            <div className="top-down-container">
                <div className="top-down-side-container">
                <span><button type = "button" className="question-state-btn">QUESTION</button>
                <button type = "button" className="details-state-btn">DETAILS</button></span>
                <p className="question-text" id="container">{questionText}</p>

                </div>
                <div className="top-down-main-container">
                    <h3 className="question-h3">Answer</h3>
                    <div className="graphingTool">
                        <GraphView/>
                    </div>
                    <button type = "submit" className = "question-button" onClick={userAns = getUserAnswer}>SUBMIT</button>
                </div>
            </div>
        </div>
    );
}

export default QuestionsH;