import styles from "./Home.module.css";
import GetNfts from "./getNfts";

export default function LoggedIn({isConnected, acc, chainid}) {
  return (
    <section className={styles.loggedInMain}>
      <section className={styles.loggedInAccount}>
        <GetNfts />
      </section>
    </section>
  );
}