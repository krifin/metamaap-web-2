import React, { useEffect } from 'react'
import { useWeb3 } from '../adaptors/useWeb3'
import { Link } from 'react-router-dom';

const NFTCard = ({nft}) => {
    const {web3, getTokenUri} = useWeb3();
    const [tokenUri, setTokenUri] = React.useState(null);

    useEffect(()=>{
        async function getData() {
            try {
                console.log("NFT's data from NFTCard: ", nft);
                const response = await getTokenUri(nft.contractAddress, nft.tokenID);
                console.log("response received from backend:", response);
                setTokenUri(response.toString());
                
                nft.url = response.toString();
                console.log("NFTCARD TOKEN URI:", nft.url);
                
            } catch (error) {
                console.error("Error fetching NFTs:", error);
            }
        }
        if (web3) {
            getData();
        }
    }, [web3]);

  return (
    
        
            
            
        <Link to={'/nft/transfer'} state={nft}> 
            
            <img className={`nft`} src={tokenUri} alt=""/>
        </Link>
        
    
  )
}

export default NFTCard