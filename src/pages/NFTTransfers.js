import React from 'react'
import './NFTTransfers.css'
import { Icon } from 'semantic-ui-react'
import Plus from '../assets/png/plus.png'
import { Link } from 'react-router-dom'

const NFTTransfers = () => {
    const [nfts, setNfts] = React.useState([
        "https://style.me/wp-content/uploads/2022/03/fashion-nfts-metaverses-blog-article.jpg",
        "https://style.me/wp-content/uploads/2022/03/fashion-nfts-metaverses-blog-article.jpg",
        "https://style.me/wp-content/uploads/2022/03/fashion-nfts-metaverses-blog-article.jpg",
    ])

    return (
        <div className='nft-transfer-container'>
            <div className='nft-transfers-text'>NFT TRANSFER</div>
            <div className='nft-transfer-description'>This is a 3D asset transfer & teleportation platform for games & virtual worlds.
                Anyone can transfer any NFT or digital asset or avatar on any blockchain.</div>
            <div className='nft-transfer-title'>MY ASSETS</div>
            <div className='nfts'>
                <Link to={'/upload-asset'}>
                <div className='add-assets'>
                    <div className='add-assets-text' style={{ opacity: 0, visibility: 0 }}>ADD NEW ASSETS</div>
                    <img src={Plus} height={43} />
                    <div className='add-assets-text'>ADD NEW ASSETS</div>
                </div>
                </Link>
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
}

export default NFTTransfers