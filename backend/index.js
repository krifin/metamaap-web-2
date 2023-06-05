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
const contractAddressApplicationLayerPolygon = '0xC2A6234760589E76F22Fb74b4A23Eb71F159A34A';
const contractAddressApplicationLayerSepolia = '0x621C66F619b5b16A0e15D5531f3e739Cdf0EdFd2';

const rpcUrlPolygon = process.env.RPC_URL_PL;
const rpuUrlSepolia = process.env.RPC_URL_SP;

// Connect to the Ethereum network
//chain 1 - POLYGON
const polygon_web3 = new Web3(new Web3.providers.HttpProvider(rpcUrlPolygon));

//chain 2 - SEPOLIA
const sepolia_web3 = new Web3(new Web3.providers.HttpProvider(rpuUrlSepolia));


const applicationLayerABI = require('./abi/ApplicationLayer.json');

const contractApplicationLayerPolygon = new polygon_web3.eth.Contract(applicationLayerABI, contractAddressApplicationLayerPolygon);
const contractApplicationLayerSepolia = new sepolia_web3.eth.Contract(applicationLayerABI, contractAddressApplicationLayerSepolia);
// Set the account that will sign the transactions
//chain 1 - POLYGON
const accountPolygon = polygon_web3.eth.accounts.privateKeyToAccount(privateKey);
polygon_web3.eth.accounts.wallet.add(accountPolygon);
polygon_web3.eth.defaultAccount = accountPolygon.address;

//chain 2 - SEPOLIA
const accountSepholi = sepolia_web3.eth.accounts.privateKeyToAccount(privateKey);
sepolia_web3.eth.accounts.wallet.add(accountSepholi);
sepolia_web3.eth.defaultAccount = accountSepholi.address;


