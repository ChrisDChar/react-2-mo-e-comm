import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeartIcon from "../assets/CardImages/Heart.png";
import EyeIcon from "../assets/CardImages/Eye.png";
import AddToCart from "../assets/CardImages/AddToCart.png";

function SmallProductCard({ product }) {
  const originalPrice = product.price;
  const discountedPrice = (
    originalPrice - (originalPrice * product.discountPercentage) / 100
  ).toFixed(2);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFavorite(favorites.includes(product.id));
  }, [product.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favourites")) || [];
    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== product.id)
      : [...favorites, product.id];
    localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="w-full h-[300px] border border-gray-200 flex flex-col overflow-hidden group relative">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-[190px] object-contain"
      />

      <div className="absolute top-2 left-2 right-2 bottom-[70px] bg-gray-300/30 backdrop-blur-sm flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded">
        <button
          onClick={toggleFavorite}
          className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
            isFavorite ? "bg-[#FA8232]" : "bg-white hover:bg-[#FA8232]"
          }`}
        >
          <img
            src={HeartIcon}
            alt="Favorite"
            className={`w-4 h-4 transition-all ${
              isFavorite ? "opacity-100 scale-110" : "opacity-50"
            }`}
          />
        </button>

        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#FA8232]">
          <img src={AddToCart} alt="Add to cart" className="w-4 h-4" />
        </button>

        <Link to={`/single/${product.id}`} className="w-8 h-8">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#FA8232]">
            <img src={EyeIcon} alt="View" className="w-4 h-4" />
          </div>
        </Link>
      </div>

      <div className="flex flex-col px-2 py-2 justify-end h-[110px]">
        <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
          {product.title}
        </h4>

        <div className="flex items-center gap-1">
          <span className="text-xs text-[#ADB7BC] line-through">
            ${originalPrice}
          </span>
          <span className="text-sm font-semibold text-[#2DA5F3]">
            ${discountedPrice}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SmallProductCard;
