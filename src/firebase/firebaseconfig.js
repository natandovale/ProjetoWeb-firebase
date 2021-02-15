import firebase from 'firebase';
import 'firebase/auth'; 
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBF9um-gIuYHKgnuIzfVnYuHZkxpeSW_tE",
    authDomain: "projreact-aaba9.firebaseapp.com",
    projectId: "projreact-aaba9",
    storageBucket: "projreact-aaba9.appspot.com",
    messagingSenderId: "278843633510",
    appId: "1:278843633510:web:3bb4667df4c942825be2a7",
    measurementId: "G-72H0W25VC0"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  

  const auth = fire.auth();
  const store = fire.firestore()

  export {store , auth}

  