import React from "react";
import Shared from "./components/Shared/Shared";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
function Router() {
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

export default Router;
