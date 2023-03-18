import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(settings);

// Replace the userAddress value with your ENS or ETH Address
let userAddress = "rahat.eth"

export default async function handler(req, res) {
  //if request is post look for conected address and update
  if (req.method === 'POST') {
    const { data } = req.body;
    userAddress = data.address
  }
  const nftsForOwner = await alchemy.nft.getNftsForOwner(userAddress)

  res.json({...nftsForOwner, userAddress}); // Send the response
}