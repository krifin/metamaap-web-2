import React, { useEffect } from 'react'
import { useWeb3 } from '../adaptors/useWeb3'
import { Link } from 'react-router-dom';
import axios from 'axios';

const NFTCard = ({ nft }) => {
    const { web3, getTokenUri } = useWeb3();
    const [tokenUri, setTokenUri] = React.useState(null);

    useEffect(() => {
        async function getData() {
            try {
                console.log("NFT's data from NFTCard: ", nft);
                const response = await getTokenUri(nft.contractAddress, nft.tokenID);
                console.log("response received from backend:", response);
                var uri;
                if (response.toString().includes("ipfs://")) {
                    uri = response.toString().replace("ipfs://", "https://ipfs.io/ipfs/");
                } else {
                    uri = response.toString();
                }
                if (uri)
                    try {
                        axios.get("http://localhost:5001/request?url=" + uri).then(response => {
                            console.log("response from ipfs:", response);
                            if (response.data.image) {
                                if (response.data.image.includes("ipfs://"))
                                response.data.image = response.data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
                                setTokenUri(response.data.image);
                            } else {
                                setTokenUri(uri);
                            }
                        })
                    } catch (e) {
                        setTokenUri(uri);
                    }
                setTokenUri(response.toString());

                nft.url = response.toString();
                // console.log("NFTCARD TOKEN URI:", nft.url);

            } catch (error) {
                console.error("Error fetching NFTs:", error);
            }
        }
        if (web3) {
            getData();
        }
    }, [web3]);
    if (!tokenUri) return (<div></div>);
    return (
        <Link to={'/nft/transfer'} state={{...nft,tokenUri: tokenUri}}>
            <img className={`nft`} src={tokenUri} alt="" />
        </Link>
    )
}

export default NFTCard