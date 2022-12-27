import {getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBuWQ3cvExmwELIuDj9v4M9ATs1TzQtYrQ",
    authDomain: "foodrunner-196fa.firebaseapp.com",
    databaseURL: "https://foodrunner-196fa-default-rtdb.firebaseio.com",
    projectId: "foodrunner-196fa",
    storageBucket: "foodrunner-196fa.appspot.com",
    messagingSenderId: "9447721494",
    appId: "1:9447721494:web:0100247e3f61eaa2d50337",
    measurementId: "G-L40NFERP6Q"
};

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export { app, firestore, storage };

