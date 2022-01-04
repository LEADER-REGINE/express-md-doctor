import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuW4rRLBz0xHlJIbZd1zi8JJUxUaz5GZY",
    authDomain: "expressmd-159c1.firebaseapp.com",
    databaseURL: "https://expressmd-159c1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expressmd-159c1",
    storageBucket: "expressmd-159c1.appspot.com",
    messagingSenderId: "313609030451",
    appId: "1:313609030451:web:3d476d8f20f963e7c0cc46"
};

firebase.initializeApp(firebaseConfig);


export { firebase as default };