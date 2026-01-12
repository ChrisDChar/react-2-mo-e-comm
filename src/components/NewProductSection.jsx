import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import HeartIcon from "../assets/CardImages/Heart.png";
import EyeIcon from "../assets/CardImages/Eye.png";
import AddToCart from "../assets/CardImages/AddToCart.png";
import { Link } from "react-router-dom";

const NewProductSection = () => {
  const { data, loading, error } = useFetch("products");
  const [activeCategory, setActiveCategory] = useState("all");
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

  const toggleFavourite = (id) => {
    let updated;
    if (favourites.includes(id)) {
      updated = favourites.filter((item) => item !== id);
    } else {
      updated = [...favourites, id];
    }
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const products = data?.products || [];

  // Updated categories
  const categories = ["all", "electronics", "books", "clothing", "sports", "toys"];

  const filtered =
    activeCategory === "all"
      ? products.filter((p) => categories.includes(p.category))
      : products.filter((p) => p.category === activeCategory);

  const displayProducts = filtered.slice(0, 8); // limit to 8 items

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-6 py-2">
          <h2 className="text-2xl font-semibold">New Arrivals</h2>
          <div className="flex items-center gap-4 text-sm">
            {categories.map((cat) => (
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
            <button className="text-orange-500 font-medium cursor-pointer">
              Browse All Products →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {loading && <p>Loading...</p>}
          {error && <p>Error loading products</p>}

          {displayProducts.map((product) => {
            const discounted = (
              product.price -
              (product.price * product.discountPercentage) / 100
            ).toFixed(2);
            const rating = Math.round(product.rating);
            const isFav = favourites.includes(product.id);

            return (
              <div
                key={product.id}
                className="border border-gray-200 flex flex-col relative group overflow-hidden cursor-pointer h-full"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-[160px] object-contain"
                />

                <div className="absolute top-2 left-2 right-2 bottom-[80px] bg-gray-300/30 backdrop-blur-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => toggleFavourite(product.id)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      isFav ? "bg-[#FA8232]" : "bg-white hover:bg-[#FA8232]"
                    }`}
                  >
                    <img src={HeartIcon} className="w-4 h-4" />
                  </button>

                  <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#FA8232]">
                    <img src={AddToCart} className="w-4 h-4" />
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

                  <h4 className="text-sm font-medium text-gray-900 truncate">{product.title}</h4>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[#ADB7BC] line-through">${product.price}</span>
                    <span className="text-sm font-semibold text-[#2DA5F3]">${discounted}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewProductSection;
