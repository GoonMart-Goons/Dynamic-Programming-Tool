import React from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png'
import profilePic from './Images/profile.png';
import "./Styles/TopDown.css";
import Navbar from "./Navbar";
import GraphView from "./Components/graph";

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
                <span><button type = "button" className="question-state-btn">QUESTION</button>
                <button type = "button" className="details-state-btn">DETAILS</button></span>
                <p className="question-text" id="container">{questionText}
                    As we can see, the function is not called multiple times for the same value of n. So, we have optimized the above function using Memoization.
                    The above approach is called the Top-Down approach because we started solving the problem from the top and reached the base case by dividing the problem into smaller subproblems.
                    As we can see, the function is not called multiple times for the same value of n. So, we have optimized the above function using Memoization.
                    The above approach is called the Top-Down approach because we started solving the problem from the top and reached the base case by dividing the problem into smaller subproblems.
                    As we can see, the function is not called multiple times for the same value of n. So, we have optimized the above function using Memoization.
                    The above approach is called the Top-Down approach because we started solving the problem from the top and reached the base case by dividing the problem into smaller subproblems.
                    As we can see, the function is not called multiple times for the same value of n. So, we have optimized the above function using Memoization.
                    The above approach is called the Top-Down approach because we started solving the problem from the top and reached the base case by dividing the problem into smaller subproblems.
                    </p>

                </div>
                <div className="top-down-main-container">
                    <h3 className="question-h3">Answer</h3>
                    <div className="graphingTool">
                        <GraphView/>
                    </div>
                    <button type = "submit" className = "question-button">SUBMIT</button>
                </div>
            </div>
        </div>
    );
}

export default QuestionsH;