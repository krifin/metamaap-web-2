import React, { useEffect, useState } from 'react'
import './NFTTransfers.css'
import { Icon } from 'semantic-ui-react'
import Plus from '../assets/png/plus.png'
import { Link } from 'react-router-dom'
import { useWeb3 } from '../adaptors/useWeb3'
import useNFT from '../adaptors/useNFT'
import NFTCard from '../components/NFTCard'

const NFTTransfers = () => {
    const { account, web3, chainId, connect } = useWeb3()
    const { polygon, sepolia } = useNFT();
    const [nfts, setNfts] = useState([]);
    console.log("useAccount details:", account);
    console.log("chainid details:", chainId);


    useEffect(() => {
        if (account && chainId) {
            getDetails();
        }
    }, [account, chainId])

    async function getDetails() {

        console.log('came here');
        console.log("getDetails chainId:", chainId)
        if (chainId === 80001) {
            console.log("came at polygon");
            const result = await polygon(account);
            setNfts(result);
            console.log("populated nfts:", result)
            console.log("populated nfts from setNfts:", nfts)
        }
        else if (chainId === 11155111) {
            console.log("came at sepolia");
            const result = await sepolia(account);
            setNfts(result);
            console.log("populated nfts:", result)
        }
    }
    return (
        <div className='nft-transfer-container'>
            <div className='nft-transfers-text'>NFT TRANSFER</div>
            <div className='nft-transfer-description'>This is a 3D asset transfer & teleportation platform for games and virtual worlds.
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
                        <NFTCard nft={nft} key={index} />
                    )
                })
                }
            </div>
        </div>
    )
}

export default NFTTransfers