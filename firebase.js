// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCih4ApQ2h_TYymwlXRXr0BupW126NecsM",
  authDomain: "pantryapi-64512.firebaseapp.com",
  projectId: "pantryapi-64512",
  storageBucket: "pantryapi-64512.appspot.com",
  messagingSenderId: "542712169962",
  appId: "1:542712169962:web:00755dfcc41f1a46931e93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export  {
    app, 
    firestore
}