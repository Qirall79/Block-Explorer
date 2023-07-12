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

export const Account = () => {
  const [accountInfo, setAccountInfo] = useState();
  const [accountAddress, setAccountAddress] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setAccountAddress(value);
  };

  const handleClick = (e) => {
    alchemy.core
      .getBalance(accountAddress)
      .then((res) => {
        console.log(res);
        setAccountInfo(parseInt(res) / Math.pow(10, 18));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <h1>Get transaction Details</h1>
      <div>
        <input
          onChange={handleChange}
          type="text"
          name="address"
          id="address"
          placeholder="Enter an address"
          value={accountAddress}
        />
        <button onClick={handleClick}>Get Balance</button>
        {accountInfo && (
          <div>
            <p>balance: {accountInfo + " Eth"}</p>
          </div>
        )}
      </div>
    </main>
  );
};
