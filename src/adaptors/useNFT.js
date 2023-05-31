import { isFocusable } from "@testing-library/user-event/dist/utils";

const useNFT = () => {
    async function polygon(account) {
        console.log(`account for polygon: ${account}`);
        console.log("now the account for polygon is:", account);
        const res = await fetch(
            `https://api-testnet.polygonscan.com/api?module=account&action=tokennfttx&address=${account}&page=1&offset=100&sort=asc&apikey=${process.env.POLYGON_API_KEY}`
        );
        const data = await res.json();
        console.log("Polygon result is:", data);
        console.log(data.result);
        // return data.result;
        data.result.sort((a, b) => {
            return parseInt(a.timeStamp) - parseInt(b.timeStamp);
        });
        var result = [];
        var skip = [];
        console.log(data.result[0])
        console.log(data.result.length);
        for (let i = 0; i < data.result.length; i++) {
            if (skip.includes(i)) {
                continue;
            }
            console.log(skip);
            let last = -1;
            for (let j = i + 1; j < data.result.length; j++) {
                // if (data.result[i].tokenID && data.result[j].tokenID && data.result[i].contractAddress && data.result[j].contractAddress)
                if (data.result[i].tokenID === data.result[j].tokenID && data.result[i].contractAddress === data.result[j].contractAddress) {
                    last = j;
                    skip.push(j);
                }
            }
            if (last === -1) {
                result.push(data.result[i]);
            }else {

                if (data.result[last].to.toLowerCase() === account.toLowerCase()) {
                    result.push(data.result[last]);
                    last = -1;
                }
            }
        }
        console.log("result after removing duplicates:", result);
        return result;
        

    }
    async function sepolia(account) {
        console.log("account for sepolia: ", account);
        const res = await fetch(
            `https://api-sepolia.etherscan.io/api?module=account&action=tokennfttx&address=${account}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.SEPOLIA_API_KEY}`
        );
        const data = await res.json();
        console.log("Sepolia result is:", data);
        return data.result;
    }

    return { polygon, sepolia }

}

export default useNFT;