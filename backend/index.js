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

//chain 1 - POLYGON
const privateKey = process.env.SP_PRIVATE_KEY;



//Just thought if we can use them directly for minting rather than calling them by ActionLayer smart contract
const actionContractAddrPolygon = '0x3cFeC63877917d4c9a3D531e58686F50cB7fcee8';
const messageContractAddrPolygon = '0x0227f4Aa24A6055462c9983cA913e669F6910D5d';
const receiverContractAddrPolygon = '0x0058499fabEE90436bf11d9172A9A5Bc581Fb43E';


//chain 2 - SEPOLIA

const messageContractAddrSepolia = '0x42D2f2f1789Db2Db9fea54E2e2d95ebe9aFD180c'
const receiverContractAddrSepolia = '0x2d40550449540Ceeab4d8987F2453f57EafaCd92'
const actionContractAddrSepolia = '0x028287F483936215aD982F73fA04eaE10E8105B7';

// const contractAddressMessageSepholi = '0x621C66F619b5b16A0e15D5531f3e739Cdf0EdFd2'

const rpcUrlPolygon = process.env.RPC_URL_PL;
const rpuUrlSepolia = process.env.RPC_URL_SP;

// Connect to the Ethereum network
//chain 1 - POLYGON
const polygon_web3 = new Web3(new Web3.providers.HttpProvider(rpcUrlPolygon));

//chain 2 - SEPOLIA
const sepolia_web3 = new Web3(new Web3.providers.HttpProvider(rpuUrlSepolia));

//abi remains same for all the chains
const contractABIActionLayer = require('./abi/ActionLayer.json');
const contractABIMyNFT = require('./abi/MyNFT.json');
const contractABIMessage = require('./abi/Message.json');
const contractABIReceiver = require('./abi/Receiver.json');


// Create an instance of the contract
//chain 1 - POLYGON
const contractActionLayerPolygon = new polygon_web3.eth.Contract(contractABIActionLayer, actionContractAddrPolygon);
const contractMessagePolygon = new polygon_web3.eth.Contract(contractABIMessage, messageContractAddrPolygon);
const contractReceiverPolygon = new polygon_web3.eth.Contract(contractABIReceiver, receiverContractAddrPolygon);

//chain 2 - SEPOLIA

const contractActionLayerSepholi = new sepolia_web3.eth.Contract(contractABIActionLayer, actionContractAddrSepolia);
const contractMessageSepolia = new polygon_web3.eth.Contract(contractABIMessage, messageContractAddrSepolia);
const contractReceiverSepolia = new polygon_web3.eth.Contract(contractABIReceiver, receiverContractAddrSepolia);

// Set the account that will sign the transactions
//chain 1 - POLYGON
const accountPolygon = polygon_web3.eth.accounts.privateKeyToAccount(privateKey);
polygon_web3.eth.accounts.wallet.add(accountPolygon);
polygon_web3.eth.defaultAccount = accountPolygon.address;

//chain 2 - SEPOLIA
const accountSepholi = sepolia_web3.eth.accounts.privateKeyToAccount(privateKey);
sepolia_web3.eth.accounts.wallet.add(accountSepholi);
sepolia_web3.eth.defaultAccount = accountSepholi.address;



