import React, { useState, useEffect } from 'react';
import "../Styles/graph.css";
import { EditText } from 'react-edit-text';

function WrittenAnswer({questionNumber}){
    const [writtenAnswer, setWrittenAnswer] = useState(sessionStorage.getItem('writtenAnswerValue') || '');

    useEffect(() => {
      sessionStorage.setItem('writtenAnswerValue', writtenAnswer);
    }, [writtenAnswer]);

    // Watch for changes in questionNumber
    useEffect(() => {
        // Clear the text box when questionNumber changes
        setWrittenAnswer('');
    }, [questionNumber]);
  
    const handleInputChange = (e) => {
      const newValue = e.target.value;
      setWrittenAnswer(newValue);
    };

    sessionStorage.setItem('writtenAnswerValue', "");

    let questionNo = String.fromCharCode('A'.charCodeAt(0) + questionNumber);  // Maps interger to letter

    return (
        <div id = "written-answer-box" className="edit-text-container" style={{display: "none"}}>
            <h4>Question {questionNo}</h4>
            <div className="edit-container">
                <EditText className="edit-text" 
                    placeholder="Answer"
                    value={writtenAnswer}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}

export default WrittenAnswer;