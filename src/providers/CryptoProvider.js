import React from "react";
import CryptoContext from "../contexts/CryptoContext";

function CryptoProvider({ children }) {
  const [indexes, setIndexes] = React.useState({
    higher: true,
    average: true,
    lower: true,
  });
  const [ranges, setRanges] = React.useState({
    max: {
      from: null,
      to: null,
    },
    min: {
      from: null,
      to: null,
    },
  });
  return (
    <CryptoContext.Provider
      value={{
        indexes,
        setIndexes,
        ranges,
        setRanges,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoProvider;
