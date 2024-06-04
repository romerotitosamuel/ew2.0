// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMyxIJpJTjn7gtF_ol7jIj0xDWl5RqZVw",
  authDomain: "emanuel-worship.firebaseapp.com",
  projectId: "emanuel-worship",
  storageBucket: "emanuel-worship.appspot.com",
  messagingSenderId: "876281894757",
  appId: "1:876281894757:web:03dbcc0af5ccb8bd6a338c",
  measurementId: "G-3DWYK2G5JK"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp);

export default firebaseApp

/* MODOD PRODUCCION -----------------
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}

MODO DE PRUEBA ----------------
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
        request.time < timestamp.date(2022, 2, 14);
    }
  }
}

*/  