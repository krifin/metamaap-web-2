const express = require("express");
const app = express();
const port = 5001;
const Moralis = require("moralis").default;
const cors = require("cors");
const axios = require("axios");
const Web3 = require('web3');

require("dotenv").config({ path: ".env" });

app.use(cors());
app.use(express.json());

let _selfID;
let _tokenId;
let _owner;
let _contractAddress;
let _srcChain;
let _targetChain;
let _password;
let _uri;
let _confirmPassword;
let storedNFTData; //this will be called inside /nftdata route

//chain 1 - POLYGON
const privateKey = process.env.SP_PRIVATE_KEY;
const contractAddressMessagePolygon = '0x04f538b62912F2F18d7C74cE2ad4f7C7A0e4c137';
const contractAddressActionLayer1Polygon = '0x7FF145f83f2a8c7eBE6ab6665Fe407C90F881a1a';
const contractAddresActionLayer2Polygon = '0x7FF145f83f2a8c7eBE6ab6665Fe407C90F881a1a'; // needs to be changed
const contractAddressReceiverPolygon = '0x7FF145f83f2a8c7eBE6ab6665Fe407C90F881a1a'; // needs to be changed

//chain 2 - SEPOLIA
// const privateKeySp = process.env.SP_PRIVATE_KEY;
const contractAddressMessageSepholi = '0x7FF145f83f2a8c7eBE6ab6665Fe407C90F881a1a'; // needs to be changed
const contractAddressActionLayer1Sepholi = '0x7FF145f83f2a8c7eBE6ab6665Fe407C90F881a1a'; // needs to be changed
const contractAddressActionLayer2Sepholi = '0xe93D8AC18A43d1Db532A1643850b7BBe85318320'
const contractAddressReceiverSepholi = '0xa71Cc0079b89a9d29c8cE1a20ba517F718708261'

const rpcUrlPolygon = process.env.RPC_URL_PL;
const rpuUrlSepolia = process.env.RPC_URL_SP;

// Connect to the Ethereum network
//chain 1 - POLYGON
const polygon_web3 = new Web3(new Web3.providers.HttpProvider(rpcUrlPolygon));

//chain 2 - SEPOLIA
const sepolia_web3 = new Web3(new Web3.providers.HttpProvider(rpuUrlSepolia));

// Load the contract ABI
//chain 1 - POLYGON
const contractABIActionLayer1 = require('./abi/actioncontractL1.json');
const contractABIMessage = require('./abi/message.json');

//chain 2 - SEPOLIA
const contractABIReceiver = require('./abi/receiver.json');
const contractABIActionLayer2 = require('./abi/actioncontractL2.json');



// Create an instance of the contract
//chain 1 - POLYGON
const contractActionLayer1Polygon = new polygon_web3.eth.Contract(contractABIActionLayer1, contractAddressActionLayer1Polygon);
const contractMessagePolygon = new polygon_web3.eth.Contract(contractABIMessage, contractAddressMessagePolygon);
const contractActionLayer2Polygon = new polygon_web3.eth.Contract(contractABIActionLayer2, contractAddresActionLayer2Polygon);
const contractReceiverPolygon = new polygon_web3.eth.Contract(contractABIReceiver, contractAddressReceiverPolygon);


//chain 2 - SEPOLIA
const contractMessageSepholi = new sepolia_web3.eth.Contract(contractABIMessage, contractAddressMessageSepholi);
const contractActionLayer1Sepholi = new sepolia_web3.eth.Contract(contractABIActionLayer1, contractAddressActionLayer1Sepholi);
const contractActionLayer2Sepholi = new sepolia_web3.eth.Contract(contractABIActionLayer2, contractAddressActionLayer2Sepholi);
const contractReceiverSepholi = new sepolia_web3.eth.Contract(contractABIReceiver, contractAddressReceiverSepholi);

// Set the account that will sign the transactions
//chain 1 - POLYGON
const accountPolygon = polygon_web3.eth.accounts.privateKeyToAccount(privateKey);
polygon_web3.eth.accounts.wallet.add(accountPolygon);
polygon_web3.eth.defaultAccount = accountPolygon.address;

