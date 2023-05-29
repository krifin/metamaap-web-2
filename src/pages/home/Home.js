import React from "react";
import './home.scss'
import { Link } from 'react-router-dom'
import { useAccount, useConnect } from "wagmi";
import { useState, useEffect } from "react";
import LoggedIn from "../../Loggedin";
import CarComp from "../../CarComp";
import Footer from '../Footer'



const Home = () => {
  
  const { account, isConnected, isConnecting, getBalance } = useAccount();
  
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [walletDetails, setWalletDetails] = useState(null);
  useEffect(() => {
    if (isConnected) {
      setIsLoggedIn(true);
      fetchWalletDetails();
    } else {
      setIsLoggedIn(false);
      setWalletDetails(null);
    }
  }, [isConnected]);
  useEffect(() => {
    if (isConnecting && !isConnected) {
      // Redirect or show loading indicator until the connection is established
      // Example: Show a spinner or redirect to a connecting page
      console.log("connecting now...");
    }
  }, [isConnecting, isConnected]);

  const fetchWalletDetails = async () => {
    try {
      const balance = await getBalance();
      const walletData = {
        account,
        balance,
        // Add more properties as needed
      };
      setWalletDetails(walletData);
      // Perform additional actions with walletData
    } catch (error) {
      console.error("Error fetching wallet details:", error);
    }
  };

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
        
        <CarComp />
        <div style={{marginTop: '100px'}}>
        <div className='nft-transfer-title'>METAVERSE</div>
        <div className='nfts'>
            {met.map((met, index) => {
                return (
                  <img className={`met`} src={met} key={index} />
                )
            })
            }
        </div>
        </div>
        <div style={{marginTop: '100px'}}>
        <div className='nft-transfer-title'>MY WORLD</div>
        <div className='nfts'>
            {met.map((met, index) => {
                return (
                    
                        <img className={`met`} src={met} key={index} />
                    
                )
            })
            }
        </div>
        </div>
        <div className='nft-transfer-title' style={{marginTop: '100px'}}>MY ASSETS</div>
        <div className='nfts'>
        {!isLoggedIn ? (
          <main className="main">
            {connectors.map((connector) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                style={{
                  padding: "10px",
                  marginLeft: "75px",
                  background: "#292929",
                  color: "#FFFFFF",
                  fontSize: "30px",
                }}
                onClick={() => connect({ connector })}
              >
                Click Here to connect Wallet
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