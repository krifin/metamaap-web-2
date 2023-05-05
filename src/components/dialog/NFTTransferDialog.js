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

    const { sendNFT } = useWeb3()

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
                    <input className='dialog-input' type='tokenId' onChange={handleChange} name="email" placeholder='Token Id' required />
                </div>
                <div className='dialog-input-box'>
                    <input className='dialog-input' type='targetChain' onChange={handleChange} name="email" placeholder='Target Chain' required />
                </div>
                <button className='dialog-button' onClick={() => {
                    sendNFT(state.nftContract, state.targetChain, state.tokenId)
                }}>Continue</button>
            </form>
        </div>
    )
}

export default NFTTransferDialog