//chain 2 - SEPOLIA
const accountSepholi = sepolia_web3.eth.accounts.privateKeyToAccount(privateKey);
sepolia_web3.eth.accounts.wallet.add(accountSepholi);
sepolia_web3.eth.defaultAccount = accountSepholi.address;




const sendNFT = async (account, name, symbol, tokenId, nftContract, targetChain, uri) => {
  try {
    // Detect user's connected account using MetaMask provider
    // const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    // if (accounts.length === 0) {
    //   console.error('No connected accounts');
    //   return;
    // }


    const gasPrice = await polygon_web3.eth.getGasPrice();
    const gasLimit = 300000; // Adjust the gas limit as per your contract requirements
    _owner = account; //from user's metamask wallet
    _tokenId = tokenId; //from frontend
    _contractAddress = nftContract; //from frontend
    _targetChain = targetChain; //from frontend
    _uri = uri; //from frontend
    _srcChain = await window.ethereum.request({ method: 'eth_chainId' });
    const txObject = {
      from: _owner,
      to: _contractAddress,
      data: contractActionLayer1Polygon.methods.sendNFT(name, symbol, tokenId, nftContract, targetChain, uri).encodeABI(),
      gasPrice: gasPrice,
      gas: gasLimit,
      value: '100000000000000', // Example: 0.0001 ETH, adjust the value as per your requirement
    };

    const signedTx = await polygon_web3.eth.accounts.signTransaction(txObject, privateKey);
    const rawTx = signedTx.rawTransaction;

    const receipt = await polygon_web3.eth.sendSignedTransaction(rawTx);
    console.log('Transaction sendNFT and message.sol successful:', receipt.transactionHash);
    const fetchedMessage = await contractMessagePolygon.methods
      .getMsg(_owner, _selfID, _targetChain)
      .call();
    _password = fetchedMessage;
    console.log("password: ", _password);
    _selfID = await contractActionLayer1Polygon.methods.getSelfID().call();
    console.log("selfID: ", _selfID);
  } catch (error) {
    console.error('Transaction failed:', error);
  }
};

// This is for the receiver.sol on sepolia network
//message -> _password
//owner -> accountSp.address
//selfID -> _selfID
async function addMessage(_srcChain, _selfID, _password, address) {
  try {
    console.log('chainId')
    if (parseInt(_srcChain) === 80001) {
      console.log("addMessage called for polygon network")
    const minFee = sepolia_web3.utils.toWei('0.0001', 'ether'); // Minimum fee in ether (adjust as needed)
      console.log("minFee: ", minFee)
    // Get the current gas price
    const gasPrice = await sepolia_web3.eth.getGasPrice();
    console.log("gasPrice: ", gasPrice)
    //srcChain->frontend
    // Estimate the gas limit for the transaction
    // const gasLimit = await contractReceiverSepholi.methods
    //   .addMsg(_srcChain, _selfID, _password, address)
    //   .estimateGas();

    //   console.log("gasLimit: ", gasLimit)

    // Build the transaction object
    const txObject = {
      from: accountSepholi.address,
      to: contractAddressReceiverSepholi,
      data: contractReceiverSepholi.methods.addMsg(_srcChain, _selfID, _password, address).encodeABI(),
      gasPrice: gasPrice,
      gas: 200000,
      value: minFee,
    };

    console.log("txObject: ", txObject)

    // Sign and send the transaction
    const signedTx = await sepolia_web3.eth.accounts.signTransaction(txObject, privateKey);
    const rawTx = signedTx.rawTransaction;
    const receipt = await sepolia_web3.eth.sendSignedTransaction(rawTx);

    console.log('Transaction receiver successful:', receipt.transactionHash);
  } else {
    const minFee = polygon_web3.utils.toWei('0.0001', 'ether'); // Minimum fee in ether (adjust as needed)

    // Get the current gas price
    const gasPrice = await polygon_web3.eth.getGasPrice();

    // Estimate the gas limit for the transaction
    const gasLimit = await contractReceiverPolygon.methods.addMsg(_srcChain, _selfID, _password, address).estimateGas();

    // Build the transaction object
    const txObject = {
      from: accountPolygon.address,
      to: contractAddressReceiverPolygon,
      data: contractReceiverPolygon.methods.addMsg(_srcChain, _selfID, _password, address).encodeABI(),
      gasPrice: gasPrice,
      gas: gasLimit,
      value: minFee,
    };

    // Sign and send the transaction
    const signedTx = await polygon_web3.eth.accounts.signTransaction(txObject, privateKey);
    const rawTx = signedTx.rawTransaction;
    const receipt = await polygon_web3.eth.sendSignedTransaction(rawTx);
    console.log('Transaction receiver successful:', receipt.transactionHash);
  }
  } catch (error) {
    console.error('Transaction failed:', error);
  }
}

