import React, { useState, useEffect } from 'react';
import "../Styles/graph.css";
import { EditText } from 'react-edit-text';

function WrittenAnswer(){
    const [writtenAnswer, setWrittenAnswer] = useState(sessionStorage.getItem('writtenAnswerValue') || '');

    useEffect(() => {
      sessionStorage.setItem('writtenAnswerValue', writtenAnswer);
    }, [writtenAnswer]);
  
    const handleInputChange = (e) => {
      const newValue = e.target.value;
      setWrittenAnswer(newValue);
    };

    sessionStorage.setItem('writtenAnswerValue', "");

    return (
        <div id = "written-answer-box" className="edit-text-container" style={{display: "none"}}>
            <h4>Part 2</h4>
            <div className="edit-container">
                <EditText className="edit-text" 
                    placeholder="Part 2"
                    value={writtenAnswer}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}

export default WrittenAnswer;