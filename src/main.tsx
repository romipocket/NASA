import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Nasa from "./components/NASA/nasa";
import Tle from "./components/TLE/tle";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Nasa />} />
          <Route path="/tle" element={<Tle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
