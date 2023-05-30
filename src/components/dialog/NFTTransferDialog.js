/* eslint-disable no-undef */
import React from 'react'
import './auth/AuthDialog.css'
import Arrow from '../../assets/png/arrow-left.png'
import { useWeb3 } from '../../adaptors/useWeb3'

const NFTTransferDialog = ({ onClose, addr, id}) => {
    const { account } = useWeb3();
    const [state, setState] = React.useState({
        tokenId: id,
        nftAddress: addr,
        targetChain: ''
    })

    const { sendNFT, approve } = useWeb3()

    const handleChange = (e) => {
        console.log("nftAddress:", addr);
        console.log("account", account);
        console.log("tokenID:", id);
        console.log("targetcHAIN:", e.target.value);
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const transferNFT = async() =>{
        console.log("trasnferring nft");
        await approve(state.tokenId, state.nftAddress, account);
        console.log("approved!");
        await sendNFT(state.nftAddress, parseInt(state.tokenId), parseInt(state.targetChain), account);
                
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
                {/* <div className='dialog-input-box'>
                    <input className='dialog-input' type='name' onChange={handleChange} name="tokenId" placeholder='Token Id' required />
                </div> */}
                <div className='dialog-input-box'>
                    <input className='dialog-input' type='name' onChange={handleChange} name="targetChain" placeholder='Target Chain' required />
                </div>
                <div><button className='dialog-button' onClick={() => transferNFT()}>Continue</button></div>
            </form>
        </div>
    )
}

export default NFTTransferDialog