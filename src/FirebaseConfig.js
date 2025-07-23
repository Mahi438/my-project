// src/firebaseConfig.js

// 🔹 Import Firebase Core & Services
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";         // For Login/Signup
import { getFirestore } from "firebase/firestore"; // For Database

// 🔐 Your Firebase Project Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeHTwk3j-XDYCFL9-RvnEE01Wp9prEjKU",
  authDomain: "majorproject-37664.firebaseapp.com",
  projectId: "majorproject-37664",
  storageBucket: "majorproject-37664.appspot.com",
  messagingSenderId: "743764711651",
  appId: "1:743764711651:web:e0b26f43d836e548a64dd6",
  measurementId: "G-Z4DGB0VMFP"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Initialize Services
const auth = getAuth(app);      // 🔐 For authentication (login/signup)
const db = getFirestore(app);   // 📦 For Firestore database

// ✅ Export both
export {auth,db};
