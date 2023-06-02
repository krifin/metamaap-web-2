const express = require("express");
const app = express();
const port = 5001;
const Moralis = require("moralis").default;
const cors = require("cors");
const { axios } = require("axios");
const Web3 = require('web3');

require("dotenv").config({ path: ".env" });

app.use(cors());
app.use(express.json());

let _selfID;
let _tokenId;
let _owner;
let _contractAddress;
let _name;
let _symbol;
let _srcChain;
let _targetChain;
let _password;
let _uri;
let _confirmPassword;
let storedNFTData; //this will be called inside /nftdata route

//please change the MORALIS_API_KEY 
const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

// app.get("/getnfts", async (req, res) => {
//   try {
//     const { query } = req;
//     console.log("query:", query);
//     let parsed = JSON.parse(query.chain);
//     console.log("query.chain.id: ", parsed);
//     const response = await Moralis.EvmApi.nft.getWalletNFTs({
//       address: query.address,
//       chain: parsed.id,
//     });
//     console.log("address", query.address)
//     console.log(response);
//     //sending response to frontend
//     return res.status(200).json(response);
//   } catch (e) {
//     console.log(`Something went wrong ${e}`);
//     return res.json();
//   }
// });

//chain 1 - POLYGON
const privateKeyPl = process.env.PL_PRIVATE_KEY;
const contractAddressMessage = process.env.MESSAGE_CONTRACT;
const contractAddressActionContPolygon = process.env.ACTION_CONTRACT_CHAIN_ONE

//chain 2 - SEPOLIA
const privateKeySp = process.env.SP_PRIVATE_KEY;
const contractAddressActionContSep = process.env.ACTION_CONTRACT_CHAIN_TWO
const contractAddressReceiver = process.env.RECEIVER_CONTRACT

const rpcUrlPolygon = process.env.RPC_URL_PL;
const rpuUrlSepolia = process.env.RPC_URL_SP;

// Connect to the Ethereum network
//chain 1 - POLYGON
const polygon_web3 = new Web3(new Web3.providers.HttpProvider(rpcUrlPolygon));

//chain 2 - SEPOLIA
const sepolia_web3 = new Web3(new Web3.providers.HttpProvider(rpuUrlSepolia));

// Load the contract ABI
//chain 1 - POLYGON
const contractABIActionlyrpl = require('./abi/actioncontractL1.json');
const contractABImsg = require('./abi/message.json');

//chain 2 - SEPOLIA
const contractABIreceiver = require('./abi/receiver.json');
const contractABIActionlyrsp = require('./abi/actioncontractL2.json');



// Create an instance of the contract
const contractActionlyrpl = new polygon_web3.eth.Contract(contractABIActionlyrpl, contractAddressActionContPolygon);
const contractmsg = new polygon_web3.eth.Contract(contractABImsg, contractAddressMessage);
const contractActionlyrsp = new sepolia_web3.eth.Contract(contractABIActionlyrsp, contractAddressActionContSep);
const contractReceiver = new sepolia_web3.eth.Contract(contractABIreceiver, contractAddressReceiver);

// Set the account that will sign the transactions
//chain 1 - POLYGON
const accountPl = polygon_web3.eth.accounts.privateKeyToAccount(privateKeyPl);
polygon_web3.eth.accounts.wallet.add(accountPl);
polygon_web3.eth.defaultAccount = accountPl.address;

//chain 2 - SEPOLIA
const accountSp = sepolia_web3.eth.accounts.privateKeyToAccount(privateKeySp);
sepolia_web3.eth.accounts.wallet.add(accountSp);
sepolia_web3.eth.defaultAccount = accountSp.address;




const sendNFT = async (account, name, symbol, tokenId, nftContract, targetChain, uri, srcChain) => {
  try {
    // Detect user's connected account using MetaMask provider
    // const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    // if (accounts.length === 0) {
    //   console.error('No connected accounts');
    //   return;
    // }

    
    // const gasPrice = await polygon_web3.eth.getGasPrice();
    // const gasLimit = 300000; // Adjust the gas limit as per your contract requirements
    _owner = account; //from user's metamask wallet
    _tokenId = tokenId; //from frontend
    _contractAddress = nftContract; //from frontend
    _targetChain = targetChain; //from frontend
    _uri = uri; //from frontend
    _srcChain = srcChain; //from frontend
    _name = name;
    _symbol = symbol;
    

    
    console.log('Transaction sendNFT and message.sol successful:', receipt.transactionHash);
    const fetchedMessage = await contractmsg.methods
      .getMsg(_owner, _selfID, _targetChain)
      .call();
    _password = fetchedMessage;
    console.log("password: ", _password);
    _selfID = await contractActionlyrpl.methods.getSelfID().call();
    console.log("selfID: ", _selfID);
  } catch (error) {
    console.error('Transaction failed:', error);
  }
};

