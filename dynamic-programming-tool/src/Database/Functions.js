import {db} from "./firebase";
import { doc, getDoc, setDoc, collection, getDocs, updateDoc } from "firebase/firestore";

const Badges = {
    5: "5 excercises at this difficulty completed!",
    10: "10 excercises at this difficulty completed!",
    25: "25 excercises at this difficulty completed!"
}

export const increaseCompletionCount = async (userId, difficulty) => {
    try {

        // Reference to the "Users" collection
        const usersCollection = collection(db, 'Users');

        const userDocRef = doc(usersCollection, userId);
    
        // Reference to the "Exercises" subcollection within the user's document
        const exercisesCollection = collection(userDocRef, 'Exercises');

        // Reference to the "exerciseDocument" document within the "Exercises" subcollection
        const exerciseDocRef = doc(exercisesCollection, 'exerciseDocument');

        // Check if the "exerciseDocument" document exists
        const exerciseDocSnapshot = await getDoc(exerciseDocRef);

        let newCompletionValue;

        // If the document doesn't exist
        if (!exerciseDocSnapshot.exists()) {
            const updateData = {
              [difficulty]: 1,
            };
           
            await setDoc(exerciseDocRef, updateData);
        }
        //If the field is undefined, create a new field.
        else if(exerciseDocSnapshot.data()[difficulty] === undefined) {
            const updateData = {
              [difficulty]: 1,
            };
            
            // Use updateDoc to add the new field without overwriting existing data.
            await updateDoc(exerciseDocRef, updateData);
        }
        else {
            newCompletionValue = exerciseDocSnapshot.data()[difficulty] + 1;
            // Increment the existing field's value.
            await setDoc(exerciseDocRef, { [difficulty]: newCompletionValue }, { merge: true });
        }
       
        //console.log('Completion count increased for user', userId, "at difficulty", difficulty);

        // Check if newEasyValue matches a key in the easyBadges object
        if (Badges[newCompletionValue]) {
            // Reference to the "Badges" subcollection within the user's document
            const badgesCollection = collection(userDocRef, 'Badges');
    
            // Create a new document within the "Badges" subcollection with the number as the field name
            const badgeDocRef = doc(badgesCollection, difficulty+newCompletionValue.toString());
    
            // Set the field value to the corresponding string from easyBadges
            await setDoc(badgeDocRef, { message: Badges[newCompletionValue] });
            
            alert(`Congradulations! New badge for ${Badges[newCompletionValue]}`);
            //console.log('Badge created for user', userId, 'with message:', Badges[newCompletionValue]);
        }
    } catch (error) {
        console.error('Error updating completion count:', error);
    }
};

export const getBadges = async (userId) => {
    try {

        // Reference to the "Users" collection
        const usersCollection = collection(db, 'Users');

        const userDocRef = doc(usersCollection, userId);

        // Reference to the "Badges" subcollection within the user's document
        const badgesCollection = collection(userDocRef, 'Badges');
        
        // Get all documents in the "Badges" subcollection
        const badgesQuerySnapshot = await getDocs(badgesCollection);

        const badgeNames = [];

        badgesQuerySnapshot.forEach((badgeDoc) => {
            // Extract the name (key) of each document
            badgeNames.push(badgeDoc.id);
        });

        return badgeNames;

        //localStorage.setItem("badgeNames", JSON.stringify(badgeNames));
    
    } catch (error) {
        console.error('Error in getting badge list:', error);
        return [];
        //localStorage.setItem("badgeNames", JSON.stringify([]));
    }

};