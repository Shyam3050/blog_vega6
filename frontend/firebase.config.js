import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuC8TXblZHbpFBTnk8uK6SSqrID8MBQk0",
  authDomain: "vega6blogs.firebaseapp.com",
  projectId: "vega6blogs",
  storageBucket: "vega6blogs.appspot.com",
  messagingSenderId: "373394451331",
  appId: "1:373394451331:web:791d69219493e1c84764b6",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
