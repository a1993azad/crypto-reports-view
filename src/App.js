import "./assets/scss/main.scss";
import CryptoProvider from "./providers/CryptoProvider";
import Home from "./views/Home";
function App() {
  return (
    <>
      <CryptoProvider>
        <Home />
      </CryptoProvider>
    </>
  );
}

export default App;
