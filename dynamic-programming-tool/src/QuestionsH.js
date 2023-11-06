import React, { useContext, useState } from "react";
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

let question, answer, userAns, questionCount
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
    
    const [question, setQuestion] = useState(getQuestion());
    const [answer, setAnswer] = useState(getAnswer());
    const [refreshGraph, setRefreshGraph] = useState(0);
    questionCount = 0
    

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

        if(questionCount === 0){
            userAns = getUserAnswer()
            console.log('User\'s answer:', userAns)
        }
        else{
            userAns = sessionStorage.getItem('textBoxValue');
        }
        
    
        if(userAns === answer){
            increaseCompletionCount(currentUser.uid, difficulty.easy)
            questionCount++;
            alert('You got the question right!')            
        }
        else
            alert('Try again.')
        // console.log(userAns === answer)
    }    

    const handleAnswerBoxBtn = () => {
        questionCount++
        console.log("answer: ", answer)
        if(document.getElementById('node-answer-box').style.display !== 'none'){
            
            document.getElementById('node-answer-box').style.display = 'none';
            document.getElementById('written-answer-box').style.display = 'block';
        }
        else{
            //alert(`Congradulations! New badge for ${}`)
            const temp =  sessionStorage.getItem('writtenAnswerValue');
            alert(`${temp}`)
        }

        if(questionCount >= 3){
            //question = getQuestion()
            questionCount = 0

            setQuestion(getQuestion())
            setAnswer(getAnswer())
            
            setRefreshGraph(refreshGraph + 1)
        }
    };

    return(
        <div className="top-down">
            <Navbar placeholder=""></Navbar>

            <div className="top-down-container">
                <div className="top-down-side-container">
                <span><button type = "button" className="question-state-btn" onClick={handleQuestionBtn}>QUESTION</button>
                <button type = "button" className="details-state-btn" onClick={handleDetailsBtn}>DETAILS</button></span>

                <div id="question-container">
                    <p className="question-text" id="container">{question}</p>
                </div>
                <div id="details-container" style={{display: "none"}}>
                    <p className="question-text" >Pseudocode and Details go in here if applicable.</p>
                </div>

                </div>
                <div className="top-down-main-container">
                    <h3 className="question-h3">Answer</h3>
                    <div className="graphingTool">
                        <GraphView key={refreshGraph} /> {/* Use a unique key to force re-render */}
                    </div>
                    <button type = "submit" className = "question-button" onClick= {handleAnswerBoxBtn} /*{GetUserAns}*/>SUBMIT</button>
                </div>
            </div>
        </div>
    );
}

export default QuestionsH;