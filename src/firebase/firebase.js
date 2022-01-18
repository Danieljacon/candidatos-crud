import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDp4BkRB5kQ-W5UT5C6vuRGU8Xf5e5rKPI",
  authDomain: "crud-applay.firebaseapp.com",
  projectId: "crud-applay",
  storageBucket: "crud-applay.appspot.com",
  messagingSenderId: "365529224961",
  appId: "1:365529224961:web:465b2801db299add392d00",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
