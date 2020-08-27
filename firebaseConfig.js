
import * as firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyAPx9c1hCBI1xuWv5TsEcCf6cPYGyD4rn8",
    authDomain: "reactnative-a9ead.firebaseapp.com",
    databaseURL: "https://reactnative-a9ead.firebaseio.com",
    projectId: "reactnative-a9ead",
    storageBucket: "reactnative-a9ead.appspot.com",
    messagingSenderId: "1024225969560",
    appId: "1:1024225969560:web:80e7be3e2e9abfe04a17ed",
    measurementId: "G-JPX6EPKD7X"
  };

  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore();

  const auth = firebase.auth();
  export {db,auth};