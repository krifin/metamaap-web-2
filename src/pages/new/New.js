import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbardashboard from "../../components/navbar/Navbardashboard";
import "./new.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { addDoc, collection, where, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import {db, storage} from '../../firebaseConfig'
import { ref } from 'firebase/storage'



const New = ({ inputs }) => {
  const [client, setClient] = useState([]);
  const [bannerImg, setBannerImg] = useState("");
  const [portfolioImg, setPortfolioImg] = useState("");
  const [convertedbannerImg, setConvertedbannerImg] = useState({myFile: ""})
  const [convertedportfolioImg, setConvertedPortfolioImg] = useState({myFile: ""})
  const [nm, setNm] = useState(null);
  const [type, setType] = useState(null);
  const [url, setUrl] = useState(null);
  const [link, setLink] = useState(null);
  const [impoUpload, setImgUpload] = useState(null);

  const editData = async(id) =>{
    await addDoc(db, 'clientData', id);
  }

  const uploadImage = () =>{
    
  }
  function convertToBase64(file){
    return new Promise((resolve, reject) =>{
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () =>{
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) =>{
        reject(error)
      }
    })
  }
  const handleFileUpload1 = async (file1) =>{
    // const file1 = e.target.files[0];
    setBannerImg(file1);
    const base64_1 = await convertToBase64(file1);
    setConvertedbannerImg({...convertedbannerImg, myFile: base64_1});
    console.log(base64_1);
  }
  const handleFileUpload2 = async (file2) =>{
    // const file2 = e.target.files[0];
    setPortfolioImg(file2);
    const base64_2 = await convertToBase64(file2);
    setConvertedPortfolioImg({...convertedportfolioImg, myfile: base64_2});
    console.log(base64_2);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   const accessToken = Cookies.get('session'); // get the user's access token from cookies
    //   const response = await fetch('http://localhost:5000/auth/companydata', {
    //     method: 'POST',
    //     // headers: {
    //     //   'Content-Type': 'application/json',
    //     //   'Authorization': `Bearer ${accessToken}`, // add the authorization header with the access token
    //     // },
    //     body: JSON.stringify(
    //       nm, type, url, convertedbannerImg, convertedportfolioImg, link 
    //     ),
    //   });
    //   const data = await response.json();
    //   console.log('Form data submitted successfully!', data);
    //   alert("form data submitted");
    // } catch (error) {
    //   console.error('Error submitting form data:', error);
    //   alert("form data not submitted");
    // }
    
  };
  useEffect(()=>{
    //here we are creating or calling the async function so that whenever we are calling to api, it will return a promise.
    //so its just a data that either needs to be resolved or rejected
    const getClient = async () =>{
      //to get all the documents in the collection
      const data = await getDocs(collection(db, "clientData"))
      console.log("data:", data);
      
      // const resultString = localStorage.getItem('result');
      // console.log("result from local:", resultString[1]);
      // const result = JSON.parse(resultString);
      // const email = result.email;
      // console.log("emal from result:", email)
      // console.log(data.docs[0]._document.data.value.mapValue); //this data format is very complex. So to easily handle the same...
      // const q = query(collection(db, "clientData"), where("email", "===", email));
      // const queryData = await getDocs(q);
      // console.log(queryData);
      // let allData = (data.docs.map((doc)=>({...doc.data(), id: doc.id})))
      // console.log(allData);
      // setClient(queryData);
      
      
      //returns the obj containing the name and age but not the id of user  
      // ... -> spread operator in js meaning that to have all the fiels of data and 
      //after the, you can also add specific fields as required
      // console.log(data.docs)
      
    }
    getClient();
    // console.log(clients);
  },[])
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbardashboard /> */}
        <div className="top">
          <h1>Edit Your Metaverse Profile</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                bannerImg
                  ? convertedbannerImg.myFile
                  : "/assets/person/DefaultProfile.jpg"
              }
              alt=""
              className="image"
            />
            
            <img src={portfolioImg ? "/img1.jpg" : "/assets/person/DefaultProfile.jpg"} alt="" className="image"/>
            
            
          </div>
          <div className="right">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file1">
                  Banner Image: <DriveFolderUploadOutlined className="icon" onClick={()=>uploadImage }/>
                </label>
                <input
                  type="file"
                  id="file1"
                  style={{ display: "none" }}
                  
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleFileUpload1(e.target.files[0])}
                />
                <label htmlFor="file2">
                  PortFolio Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file2"
                  style={{ display: "none" }}
                  
                  accept=".jpeg, .png, .jpg"  
                  onChange={(e) => handleFileUpload2(e.target.files[0])}
                />
                <label>
                  Metaverse Name
                </label>
                <input
                  id="1"
                  placeholder="Name of your metaverse"
                  onChange={(e) => setNm(e.target.value)}
                  name = "nm"
                  value = {nm}
                  type="text"
                />

              <br />
              <label>Select the Metaverse Type</label>
            
              <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Digital Fashion">Digital Fashion</option>
                <option value="Virtual World">Virtual World</option>
                <option value="Gaming Arcade">Gaming Arcade</option>
                <option value="Brandverse">Brandverse</option>
                <option value="Memory World">Memory World</option>
                <option value="Other">Other</option>
              </select>
              <br />
              <br />
              </div>
              <div className="formInput">
              <label>
                Enter the link of your website
              </label>
              <input
                id="2"
                placeholder="Link of your metaverse"
                onChange={(e) => setUrl(e.target.value)}
                name = "url"
                value = {url}
                type="text"
              />
              <br />
              <label>
                Enter the open sea link
              </label>
              <input
                id="3"
                placeholder="Link of your metaverse registered at OpenSea"
                onChange={(e) => setLink(e.target.value)}
                name = "link"
                value = {link}
                type="text"
              />
            </div>
            
            
              
              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    id={input.id}
                    name={input.name}
                    placeholder={input.placeholder}
                  />
                </div>
              ))} */}

              <button type="submit" onClick={()=>editData(client.id)}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;