const getSelfID = async (srcChain) => {
  try {
    console.log(srcChain);
    if (parseInt(srcChain) === 80001) {
      console.log('getSelfID called for polygon network')
      return await contractActionLayer1Polygon.methods.getSelfID().call();
    }
    else {
      return await contractActionLayer1Sepholi.methods.getSelfID().call();
    }
  } catch (error) {
    console.error('Transaction failed:', error);
  }
};

const getPassword = async (address, selfID, targetChain, srcChain) => {
  try {
    if (parseInt(srcChain) === 80001) {
      return await contractMessagePolygon.methods
      .getMsg(address, selfID, targetChain)
      .call();
    }
    else {
      return await contractMessageSepholi.methods
      .getMsg(address, selfID, targetChain)
      .call();
    }
  }
  catch (error) {
    console.error('Transaction failed:', error);
  }
}

const getNFT = async (selfID, srcChain, address) => {
  try {
    
    if (parseInt(srcChain) === 80001) {
      console.log('getNFT called for polygon network');
      return await contractActionLayer2Sepholi.methods.getNFT(selfID, srcChain, address).call();
    }
    else {
      return await contractActionLayer2Polygon.methods.getNFT(selfID, srcChain, address).call();
    }
  }
  catch (error) {
    console.error('Transaction failed:', error);
  }
}

const releaseNFT = async (srcChain,address, password, tokenId) => {
  try {
    if (parseInt(srcChain) === 80001) {
      return await contractActionLayer1Polygon.methods.releaseNFT(address, password, tokenId).call();
    }
    else {
      return await contractActionLayer1Sepholi.methods.releaseNFT(address, password, tokenId).call();
    }
  }
  catch (error) {
    console.error('Transaction failed:', error);
  }
}

const mintNFT = async (srcChain,uri ,owner ) => {
  try {

    if (parseInt(srcChain) === 80001) {
      const gasPrice = await sepolia_web3.eth.getGasPrice();

    //srcChain->frontend
    // Estimate the gas limit for the transaction
    const gasLimit = await contractActionLayer2Sepholi.methods.fetchNFTDetails(uri, owner).estimateGas();

    // Build the transaction object
    const txObject = {
      from: accountSepholi.address,
      to: contractAddressActionLayer2Sepholi,
      data: contractActionLayer2Sepholi.methods.fetchNFTDetails(uri, owner).encodeABI(),
      gasPrice: gasPrice,
      gas: gasLimit,
    };

    // Sign and send the transaction
    const signedTx = await sepolia_web3.eth.accounts.signTransaction(txObject, privateKey);
    const rawTx = signedTx.rawTransaction;
    const receipt = await sepolia_web3.eth.sendSignedTransaction(rawTx);

    console.log('Transaction receiver successful:', receipt.transactionHash);
    }
    else {
      const gasPrice = await polygon_web3.eth.getGasPrice();

    //srcChain->frontend
    // Estimate the gas limit for the transaction
    const gasLimit = await contractActionLayer2Polygon.methods.fetchNFTDetails(uri, owner).estimateGas();

    // Build the transaction object
    const txObject = {
      from: accountPolygon.address,
      to: contractActionLayer2Polygon,
      data: contractActionLayer2Polygon.methods.fetchNFTDetails(uri, owner).encodeABI(),
      gasPrice: gasPrice,
      gas: gasLimit,
    };

    // Sign and send the transaction
    const signedTx = await polygon_web3.eth.accounts.signTransaction(txObject, privateKey);
    const rawTx = signedTx.rawTransaction;
    const receipt = await polygon_web3.eth.sendSignedTransaction(rawTx);

    console.log('Transaction receiver successful:', receipt.transactionHash);
  }
  }
  catch (error) {
    console.error('Transaction failed:', error);
  }
}

