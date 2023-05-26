import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { collection, getDocs, getFirestore } from "firebase/firestore";

const useFirebase = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyAj3H57fnV1WfeJcNRMg2NCqLtv8WsLjDQ",
    authDomain: "metamaap-proj.firebaseapp.com",
    projectId: "metamaap-proj",
    storageBucket: "metamaap-proj.appspot.com",
    messagingSenderId: "980463927463",
    appId: "1:980463927463:web:a2e7c07f36022b65571b82",
    measurementId: "G-T2GF7S0RRV"
  };
  const app = initializeApp(firebaseConfig);
  function init() {

    return (getFirestore(app))
  }

  async function getMetaverses() {
    const db = init()
    const collectionRef = collection(db, "clientData");
    var result = await getDocs(collectionRef)
    return result.docs.map(doc => doc.data())
  }

  async function authentication() {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider(app);
    const db = getFirestore(app);
    return { db, auth, provider };
  }

  async function login(email, password) {
    const auth = getAuth(app);
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  }

  async function signup(email, password, username) {
    const auth = getAuth(app);
    const user = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: username
    });
    return user;
  }

  async function logout() {
    const auth = getAuth(app);
    return signOut(auth);
  }

  async function getUser() {
    const auth = getAuth(app);
    return auth.currentUser;
  }

  async function streamUser(callback) {
    const auth = getAuth(app);
    onAuthStateChanged(auth, callback)
  }


  return { getMetaverses, authentication, login, signup, logout, getUser, streamUser }
}


export default useFirebase