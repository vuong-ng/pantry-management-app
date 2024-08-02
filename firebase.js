// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLN5azrXMgVFvQ5dM_No32061V87gydzE",
  authDomain: "inventory-management-a6cb0.firebaseapp.com",
  projectId: "inventory-management-a6cb0",
  storageBucket: "inventory-management-a6cb0.appspot.com",
  messagingSenderId: "782016073776",
  appId: "1:782016073776:web:11119574f8407356091df5",
  measurementId: "G-EV3H2Z8YDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}