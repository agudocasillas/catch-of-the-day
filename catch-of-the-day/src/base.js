import Rebase from 're-base';
import firebase from 'firebase/app';
import "firebase/database";

const firebaseApp =  firebase.initializeApp({
  apiKey: "AIzaSyAL3zk6qVbs1PYFBf-Vzh5CPsnEUHt8EXU",
  authDomain: "catch-of-the-day-a931b.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-a931b.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
