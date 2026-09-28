// initializeApp запускає Firebase у нашому React-застосунку.
// getDatabase дає нам доступ саме до Realtime Database.
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDi-KTxEM7t3luN9SoZsSEULyMJjHSUy7w",
  authDomain: "learnlingo-ce0a1.firebaseapp.com",
  projectId: "learnlingo-ce0a1",
  storageBucket: "learnlingo-ce0a1.firebasestorage.app",
  messagingSenderId: "754240145980",
  appId: "1:754240145980:web:d7812f0cc0cf46ce755139",
  measurementId: "G-1WGT0Q3ND4",
  databaseURL: "https://learnlingo-ce0a1-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