async function addMessage(_srcChain, _selfID, _password, receiver) {
  try {
    console.log('chainId')
    if (parseInt(_srcChain) === 80001) {
      // when transferring from polygon to sepolia, we need to add the passcode, receiver and selfID
      // to sepolia for the verification
      console.log("addMessage called for polygon network")
      const minFee = sepolia_web3.utils.toWei('0.0015', 'ether'); // Minimum fee in ether (adjust as needed)
      console.log("minFee: ", minFee)
    // Get the current gas price
    const gasPrice = await sepolia_web3.eth.getGasPrice();
    console.log("gasPrice: ", gasPrice)
    

    // Build the transaction object
    console.log("called the receiver of sepolia and adding to it")
    console.log("addmsg to mint selfid", _selfID)
    console.log("addmsg to mint srcChain", _srcChain)
    console.log("addmsg to mint _passoword",  _password)
    console.log("addmsg to mint to receiver address", receiver)
    const txObject = {
      from: accountSepholi.address,
      to: receiverContractAddrSepolia,
      data: contractReceiverSepolia.methods.addMsg(_selfID, _password, receiver).encodeABI(),
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

    // when transferring from sepolia to polygon, we need to add the passcode, receiver and selfID
    // to sepolia for the verification

    //when transferring from sepolia to polygon
    const minFee = polygon_web3.utils.toWei('0.0015', 'ether'); // Minimum fee in ether (adjust as needed)

    // Get the current gas price
    const gasPrice = await polygon_web3.eth.getGasPrice();

    // Estimate the gas limit for the transaction
    // const gasLimit = await contractReceiverPolygon.methods.addMsg(_srcChain, _selfID, _password, address).estimateGas();
    console.log("called the receiver of polygon and adding to it")
    console.log("password:", _password);
    console.log("_srcChain:", _srcChain);
    console.log("receiver:", receiver);
    console.log("_selfID:", _selfID);

    // Build the transaction object
    const txObject = {
      from: accountPolygon.address,
      to: receiverContractAddrPolygon,
      data: contractReceiverPolygon.methods.addMsg(_selfID, _password, receiver).encodeABI(),
      gasPrice: gasPrice,
      gas: 200000,
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
      return await contractMessagePolygon.methods.getSelfID().call();
    }
    else {
      return await contractMessageSepolia.methods.getSelfID().call();
    }
  } catch (error) {
    console.error('Transaction failed:', error);
  }
};

const getReceiverPassword = async (srcChain) => {
  try {
    if (parseInt(srcChain) === 80001) {
      
      console.log("getReceiverPassword came to polygon");
      return await contractMessagePolygon.methods
      .getReceiverPassword()
      .call();

    }
    else {
      console.log("getReceiverPassword came to sepolia");
      return await contractMessageSepolia.methods
      .getReceiverPassword()
      .call();
    }
  }
  catch (error) {
    console.error('Transaction failed:', error);
  }
}

const returnConfirmDetails = async (srcChain) => {
  try {
    
    if (parseInt(srcChain) === 80001) {
      console.log('returnConfirmDetails called for sepolia network to be transferred to polygon to release NFT');
      console.log("srcChain:", srcChain);
      return await contractMessageSepolia.methods.getReceiverPassword().call();
      
    }
    else {
      console.log('returnConfirmDetails called for sepolia network to be transferred to sepolia to release NFT');
      console.log("srcChain:", srcChain);
      return await contractMessagePolygon.methods.getReceiverPassword().call();
      
    }
  }
  catch (error) {
    console.error('Transaction failed:', error);
  }
}

const releaseNFT = async (srcChain, confirmReceiver, confirmPassword) => {
  console.log("release NFT called!");
  console.log("inside release NFT, receiver address:", confirmReceiver);
  console.log("inside release NFT, confirm Password:", confirmPassword);
  try {
    console.log('chainId:', srcChain);
    if (parseInt(srcChain) === 80001) {
      console.log("releasing the nft from the polygon and transferring the ownership to the new receiver address")
      // when transferring from polygon to sepolia, we need to add the passcode, receiver and selfID
      // to sepolia for the verification
      console.log("addMessage called for polygon network")
      const minFee = polygon_web3.utils.toWei('0.0015', 'ether'); // Minimum fee in ether (adjust as needed)
      console.log("minFee: ", minFee)
    // Get the current gas price
    const gasPrice = await polygon_web3.eth.getGasPrice();
    console.log("gasPrice: ", gasPrice)
    

    // Build the transaction object
    console.log("releasing the nft on the polygon network")
    
    console.log("srcChain to release NFT on", srcChain)
    console.log("passoword to unlock NFT",  confirmPassword)
    console.log("receiver receiver address", confirmReceiver)
    const txObject = {
      from: accountPolygon.address,
      to: receiverContractAddrPolygon,
      data: contractReceiverPolygon.methods.getConfirmDetails(confirmReceiver, confirmPassword).encodeABI(),
      gasPrice: gasPrice,
      gas: 200000,
      value: minFee,
    };

    console.log("txObject: ", txObject)

    // Sign and send the transaction
    const signedTx = await polygon_web3.eth.accounts.signTransaction(txObject, privateKey);
    const rawTx = signedTx.rawTransaction;
    const receipt = await polygon_web3.eth.sendSignedTransaction(rawTx);

    console.log('Transaction receiver successful:', receipt.transactionHash);
  }
    else {
      console.log("releasing the nft from the sepolia and transferring the ownership to the new receiver address")
      // when transferring from polygon to sepolia, we need to add the passcode, receiver and selfID
      // to sepolia for the verification
      console.log("addMessage called for polygon network")
      const minFee = sepolia_web3.utils.toWei('0.0015', 'ether'); // Minimum fee in ether (adjust as needed)
      console.log("minFee: ", minFee)
    // Get the current gas price
    const gasPrice = await sepolia_web3.eth.getGasPrice();
    console.log("gasPrice: ", gasPrice)
    

    // Build the transaction object
    console.log("releasing the nft on the polygon network")
    
    console.log("srcChain to release NFT on", srcChain)
    console.log("passoword to unlock NFT",  confirmPassword)
    console.log("receiver receiver address", confirmReceiver)
    const txObject = {
      from: accountSepholi.address,
      to: receiverContractAddrSepolia,
      data: contractReceiverSepolia.methods.getConfirmDetails(confirmReceiver, confirmPassword).encodeABI(),
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
    }
  }
  catch (error) {
    console.log("releasing the nft from the sepolia and transferring the ownership to the new receiver address")
    console.error('Transaction failed:', error);
  }
}

const mintNFT = async (srcChain, uri ,receiver ) => {
  console.log('came to mint nft!');
  try {

    if (parseInt(srcChain) === 80001) {
      console.log("came to minting the nft on sepolia!");
      const gasPrice = await sepolia_web3.eth.getGasPrice();
      console.log("gas price is here... :", gasPrice);
    

    // Build the transaction object
    const txObject = {
      from: accountSepholi.address,
      
      to: receiverContractAddrSepolia,
      
      data: contractReceiverSepolia.methods.mintNFT(receiver, uri).encodeABI(),
      gasPrice: gasPrice,
      gas: 200000
    };

    // Sign and send the transaction
    const signedTx = await sepolia_web3.eth.accounts.signTransaction(txObject, privateKey);
    const rawTx = signedTx.rawTransaction;
    const receipt = await sepolia_web3.eth.sendSignedTransaction(rawTx);

    console.log('Transaction receiver successful:', receipt.transactionHash);
    }
    else {
      const gasPrice = await polygon_web3.eth.getGasPrice();
      console.log("came to minting the nft on polygon!");
    
    

    // Build the transaction object
    console.log("accountPolygon.address:", accountPolygon.address);
    const txObject = {
      from: accountPolygon.address,
      // to: contractAddressmynftPolygon,
      to: receiverContractAddrPolygon,
      // data: contractmynftPolygon.methods.mintNFT(owner, uri).encodeABI(),
      data: contractReceiverPolygon.methods.mintNFT(receiver, uri).encodeABI(),
      gasPrice: gasPrice,
      gas: 200000,
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

const transfer = async (srcChain, uri ) => {
  try {
    var selfID = await getSelfID(srcChain);
    selfID = parseInt(selfID);
    console.log("final selfID from getSelfID:", selfID);
    console.log("srcChain inside trasnfer:", srcChain);
    
    let data = await getReceiverPassword(srcChain);
    
    console.log("receiver from getReceiverPassword:", data[0]);
    console.log("password from getReceiverPassword:", data[1]);
    
    
    await addMessage(srcChain, selfID, data[1], data[0]); //message will be added to other chain's Receiver.sol

    console.log("mintNFT now called");
    
    await mintNFT(srcChain, uri ,data[0]); 
    
    
    
    let confirmDetails = await returnConfirmDetails(srcChain);
    console.log("confirmDetails receiver address:", confirmDetails[0])
    console.log("confirmDetails password:", confirmDetails[1])

    // Call the releaseNFT function
    await releaseNFT(srcChain, confirmDetails[0], confirmDetails[1]);
  }
  catch (error) {
    console.error('Transaction failed:', error);
  }
}


app.get('/transfer',async (req, res) => {
  const { srcChain, uri } = req.query; // Assuming the required data is sent in the request body
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with your desired origin(s) or set to '*' to allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Specify the allowed HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Specify the allowed headers
  console.log(srcChain, uri);
  try {
    await transfer(srcChain, uri);
    console.log("NFT Minting successful!");
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
//     _confirmPassword = await contractActionLayerSepholi.methods.getNFT(_selfID, _srcChain, accountSepholi.address).call();
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
//     const nftData = await contractActionLayerPolygon.methods.releaseNFT(_owner, _confirmPassword, _tokenId).call();

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
//     await contractActionLayerSepholi.methods.fetchNFTDetails(_uri, _owner).send({ from: accountSepholi.address });

//     // Optionally, you can return a success response
//     res.status(200).json({ message: 'NFT minted successfully' });
//   } catch (error) {
//     // Handle errors
//     console.error('Failed to mint NFT:', error);
//     res.status(500).json({ error: 'Failed to mint NFT' });
//   }
// });

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