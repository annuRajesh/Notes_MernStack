// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrc08Gb4AlLRAF5oo8_agPWq_JEbfWUy0",
  authDomain: "notes-mernstack.firebaseapp.com",
  projectId: "notes-mernstack",
  storageBucket: "notes-mernstack.appspot.com",
  messagingSenderId: "807049985070",
  appId: "1:807049985070:web:1cbf0a55ce541945b973bf",
  measurementId: "G-4R1ESB4BQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db=getFirestore(app)
export { auth , db};