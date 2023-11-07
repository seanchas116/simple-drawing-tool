// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfL6F8vOlYMbwc9Jy1QWum0CzWtnrsU14",
  authDomain: "simple-drawing-ff8df.firebaseapp.com",
  projectId: "simple-drawing-ff8df",
  storageBucket: "simple-drawing-ff8df.appspot.com",
  messagingSenderId: "977818342935",
  appId: "1:977818342935:web:b9087282c9b239ddf7ee52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);

export const firebase = {
  app,
  rtdb,
};
