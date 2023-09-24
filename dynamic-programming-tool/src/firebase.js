// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from 'firebase/auth';
//import { useNavigate } from "react-router-dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfYMzA3W644n00jaxEr6f8l-UGmZKosqI",
  authDomain: "dp-database-98ee6.firebaseapp.com",
  projectId: "dp-database-98ee6",
  storageBucket: "dp-database-98ee6.appspot.com",
  messagingSenderId: "353510129311",
  appId: "1:353510129311:web:ff08a8ad990ce465b66caa",
  measurementId: "G-Q7L1D7Q9XN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()
const db = getFirestore(app);


export { auth, db, app}