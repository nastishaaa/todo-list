import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

interface Firebase {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string, 
    messagingSenderId: string, 
    appId: string,
    measurementId: string,
}

const firebaseConfig: Firebase = {
    apiKey: "AIzaSyCJeN9ZPfej5BSaatRylaKh5Kf65S3oaLo",
    authDomain: "todo-app-daa02.firebaseapp.com",
    databaseURL: "https://todo-app-daa02-default-rtdb.firebaseio.com",
    projectId: "todo-app-daa02",
    storageBucket: "todo-app-daa02.firebasestorage.app",
    messagingSenderId: "563699767843",
    appId: "1:563699767843:web:b602a00916ed1650e02f96",
    measurementId: "G-MT98F99T27"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);