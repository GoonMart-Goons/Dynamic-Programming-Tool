import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Header.css";

function Header() {
    return (
        <nav className = "header">
            <img className = "header-logo" src = "./Images/download.png" alt = "logo" />
            <Link to = "/" className="header-link">
            <div className = "header-option">
                <span className = "header-optionLineOne">Hi, Welcome to Dynamic Programming World!</span>
                <span className = "header-optionLineTwo">Log In</span>
            </div>
            </Link>
        </nav> 
    );
}


export default Header;