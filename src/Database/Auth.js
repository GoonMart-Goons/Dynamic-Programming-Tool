import React, { useEffect, useState } from "react";
import {auth, db} from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

  const storedUser = localStorage.getItem("currentUser"); //Keeps token when page is refreshed
  const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      // Fetch user data when the user changes
      if (user) {
        // Save the user data to localStorage
        localStorage.setItem("currentUser", JSON.stringify(user));

        const fetchUserData = async () => {
          const userRef = doc(db, "Users", user.uid); // Change variable name here

          getDoc(userRef)
            .then((docSnapshot) => {
              if (docSnapshot.exists()) {
                // Document exists, access its data using docSnapshot.data()
                setUserData(docSnapshot.data()); // Change variable name here

                // Save the userData to localStorage
                localStorage.setItem("userData", JSON.stringify(userData));
              } else {
                // Document does not exist
                console.log("User not found.");
              }
            })
            .catch((error) => {
              console.error("Error accessing Firestore document:", error);
            });
        };

        fetchUserData();
      }
      else{
        // Remove the user data from localStorage
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userData");
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};