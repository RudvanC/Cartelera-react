import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Filminfo from "./pages/auth/FilmInfo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Filminfo />
    </>
  );
}

export default App;
