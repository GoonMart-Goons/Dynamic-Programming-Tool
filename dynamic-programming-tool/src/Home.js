import React, { useState, useEffect,useContext } from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import "./Styles/Home.css";
import dpLogo from './Images/dp2.png';
import profilePic from './Images/profile.png';
import achievementPic from './Images/achievement.png';
import { useNavigate } from "react-router-dom";
import '@coreui/coreui/dist/css/coreui.min.css'
import { db, auth } from './Database/firebase';
import {
    CButton,
    CContainer, CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle,
    CNavbar,
    CNavbarBrand,
} from "@coreui/react";
import { AuthContext } from "./Database/Auth";
import {getBadges} from "./Database/Functions";

function Home(){
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

    const {currentUser, userData} = useContext(AuthContext);

    const [badges, setBadges] = useState([]);

    useEffect(() => {
        // Fetch badges and update the state when the component mounts
        const fetchBadges = async () => {
        const badgeNames = await getBadges(currentUser.uid);
        setBadges(badgeNames);
        //console.log("Badges", badges);
        };

        fetchBadges();
    }, [currentUser.uid]);

    //console.log("Badges", badges);
    
    return(
        <div className="home">
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
                            {userData && (
                                <>
                                <h1>{userData.Name} {userData.Surname}</h1>
                                <h3>{userData.Email}</h3>
                                </>
                            )}
                            </div>
                        </div>
                    <b>Achievements:</b>
                    {badges.length > 0 ? (
                        badges.map((badgeName, index) => (
                            <div className="achievement" key={index}>
                            <img className="profile-pic" src={achievementPic} alt="" />
                            <p>{badgeName}</p>
                            </div>
                        ))
                    ) : (
                    <p style={{ marginLeft: '30px' }}>No badges yet</p>
                    )}

                </div>
                <div className="home-main-container">
                    <h1>Practice</h1>
                    <button type = "submit" className = "home-button" onClick= {() => navigate('/introduction')}>Introduction</button>
                    <button type = "submit" className = "home-button" onClick= {() => navigate('/questionsh')}>Questions</button>
                    <button type = "submit" className = "home-button" onClick= {() => navigate('/topdowntest')}>Graphing Tool</button>
                </div>
            </div>
        </div>
    );
}

export default Home;