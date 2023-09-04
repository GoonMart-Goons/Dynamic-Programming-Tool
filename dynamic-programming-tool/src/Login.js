import React from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png';

function Login() {
    return (
        <div className = "login">

            <Link to = "/">
                <img className="login-logo" src = {dpLogo} alt = "logo" />
            </Link>

            <div className = "login-container">
                <h1>Login to DP World</h1>
                <form>
                    <h5>STUDENT NUMBER</h5>
                    <input type = "text" placeholder="Enter your student number" />

                    <h5>PASSWORD</h5>
                    <input type = "password" placeholder="Enter your password" />

                    <button type = "submit" className = "login-button">LOGIN</button>

                </form>

                <p> By loging-in you agree to DP World's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>
                {/* <Link to = "/login" className = "login-link">
                    <div className = "login-option">
                        <span className = "login-optionLineOne">Email</span>
                        <span className = "login-optionLineTwo">Password</span>
                    </div>
                </Link> */}
            </div>
        </div>
    );
}


export default Login;