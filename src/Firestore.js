import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import {useState, useEffect} from "react";
import { db } from './firebaseConfig';
const Firestore = () => {
    //setting the users collection to db variable
    const usersCollectionRef = collection(db,"clientData");
    const [clients, setClients] = useState([]);
    const [name, setName] = useState();
    const [mcid, setMcid] = useState();
    const [type, setType] = useState();
    const [website, setWebsite] = useState();
    const [xCoor, setXcoor] = useState();
    const [yCoor, setYcoor] = useState();
    const [zCoor, setZcoor] = useState();
    const [opensea, setOpensea] = useState();
    const handleSubmit = async () =>{
    await addDoc(usersCollectionRef, {mcid: mcid, nm: name, type: type, website: website, x: xCoor, y: yCoor, z: zCoor, opensea_link: opensea});
  }

  

  
  //id -> id of doc, updated_nm -> one of the fields that can be updated by client
  const updateClient = async (id, updated_nm) =>{
    //doc is inbuilt method that is used to find the particular document in the collection
    const userDoc = doc(db, "clientData", id);
    console.log("userDOC: ",userDoc);

    //fields to be updated in the database
    const newFields = {nm: updated_nm}; 
    await updateDoc(userDoc, newFields);
  }

  const deleteClient = async(id)=>{
    //doc is inbuilt method that is used to find the particular document in the collection
    const userDoc = doc(db, "clientData", id);
    await deleteDoc(userDoc)
  }
  useEffect(()=>{
    //here we are creating or calling the async function so that whenever we are calling to api, it will return a promise.
    //so its just a data that either needs to be resolved or rejected
    const getUsers = async () =>{
      //to get all the documents in the collection
      const data = await getDocs(collection(db, "clientData"))
      
      
      
      // console.log(data.docs[0]._document.data.value.mapValue); //this data format is very complex. So to easily handle the same...
      setClients(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
      
      
      //returns the obj containing the name and age but not the id of user  
      // ... -> spread operator in js meaning that to have all the fiels of data and 
      //after the, you can also add specific fields as required
      // console.log(data.docs)
      
    }
    getUsers();
    // console.log(users);
  },[clients])
    return ( 
    <div>
        {/* this mcid will be generated via some logic and to be given here. Give some random input for now*/}
        <input placeholder='MCID' onChange={(e)=>setMcid(e.target.value)} />
        <input placeholder='Name' onChange={(e)=>setName(e.target.value)}></input>
        <input type="String" placeholder='Website link' onChange={(e)=>setWebsite(e.target.value)}></input>
        <input type="Number" placeholder='X Coordinate' onChange={(e)=>setXcoor(e.target.value)}></input>
        <input type="Number" placeholder='Y Coordinate' onChange={(e)=>setYcoor(e.target.value)}></input>
        <input type="Number" placeholder='Z Coordinate' onChange={(e)=>setZcoor(e.target.value)}></input>
        <input type="String" placeholder='Opensea Link' onChange={(e)=>setOpensea(e.target.value)}></input>        
        <button onClick={handleSubmit}>Create data</button>
        {clients.map((client)=>{
            return <div>
            <h1>MCID: {client.mcid}</h1>    
            <h1>Name: {client.nm}</h1>
            <h1>Type: {client.type}</h1>
            <h1>Website: {client.website}</h1>
            <h1>X-Coordinate: {client.x}</h1>
            <h1>Y-Coordinate: {client.y}</h1>
            <h1>Z-Coordinate: {client.z}</h1>
            <h1>Opensea Link: {client.opensea_link}</h1>
            
            {/* passing in the doc id and the previous age as well */}
            
            <button onClick={()=>{deleteClient(client.id)}}>Delete user</button>
            </div>
            
        })}
    </div> );
}
 
export default Firestore;