import React, { useState, createContext } from "react";

const PrintOrderContext = createContext();

export { PrintOrderContext };

function PrintOrderContextProvider(props) {
  const { children } = props;
  const [printOrders, setPrintOrders] = useState([]);

  return (
    <PrintOrderContext.Provider
      value={{
        printOrders,
        setPrintOrders,
      }}
    >
      {children}
    </PrintOrderContext.Provider>
  );
}

export default PrintOrderContextProvider;
