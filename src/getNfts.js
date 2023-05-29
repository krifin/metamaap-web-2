import { useAccount } from "wagmi";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useNetwork } from 'wagmi'
import Card2 from "./Card2";
// import useMoralis from "./adaptors/useMoralis";
import useFirebase from "./adaptors/useFirebase";

export default function GetNfts() {
  // const {account, chainid} = useFirebase();
  const [nfts, setNfts] = useState([]);
  const { chain } = useNetwork();
  // const chain = web3.eth.getChainid;
  // const {init} = useMoralis();

  //wagmi hook to get the address the user is connected to
  const { address, isConnected } = useAccount();
  console.log("useAccount details:", address);
  console.log("chainid details:", chain);
  //polygon chainID

  useEffect(()=>{
    async function getData() {
      try {
        const response = await axios.get("http://localhost:5001/getnfts", {
          params: { address, chain },
        });
        setNfts(response.data.result);
        console.log("response : ", response);
        console.log("nfts:", response.data.result);
        
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
  }
  if(isConnected){
    getData();
  }},[isConnected]);
  return (
    <section className={styles.dataContainer}>
      {nfts.length!=0 ? nfts.map((nft) => {
        return <Card2 uri={nft} addr={address}/>;
      }) : <div className={styles.dataContainer}><h1 style={{fontSize: '60px', color: 'white'}}>You don't own any NFT's!</h1></div>}
    </section>
  );
}