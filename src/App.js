import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";
import { Block } from "./pages/Block";
import { Transaction } from "./pages/Transaction";
import { Account } from "./pages/Account";

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

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactionHash, setTransactionHash] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);

  return (
    <>
      <div className="App">Block Number: {blockNumber}</div>
      <Account />
      <Transaction
        setBlockNumber={setBlockNumber}
        transactionHash={transactionHash}
        setTransactionHash={setTransactionHash}
      />
      <Block blockNumber={blockNumber} setBlockNumber={setBlockNumber} />
    </>
  );
}

export default App;
