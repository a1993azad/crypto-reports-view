import { useContext } from "react";
import CryptoContext from "../contexts/CryptoContext";

function useCrypto() {
  const crypto = useContext(CryptoContext);
  return crypto;
}

export default useCrypto;
