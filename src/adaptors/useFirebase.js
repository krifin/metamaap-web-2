import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const useFirebase = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyCklcgf0tLs4KDosgCqSyPATXa8OuwRQXw",
    authDomain: "metaverse-council.firebaseapp.com",
    projectId: "metaverse-council",
    storageBucket: "metaverse-council.appspot.com",
    messagingSenderId: "952701010364",
    appId: "1:952701010364:web:3327c648725b1d50866bb9"
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

  async function addMetaverse(metaverse) {
    const db = init()
    const collectionRef = collection(db, "metaverses"); 
    console.log(metaverse)
    var doc = await addDoc(collectionRef, metaverse)
    console.log(doc.id)
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


  return { getMetaverses, authentication, login, signup, logout, getUser, streamUser, addMetaverse }
}


export default useFirebase