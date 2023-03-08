// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF5MujGJtkDAPZpz6QFAzj5HfhA-rVO2I",
  authDomain: "my-daily-notes-f0e6e.firebaseapp.com",
  projectId: "my-daily-notes-f0e6e",
  storageBucket: "my-daily-notes-f0e6e.appspot.com",
  messagingSenderId: "715204811538",
  appId: "1:715204811538:web:b77be9079736419f4ab1cb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


