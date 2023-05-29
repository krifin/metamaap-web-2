import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from 'react-router-dom'

export default function Card2({uri, addr}) {
  const [nft, setNft] = useState([]);

  useEffect(() => {
    setNft(uri);
    console.log("nft token address:", nft.token_address);
    console.log("addr of the user:", addr);
  }, [uri]);
  console.log('card nft set: ', nft);

  return (
    <div>
      <Link to="/nft/transfer" state={nft.token_uri} state2={nft.token_address} state3={addr}>
      {nft?.name ? <b><h1 style={{color: 'white', textAlign: 'center', fontSize: '2rem'}}>{nft.name}</h1></b> : <h1>No NFT title can be shown.</h1>}
    <section className={styles.cardContainer}>
      {nft?.token_uri ? <img src={nft.token_uri} alt="NFT" /> : <p>No NFT image can be shown.</p>}
      
    </section>
    </Link>
    </div>
  );
}