import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDRVcovXZY8aZZY3nr1aePu-szcy3RZD4k",
    authDomain: "cinemadb-9769b.firebaseapp.com",
    databaseURL: "https://cinemadb-9769b.firebaseio.com",
    projectId: "cinemadb-9769b",
    storageBucket: "cinemadb-9769b.appspot.com",
    messagingSenderId: "598837625211",
    appId: "1:598837625211:web:2e90cf7fec47e4eae9bdde",
    measurementId: "G-QCWH4TCFGM",
  };

  firebase.initializeApp(config)
  firebase.firestore()
  const storage = firebase.storage();
  // console.log('firebase', firebase)
  // console.log('firebase', firebase.auth)
  export  {
    storage, firebase as default
  }  