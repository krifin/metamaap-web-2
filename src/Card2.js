import { useEffect, useState } from "react";
import styles from "./Home.module.css";

export default function Card2({uri}) {
  const [nft, setNft] = useState([]);

  useEffect(() => {
    setNft(uri);
  }, [uri]);
  console.log('card nft set: ', nft);

  return (
    <section className={styles.cardContainer}>
      {nft?.name ? <h1>{nft.name}</h1> : <h1>No NFT title can be shown.</h1>}
      {nft?.token_uri ? <img src={nft.token_uri} alt="NFT" /> : <p>No NFT image can be shown.</p>}
    </section>
  );
}