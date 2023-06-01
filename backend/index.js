const express = require("express");
const app = express();
const port = 5001;
const Moralis = require("moralis").default;
const cors = require("cors");
const { default: axios } = require("axios");

require("dotenv").config({ path: ".env" });

app.use(cors());
app.use(express.json());

//please change the MORALIS_API_KEY 
const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

app.get("/getnfts", async (req, res) => {
  try {
    const { query } = req;
    console.log("query:", query);
    let parsed = JSON.parse(query.chain);
    console.log("query.chain.id: ", parsed);
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address: query.address,
      chain: parsed.id,
    });
    console.log("address", query.address)
    console.log(response);
    //sending response to frontend
    return res.status(200).json(response);
  } catch (e) {
    console.log(`Something went wrong ${e}`);
    return res.json();
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



Moralis.start({
  apiKey: MORALIS_API_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(port);
    console.log(`Listening for API Calls`);
  });
});