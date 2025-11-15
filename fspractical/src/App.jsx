import { useState } from "react";
import "./App.css";
import { Display } from "./Display";

const initialName = prompt("Add your name") || "";

function App() {
  const [name, setName] = useState(initialName);

  return (
    <>
      <Display name={name} />
    </>
  );
}

export default App;
