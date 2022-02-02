import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnGPQ02cNB1WPkK_9QFX23Te3GE4u2c-c",
    authDomain: "expressmd-10ee8.firebaseapp.com",
    databaseURL: "https://expressmd-10ee8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expressmd-10ee8",
    storageBucket: "expressmd-10ee8.appspot.com",
    messagingSenderId: "620512705710",
    appId: "1:620512705710:web:f73178389b7230db5e013f",
    measurementId: "G-E9F5L6S1CX"
};

firebase.initializeApp(firebaseConfig);


export { firebase as default };