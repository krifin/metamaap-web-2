import Web3 from 'web3';
import { useState, useEffect } from 'react'

export const useWeb3 = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);

    const contractAddress = '0x86CCCb4c5Cda6B41F604F6D449Fb7dEdb53bc075';

    const abi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_messageContractaddrS",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_messageContractaddrR",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "heldTokens",
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
            "name": "messageContractaddrR",
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
            "inputs": [],
            "name": "messageContractaddrS",
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
            "inputs": [],
            "name": "nftContract",
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
            "inputs": [],
            "name": "origin",
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
            "inputs": [],
            "name": "owner",
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
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "selfID",
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
                    "name": "_tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_nftContract",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_targetChain",
                    "type": "uint256"
                }
            ],
            "name": "sendNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_messageContractaddrS",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_messageContractaddrR",
                    "type": "address"
                }
            ],
            "name": "setMsgContractAdd",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_origin",
                    "type": "address"
                }
            ],
            "name": "setOrigin",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "tokenPassword",
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
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_nftContract",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_selfID",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_srcChain",
                    "type": "uint256"
                }
            ],
            "name": "withdrawNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    useEffect(() => {
        const getWeb3 = async () => {
            const web3 = new Web3(window.ethereum);
            setWeb3(web3);
        };
        if (!web3) {
            getWeb3();
            connect();
        }
        if (web3)
            getAccount();
    }, [web3]);

    function connect() {
        return window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    function getAccount() {
        web3.eth.getAccounts().then(
            (accounts) => {
                setAccount(accounts[0]);
            }
        );
    }

    function sendNFT(nftAddress, toAddress, tokenId, amount) {
        const contract = new web3.eth.Contract(abi, contractAddress);
        return contract.methods.sendNFT(nftAddress, toAddress, tokenId, amount).send({ from: account });
    }




    return { web3, connect, account, sendNFT };
}
