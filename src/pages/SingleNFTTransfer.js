import React from 'react'
import { useLocation } from 'react-router-dom'
import './SingleNFTTransfer.css'
import NFTTransferDialog from '../components/dialog/NFTTransferDialog'

const SingleNFTTransfer = () => {
    const { state } = useLocation()
    const [show, setShow] = React.useState(false)
    return (
        <div className='single-nft-transfer-container'>
            <div className='single-nft-transfers-text'>NFT TRANSFER</div>
            <div className='single-nft-transfer-description'>This is a 3D asset transfer & teleportation platform for games & virtual worlds. Anyone can transfer any NFT or digital asset or avatar on any blockchain.</div>
            <div className='single-nft-transfer-title'>MY ASSETS</div>
            <img className={`single-nft`} src={state} />
            <div className='single-nft-description'>imagine a world where AI controls humanity with this Kit's monolithic towers,  gigantic banks, brutalist buildings, scrappy streetside shops, grungy alleyways, and stark industrial housing</div>
            <div className='transfer-button' onClick={() => { setShow(true) }}>Transfer Assets</div>
            {show && <NFTTransferDialog onClose={() => setShow(false)} />}
        </div>
    )
}

export default SingleNFTTransfer