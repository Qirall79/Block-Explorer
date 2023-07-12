import React from "react";

import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

export const Block = ({ blockNumber, setBlockNumber }) => {
  const [blockInfo, setBlockInfo] = useState({});

  const handleClick = (e) => {
    e.preventDefault();

    alchemy.core
      .getBlock(parseInt(blockNumber))
      .then((res) => {
        setBlockInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setBlockNumber(value);
  };

  return (
    <main>
      <h1>Get Block Details</h1>
      <div>
        <input
          onChange={handleChange}
          type="text"
          name="block"
          id="block"
          placeholder="Enter a block number"
          value={blockNumber}
        />
        <button onClick={handleClick}>Find Block</button>
      </div>

      {blockInfo?.hash && (
        <div>
          <p>Hash: {blockInfo.hash}</p>
          <p>Miner: {blockInfo.miner}</p>
          <p>nonce: {blockInfo.nonce}</p>
          <p>
            Timestamp:{" "}
            {new Date(parseInt(blockInfo.timestamp * 1000)).toLocaleString()}
          </p>
          <h3>Transactions</h3>
          <ul>
            {blockInfo.transactions.map((tx) => {
              return <p key={tx}>{tx}</p>;
            })}
          </ul>
        </div>
      )}
    </main>
  );
};