const transfer = async (srcChain, address, targetChain, tokenId,uri ) => {
  try {
    var selfID = await getSelfID(srcChain);
    selfID = parseInt(selfID) - 1;
    console.log(selfID)
    const password = await getPassword(address, selfID, targetChain, srcChain);
    console.log(password);
    // Call the addMsg function with the provided parameters
    console.log("/addmsgreceiver called");
    await addMessage(srcChain, selfID, password, address);

    const confirmPassword = await getNFT(selfID, srcChain, address);
    console.log(confirmPassword);
    // Call the releaseNFT function
    await releaseNFT(srcChain, address, confirmPassword, tokenId);

    await mintNFT(srcChain,uri ,address);
  }
  catch (error) {
    console.error('Transaction failed:', error);
  }
}


app.get('/transfer',async (req, res) => {
  const { srcChain, address, targetChain, tokenId,uri } = req.query; // Assuming the required data is sent in the request body
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with your desired origin(s) or set to '*' to allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Specify the allowed HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Specify the allowed headers
  console.log(srcChain, address, targetChain, tokenId,uri);
  try {
    transfer(srcChain, address, targetChain, tokenId,uri);

    // Optionally, you can return a success response
    res.status(200).json({ message: 'Receiver Message added successfully' });
  } catch (error) {
    // Handle errors
    console.error('Failed to add message:', error);
    res.status(500).json({ error: 'Failed to add message' });
  }
});



// app.post('/sendnft', async (req, res) => {
//   const { name, symbol, tokenId, nftContract, targetChain, uri } = req.body; // Assuming the required data is sent in the request body

//   try {
//     // Call the sendNFT function
//     console.log("/sendnft called");
//     await sendNFT(name, symbol, tokenId, nftContract, targetChain, uri);

//     // Optionally, you can return a success response
//     res.status(200).json({ message: 'NFT sent successfully' });
//   } catch (error) {
//     // Handle errors
//     console.error('Failed to send NFT:', error);
//     res.status(500).json({ error: 'Failed to send NFT' });
//   }
// });


// app.get('/getnftpassword', async (req, res) => {
//   try {

//     console.log()
//     _confirmPassword = await contractActionLayer2Sepholi.methods.getNFT(_selfID, _srcChain, accountSepholi.address).call();
//     if (_confirmPassword) {
//       res.status(200).json({ message: 'Password received successfully from the getNFT added successfully' });
//     }
//     else {
//       res.status(400).json({ message: 'Passowod if EMPTY' });
//     }

//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to get password' });
//   }
// });

// app.get('/nftdata', async (req, res) => {
//   console.log('/nftdata route called')
//   try {

//     // Call the releaseNFT function
//     const nftData = await contractActionLayer1Polygon.methods.releaseNFT(_owner, _confirmPassword, _tokenId).call();

//     // Assign the nftData or actual nft struture to the storedNFTData variable
//     storedNFTData = nftData;

//     // Optionally, you can further process or manipulate the nftData object here

//     // Return a success response
//     res.status(200).json({ message: storedNFTData });
//   } catch (error) {
//     // Handle errors
//     console.error('Failed to fetch NFT data:', error);
//     res.status(500).json({ error: 'Failed to fetch NFT data' });
//   }
// });

// //finally the minting of nft once we receiver the nftData structure
// app.post('/mintnft', async (req, res) => {
//   try {
//     // Call the fetchNFTDetails function
//     await contractActionLayer2Sepholi.methods.fetchNFTDetails(_uri, _owner).send({ from: accountSepholi.address });

//     // Optionally, you can return a success response
//     res.status(200).json({ message: 'NFT minted successfully' });
//   } catch (error) {
//     // Handle errors
//     console.error('Failed to mint NFT:', error);
//     res.status(500).json({ error: 'Failed to mint NFT' });
//   }
// });

// Start the server
app.listen(5001, () => {
  console.log('Server started on port 5001');
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