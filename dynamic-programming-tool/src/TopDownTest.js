import React from "react";
import "./Styles/Login.css";
import "./Styles/Home.css";
import Navbar from "./Components/Navbar";
import GraphView from "./Components/graph";



function TopDownTest(){

    return(
        <div className="top-down">
            <Navbar placeholder=""></Navbar>
            <div>
                <GraphView/>
                <button className = "home-button">Submit answer</button>
            </div>
        </div>
    );
}

export default TopDownTest;