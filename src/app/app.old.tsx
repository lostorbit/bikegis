// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./app.module.scss";

import { Route, Routes } from "react-router-dom";

import Home from "../pages/map/map";

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>NEVER DOUBTED</h1>
            <h1>ALWAYS FEARED</h1>
          </>
        }
      />
      <Route path="/map/:mapurl" element={<Home />} />
      <Route path="/map/" element={<Home />} />
    </Routes>
  );
}

export default App;
