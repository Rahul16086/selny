// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrpPsHOxM1tlextCqwh2tWjjWMdFOOTmU",
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

export { auth };
