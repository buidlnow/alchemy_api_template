/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import styles from "@/styles/display.module.css";

export default function Sdk_Example(){
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [count, setCount ] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    const getNFTS = async () => {
      console.log("fetching NFTS")
      const response = await fetch(`/api/nft`);
      const data = await response.json();
      console.log(data)
      setOwnedNFTs(data.ownedNfts);
      setCount(data.totalCount)
      setAddress(data.userAddress)
    }
    getNFTS()
  },[])
  console.log(ownedNFTs)
  return(
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
  )
}