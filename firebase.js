// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyAq7n4PTOLgYGPqUhTNMTmVmkPhevRUFGs",
  authDomain: "notesit-82c59.firebaseapp.com",
  projectId: "notesit-82c59",
  storageBucket: "notesit-82c59.appspot.com",
  messagingSenderId: "727007583840",
  appId: "1:727007583840:web:f4cd4ece0dae0c7f7aed05",
  measurementId: "G-ZX7DBRN836"

};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)