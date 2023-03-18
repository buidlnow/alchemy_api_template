const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


const apiKey = process.env.ALCHEMY_API_KEY;
const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;
// Replace with the wallet address you want to query:
const userAddress = "0x322Af0da66D00be980C7aa006377FCaaEee3BDFD";
const fetchURL = `${baseURL}?owner=${userAddress}`;


export default async function handler(req, res) {
  const response = await fetch(fetchURL, requestOptions)
  const data = await response.json()

  res.json({...data, userAddress}); // Send the response
}