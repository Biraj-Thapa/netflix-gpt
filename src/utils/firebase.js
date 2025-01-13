// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1D1jQlJr5GjXPTnvS9UWm3I03zy4nOY4",
  authDomain: "netflix-gpt-ac7b1.firebaseapp.com",
  projectId: "netflix-gpt-ac7b1",
  storageBucket: "netflix-gpt-ac7b1.firebasestorage.app",
  messagingSenderId: "175397061929",
  appId: "1:175397061929:web:f7d33003e0ced50aefe338",
  measurementId: "G-74DXPSS374"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth()