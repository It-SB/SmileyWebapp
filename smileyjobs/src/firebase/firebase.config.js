// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, query, where, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdEmssWSfRcBRAWW9S70ZsSoSBJvtDIRc",
  authDomain: "smileyjobs-78778.firebaseapp.com",
  projectId: "smileyjobs-78778",
  storageBucket: "smileyjobs-78778.appspot.com",
  messagingSenderId: "990753476236",
  appId: "1:990753476236:web:93037555a2316a436ef5a9",
  measurementId: "G-90TFFR2ZNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { db };

export default app;
export {collection, query, where, getDocs,addDoc, deleteDoc, doc };