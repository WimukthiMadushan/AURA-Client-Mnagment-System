import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDOMJn3xZWyhHg1G4KF8djySRuo8LZrjl8",
  authDomain: "aura-client-managment.firebaseapp.com",
  projectId: "aura-client-managment",
  storageBucket: "aura-client-managment.firebasestorage.app",
  messagingSenderId: "293598564895",
  appId: "1:293598564895:web:6da67a6a3378bdcf3afb2a",
  measurementId: "G-QRLECC25XM"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { app, db };