// This is for the receiver.sol on sepolia network
//message -> _password
//owner -> accountSp.address
//selfID -> _selfID
async function addMessage() {
  try {
    const minFee = sepolia_web3.utils.toWei('0.0001', 'ether'); // Minimum fee in ether (adjust as needed)

    // Get the current gas price
    const gasPrice = await sepolia_web3.eth.getGasPrice();

    //srcChain->frontend
    // Estimate the gas limit for the transaction
    const gasLimit = await contractReceiver.methods
      .addMsg(_srcChain, _selfID, _password, accountSp.address)
      .estimateGas();

    // Build the transaction object
    const txObject = {
      from: accountSp.address,
      to: contractAddressReceiver,
      data: contractReceiver.methods.addMsg(_srcChain, _selfID, _password, accountSp.address).encodeABI(),
      gasPrice: gasPrice,
      gas: gasLimit,
      value: minFee,
    };

    // Sign and send the transaction
    const signedTx = await sepolia_web3.eth.accounts.signTransaction(txObject, privateKeySp);
    const rawTx = signedTx.rawTransaction;
    const receipt = await sepolia_web3.eth.sendSignedTransaction(rawTx);

    console.log('Transaction receiver successful:', receipt.transactionHash);
  } catch (error) {
    console.error('Transaction failed:', error);
  }
}




app.post('/sendnft', async (req, res) => {
  const { name, symbol, tokenId, nftContract, targetChain, uri, srcChain } = req.body; // Assuming the required data is sent in the request body

  try {
    // Call the sendNFT function
    console.log("/sendnft called");
    await sendNFT(name, symbol, tokenId, nftContract, targetChain, uri);

    // Optionally, you can return a success response
    res.status(200).json({ message: 'NFT sent successfully' });
  } catch (error) {
    // Handle errors
    console.error('Failed to send NFT:', error);
    res.status(500).json({ error: 'Failed to send NFT' });
  }
});

app.post('/addmsgreceiver', (req, res) => {
  

  try {
    // Call the addMsg function with the provided parameters
    console.log("/addmsgreceiver called");
    addMessage();

    // Optionally, you can return a success response
    res.status(200).json({ message: 'Receiver Message added successfully' });
  } catch (error) {
    // Handle errors
    console.error('Failed to add message:', error);
    res.status(500).json({ error: 'Failed to add message' });
  }
});

app.get('/getnftpassword', async (req, res) => {
  try {

    console.log()
    _confirmPassword = await contractActionlyrsp.methods.getNFT(_selfID, _srcChain, accountSp.address).call();
    if(_confirmPassword){
      res.status(200).json({ message: 'Password received successfully from the getNFT added successfully' });
    }
    else{
      res.status(400).json({ message: 'Passowod if EMPTY' });
    }
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get password' });
  }
});

app.get('/nftdata', async (req, res) => {
  console.log('/nftdata route called')
  try {

    // Call the releaseNFT function
    const nftData = await contractActionlyrpl.methods.releaseNFT(_owner, _confirmPassword, _tokenId).call();

    // Assign the nftData or actual nft struture to the storedNFTData variable
    storedNFTData = nftData;

    // Optionally, you can further process or manipulate the nftData object here

    // Return a success response
    res.status(200).json({message: storedNFTData});
  } catch (error) {
    // Handle errors
    console.error('Failed to fetch NFT data:', error);
    res.status(500).json({ error: 'Failed to fetch NFT data' });
  }
});

//finally the minting of nft once we receiver the nftData structure
app.post('/mintnft', async (req, res) => {
  try {
    // Call the fetchNFTDetails function
    await contractActionlyrsp.methods.fetchNFTDetails(_uri, _owner).send({ from: accountSp.address });

    // Optionally, you can return a success response
    res.status(200).json({ message: 'NFT minted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Failed to mint NFT:', error);
    res.status(500).json({ error: 'Failed to mint NFT' });
  }
});

// proxy for fetching url
app.get("/request", async (req, res) => {
  try {
    const { query } = req;
    console.log("query:", query);
    const response = await axios.get(query.url);
    console.log("response from ipfs:", response);
    return res.status(200).json(response.data);
  } catch (e) {
    console.log(`Something went wrong ${e}`);
    return res.json();
  }
});

// Start the server
app.listen(5001, () => {
  console.log('Server started on port 5001');
});