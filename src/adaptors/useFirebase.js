import { useState, useEffect } from 'react'
import { initializeApp } from "firebase/app";
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
  function init() {
    const app = initializeApp(firebaseConfig);
    return (getFirestore(app))
  }
  async function getMetaverses() {
    const db = init()
    const collectionRef = collection(db, "clientData");
    var result = await getDocs(collectionRef)
    return result.docs.map(doc => doc.data())
  }

  return { getMetaverses }
}

export default useFirebase