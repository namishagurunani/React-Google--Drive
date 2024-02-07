import firebase from "firebase"; // Import Firebase library

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCDURiRj2jnp7ROzyn8gF6ajIvG8AmrE2Q",
  authDomain: "drive-7347d.firebaseapp.com",
  projectId: "drive-7347d",
  storageBucket: "drive-7347d.appspot.com",
  messagingSenderId: "613497333599",
  appId: "1:613497333599:web:aa66c3dacf5ae88a0f38ea",
};

// Initialize Firebase app with the provided configuration
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Export Firebase services
export { db, storage, auth, provider };