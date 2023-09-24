import React, { useState, useEffect,useContext } from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png';
import profilePic from './Images/profile.png';
import achievementPic from './Images/achievement.png';
import "./Styles/Home.css";
import { useNavigate } from "react-router-dom";
import '@coreui/coreui/dist/css/coreui.min.css'
import { db, auth } from './firebase';
import { doc,  getDoc } from 'firebase/firestore';
import {
    CButton,
    CContainer, CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle,
    CNavbar,
    CNavbarBrand,
} from "@coreui/react";
import { AuthContext } from "./Auth";

function Home(){
    const [studentData, setStudentData] = useState(null);

    //const loggedInUserID = sessionStorage.getItem('loggedInUserID');

    const navigate = useNavigate();

    const {currentUser} = useContext(AuthContext);
    //console.log("current User Home: ", currentUser);
    //console.log("Home UID: ", currentUser.uid);

    useEffect(() => {
        const fetchStudentData = async () => {
        const studentRef = doc(db, 'Students',  currentUser.uid);
        //const q = query(studentsRef, where('id', '==', loggedInUserID));

        getDoc(studentRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
            // Document exists, access its data using docSnapshot.data()
            setStudentData(docSnapshot.data());
            console.log('Doc Snapshot:', docSnapshot.data());
            //console.log('Student Data:', studentData);
            } else {
            // Document does not exist
            console.log('Student not found.');
            }
        })
        .catch((error) => {
            console.error('Error accessing Firestore document:', error);
        });
    };

    fetchStudentData();
  }, []);

  //console.log('Student Data2:', studentData);


    return(
        <div className="home">
            {/*<div className="home-logo-container">*/}
            {/*    <Link to = "/">*/}
            {/*        <img className="home-logo" src = {dpLogo} alt = "logo" />*/}
            {/*    </Link>*/}
            {/*    <div className="headerTitles">*/}
            {/*        <h1 className="title">Dynamic Programming Bootcamp</h1>*/}
            {/*        <p className="subtitle">Practice makes perfect | Sharpen your skills | Move at your own pace</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <>
                <CNavbar expand="lg" colorScheme="dark" className="nav">
                    <CContainer fluid>
                        <CNavbarBrand className="navLogo" href="/home">
                            <img
                                src={dpLogo}
                                alt=""
                                width="199.5"
                                height="111.72"
                                className="d-inline-block align-top"
                            />

                        </CNavbarBrand>
                        <CContainer className="headerTitles"><h1 className="title">Dynamic Programming Bootcamp</h1>
                            <p className="subtitle">Practice makes perfect | Sharpen your skills | Move at your own pace</p>
                        </CContainer>
                        <div className="signOut" >
                            <CButton className="navLink" href="/" onClick={() => auth.signOut()} type="button" color="success" variant="ghost">
                                Sign Out
                            </CButton>
                        </div>

                    </CContainer>
                </CNavbar>
            </>

            <div className="home-container">
                <div className="home-side-container">
                        <div className="profile-container">
                            <img className="profile-pic" src = {profilePic}/>
                            <div className="profile-details-container">
                            {studentData && (
                                <>
                                <h1>{studentData.Name} {studentData.Surname}</h1>
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
                    <button type = "submit" className = "home-button" onClick= {() => navigate('/introduction')}>Introduction</button>
                    <button type = "submit" className = "home-button" onClick= {() => navigate('/topdown')}>Top-down Approach</button>
                    <button type = "submit" className = "home-button" onClick= {() => navigate('/bottomup')}>Bottom-up Approach</button>
                    <button type = "submit" className = "home-button">Final Test</button>
                </div>
            </div>
        </div>
    );
}

export default Home;