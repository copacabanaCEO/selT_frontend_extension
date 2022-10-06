import React from "react";
import Shared from "./components/Shared/Shared";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Recommend from "./pages/Recommend/Recommend.tsx";
import Exception from "./pages/Exception/Exception.tsx";
import GoToMain from "./pages/GoToMain.js";
function Router() {
  return (
    <Routes>
      <Route
        path="shared/:name/:college_percentage/:feedback"
        element={<Shared />}
      />
      <Route path="/main" element={<Main />} />
      <Route path="/exception" element={<Exception />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/" element={<GoToMain />} />
    </Routes>
  );
}

export default Router;
