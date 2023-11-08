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
  apiKey: "AIzaSyA_j4jk_hXPzel6QhvVt0P0Cfb2q5wt0oM",
  authDomain: "dp-project2.firebaseapp.com",
  projectId: "dp-project2",
  storageBucket: "dp-project2.appspot.com",
  messagingSenderId: "1010238761306",
  appId: "1:1010238761306:web:768bccc7cc75f24f5d6b63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()
const db = getFirestore(app);


export { auth, db, app}