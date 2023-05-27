import { useAccount } from "wagmi";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useNetwork } from 'wagmi'
import Card2 from "./Card2";

export default function GetNfts() {
  const [nfts, setNfts] = useState([]);
  const { chain } = useNetwork();

  //wagmi hook to get the address the user is connected to
  const { address, isConnected } = useAccount();
  console.log("useAccount details:", useAccount());
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
    }
  },[]);
  return (
    <section className={styles.dataContainer}>
      {nfts.map((nft) => {
        return <Card2 uri={nft} />;
      })}
    </section>
  );
}