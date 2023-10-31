import React, { useContext } from "react";
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
import { increaseCompletionCount } from "./Database/Functions";
import { AuthContext } from "./Database/Auth";

let question, answer, userAns
const difficulty = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard"
}

function QuestionsH(){
    question = getQuestion()
    answer = getAnswer()

    function GetUserAns(){
        userAns = getUserAnswer()
        console.log('User\'s answer:', userAns)
        answer = getAnswer()
        console.log('Actual answer:', answer)
    
        // console.log('Auth:', AuthContext)
        // const {currentUser, userData} = useContext(AuthContext)
        // console.log('User:', currentUser)
        // increaseCompletionCount(currentUser.uid, difficulty.easy)
    
        if(userAns === answer){
            alert('You got the question right!')            
        }
        else
            alert('Try again.')
        // console.log(userAns === answer)
    }    

    return(
        <div className="top-down">
            <Navbar placeholder=""></Navbar>

            <div className="top-down-container">
                <div className="top-down-side-container">
                <span><button type = "button" className="question-state-btn">QUESTION</button>
                <button type = "button" className="details-state-btn">DETAILS</button></span>
                <p className="question-text" id="container">{question}</p>

                </div>
                <div className="top-down-main-container">
                    <h3 className="question-h3">Answer</h3>
                    <div className="graphingTool">
                        <GraphView/>
                    </div>
                    <button type = "submit" className = "question-button" onClick={GetUserAns}>SUBMIT</button>
                </div>
            </div>
        </div>
    );
}

export default QuestionsH;