/* eslint-disable no-undef */
import React from 'react'
import './auth/AuthDialog.css'
import Arrow from '../../assets/png/arrow-left.png'
import { useWeb3 } from '../../adaptors/useWeb3'

const NFTTransferDialog = ({ onClose }) => {
    const [state, setState] = React.useState({
        tokenId: '',
        nftAddress: '',
        targetChain: ''
    })

    const { sendNFT, approve } = useWeb3()

    const handleChange = (e) => {
        setState({
            ...state,
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
                <div className='dialog-input-box'>
                    <input className='dialog-input' name="nftContract" onChange={handleChange} type='text' placeholder='NFT Contract' required />
                </div>
                <div className='dialog-input-box'>
                    <input className='dialog-input' type='name' onChange={handleChange} name="tokenId" placeholder='Token Id' required />
                </div>
                <div className='dialog-input-box'>
                    <input className='dialog-input' type='name' onChange={handleChange} name="targetChain" placeholder='Target Chain' required />
                </div>
                <div className='dialog-button' onClick={async () => {
                    await approve(state.tokenId);
                    await sendNFT(state.nftContract, parseInt(state.tokenId), parseInt(state.targetChain));
                }}>Continue</div>
            </form>
        </div>
    )
}

export default NFTTransferDialog