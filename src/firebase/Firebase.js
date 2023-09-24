import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD7Wuy2ZORY6WzhmTIXh5_e7RMQY6jJ-5s",
  authDomain: "filmyverse-a48e4.firebaseapp.com",
  projectId: "filmyverse-a48e4",
  storageBucket: "filmyverse-a48e4.appspot.com",
  messagingSenderId: "264239902806",
  appId: "1:264239902806:web:e9fd30ba269cd148d0cbf7",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewRef = collection(db, "review");
export const userRef = collection(db, "user");

export default app;
