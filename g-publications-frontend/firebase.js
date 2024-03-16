// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAJtPKDIZ_728UWbdSH91EXcB4OH1hl9k",
  authDomain: "glorious-publications-d81d3.firebaseapp.com",
  projectId: "glorious-publications-d81d3",
  storageBucket: "glorious-publications-d81d3.appspot.com",
  messagingSenderId: "392724292684",
  appId: "1:392724292684:web:815f5de437807349cfc0e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);


export { storage, auth };
