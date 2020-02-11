import firebase from 'firebase/app';
import 'firebase/storage';

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAv-uJospU4pETQFOrjAoqiJE6CdjxiilU",
    authDomain: "twitter-clone-be59b.firebaseapp.com",
    databaseURL: "https://twitter-clone-be59b.firebaseio.com",
    projectId: "twitter-clone-be59b",
    storageBucket: "twitter-clone-be59b.appspot.com",
    messagingSenderId: "871129821251",
    appId: "1:871129821251:web:e7a4bca7e49bf9f68e24f6",
    measurementId: "G-HVP4L6RK1L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();


  const storage = firebase.storage()


  export {
      storage,
      firebase as default
  }