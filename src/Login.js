import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png';
import { useNavigate } from "react-router-dom";
import dpGif from './Images/bg2.gif';

//For form validation
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

//Database 
// Firebase imports
import { auth, db } from './Database/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from "./Database/Auth";

function Login() {
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
    
    //For validation
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required.')
            .email('Invalid email format.'),
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
            signInWithEmailAndPassword(auth, e.email, e.password)
            
            .then((userCredential) => {
                console.log("UserCredential: ", userCredential.user.uid)
                alert('Signed in successfully')
                navigate('/home'); 

            }).catch((error) => {
                alert('Failed to login: ' + error.message);
            })
            
        }
    }

    return (
        <div className = "login">
            <div className="landing-background">
             <img src={dpGif} alt="Background GIF" />
            </div>

            
            <Link to = "/">
                <img className="login-logo" src = {dpLogo} alt = "logo" />
            </Link>

            <div className = "login-container">
                <h1>Login</h1>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <label htmlFor="email">EMAIL</label>
                        <div>
                            <Field type="text" id="email" className="login-field" name="email" placeholder="Enter your email address"/>
                            <ErrorMessage name="email" className="login-errMsg" component="div"/>
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
                <p>Don't have an account? <Link to = "/Register"> REGISTER</Link></p>
            </div>
        </div>
    );
}


export default Login;