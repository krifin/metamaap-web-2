/* eslint-disable no-undef */
import React from 'react'
import './auth/AuthDialog.css'
import Arrow from '../../assets/png/arrow-left.png'
import { useWeb3 } from '../../adaptors/useWeb3'

const NFTTransferDialog = ({ onClose, addr, acc }) => {
    const [state, setState] = React.useState({
        tokenId: '',
        nftAddress: '',
        targetChain: ''
    })

    const { sendNFT, approve } = useWeb3()

    const handleChange = (e) => {
        console.log("nftAddress:", state.nftAddress);
        setState({
            ...state,
            [e.target.tokenId] : addr,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='dialog' onClick={(e) => {
            if (e.target.className === 'dialog') {
                onClose()
            }
        }}>
            <form className="dialog-box">
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '64px' }}>
                    <img src={Arrow} width={30} height={30} onClick={() => {
                        onClose()
                    }} />
                    <div className='dialog-title'>M E T A M A A P</div>
                    <img src={Arrow} style={{ opacity: 0 }} />
                </div>
                {/*<div className='dialog-input-box'>
                    <input className='dialog-input' name="nftContract" type='text' placeholder='nft address' disabled/>
                </div> */}
                <div className='dialog-input-box'>
                    <input className='dialog-input' type='name' onChange={handleChange} name="tokenId" placeholder='Token Id' required />
                </div>
                <div className='dialog-input-box'>
                    <input className='dialog-input' type='name' onChange={handleChange} name="targetChain" placeholder='Target Chain' required />
                </div>
                <div><button className='dialog-button' onClick={async () => {
                    console.log("state address:", state.nftAddress);
                    console.log("state tokenID:", state.nftAddress);
                    console.log("state targetchain:", state.nftAddress);
                    await approve(state.nftAddress, state.tokenId, acc);
                    await sendNFT(state.nftAddress, parseInt(state.tokenId), parseInt(state.targetChain), acc);
                }}>Continue</button></div>
            </form>
        </div>
    )
}

export default NFTTransferDialog