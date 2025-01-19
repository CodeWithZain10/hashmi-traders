// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeINC0ZqE8nkkxQU8Ksu3Wjrc9220jMEY",
  authDomain: "hashmi-traders-38947.firebaseapp.com",
  projectId: "hashmi-traders-38947",
  storageBucket: "hashmi-traders-38947.firebasestorage.app",
  messagingSenderId: "269556638482",
  appId: "1:269556638482:web:c2d8c4c9a74934631509cb",
  measurementId: "G-HNRXDMGM92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };
