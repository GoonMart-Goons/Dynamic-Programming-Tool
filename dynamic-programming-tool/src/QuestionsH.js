import React, { useContext, useState, useEffect} from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import "./Styles/TopDown.css";
import Navbar from "./Navbar";
import GraphView from "./Components/graph";
import { useNavigate } from "react-router-dom";

//Get question to ask + its answer
import { getQuestion, getAnswer, getDecomposedAnswer, GetDetails, getDetailNo} from "./Algos/pickAlgo";
import { getUserAnswer, getUserDecomposedAnswer, clearGraph} from "./Components/graph";
import { increaseCompletionCount } from "./Database/Functions";
import { AuthContext } from "./Database/Auth";

let userAns
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
    
    const navigate = useNavigate();
    const [question, setQuestion] = useState(getQuestion());
    const [answer, setAnswer] = useState(getAnswer());
    const [decomposedAnswer, setDecomposedAnswer] = useState(getDecomposedAnswer())
    const [detailNo, setDetailNo] = useState(getDetailNo());
    const [refreshGraph, setRefreshGraph] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [questionAttemptCount, setQuestionAttemptCount] = useState(0);
    const [gotAssistance, setGotAssistance] = useState(false);
    console.log("Qc: ", questionCount)
    //console.log("answeR: ", answer)
    console.log("Curr answer: ", answer[questionCount])
    console.log('Decom:', decomposedAnswer)
    

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
            // The serialised graph answer
            userAns = getUserAnswer()
            console.log('User\'s answer:', userAns)
        }
        else{
            // The textbox answer
            userAns = sessionStorage.getItem('writtenAnswerValue')
            console.log('User\'s answer:', userAns)
        }
        
        if (questionCount === 2){
            let userAnsArr = userAns.split(',')
            userAnsArr = userAnsArr.map(function (value){
                return parseInt(value)
            })
            userAnsArr.sort((a, b) => a - b)

            if (userAnsArr.toString() === answer[questionCount].toString()){
                setQuestionCount(questionCount + 1)
                alert('You got the question right!')
                setQuestionAttemptCount(0)

                //Hide "Add Node" box and show written answer box
                if(document.getElementById('node-answer-box').style.display !== 'none'){
                    document.getElementById('node-answer-box').style.display = 'none';
                    document.getElementById('written-answer-box').style.display = 'block';
                }

                console.log("Curr answer: ", answer[questionCount + 1])
            } else {
                setQuestionAttemptCount(questionAttemptCount + 1)
                if(questionAttemptCount === 0){
                    alert('Answer incorrect. Try again.')
                }
                else if(questionAttemptCount === 1){
                    alert('Answer incorrect. You have one more attempt.')
                }
                else{
                    alert(`Answer incorrect. The correct answer is ${answer[questionCount].toString()}`)
                    setQuestionAttemptCount(0)
                    setGotAssistance(true)
                    setQuestionCount(questionCount + 1)

                    if(document.getElementById('node-answer-box').style.display !== 'none'){
                        document.getElementById('node-answer-box').style.display = 'none';
                        document.getElementById('written-answer-box').style.display = 'block';
                    }
                }   
            }
        }
        else if(userAns === answer[questionCount].toString()){ // Converts answer to string value
            //increaseCompletionCount(currentUser.uid, difficulty.easy)
            setQuestionCount(questionCount + 1)
            alert('You got the question right!')
            setQuestionAttemptCount(0)

            //Hide "Add Node" box and show written answer box
            if(document.getElementById('node-answer-box').style.display !== 'none'){
                document.getElementById('node-answer-box').style.display = 'none';
                document.getElementById('written-answer-box').style.display = 'block';
            }

            console.log("Curr answer: ", answer[questionCount + 1])
        }
        else{
            setQuestionAttemptCount(questionAttemptCount + 1)
            let userDecomposedAns = getUserDecomposedAnswer()
            console.log('User decom:', userDecomposedAns)

            let nodeToLookAt = -1
            for(var i = 0; i < Math.min(userDecomposedAns.length, decomposedAnswer.length); i++)
                if(userDecomposedAns[i].value !== decomposedAnswer[i].value){
                    nodeToLookAt = userDecomposedAns[i].id
                    break
                }

            if(questionAttemptCount === 0){
                if(questionCount === 0){
                    alert('Answer incorrect. Look at node ' + nodeToLookAt + ' and try again.')
                }
                else{
                    alert('Answer incorrect. Try again.')
                }
            }
            else if(questionAttemptCount === 1){
                if(questionCount === 0){
                    alert('Answer incorrect. Look at node ' + nodeToLookAt + '. You have one more attempt.')
                }else{
                    alert('Answer incorrect. You have one more attempt.')
                }
            }
            else{
                alert(`Answer incorrect. The correct answer is ${answer[questionCount].toString()}`)
                setQuestionAttemptCount(0)
                setGotAssistance(true)
                setQuestionCount(questionCount + 1)

                if(document.getElementById('node-answer-box').style.display !== 'none'){
                    document.getElementById('node-answer-box').style.display = 'none';
                    document.getElementById('written-answer-box').style.display = 'block';
                }
            }   
        }
    }    

    // useEffect will run whenever questionCount changes, in particular, checks when its time to display next question 
    useEffect(() => {
        if(questionCount >= answer.length){
            if(!gotAssistance){
                increaseCompletionCount(currentUser.uid, difficulty.easy)
                console.log("Updated database")
            }
            setQuestionCount(0)
            document.getElementById('node-answer-box').style.display = 'block';
            document.getElementById('written-answer-box').style.display = 'none';

            setQuestion(getQuestion())
            setAnswer(getAnswer())
            setDetailNo(getDetailNo())
            console.log("answeR: ", answer)
            
            setRefreshGraph(refreshGraph + 1)
            clearGraph()
            setQuestionAttemptCount(0)
            setGotAssistance(false)
        }
      }, [questionCount]);

    return(
        <div className="top-down">
            <Navbar placeholder=""></Navbar>

            <div className="top-down-container">
                <div className="top-down-side-container">
                <span><button type = "button" className="question-state-btn" onClick={handleQuestionBtn}>QUESTION</button>
                <button type = "button" className="details-state-btn" onClick={handleDetailsBtn}>DETAILS</button></span>

                <div id="question-container">
                    <p> {question} </p>
                    <button type = "submit" className = "next-question-button" onClick= {() => navigate('/questionsh')}>NEXT QUESTION</button>
                </div>
                <div id="details-container" style={{display: "none"}}>
                    {/*<p className="question-text" >Pseudocode and Details go in here if applicable.</p>*/}
                    <GetDetails number = {detailNo}/>
                </div>

                </div>
                <div className="top-down-main-container">
                    <h3 className="question-h3">Answer</h3>
                    <div className="graphingTool">
                        <GraphView key={refreshGraph} questionNumber={questionCount}/> {/* Use a unique key to force re-render */}
                    </div>
                    <button type = "submit" className = "question-button" onClick= {GetUserAns}>SUBMIT</button>
                </div>
            </div>
        </div>
    );
}

export default QuestionsH;