// This is for the receiiving end, the chain on which NFT is to be minted or transferred to 
//message -> _password
//owner -> accountSp.address
//selfID -> _selfID
//this is from the server side
async function transferMessage(_srcChain, _selfID, _password, address) {
  try {
    console.log('chainId')
    if (parseInt(_srcChain) === 80001) {
      //when transferring from polygon to sepolia, we need to add the passcode to sepolia for the verification
      console.log("addMessage called for polygon network")
      const minFee = sepolia_web3.utils.toWei('0.0001', 'ether'); // Minimum fee in ether (adjust as needed)
      console.log("minFee: ", minFee)
    // Get the current gas price
    const gasPrice = await sepolia_web3.eth.getGasPrice();
    console.log("gasPrice: ", gasPrice)
    

    // Build the transaction object
    console.log("addmsg to mint selfid", _selfID)
    console.log("addmsg to mint srcChain", _srcChain)
    console.log("addmsg to mint _passowrd",  _password)
    console.log("addmsg to mint address", address)
    const txObject = {
      from: accountSepholi.address,
      to: contractAddressApplicationLayerSepolia,
      
      data: contractApplicationLayerSepolia.methods.transferMsg(_srcChain, _selfID, _password, address).encodeABI(),
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

    //when transferring from sepolia to polygon
    const minFee = polygon_web3.utils.toWei('0.0001', 'ether'); // Minimum fee in ether (adjust as needed)

    // Get the current gas price
    const gasPrice = await polygon_web3.eth.getGasPrice();

    // Estimate the gas limit for the transaction
    // const gasLimit = await contractReceiverPolygon.methods.addMsg(_srcChain, _selfID, _password, address).estimateGas();
    console.log("password:", _password);
    console.log("_srcChain:", _srcChain);
    console.log("address:", address);
    console.log("_selfID:", _selfID);

    // Build the transaction object
    const txObject = {
      from: accountPolygon.address,
      to: contractAddressApplicationLayerPolygon,
      // data: contractReceiverPolygon.methods.addMsg(_srcChain, _selfID, _password, address).encodeABI(),
      data: contractApplicationLayerPolygon.methods.transferMsg(_srcChain, _selfID, _password, address).encodeABI(),
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
      return await contractApplicationLayerPolygon.methods.getSelfID().call();
    }
    else {
      return await contractApplicationLayerSepolia.methods.getSelfID().call();
    }
  } catch (error) {
    console.error('Transaction failed:', error);
  }
};

const getPassword = async (address, selfID, targetChain, srcChain) => {
  try {
    if (parseInt(srcChain) === 80001) {
      console.log("address of receiver for transferring to polygon: ", address);
      return await contractAddressApplicationLayerPolygon.methods
      .getNFT(selfID,address, targetChain)
      .call();

    }
    else {
      // return await contractMessageSepholi.methods
      // .getMsg(address, selfID, targetChain)
      // .call();
      return await contractApplicationLayerSepolia.methods
      .getNFT(selfID,address, targetChain)
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
      console.log("sender:", address);
      console.log("selfID:", selfID);
      console.log("srcChain:", srcChain);
      return await contractApplicationLayerSepolia.methods.getNFT(selfID,address, srcChain ).call();
    }
    else {
      console.log('getNFT called for sepolia network');
      console.log("sender:", address);
      console.log("selfID:", selfID);
      console.log("srcChain:", srcChain);
      return await contractApplicationLayerPolygon.methods.getNFT(selfID,address, srcChain).call();
    }
  }
  catch (error) {
    console.error('Transaction failed:', error);
  }
}

const releaseNFT = async (srcChain,address, password, tokenId) => {
  try {
    if (parseInt(srcChain) === 80001) {
      return await contractApplicationLayerPolygon.methods.fetchNFTDetails(address, password, tokenId).call();
    }
    else {
      return await contractApplicationLayerSepolia.methods.fetchNFTDetails(address, password, tokenId).call();
    }
  }
  catch (error) {
    console.error('Transaction failed:', error);
  }
}

const mintNFT = async (srcChain, uri ,owner ) => {
  try {

    if (parseInt(srcChain) === 80001) {
      const gasPrice = await sepolia_web3.eth.getGasPrice();

    //srcChain->frontend
    // Estimate the gas limit for the transaction
    const gasLimit = await contractApplicationLayerSepolia.methods.mintNFT(uri, owner).estimateGas();

    // Build the transaction object
    const txObject = {
      from: accountSepholi.address,
      to: contractAddressApplicationLayerSepolia,
      data: contractApplicationLayerSepolia.methods.mintNFT(uri, owner).encodeABI(),
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
    const gasLimit = await contractApplicationLayerPolygon.methods.fetchNFTDetails(uri, owner).estimateGas();

    // Build the transaction object
    console.log("accountPolygon.address:", accountPolygon.address);
    const txObject = {
      from: accountPolygon.address,
      to: contractAddressApplicationLayerPolygon,
      data: contractApplicationLayerPolygon.methods.mintNFT(uri, owner).encodeABI(),
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

const transfer = async (srcChain, address, targetChain, tokenId, uri ) => {
  try {
    var selfID = await getSelfID(srcChain);
    selfID = parseInt(selfID) - 1;
    console.log("final selfID from getSelfID:", selfID);
    console.log("srcChain inside trasnfer:", srcChain);
    console.log("address inside transfer:", address);
    const password = await getPassword(address, selfID, targetChain, srcChain);
    console.log("password from getPassword:", password);
    // Call the addMsg function with the provided parameters
    console.log("/addmsgreceiver called");
    await transferMessage(srcChain, selfID, password, address); //message will be added to other chain

    console.log("getNFT now called");
    console.log("getNFT src chain", srcChain);
    console.log("getNFT selfID", selfID);
    console.log("getNFT address", address);
    const confirmPassword = await getNFT(selfID, srcChain, address);
    // const confirmPassword = await getNFT(selfID-1, srcChain, address);
    console.log('confirmPassword:', confirmPassword);
    console.log(confirmPassword);
    // Call the releaseNFT function
    await releaseNFT(srcChain, address, confirmPassword, tokenId);

    console.log("address:", address);
    await mintNFT(srcChain, uri ,address);
  }
  catch (error) {
    console.error('Transaction failed:', error);
  }
}


app.get('/transfer',async (req, res) => {
  const { srcChain, address, targetChain, tokenId, uri } = req.query; // Assuming the required data is sent in the request body
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with your desired origin(s) or set to '*' to allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Specify the allowed HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Specify the allowed headers
  console.log(srcChain, address, targetChain, tokenId,uri);
  try {
    await transfer(srcChain, address, targetChain, tokenId, uri);
    console.log("NFT Minting successful!");
    // Optionally, you can return a success response
    res.status(200).json({ message: 'Receiver Message added successfully' });
  } catch (error) {
    // Handle errors
    console.error('Failed to add message:', error);
    res.status(500).json({ error: 'Failed to add message' });
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