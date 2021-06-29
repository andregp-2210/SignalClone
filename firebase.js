import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3F7uZHsTw0CFGsFET4IHC3IYI11kC6nk",
  authDomain: "signal-clone-af599.firebaseapp.com",
  projectId: "signal-clone-af599",
  storageBucket: "signal-clone-af599.appspot.com",
  messagingSenderId: "27557066615",
  appId: "1:27557066615:web:59de82ee13d8800e1f9372",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
