
const useNFT = () =>{
    async function polygon(account){
        console.log(`account for polygon: ${account}`);
        console.log("now the account for polygon is:", account);
        const res = await fetch(
            `https://api-testnet.polygonscan.com/api?module=account&action=tokennfttx&address=${account}&page=1&offset=100&sort=asc&apikey=${process.env.POLYGON_API_KEY}`
        );
        const data = await res.json();
        console.log("Polygon result is:", data);
        return data.result;
    }
    async function sepolia(account){
        console.log("account for sepolia: ", account);
        const res = await fetch(
            `https://api-sepolia.etherscan.io/api?module=account&action=tokennfttx&address=${account}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.SEPOLIA_API_KEY}`
        );
        const data = await res.json();
        console.log("Sepolia result is:", data);
        return data.result;
    }
    
    return {polygon, sepolia}
    
}

export default useNFT;