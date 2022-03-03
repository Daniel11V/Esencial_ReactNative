import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC_VTQaveDhXoL9muhwS23ASdgP-lfZ4sA",
    authDomain: "esencial.firebaseapp.com",
    databaseURL: "https://esencial-default-rtdb.firebaseio.com",
    projectId: "esencial",
    storageBucket: "esencial.appspot.com",
    messagingSenderId: "630395241807",
    appId: "1:630395241807:web:869a8e8ba6e79f1292713a",
    measurementId: "G-JQTC8YL7RS"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getDatabase(firebaseApp)