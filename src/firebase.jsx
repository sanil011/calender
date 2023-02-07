import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBruK00Nq_qz5QLp0e2wzYWu_4OcdMWvkQ",
    authDomain: "calendly-2d838.firebaseapp.com",
    projectId: "calendly-2d838",
    storageBucket: "calendly-2d838.appspot.com",
    messagingSenderId: "793017753146",
    appId: "1:793017753146:web:e692f554aa62eb8ed1df03",
    measurementId: "G-2YDLQ0RZ10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app);