// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firebase-firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnqXM5XT2LQpvwMJ_-Cjk8GEABhd3CAtE",
  authDomain: "chapsnat-9f43b.firebaseapp.com",
  projectId: "chapsnat-9f43b",
  storageBucket: "chapsnat-9f43b.appspot.com",
  messagingSenderId: "995752965279",
  appId: "1:995752965279:web:f94d0f0aa20b205ee75eaa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let firestore = firebase.firestore();
export default firestore;