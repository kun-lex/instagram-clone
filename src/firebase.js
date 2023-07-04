import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDw3cTnZf7vHcwMJpHH9Cf_Djg8Bjo9W1Q",
    authDomain: "instagram-clone-react-bc34d.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-bc34d-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-react-bc34d",
    storageBucket: "instagram-clone-react-bc34d.appspot.com",
    messagingSenderId: "421142938849",
    appId: "1:421142938849:web:9251bf2a7a640c257663a0",
    measurementId: "G-9YE72GF88G"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
