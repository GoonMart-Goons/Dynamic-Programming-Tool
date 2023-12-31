import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Yup is a library for defining validation schemas
import { Link } from "react-router-dom";
import "./Styles/Register.css";
import dpLogo from './Images/dp2.png';
import { useNavigate } from "react-router-dom";
import dpGif from './Images/bg2.gif';

//Database
import { auth, db } from './Database/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {setDoc, doc } from "@firebase/firestore";

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First name is required")
        .matches(/^[A-Za-z]+$/, "First name should not contain numbers"),
    lastName: Yup.string()
        .required("Last name is required")
        .matches(/^[A-Za-z]+$/, "Last name should not contain numbers"),
    studentEmail: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one digit")
        .matches(/[!@#$%^&*()_+]/, "Password must contain at least one special character"),
    role: Yup.string().required("Role is required"),
});


function Register() {
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
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            studentEmail: "",
            password: "",
            role: "student",
        },
        validationSchema,
        onSubmit: values => {
            // Handle form submission
            createUserWithEmailAndPassword(auth, values.studentEmail, values.password)

            .then((userCredential) => {
                setDoc(doc(db, 'Users', userCredential.user.uid), {
                    Name: values.firstName,
                    Surname: values.lastName,
                    Email: values.studentEmail,
                    Role: values.role
                })
                alert('Registered successfully! Please sign in');
                navigate('/login');

            }).catch((error) => {
                alert("Failed to register: " + error.messsage);
            })
        },
    });


    return (
        <div className="register">

            <div className="landing-background">
             <img src={dpGif} alt="Background GIF" />
            </div>

            <Link to="/">
                <img className="register-logo" src={dpLogo} alt="logo" />
            </Link>

            <div className="register-container">
                <h1 className="register-head">Register</h1>

                <form onSubmit={formik.handleSubmit} role="form">
                   <div className="title-error"> NAME
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="error-message">{formik.errors.firstName}</div>
                    ) : null} </div>
                    <input
                        id="firstName"
                        type="text"
                        placeholder="Enter your firstname"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />


                   <div className="title-error">SURNAME
                       {formik.touched.lastName && formik.errors.lastName ? (
                           <div className="error-message">{formik.errors.lastName}</div>
                       ) : null} </div>
                    <input
                        id="lastName"
                        type="text"
                        placeholder="Enter your lastname"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />


                    <div className="title-error">EMAIL
                        {formik.touched.studentEmail && formik.errors.studentEmail ? (
                            <div className="error-message">{formik.errors.studentEmail}</div>
                        ) : null}</div>
                    <input
                        id="studentEmail"
                        type="text"
                        placeholder="Enter your email"
                        name="studentEmail"
                        value={formik.values.studentEmail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />


                    <div className="title-error">PASSWORD
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error-message">{formik.errors.password}</div>
                        ) : null} </div>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />




                    {/* Role dropdown */}
                    <label className="register-dropdown" htmlFor="dropdown">
                        ROLE
                    </label>
                    <select className="register-select"
                        id="role"
                        name="role"
                        data-testid="roleselect"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? (
                        <div className="error-message">{formik.errors.role}</div>
                    ) : null}

                    <button type="submit" className="register-button" data-testid="register-button">
                        REGISTER
                    </button>
                </form>

                {/* Privacy notice */}
                <p>
                    By registering you agree to DP World's Conditions of Use & Sale.
                    Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <p>Already have an account? <Link to = "/login" > LOGIN</Link></p>

            </div>
        </div>
    );
}

export default Register;