import React from "react";
import { Link } from "react-router-dom";
import HeartIcon from "../assets/CardImages/Heart.png";
import EyeIcon from "../assets/CardImages/Eye.png";
import AddToCart from "../assets/CardImages/Heart.png";

function BigProductCard({ product }) {
  const originalPrice = product.price;
  const discountedPrice = (
    originalPrice - (originalPrice * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="w-[330px] h-[600px] border border-gray-200 flex flex-col">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-[300px] object-contain"
      />

      <div className="flex flex-col flex-1 px-4 py-4">
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < Math.round(product.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.449a1 1 0 00-1.175 0l-3.37 2.449c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.025 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
            </svg>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-snug">
          {product.title}
        </h3>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-base text-[#ADB7BC] line-through">
            ${originalPrice}
          </span>
          <span className="text-xl font-semibold text-[#2DA5F3]">
            ${discountedPrice}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          {product.description}
        </p>

        <div className="mt-auto flex items-center gap-2">
          <button className="w-11 h-11 border bg-[#FFE7D6] border-[#FFE7D6] flex items-center justify-center">
            <img src={HeartIcon} alt="Favorite" className="w-5 h-5" />
          </button>

          <button className="flex-1 h-11 bg-orange-500 text-white text-sm font-semibold flex items-center justify-center gap-2">
            <img src={AddToCart} alt="Add to cart" className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>

          <Link to={`/single/${product.id}`} className="w-11 h-11">
            <div className="w-11 h-11 border bg-[#FFE7D6] border-[#FFE7D6] flex items-center justify-center cursor-pointer">
              <img src={EyeIcon} alt="View" className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BigProductCard;
