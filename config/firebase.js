// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { API_KEY } from "@env";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
