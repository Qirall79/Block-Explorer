import React, { useState } from "react";

import { Alchemy, Network } from "alchemy-sdk";

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

export const Transaction = ({ transactionHash, setTransactionHash }) => {
  const [transactionInfo, setTransactionInfo] = useState({});

  const handleClick = (e) => {
    e.preventDefault();

    alchemy.core
      .getTransactionReceipt(transactionHash)
      .then((res) => {
        setTransactionInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setTransactionHash(value);
  };

  return (
    <main>
      <h1>Get transaction Details</h1>
      <div>
        <input
          onChange={handleChange}
          type="text"
          name="transaction"
          id="transaction"
          placeholder="Enter a transaction hash"
        />
        <button onClick={handleClick}>Get Transaction</button>
        {transactionInfo?.from && (
          <div>
            <p>from: {transactionInfo.from}</p>
            <p>to: {transactionInfo.to}</p>
            <p className="block-number">
              blockNumber: {transactionInfo.blockNumber}
            </p>
            <p>transactionHash: {transactionInfo.transactionHash}</p>
          </div>
        )}
      </div>
    </main>
  );
};
