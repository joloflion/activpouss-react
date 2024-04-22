import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from '@firebase/storage'; // Import Firebase storage and firestore


const firebaseConfig = {
  apiKey: "AIzaSyDgeJPOL-qy_wxsc-tleSl3rqp2GfCX-GU",
  authDomain: "activpouss-306c9.firebaseapp.com",
  projectId: "activpouss-306c9",
  storageBucket: "activpouss-306c9.appspot.com",
  messagingSenderId: "986827560217",
  appId: "1:986827560217:web:91324b5f89dfed900d6188",
  measurementId: "G-XE7D5K2FCF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);


