import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import HeroSection from "./components/HeroSection";
import ProductCards from "./components/ProductCards";
import SinglePage from "./pages/SinglePage";
import Favourite from "./pages/Favourite";
import { CartProvider } from "./context/CartContext";
import { FavouriteProvider } from "./context/FavouriteContext";
import AllProductsPage from "./pages/AllProductsPage";

function App() {
  return (
    <FavouriteProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/hero" element={<HeroSection />} />
              <Route path="/ProductCards" element={<ProductCards />} />
              <Route path="/single/:id" element={<SinglePage />} />
              <Route path="/favourite" element={<Favourite />} />
              <Route path="/shop" element={<AllProductsPage />} />
              
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </FavouriteProvider>
  );
}

export default App;