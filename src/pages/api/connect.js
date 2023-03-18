import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(settings);

// Replace the userAddress value with your ENS or ETH Address
const userAddress = "rahat.eth"

export default async function handler(req, res) {
  const nftsForOwner = await alchemy.nft.getNftsForOwner(userAddress)
  // const data = await fetch(
  //   `https://www.test.com/api/hello?apiKey=${process.env.API_KEY}`,
  // ).then(response => response.json());

  res.json({...nftsForOwner, userAddress}); // Send the response
}