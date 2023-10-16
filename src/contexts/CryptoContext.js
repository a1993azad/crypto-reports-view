import { createContext } from "react";

const defaultValue = {
  indexes: {
    higher: true,
    average: true,
    lower: true,
  },
  setIndexes: () => {},
  ranges: {
    max: {
      from: null,
      to: null,
    },
    min: {
      from: null,
      to: null,
    },
  },
  setRanges: () => {},
};
const CryptoContext = createContext(defaultValue);
export default CryptoContext;
