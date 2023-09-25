import React from "react";
import "./Styles/Login.css";
import "./Styles/TopDown.css";
import Navbar from "./Components/Navbar";
import GraphView from "./Components/graph";



function TopDownTest(){

    return(
        <div className="top-down">
            <Navbar placeholder=""></Navbar>
            <div>
                <GraphView/>
            </div>
        </div>
    );
}

export default TopDownTest;