// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAj3H57fnV1WfeJcNRMg2NCqLtv8WsLjDQ",
    authDomain: "metamaap-proj.firebaseapp.com",
    projectId: "metamaap-proj",
    storageBucket: "metamaap-proj.appspot.com",
    messagingSenderId: "980463927463",
    appId: "1:980463927463:web:a2e7c07f36022b65571b82",
    measurementId: "G-T2GF7S0RRV"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); //populate db variable with all the firebase basic info