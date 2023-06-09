import React, { useEffect, useState } from "react";

import $ from "jquery";
import "./App.css";
import { Routes, Route,  useNavigate } from "react-router-dom";

import Preloader from "./pages/Preloader";
import Galaxy4 from "./pages/Galaxy4";
import Navbar from "./components/Navbar";
import SearchPopup from "./components/SearchPopup";
import About from "./pages/About";
import NFTTransfers from "./pages/NFTTransfers";
import SingleNFTTransfer from "./pages/SingleNFTTransfer";
import UploadAsset from "./pages/UploadAsset";
import { useWeb3 } from "./adaptors/useWeb3";
import { AppContext } from "./AppContext";
import useFirebase from "./adaptors/useFirebase";
import Partners from "./pages/Partners";
import Home from "./pages/home/Home";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { polygonMumbai } from '@wagmi/core/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'


const App = () => {
  const navigate = useNavigate();
  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, polygonMumbai],
    [alchemyProvider({ apiKey: 'qBSjw2KG2psn6V6H4eikOFKOU60A-D6_' }), publicProvider()]
  );

  // console.log("chains: ", chains);
  // Set up client
  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      
    ],
    provider,
    webSocketProvider,
  });
  

  const [searchToggle, setSearchToggle] = useState(false)

  const { web3, account } = useWeb3()

  const { streamUser } = useFirebase()

  const { getMetaverses } = useFirebase()

  const [metaverses, setMetaverses] = useState([])
  const [isAuth, setIsAuth] = useState(false);

  useEffect(()=>{
    streamUser((user)=>{
      console.log(user)
      if(user){
        setIsAuth(true);
      }
      else {
        setIsAuth(false);
      }
    })
  },[])

  useEffect(() => {
    getMetaverses().then((res) => {
      setMetaverses(res)
    })
  }, [])

  return (
    <AppContext.Provider value={[metaverses, setMetaverses ]}>
    <div className={`App`}>
      <SearchPopup show={searchToggle} onClose={() => setSearchToggle(false)} />
      <div style={{ flex: 1, marginLeft: searchToggle ? '400px': '0px', transition: 'all 0.5s ease-in-out' }}>
        {window.location.pathname !== '/' && <Navbar onSearchToggle={() => setSearchToggle(!searchToggle)} show={searchToggle} isAuth={isAuth} setIsAuth={setIsAuth}/>}
        <Routes>
          <Route exact path="/" element={<Preloader />} />
          <Route exact path="/home" element={<Galaxy4 />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/nft-transfers" element={<NFTTransfers />} />
          <Route exact path="/nft/transfer" element={<SingleNFTTransfer />} />
          <Route exact path="/upload-asset" element={<UploadAsset />} />
          <Route exact path="/partners" element={<Partners />} />
          {isAuth && <Route path="/dashboard" element={
          <WagmiConfig client={client}>
            <Home />
          </WagmiConfig>} />}
        </Routes>
      </div>
    </div>
    </AppContext.Provider>
  );
};

export default App;
