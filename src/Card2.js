import { useEffect, useState } from "react";
import styles from "./Home.module.css";

export default function Card2({uri}) {
  const [nft, setNft] = useState([]);

  useEffect(() => {
    setNft(uri);
  }, [uri]);
  console.log('card nft set: ', nft);

  return (
    <div>
      {nft?.name ? <b><h1 style={{color: 'white', textAlign: 'center', fontSize: '2rem'}}>{nft.name}</h1></b> : <h1>No NFT title can be shown.</h1>}
    <section className={styles.cardContainer}>
      {nft?.token_uri ? <img src={nft.token_uri} alt="NFT" /> : <p>No NFT image can be shown.</p>}
    </section>
    </div>
  );
}