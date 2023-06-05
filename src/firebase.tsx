// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGUY3wedHonxJBljepycseSKYYZh9mjEo",
  authDomain: "fir-7cc15.firebaseapp.com",
  databaseURL: "https://fir-7cc15-default-rtdb.firebaseio.com",
  projectId: "fir-7cc15",
  storageBucket: "fir-7cc15.appspot.com",
  messagingSenderId: "9676430583",
  appId: "1:9676430583:web:6d2d87887eeb4fd2d307f2",
  measurementId: "G-ZE8P35JM11"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);