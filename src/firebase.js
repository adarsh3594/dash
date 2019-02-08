import firebase from "firebase";
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyBxV3HCsCbTyRLcuxqCW-O1Pbp7371KTpM",
  authDomain: "billing-soft.firebaseapp.com",
  databaseURL: "https://billing-soft.firebaseio.com",
  projectId: "billing-soft",
  storageBucket: "billing-soft.appspot.com",
  messagingSenderId: "748428798887"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
