import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Politics from "./components/politics";
import Business from "./components/business";
import Science from "./components/science";
import USNEWS from "./components/usNews";
import World from "./components/world";
import Health from "./components/health";
import NewsInfo from "./components/newsInfo";
import Admin from "./components/admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="politics" element={<Politics />} />
        <Route path="business" element={<Business />} />
        <Route path="science" element={<Science />} />
        <Route path="USnews" element={<USNEWS />} />
        <Route path="world" element={<World />} />
        <Route path="health" element={<Health />} />
        <Route path="news" element={<NewsInfo />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
