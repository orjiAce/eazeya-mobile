// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtu6imPj_Ja2MOg0hUbvDPuvrHAuZSpik",
    authDomain: "eazeya-8a6e2.firebaseapp.com",
    projectId: "eazeya-8a6e2",
    storageBucket: "eazeya-8a6e2.appspot.com",
    messagingSenderId: "235969224208",
    appId: "1:235969224208:web:6ffcf516b5b98e35447495"
};


// Initialize Firebase

   const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });


