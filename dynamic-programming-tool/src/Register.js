import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Yup is a library for defining validation schemas
import { Link } from "react-router-dom";
import "./Styles/Register.css";
import dpLogo from './Images/dp2.png';
import { useNavigate } from "react-router-dom";

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
            <Link to="/">
                <img className="register-logo" src={dpLogo} alt="logo" />
            </Link>

            <div className="register-container">
                <h1>Register to DP World</h1>

                <form onSubmit={formik.handleSubmit}>
                   <div className="title-error"> <h5>NAME</h5>
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


                   <div className="title-error"><h5>SURNAME</h5>
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


                    <div className="title-error"><h5>EMAIL</h5>
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


                    <div className="title-error"><h5>PASSWORD</h5>
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
                        Select your role:
                    </label>
                    <select
                        id="role"
                        name="role"
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

                    <button type="submit" className="register-button">
                        REGISTER
                    </button>
                </form>

                {/* Privacy notice */}
                <p>
                    By registering you agree to DP World's Conditions of Use & Sale.
                    Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
            </div>
        </div>
    );
}

export default Register;