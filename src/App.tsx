// @ts-ignore

import "./index.css";
import React from "react";

import Shared from "./pages/Shared";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
function App() {
  return (
    <Routes>
      <Route
        path="shared/:name/:college_percentage/:feedback"
        element={<Shared />}
      />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
