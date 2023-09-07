import React, { useState, useEffect } from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png';
import profilePic from './Images/profile.png';
import achievementPic from './Images/achievement.png';
import "./Styles/Home.css";

import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Home(){
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
        const studentsRef = collection(db, 'Students');
        const q = query(studentsRef, where('CourseCode', '==', 'TEST101'));

        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
            const firstStudent = querySnapshot.docs[0].data();
            setStudentData(firstStudent);
            }
        } catch (error) {
            console.error('Error fetching student data: ', error);
        }
    };

    fetchStudentData();
  }, []);


    return(
        <div className="home">
            <div className="home-logo-container">
                <Link to = "/">
                    <img className="home-logo" src = {dpLogo} alt = "logo" />
                </Link>
                <div className="headerTitles">
                    <h1 className="title">Dynamic Programming Bootcamp</h1>
                    <p className="subtitle">Practice makes perfect | Sharpen your skills | Move at your own pace</p>
                </div>
            </div>

            <div className="home-container">
                <div className="home-side-container">
                        <div className="profile-container">
                            <img className="profile-pic" src = {profilePic}/>
                            <div className="profile-details-container">
                            {studentData && (
                                <>
                                <h1>{studentData.Name}</h1>
                                <h3>{studentData.Email}</h3>
                                </>
                            )}
                            </div>
                        </div>
                    <b>Achievements:</b>
                    <div className="achievement">
                        <img className="achievement-pic" src = {achievementPic}></img>
                        <p>Made an account</p>
                    </div>
                    <div className="achievement">
                        <img className="achievement-pic" src = {achievementPic}></img>
                        <p>Ate an apple</p>
                    </div>
                    <div className="achievement">
                        <img className="achievement-pic" src = {achievementPic}></img>
                        <p>Did a third cool thing</p>
                    </div>
                    <b>Current Streak: 0 days</b>
                </div>
                <div className="home-main-container">
                    <h1>Practice</h1>
                    <button type = "submit" className = "home-button">Introduction</button>
                    <button type = "submit" className = "home-button">Top-down Approach</button>
                    <button type = "submit" className = "home-button">Bottom-up Approach</button>
                    <button type = "submit" className = "home-button">Final Test</button>
                </div>
            </div>
        </div>
    );
}

export default Home;