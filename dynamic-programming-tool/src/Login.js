import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png';
import { useNavigate } from "react-router-dom";

//For form validation
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'


function Login() {
    const navigate = useNavigate();
    
    //For validation
    const validationSchema = Yup.object().shape({
        studentNumber: Yup.string()
            .required('Student number is required')
            .matches(/^[0-9]+$/, 'Student number must consist of numbers only.')
            .length(7, 'Student number must be 7 digits.'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters.'),
    })

    const handleSubmit = (e) => {
        const errors = Object.keys(e).reduce((acc, fieldName) => {
            try{
                validationSchema.validateSyncAt(fieldName, e)
                return acc
            } catch (error) {
                return { ...acc, [fieldName]: error.message }
            }
        }, {})
        
        console.log("Errors:", errors)

        if(Object.keys(errors).length === 0){
            navigate('/home')
        }
    }

    return (
        <div className = "login">
            <Link to = "/">
                <img className="login-logo" src = {dpLogo} alt = "logo" />
            </Link>

            <div className = "login-container">
                <h1>Login to DP World</h1>
                <Formik
                    initialValues={{ studentNumber: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <label htmlFor="studentNumber">STUDENT NUMBER</label>
                        <div>
                            <Field type="text" id="studentNumber" className="login-field" name="studentNumber" placeholder="Enter your student number"/>
                            <ErrorMessage name="studentNumber" className="login-errMsg" component="div"/>
                        </div>

                        <label htmlFor="password">PASSWORD</label>
                        <div>
                            <Field type="password" className="login-field" name="password" placeholder="Enter your password"/>
                            <ErrorMessage name="password" className="login-errMsg" component="div"/>
                        </div>
                        
                        <button type = "submit" className = "login-button">LOGIN</button>
                    </Form>
                </Formik>

                {/* <form onSubmit = {handleSubmit}>
                    <h5>STUDENT NUMBER</h5>
                    <input type = "text" placeholder="Enter your student number" />

                    <h5>PASSWORD</h5>
                    <input type = "password" placeholder="Enter your password" />

                    <button type = "submit" className = "login-button">LOGIN</button>

                </form> */}

                <p> By logging in you agree to DP World's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>
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