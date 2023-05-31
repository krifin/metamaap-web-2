/* eslint-disable no-undef */
import React from 'react'
import './auth/AuthDialog.css'
import Arrow from '../../assets/png/arrow-left.png'
import { useWeb3 } from '../../adaptors/useWeb3'

const NFTTransferDialog = ({ onClose, addr, id}) => {
    const [state, setState] = React.useState({
        tokenId: id,
        nftAddress: addr,
        targetChain: ''
    })

    const { sendNFT, approve } = useWeb3()

    console.log(id, addr)

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const transferNFT = async() =>{
        console.log("trasnferring nft");
        await approve( state.nftAddress,state.tokenId);
        console.log("approved!");
        await sendNFT(state.nftAddress, parseInt(state.tokenId), parseInt(state.targetChain));
                
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
                <div className='dialog-button' onClick={() => transferNFT()}>Continue</div>
            </form>
        </div>
    )
}

export default NFTTransferDialog