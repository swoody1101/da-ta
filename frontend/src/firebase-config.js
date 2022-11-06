import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCQeu4Uz4LmGCEe6nHxve-N5R8_2f21ukQ",
	authDomain: "da-ta-8db6c.firebaseapp.com",
	projectId: "da-ta-8db6c",
	storageBucket: "da-ta-8db6c.appspot.com",
	messagingSenderId: "26375624943",
	appId: "1:26375624943:web:4ac27e75b73fa34dc1e31a",
	measurementId: "G-6VSCH7ZNJ5",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const firestore = app.firestore();
export const firebaseStorage = app.storage();
