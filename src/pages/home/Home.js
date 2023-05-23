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

const Home = () => {
  const [nfts, setNfts] = React.useState([
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
            {nfts.map((nft, index) => {
                return (
                    <Link to={'/nft/transfer'} state={nft}>
                        <img className={`nft`} src={nft} key={index} />
                    </Link>
                )
            })
            }
        </div>
        <div className='nft-transfer-title'>MY ASSETS</div>
        <div className='nfts'>
            {nfts.map((nft, index) => {
                return (
                    <Link to={'/nft/transfer'} state={nft}>
                        <img className={`nft`} src={nft} key={index} />
                    </Link>
                )
            })
            }
        </div>
        <div className='nft-transfer-title'>SAVED WORLDS</div>
        <div className='nfts'>
            {nfts.map((nft, index) => {
                return (
                    <Link to={'/nft/transfer'} state={nft}>
                        <img className={`nft`} src={nft} key={index} />
                    </Link>
                )
            })
            }
        </div>
        
    </div>
)
};

export default Home;