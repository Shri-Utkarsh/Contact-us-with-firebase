import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDW-TT3EBSd8HMcMHESp-bTM5-oOh_6ua4",
  authDomain: "fir-contact-app-18180.firebaseapp.com",
  projectId: "fir-contact-app-18180",
  storageBucket: "fir-contact-app-18180.appspot.com",
  messagingSenderId: "108084984871",
  appId: "1:108084984871:web:dcad8f00721247ea0e6202",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
