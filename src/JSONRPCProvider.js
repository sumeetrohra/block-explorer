import React, { createContext, useState } from "react";

export const ProviderContext = createContext();

const JSONRPCProvider = (props) => {
  const options = [
    {
      label: "Mainnet",
      url: process.env.REACT_APP_MAINNET_URL,
    },
    {
      label: "Goerli",
      url: process.env.REACT_APP_GOERLI_URL,
    },
    {
      label: "Rinkeby",
      url: process.env.REACT_APP_RINKEBY_URL,
    },
  ];

  const [provider, setProvider] = useState(options[0]);

  return (
    <ProviderContext.Provider value={{ provider, setProvider, options }}>
      {props.children}
    </ProviderContext.Provider>
  );
};

export default JSONRPCProvider;
