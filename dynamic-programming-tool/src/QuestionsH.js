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
    
    question = getQuestion()
    answer = getAnswer()

    const {currentUser, userData} = useContext(AuthContext)

    const handleDetailsBtn = () => {
        // Hide the home page
        document.getElementById('question-container').style.display = 'none';
        // Show settings
        document.getElementById('details-container').style.display = 'block';
    };

    const handleQuestionBtn = () => {
        // Hide the home page
        document.getElementById('details-container').style.display = 'none';
        // Show settings
        document.getElementById('question-container').style.display = 'block';
    };
    
    function GetUserAns(){
        userAns = getUserAnswer()
        console.log('User\'s answer:', userAns)
        answer = getAnswer()
        console.log('Actual answer:', answer)
        
    
        if(userAns === answer){
            increaseCompletionCount(currentUser.uid, difficulty.easy)
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
                <span><button type = "button" className="question-state-btn" onClick={handleQuestionBtn}>QUESTION</button>
                <button type = "button" className="details-state-btn" onClick={handleDetailsBtn}>DETAILS</button></span>

                <div id="question-container">
                <p className="question-text" id="container">{question}</p></div>
                <div id="details-container" style={{display: "none"}}>
                <p className="question-text" >Pseudocode and Details go in here if applicable.</p></div>

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