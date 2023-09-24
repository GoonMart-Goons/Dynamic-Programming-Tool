import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png';
import { useNavigate } from "react-router-dom";

//For form validation
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

//Database
// Firebase imports
import { auth, db } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from "./Auth";
import { collection, query, where, getDocs } from 'firebase/firestore';

// Allows us to access the logged in user's ID from any page 
export let loggedInUserID

//Gets the user's ID by querying with their email
async function getUserIdByEmail(email){
    try{
      const usersRef = collection(db, "Students")
      const q = await getDocs(query(usersRef, where("Email", "==", email)))
  
      if(q.empty){
        loggedInUserID = null
        return
      }
      loggedInUserID = q.docs[0].id
      sessionStorage.setItem("loggedInUserID", q.docs[0].id)
      console.log("User's ID:", loggedInUserID)
    } catch(error){
      console.error("Error trying to get User ID:", error)
      loggedInUserID = null
    }
  }

function Login() {
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
                //getUserIdByEmail(e.email)
                //.then(() => {
                //if(loggedInUserID){
                    //console.log("User ID:", loggedInUserID)
                    //console.log("UserCredential ", userCredential.user)
                    alert('Signed in successfully')
                    navigate('/home'); // navigate to the HOME pag
                //} 
                //})
                //.catch(error => {
                //console.log("Error:", error)
                //})
                 //delay for 2 seconds (2000 milliseconds)
            }).catch((error) => {
                //console.log("Failed to login: ", error)
                alert('Failed to login: ' + error.message);
                
            })
            
        }
    }

    //const {currentUser} = useContext(AuthContext);
    //if(currentUser){
    //    return <Link to="/home"/>;
   // }

    return (
        <div className = "login">
            <Link to = "/">
                <img className="login-logo" src = {dpLogo} alt = "logo" />
            </Link>

            <div className = "login-container">
                <h1>Login to DP World</h1>
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