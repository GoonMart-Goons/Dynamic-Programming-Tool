import React, {useContext} from "react";
import "./Styles/Login.css";
import "./Styles/Home.css";
import Navbar from "./Navbar";
import GraphView from "./Components/graph";
import {increaseCompletionCount} from "./Database/Functions";
import { AuthContext } from "./Database/Auth";

const difficulty = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard"
}


function TopDownTest(){
    const {currentUser, userData} = useContext(AuthContext);

    return(
        <div className="top-down">
            <Navbar data-testid="nav-bar" placeholder=""></Navbar>
            <div>
                <GraphView/>
                {/* The difficulty used here is a temp example depending on the mode the user is in*/}
                <button className = "home-button" onClick={() => increaseCompletionCount(currentUser.uid, difficulty.easy)} >Submit answer</button>
            </div>
        </div>
    );
}

export default TopDownTest;