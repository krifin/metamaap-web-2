import Web3 from 'web3';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import abi from '../abi/ApplicationLayer.json'


export const useWeb3 = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);
    const actionContractAddrPolygon = '0x706E90d0D5c47C100858d395Bbd2796d4b2837af';
    const messageContractAddrPolygon = '0x8e47Fff165cAeAA2A3dfAd1775061A1869Dd1cE0';
    const receiverContractAddrPolygon = '0xDfC145578CFFE03aA5EB92aF05b6FB0317ac54f3';
    const messageContractAddrSepolia = '0xb272132dfAa6c829435530EE60316beE856981Db'
    const receiverContractAddrSepolia = '0x21687C185B960BA09b8B4cc7c29C12ffE9B6BcA7'
    const actionContractAddrSepolia = '0x29fe6aD5a7c97263C5faA57cefc5C1Ef9a69c2EB';
    const [chainConfig, setChainConfig] = useState([]);
    const navigate = useNavigate();
    
    

    

    
    const nftAbi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    let tChain;

    useEffect(() => {
        const getWeb3 = async () => {
            if (window.ethereum) {

                //instance to interact with ethereum blockchain via the metamask or similar browser extension
                const web3 = new Web3(window.ethereum);
                setWeb3(web3);
            }
        };
        if (!web3) {
            getWeb3();
            connect();
        }
        if (web3){
            web3.eth.getGasPrice().then(console.log)
            getAccount();
            getChainId();
            setChainConfig([
                {
                    chainId: convertChainIdtoHex(80001),
                    chainName: 'Mumbai Testnet',
                    nativeCurrency: {
                        name: 'MATIC',
                        symbol: 'MATIC',
                        decimals: 18
                    },
                    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                    blockExplorerUrls: ['https://mumbai.polygonscan.com/']
                },
                {
                    chainId: convertChainIdtoHex(11155111),
                    chainName: 'Sepolia Testnet',
                    nativeCurrency: {
                        name: 'ETH',
                        symbol: 'ETH',
                        decimals: 18
                    },
                    rpcUrls: ['https://rpc.sepolia.org'],
                    blockExplorerUrls: ['https://sepolia.etherscan.io']
                },
        
            ]);
        }
    }, [web3]);

    function connect() {
        if (window.ethereum)
            return window.ethereum.request({ method: 'eth_requestAccounts' });
        else if (typeof window.ethereum !== 'undefined'){
             
                const web3 = new Web3(window.ethereum);
                
                // Request user's permission to access their Ethereum accounts
                return window.ethereum.request({ method: 'eth_requestAccounts'});
                  
               
        }else {
            console.error('No Ethereum provider found. Please install MetaMask or another compatible wallet.');
            // Inform the user to install a wallet like MetaMask
          }
    }

    function convertChainIdtoHex(chainId) {
        return web3.utils.toHex(chainId);
    }

   async function switchNetwork(chainId) {
        const convertChainID = convertChainIdtoHex(chainId);
        if (window.ethereum){
            try {
                // alert('switching network')
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: convertChainID }],
                });
                window.location.reload();
            } catch(e) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [chainConfig[convertChainID]],
                });
            }
            }
            return getChainId();
    }

    function getAccount() {
        web3.eth.getAccounts().then(
            (accounts) => {
                setAccount(accounts[0]);
            }
        );
    }
    function getChainId(){
        web3.eth.getChainId().then((res)=>{
            console.log("chainid:",res)
            setChainId(res);
        })
    }
    function convertNumber(number) {
        return web3.utils.BN(number);
    }

    async function sendNFT(nftAddress, tokenId, targetChain, receiverAddress) {
        let contract;
        
        
        console.log(nftAddress, tokenId, targetChain, receiverAddress)
        if(targetChain === 11155111){
            
            console.log("target chain is Sepolia")
            contract = new web3.eth.Contract(abi, actionContractAddrPolygon);
        }
        else if(targetChain === 80001){
            
            console.log("target chain is Polygon")
            contract = new web3.eth.Contract(abi, actionContractAddrSepolia);
        }
        
        const nftContract = new web3.eth.Contract(nftAbi, nftAddress);
        const uri = await nftContract.methods.tokenURI(parseInt(tokenId)).call();
        const name = await nftContract.methods.name().call();
        const symbol = await nftContract.methods.symbol().call();
        

        console.log("nft uri sendNFT:", uri)
        console.log("nft name sendNFT:", name)
        console.log("nft sybmol sendNFT:", symbol)

        await contract.methods.sendDetails(name, symbol, tokenId, nftAddress, receiverAddress, uri).send({ from: account, value: web3.utils.toWei("0.0015", "ether") });
        // call the server 
        let response = await axios.get(`http://localhost:5001/transfer?srcChain=${chainId}&uri=${uri}`)
        console.log("response received from server:", response.data);
        if(response.status === 200){
            alert('NFT Transfer successful! Now switch your network to view your transferred NFT');
            
        } else {
            alert('Transfer failed!');
        }
        navigate("/dashboard");
    }


    async function approve(nftAddress,tokenId) {
        const contract = new web3.eth.Contract(nftAbi, nftAddress);
        //here chainId signifies the current chain to which user is on currently
        if(chainId === 80001){
            return await contract.methods.approve(actionContractAddrPolygon, tokenId).send({ from: account });
        }
        else if(chainId === 11155111){
            return await contract.methods.approve(actionContractAddrSepolia, tokenId).send({ from: account });
        }
    }

    async function getTokenUri(nftAddress, tokenId) {
        const contract = new web3.eth.Contract(nftAbi, nftAddress);
        try{
            let res = await contract.methods.tokenURI(parseInt(tokenId)).call();
            return res;
        }catch(e){
            console.error('Error retrieving tokenURI:', e);
            return null;
        }
        
    }

    




    return { web3, connect, account, chainId, sendNFT, convertNumber, approve, getTokenUri, getChainId, getAccount, switchNetwork };
}
