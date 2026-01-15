import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { BsFillCartDashFill } from "react-icons/bs";
import { useCart } from "../context/CartContext";
import useFetch from "../hooks/useFetch";
import HeartIcon from "../assets/CardImages/Heart.png";
import EyeIcon from "../assets/CardImages/Eye.png";

const AllProductsPage = () => {
  const { data, loading, error } = useFetch("products?limit=0");
  const { cartItems, addToCart, removeFromCart } = useCart();

  const [favourites, setFavourites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, minPrice, maxPrice, minRating]);

  const products = data?.products || [];

  const globalMaxPrice = useMemo(() => {
    if (products.length === 0) return 2000;
    return Math.max(...products.map((p) => p.price));
  }, [products]);

  useEffect(() => {
    if (globalMaxPrice > 2000) {
      setMaxPrice(globalMaxPrice);
    }
  }, [globalMaxPrice]);

  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((p) => p.category))];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
      const priceMatch = product.price >= minPrice && product.price <= maxPrice;
      const ratingMatch = product.rating >= minRating;
      return categoryMatch && priceMatch && ratingMatch;
    });
  }, [products, selectedCategory, minPrice, maxPrice, minRating]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const displayedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  }, [filtered, currentPage]);

  const toggleFavourite = (id) => {
    const updated = favourites.includes(id)
      ? favourites.filter((item) => item !== id)
      : [...favourites, id];
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const handleReset = () => {
    setSelectedCategory("all");
    setMinPrice(0);
    setMaxPrice(globalMaxPrice);
    setMinRating(0);
    setCurrentPage(1);
  };

  const paginationButtons = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`w-10 h-10 rounded cursor-pointer ${
          currentPage === page
            ? "bg-orange-500 text-white font-semibold"
            : "bg-white border border-gray-300 hover:bg-gray-50"
        }`}
      >
        {page}
      </button>
    ));
  }, [totalPages, currentPage]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="lg:sticky lg:top-4 space-y-8 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Filter By</h3>
              <button 
                onClick={handleReset}
                className="text-xs text-orange-500 font-semibold hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Category</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`capitalize text-sm flex items-center gap-2 transition cursor-pointer ${
                        selectedCategory === cat
                          ? "text-orange-500 font-bold"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${selectedCategory === cat ? "bg-orange-500" : "bg-gray-300"}`}></span>
                      {cat.replace("-", " ")}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Price Range</h3>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 block mb-1">Min</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-orange-500"
                  />
                </div>
                <span className="text-gray-400 mt-4">-</span>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 block mb-1">Max</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-orange-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Rating</h3>
              <div className="flex flex-col gap-2">
                {[4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating === minRating ? 0 : rating)}
                    className={`text-sm flex items-center gap-2 transition cursor-pointer ${
                      minRating === rating ? "text-orange-500 font-bold" : "text-gray-600 hover:text-black"
                    }`}
                  >
                    <span className="text-orange-400">
                      {"★".repeat(rating)}
                      {"☆".repeat(5 - rating)}
                    </span>
                    & Up
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">All Products</h2>
            <p className="text-sm text-gray-500">Showing {displayedProducts.length} of {filtered.length} results</p>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : error ? (
            <div className="text-center py-20 text-red-500">Error loading products</div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedProducts.map((product) => {
                  const discounted = (
                    product.price -
                    (product.price * product.discountPercentage) / 100
                  ).toFixed(2);
                  const rating = Math.round(product.rating);
                  const isFav = favourites.includes(product.id);
                  const isInCart = cartItems.some((item) => item.id === product.id);

                  return (
                    <div
                      key={product.id}
                      className="border border-[#E4E7E9] flex flex-col relative group overflow-hidden h-full bg-white hover:shadow-lg transition cursor-pointer duration-300"
                    >
                      <div className="w-full h-[160px] flex items-center justify-center bg-white p-4">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="max-h-full max-w-full object-contain mix-blend-multiply"
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
                            isInCart
                              ? removeFromCart(product.id)
                              : addToCart(product)
                          }
                          className="w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#FA8232]"
                        >
                          {isInCart ? (
                            <BsFillCartDashFill size={14} />
                          ) : (
                            <FaCartPlus size={14} />
                          )}
                        </button>

                        <Link to={`/single/${product.id}`} className="w-7 h-7 cursor-pointer">
                          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#FA8232]">
                            <img src={EyeIcon} className="w-4 h-4" />
                          </div>
                        </Link>
                      </div>

                      <div className="px-3 py-2 flex flex-col justify-end flex-1">
                        <div className="flex items-center gap-1 text-orange-400 text-xs mb-1">
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

              {filtered.length > itemsPerPage && (
                <div className="flex justify-center items-center mt-10 gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Prev
                  </button>

                  {paginationButtons}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </section>
  );
};

export default AllProductsPage;
