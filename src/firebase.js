import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'

const firebaseConfig = {  
    apiKey: "AIzaSyAbGdikQekczc39Yk2xeLwCybXdzgGkCtQ",
    authDomain: "itu-proj-7551d.firebaseapp.com",
    projectId: "itu-proj-7551d",
    storageBucket: "itu-proj-7551d.appspot.com",
    messagingSenderId: "837052797351",
    appId: "1:837052797351:web:e378a5833811f104812682",
    measurementId: "G-G4F5RZGZM7"
};

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  const db = firebase.firestore(firebase.initializeApp(firebaseConfig));
  const UsersRef = db.collection("users")
  const RecipeRef = db.collection("recipe")
  const IngredientRef = db.collection("ingredient");

  export { auth, UsersRef, RecipeRef, IngredientRef };