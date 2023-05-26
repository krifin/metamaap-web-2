import React from "react";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbardashboard from "../../components/navbar/Navbardashboard";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";

import Single from "../single/Single";
import './home.scss'
import { Icon } from 'semantic-ui-react'
import Plus from '../../assets/png/plus.png'
import { Link } from 'react-router-dom'
import { useAccount, useConnect } from "wagmi";
import { useState, useEffect } from "react";
import LoggedIn from "../../Loggedin";
import CarComp from "../../CarComp";


const Home = () => {
  const { isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log('isConnected: ', isConnected);
  }, [isConnected]);
  
  const carouselItems = React.useState([
    {image: "https://mediapool.bmwgroup.com/cache/P9/202301/P90492224/P90492224-bmw-group-supplierthon-for-the-metaverse-and-other-virtual-experiences-01-2023-1680px.jpg",},
    {image: "https://www.bostonglobe.com/resizer/YpOXRh3x-QuRFK_wgmr86eny6WM=/arc-anglerfish-arc2-prod-bostonglobe/public/N7YPWXJCVVFWXNO55WWBZDINV4.JPG",},
    {image: "https://www.digitalavmagazine.com/wp-content/uploads/2022/03/Visyon-Cupra-Metahype-a.jpeg",},
    {image: "https://www.venteurmag.com/wp-content/uploads/2023/04/Metaverse-Shoe-Shop.jpeg",},
    {image: "https://style.me/wp-content/uploads/2022/03/fashion-nfts-metaverses-blog-article.jpg"}
  ])

  const [met, setMet] = React.useState([
  
  
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

return (
    <div className='nft-transfer-container'>
        {/* <div className='nft-transfers-text'>DASHBOARD</div>
        <div className='nft-transfer-description'>This is a 3D asset transfer & teleportation platform for games and virtual worlds.
            Anyone can transfer any NFT or digital asset or avatar on any blockchain.</div> */}
        <CarComp />
        <div style={{marginTop: '100px'}}>
        <div className='nft-transfer-title'>METAVERSE</div>
        <div className='nfts'>
            {met.map((met, index) => {
                return (
                    <Link to={'/nft/transfer'} state={met}>
                        <img className={`met`} src={met} key={index} />
                    </Link>
                )
            })
            }
        </div>
        </div>
        <div className='nft-transfer-title' style={{marginTop: '100px'}}>MY ASSETS</div>
        <div className='nfts'>
        {isLoggedIn ? (
        <main className='main'>
          {/* <h1 className='title'>
            Connect Wallet and Display NFTs
          </h1> */}
          {connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              className="title"
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </button>
          ))}
          {error && <section>{error.message}</section>}
        </main>
      ) : (
        <LoggedIn />
      )}
            
        </div>
        <div style={{marginBottom: "100px"}}>
        <div className='nft-transfer-title' style={{marginTop: '100px'}}>SAVED WORLDS</div>
        <div className='nfts'>
        {worlds.map((world, index) => {
                return (
                    <Link to={'/nft/transfer'} state={world}>
                        <img className={`wld`} src={world} key={index} />
                    </Link>
                )
            })
          }
          </div>
        </div>
        
    </div>
)
};

export default Home;