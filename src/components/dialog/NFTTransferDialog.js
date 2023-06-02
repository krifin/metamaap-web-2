/* eslint-disable no-undef */
import React from 'react'
import './auth/AuthDialog.css'
import Arrow from '../../assets/png/arrow-left.png'
import { useWeb3 } from '../../adaptors/useWeb3'
import axios from 'axios'



const NFTTransferDialog = ({ onClose, addr, tokenid}) => {
    const [state, setState] = React.useState({
        tokenId: tokenid,
        nftContract: addr,
        targetChain: ''
    })

    const { sendNFT, approve, chainId } = useWeb3()

    // console.log(id, addr)

    const handleChange = (e) => {
        console.log('chaind ID of current network: ', chainId)
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const transferNFT = async(e) =>{
        e.preventDefault();
        console.log("trasnferring nft");
        // Call the sendNFT route
        // await axios.post('/sendnft', state);
        // console.log('NFT sent successfully');

        // // Call the addMsgReceiver route
        // await axios.post('/addmsgreceiver');
        // console.log('Receiver Message added successfully');

        // //Call the getnftpassword route
        // const res = await axios.get('/getnftpassword');
        // console.log('Password received successfully:', res.data.message);

        // //Call the /nftdata route
        // const response = await axios.get('/nftdata');
        // console.log('NFT data stored successfully:', response.data.message);

        // //Call the /mintnft route
        // await axios.post('/mintnft');
        // console.log('minting done finally');

        // // All routes executed successfully
        // console.log('All routes executed successfully');
        
        // console.log("approved!");
        await approve(state.nftContract, state.tokenId);
        await sendNFT(state.nftContract, parseInt(state.tokenId), parseInt(state.targetChain));
                
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
                    <select className='dialog-input' type='name' onChange={handleChange} name="targetChain" placeholder='Target Chain' required>
                        <option value="">Select Target Chain</option>
                        {chainId === 80001 && <option value="11155111" style={{ color: 'white', background: 'black' }}>Sepolia</option>}
                        {chainId === 11155111 && <option value="80001" style={{ color: 'white', background: 'black' }}>Polygon</option>}
                    </select>
                    {/* <input className='dialog-input' type='name' onChange={handleChange} name="targetChain" placeholder='Target Chain' required /> */}
                </div>
                <div className='dialog-button' style={{cursor: 'pointer'}} onClick={(e) => transferNFT(e)}>Continue</div>
            </form>
        </div>
    )
}

export default NFTTransferDialog