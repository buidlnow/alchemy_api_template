/* eslint-disable @next/next/no-img-element */
import { useState } from "react"
import { ethers } from "ethers"
import styles from "@/styles/display.module.css";

export default function ConnectWallet() {
  const [address, setAddress] = useState(null);
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [count, setCount ] = useState("")
  const handleWalletConnect = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAddress(address);
      const postData = { address }
      try {
        const response = await fetch(`/api/nft`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: postData })
        })
        const data = await response.json()
        setOwnedNFTs(data.ownedNfts);
        setCount(data.totalCount)
        console.log(result)
      } catch (error){
        console.log(error)
      }
    } else {
      alert('No Wallet Detected')
    }
  }
  return(
    <div>
      {address ? (
        <div>
        <h1 className={styles.heading}>Detected {count} NFTs for {address}</h1>
        <h1 className={styles.heading}>Using SDK</h1>
        <div className={styles.display}>
        {ownedNFTs.map((nft) => 
          <div className={styles.nft} key={nft.title}>
            <p>{nft.title}</p>
            <img className={styles.image} src={nft.media[0].gateway} alt={nft.title} />
          </div>
        )}
        </div>
      </div>
      ): <button onClick={() => handleWalletConnect()}>Click me for post</button> }
    </div>
  )
}