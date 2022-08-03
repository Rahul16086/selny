// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { API_KEY } from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "selny-ecommerce.firebaseapp.com",
  projectId: "selny-ecommerce",
  storageBucket: "selny-ecommerce.appspot.com",
  messagingSenderId: "978528148565",
  appId: "1:978528148565:web:0789a307bfe72dece148dc",
  measurementId: "G-NNW7CE0SNZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
