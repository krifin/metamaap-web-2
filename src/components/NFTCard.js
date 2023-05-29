import React, { useEffect } from 'react'
import { useWeb3 } from '../adaptors/useWeb3'
import { Link } from 'react-router-dom';

const NFTCard = ({nft}) => {
    const {web3, getTokenUri} = useWeb3();
    const [tokenUri, setTokenUri] = React.useState(null);

    useEffect(()=>{
        async function getData() {
            try {
                const response = await getTokenUri(nft.tokenId);
                setTokenUri(response);
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
                <img className={`nft`} src={typeof tokenUri === 'string' ? tokenUri : tokenUri.image} alt=""/>
              </Link>
    
  )
}

export default NFTCard