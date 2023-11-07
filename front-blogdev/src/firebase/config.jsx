import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
l
const firebaseConfig = {
  apiKey: "AIzaSyC9LaiRD7PbUebnlFTQhjomCnEcQFGNvHc",
  authDomain: "blogdev-jhow.firebaseapp.com",
  projectId: "blogdev-jhow",
  storageBucket: "blogdev-jhow.appspot.com",
  messagingSenderId: "521260318752",
  appId: "1:521260318752:web:0924578ee758246bf1fc45",
  measurementId: "G-R4NL9G9NX2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db}