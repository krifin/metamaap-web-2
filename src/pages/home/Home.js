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
  
const [met, setMet] = React.useState([
  "https://style.me/wp-content/uploads/2022/03/fashion-nfts-metaverses-blog-article.jpg",
  "https://style.me/wp-content/uploads/2022/03/fashion-nfts-metaverses-blog-article.jpg",
  "https://style.me/wp-content/uploads/2022/03/fashion-nfts-metaverses-blog-article.jpg",
])
const [worlds, setWorlds] = React.useState([
  "https://style.me/wp-content/uploads/2022/03/fashion-nfts-metaverses-blog-article.jpg",
  "https://style.me/wp-content/uploads/2022/03/fashion-nfts-metaverses-blog-article.jpg",
  "https://style.me/wp-content/uploads/2022/03/fashion-nfts-metaverses-blog-article.jpg",
])

return (
    <div className='nft-transfer-container'>
        {/* <div className='nft-transfers-text'>DASHBOARD</div>
        <div className='nft-transfer-description'>This is a 3D asset transfer & teleportation platform for games and virtual worlds.
            Anyone can transfer any NFT or digital asset or avatar on any blockchain.</div> */}
        <div className='nft-transfer-title'>METAVERSE</div>
        <div className='nfts'>
            {met.map((met, index) => {
                return (
                    <Link to={'/nft/transfer'} state={met}>
                        <img className={`nft`} src={met} key={index} />
                    </Link>
                )
            })
            }
        </div>
        <div className='nft-transfer-title'>MY ASSETS</div>
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
        <div className='nft-transfer-title'>SAVED WORLDS</div>
        <div className='nfts'>
        {worlds.map((world, index) => {
                return (
                    <Link to={'/nft/transfer'} state={world}>
                        <img className={`nft`} src={world} key={index} />
                    </Link>
                )
            })
            }
        </div>
        
    </div>
)
};

export default Home;