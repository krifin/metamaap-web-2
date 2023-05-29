import React from "react";
import './home.css'
import { useState, useEffect } from "react";

import Footer from '../../components/Footer'
import { useWeb3 } from "../../adaptors/useWeb3";
import axios from "axios";
import { Link } from "react-router-dom";
import NFTCard from "../../components/NFTCard";



const Home = () => {
  const { account, web3, chainId, connect } = useWeb3()

  const [metaverses, setMeteverses] = React.useState([
    "https://www.digitalavmagazine.com/wp-content/uploads/2022/03/Visyon-Cupra-Metahype-a.jpeg",
    "https://www.venteurmag.com/wp-content/uploads/2023/04/Metaverse-Shoe-Shop.jpeg",
    "https://www.bostonglobe.com/resizer/YpOXRh3x-QuRFK_wgmr86eny6WM=/arc-anglerfish-arc2-prod-bostonglobe/public/N7YPWXJCVVFWXNO55WWBZDINV4.JPG",
    "https://mediapool.bmwgroup.com/cache/P9/202301/P90492224/P90492224-bmw-group-supplierthon-for-the-metaverse-and-other-virtual-experiences-01-2023-1680px.jpg"
  ])
  const [worlds, setWorlds] = React.useState([
    "https://i.insider.com/620514053b86990018b2af49?width=1136&format=jpeg",
    "https://www.cryptotimes.io/wp-content/uploads/2022/04/High-end-nft-website-2.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR1a849nAd49rbR2wRA7K59HGA3_jFyjjDGQH2agMAYI_cZ8Nn9dxP_MfjKEpOfd76d50&usqp=CAU",
    "https://cdn.siasat.com/wp-content/uploads/2022/09/IMG_20220928_194221_1200_x_900_pixel.jpg"
  ])

  const carouselItems = [
    "https://mediapool.bmwgroup.com/cache/P9/202301/P90492224/P90492224-bmw-group-supplierthon-for-the-metaverse-and-other-virtual-experiences-01-2023-1680px.jpg",
    "https://www.bostonglobe.com/resizer/YpOXRh3x-QuRFK_wgmr86eny6WM=/arc-anglerfish-arc2-prod-bostonglobe/public/N7YPWXJCVVFWXNO55WWBZDINV4.JPG",
    "https://www.01net.com/i/0/0/af7/11f694c76cbd83569dfea09a18da9.jpg",
    "https://www.venteurmag.com/wp-content/uploads/2023/04/Metaverse-Shoe-Shop.jpeg",

  ]

  const [nfts, setNfts] = useState([]);
  console.log("useAccount details:", account);
  console.log("chainid details:", chainId);
  //polygon chainID

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const response = await axios.get("http://localhost:5001/getnfts", {
  //         params: { account, chainId },
  //       });
  //       setNfts(response.data.result);
  //       console.log("response : ", response);
  //       console.log("nfts:", response.data.result);

  //     } catch (error) {
  //       console.error("Error fetching NFTs:", error);
  //     }
  //   }
  //   if (web3) {
  //     getData();
  //   }
  // }, [web3]);



  const [activeIndex, setActiveIndex] = useState(0);
  function handleChange(i) {
    if (i < 4 && i >= 0) {
      setActiveIndex(i);
    }
  }
  useEffect(() => {

  }, [activeIndex])

  return (
    <div className='home-container'>
      <div>
        <img src={carouselItems[activeIndex]} className="slider-image" alt="" />
        <div className="images" style={{ display: 'flex', flexDirection: 'row', marginTop: "10px", alignItems: 'center', justifyContent: 'center' }}>
          <img src="right_arrow.png" style={{ height: '20px', width: '20px', margin: '5px 5px 20px', cursor: 'pointer', transform: 'rotate(180deg)' }} onClick={() => handleChange(activeIndex - 1)} />
          {carouselItems.map((image, i) => (
            <img src={image} alt="carousel_img" className="slider-image-points" style={{ height: '40px', width: '40px', borderRadius: '100%', margin: '5px 5px 20px', cursor: 'pointer' }} onClick={() => handleChange(i)} key={i} />
          ))}
          <img src="right_arrow.png" style={{ height: '20px', width: '20px', margin: '5px 5px 20px', cursor: 'pointer' }} onClick={() => handleChange(activeIndex + 1)} />
        </div>
      </div>
      <div style={{ marginTop: '100px' }}>
        <div className='nft-transfer-title'>METAVERSE</div>
        <div className='nfts'>
          {metaverses.map((metaverse, index) => {
            return (
              <img className={`met`} src={metaverse} key={index} />
            )
          })
          }
        </div>
      </div>
      <div style={{ marginTop: '100px' }}>
        <div className='nft-transfer-title'>MY WORLD</div>
        <div className='nfts'>
          {metaverses.map((metaverse, index) => {
            return (
              <img className={`met`} src={metaverse} key={index} />
            )
          })
          }
        </div>
      </div>
      <div className='nft-transfer-title' style={{ marginTop: '100px' }}>MY ASSETS</div>
        {!web3 ? (
          <div className='nfts'>
          <div className="nft-connect-wallet" onClick={() => connect()}>Connect Wallet</div>
        </div>
        ) : (
          <div className='nfts'>
          {nfts.map((nft, index) => {
            return (
              <NFTCard nft={nft} key={index} />
            )
          })}
          </div>
        )}
      <div style={{ marginBottom: "100px" }}>
        <div className='nft-transfer-title' style={{ marginTop: '100px' }}>SAVED WORLDS</div>
        <div className='nfts'>
          {worlds.map((world, index) => {
            return (

              <img className={`wld`} src={world} key={index} />

            )
          })
          }
        </div>
      </div>

      <Footer />
    </div>
  )
};

export default Home;