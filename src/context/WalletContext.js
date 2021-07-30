import React, { useState, createContext } from "react";

const WalletContext = createContext();

export { WalletContext };

function WalletContextProvider(props) {
  const { children } = props;
  const [wallet, setWallet] = useState({});

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export default WalletContextProvider;
