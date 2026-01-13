import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaCartPlus } from "react-icons/fa";
import { BsFillCartDashFill } from "react-icons/bs";
import HeartIcon from "../assets/CardImages/Heart.png";
import EyeIcon from "../assets/CardImages/Eye.png";

function SmallProductCard({ product }) {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const originalPrice = product.price;
  const discountedPrice = (
    originalPrice - (originalPrice * product.discountPercentage) / 100
  ).toFixed(2);

  const [isFavorite, setIsFavorite] = useState(false);

  const isInCart = cartItems.some((item) => item.id === product.id);

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

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="w-full h-[300px] border border-[#E4E7E9] flex flex-col overflow-hidden group relative bg-white">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-[190px] object-contain"
      />

      <div className="absolute top-2 left-2 right-2 bottom-[70px] bg-gray-300/30 backdrop-blur-sm flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded">
        <button
          onClick={toggleFavorite}
          className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
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

        <button
          onClick={handleCartClick}
          className="w-9 h-9 bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#FA8232]"
        >
          {isInCart ? (
            <BsFillCartDashFill size={18} />
          ) : (
            <FaCartPlus size={18} />
          )}
        </button>

        <Link to={`/single/${product.id}`} className="w-9 h-9">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#FA8232]">
            <img src={EyeIcon} alt="View" className="w-4 h-4" />
          </div>
        </Link>
      </div>

      <div className="flex flex-col px-3 py-2 justify-end h-[110px]">
        <h4 className="text-sm font-medium text-[#191C1F] mb-1 line-clamp-2">
          {product.title}
        </h4>

        <div className="flex items-center gap-2">
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
