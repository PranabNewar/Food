// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTUO3-9SUfr7ZP-4X_jU5Kf_PeeaoW2rE",
  authDomain: "food-c56d1.firebaseapp.com",
  projectId: "food-c56d1",
  storageBucket: "food-c56d1.appspot.com",
  messagingSenderId: "965491129558",
  appId: "1:965491129558:web:66cbd23d80b2dfe4e31d77",
  measurementId: "G-040ZHEFN2Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
 