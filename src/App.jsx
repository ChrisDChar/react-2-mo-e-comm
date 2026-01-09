import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Carts from "./pages/Carts";
import HeroSection from "./components/HeroSection";
import ProductCards from "./components/ProductCards";
import SinglePage from "./pages/SinglePage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/hero" element={<HeroSection />} />
          <Route path="/ProductCards" element={<ProductCards />} />
          <Route path="/single/:id" element={<SinglePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
