import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw3cTnZf7vHcwMJpHH9Cf_Djg8Bjo9W1Q",
  authDomain: "instagram-clone-react-bc34d.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-bc34d-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-react-bc34d",
  storageBucket: "instagram-clone-react-bc34d.appspot.com",
  messagingSenderId: "421142938849",
  appId: "1:421142938849:web:9251bf2a7a640c257663a0",
  measurementId: "G-9YE72GF88G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app)

export { db, auth, storage};
