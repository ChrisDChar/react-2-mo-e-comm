import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { BsFillCartDashFill } from "react-icons/bs";
import { useCart } from "../context/CartContext";
import useFetch from "../hooks/useFetch";
import HeartIcon from "../assets/CardImages/Heart.png";
import EyeIcon from "../assets/CardImages/Eye.png";
import XiaomiEarBuds from "../assets/HomeImages/XiaomiEarBuds.png";

const NewProductSection = () => {
  const { data, loading, error } = useFetch("products?limit=200");
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

  const products = data?.products || [];
  const newCategories = ["all", "laptops", "home-decoration", "mens-shirts", "womens-bags"];

  const filtered =
    activeCategory === "all"
      ? products.filter(p => ["laptops","home-decoration","mens-shirts","womens-bags"].includes(p.category))
      : products.filter(p => p.category === activeCategory);

  const displayProducts = filtered.slice(0, 8);

  const toggleFavourite = (id) => {
    const updated = favourites.includes(id)
      ? favourites.filter(item => item !== id)
      : [...favourites, id];
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:grid lg:grid-cols-6 gap-6">
        
        {/* Left Side: Products */}
        <div className="lg:col-span-4 flex flex-col h-full">
          
          {/* Header: Responsive Flex Direction */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 py-2 gap-4">
            <h2 className="text-2xl font-semibold">New Arrivals</h2>
            
            <div className="flex items-center gap-2 sm:gap-4 text-sm flex-wrap w-full sm:w-auto">
              {newCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`capitalize cursor-pointer ${
                    activeCategory === cat
                      ? "text-orange-500 font-medium"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {cat.replace("-", " ")}
                </button>
              ))}
              <Link to="/shop" className="text-blue-600 font-semibold hover:underline text-sm md:text-base w-fit">
                Browse All Products →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 h-full">
            {loading && <p>Loading...</p>}
            {error && <p>Error loading products</p>}

            {displayProducts.map((product) => {
              const discounted = (
                product.price -
                (product.price * product.discountPercentage) / 100
              ).toFixed(2);
              const rating = Math.round(product.rating);
              const isFav = favourites.includes(product.id);
              const isInCart = cartItems.some(item => item.id === product.id);

              return (
                <div
                  key={product.id}
                  className="border border-gray-200 flex flex-col relative group overflow-hidden cursor-pointer h-full bg-white"
                >
                  <div className="w-full h-[160px] flex items-center justify-center bg-white">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="absolute top-2 left-2 right-2 bottom-[80px] bg-gray-300/30 backdrop-blur-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => toggleFavourite(product.id)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
                        isFav ? "bg-[#FA8232]" : "bg-white hover:bg-[#FA8232]"
                      }`}
                    >
                      <img src={HeartIcon} className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() =>
                        isInCart ? removeFromCart(product.id) : addToCart(product)
                      }
                      className="w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#FA8232]"
                    >
                      {isInCart ? <BsFillCartDashFill size={14} /> : <FaCartPlus size={14} />}
                    </button>

                    <Link to={`/single/${product.id}`} className="w-7 h-7">
                      <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#FA8232]">
                        <img src={EyeIcon} className="w-4 h-4" />
                      </div>
                    </Link>
                  </div>

                  <div className="px-2 py-2 flex flex-col justify-end flex-1">
                    <div className="flex items-center gap-1 text-orange-400 text-sm mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < rating ? "★" : "☆"}</span>
                      ))}
                    </div>

                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {product.title}
                    </h4>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#ADB7BC] line-through">
                        ${product.price}
                      </span>
                      <span className="text-sm font-semibold text-[#2DA5F3]">
                        ${discounted}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          
          <div className="rounded-lg overflow-hidden flex flex-col 
            w-full h-auto 
            lg:w-[300px] lg:h-[350px] 
            text-center relative bg-[#F7E99E] p-4">
            <div className="w-full flex items-center justify-center flex-shrink-0 mt-4">
              <img src={XiaomiEarBuds} alt="Xiaomi Earbuds" className="w-[100px] h-[100px] object-contain" />
            </div>
            <h3 className="text-xl font-bold mt-2">Xiaomi True Wireless Earbuds</h3>
            <p className="text-sm text-gray-700 mt-2">Escape the noise, it’s time to hear the magic with Xiaomi Earbuds.</p>
            <p className="text-sm text-[#475156] mt-2">Only for: <span className="text-sm bg-white font-semibold text-gray-800 mt-2 ml-1 p-1">$299 USD</span></p>
            <button className="mt-4 bg-orange-500 text-white font-semibold px-6 py-2 text-sm cursor-pointer w-full mx-auto">Shop Now</button>
          </div>

          <div className="rounded-lg overflow-hidden flex flex-col 
            w-full h-auto 
            lg:w-[300px] lg:h-[210px] 
            relative bg-[#124261] text-center p-4">
            <span className="w-fit mx-auto text-xs bg-[#FFFFFF1F] text-white font-semibold uppercase px-2 py-1 mt-5">Summer Sales</span>
            <h3 className="text-2xl text-white font-bold mt-2">37% Discount</h3>
            <p className="text-sm text-white mt-2">Only for <span className="text-[#EBC80C] font-semibold">SmartPhone</span> products</p>
            <button className="mt-4 bg-[#2DA5F3] text-white font-semibold px-6 py-2 text-sm cursor-pointer w-full mx-auto">Shop Now</button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewProductSection;