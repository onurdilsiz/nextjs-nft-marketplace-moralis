import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"

export default function Home() {
    const { isWeb3Enabled } = useMoralis()
    //How do we do show recently listed NFTs

    //We will index the events off-chain and then read from our database
    // Setup a server to listen for thıse events to be fired, and we will add them to a database to a query

    const { data: listedNfts, isFetching: fetchinListedNfts } = useMoralisQuery(
        "ActiveItem",
        //Function for the query
        (query) => query.limit(10).descending("tokenId")
    )
    console.log(listedNfts)

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    fetchinListedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        listedNfts.map((nft) => {
                            console.log(nft.attributes)
                            const {
                                price,
                                nftAddress,
                                tokenId,
                                marketplaceAddress,
                                seller,
                            } = nft.attributes

                            return (
                                <div>
                                    <NFTBox
                                        price={price}
                                        nftAddress={nftAddress}
                                        tokenId={tokenId}
                                        seller={seller}
                                        key={`${nftAddress}${tokenId}`}
                                        marketplaceAddress={marketplaceAddress}
                                    />
                                </div>
                            )
                        })
                    )
                ) : (
                    <div>Web3 currently not enaled</div>
                )}
            </div>
        </div>
    )
}
