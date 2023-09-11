import React from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Register.css";
import dpLogo from './Images/dp2.png';
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    return (
        <div className = "register">
            <Link to = "/">
                <img className="register-logo" src = {dpLogo} alt = "logo" />
            </Link>

            <div className = "register-container">
                <h1>Register to DP World</h1>
                <form onSubmit = {() => navigate('/login')}>
                    <h5>NAME</h5>
                    <input type = "text" placeholder="Enter your firstname" />

                    <h5>SURNAME</h5>
                    <input type = "text" placeholder="Enter your lastname" />

                    <h5>STUDENT NUMBER</h5>
                    <input type = "text" placeholder="Enter your student number" />

                    <h5>PASSWORD</h5>
                    <input type = "password" placeholder="Enter your password" />

                    <h5>COURSE CODE</h5>
                    <input type = "text" placeholder="Enter your course code" />

                    <label className="register-dropdown" htmlFor="dropdown">Select your role: </label>
                    <select id="dropdown" name="roles">
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                        <option value="tutor">Tutor</option>
                        <option value="lecturer">Lecturer</option>
                    </select>







                    <button type = "submit" className = "register-button">REGISTER</button>



                </form>

                <p> By registering you agree to DP World's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>
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


export default Register;