import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "da-ta-8db6c.firebaseapp.com",
  projectId: "da-ta-8db6c",
  storageBucket: "da-ta-8db6c.appspot.com",
  messagingSenderId: "26375624943",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-6VSCH7ZNJ5",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const firestore = app.firestore();
export const firebaseStorage = app.storage();
