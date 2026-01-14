import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import useFetch from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import AddToCartIcon from "../assets/HomeImages/Cart.png";
import FavouriteIcon from "../assets/CardImages/Heart.png";
import CompareIcon from "../assets/HomeImages/Compare.png";
import ArrowLeft from "../assets/HomeImages/ArrowLeft.png";
import ArrowRight from "../assets/HomeImages/ArrowRight.png";

function SinglePage() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`products/${id}`);
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  const cartItem = cartItems.find((item) => item.id === Number(id));
  const quantity = cartItem ? cartItem.quantity : 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (product?.images?.length) setCurrentIndex(0);
  }, [product]);

  const handlePrev = () => {
    if (!product || product.images.length <= 1) return;
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
      setFade(false);
    }, 200);
  };

  const handleNext = () => {
    if (!product || product.images.length <= 1) return;
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
      setFade(false);
    }, 200);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error loading product.</div>;
  if (!product) return null;

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <div className="relative w-full h-[400px] border border-gray-200 flex items-center justify-center overflow-hidden rounded-lg mb-4">
          <img
            src={product.images[currentIndex]}
            alt={product.title}
            className={`object-contain h-full cursor-pointer transition-opacity duration-200 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          />
          {product.images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-orange-500 p-2 rounded-full shadow cursor-pointer z-20 hover:bg-orange-600 transition-colors"
              >
                <img src={ArrowLeft} alt="Previous" className="w-5 h-5 object-contain" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-500 p-2 rounded-full shadow cursor-pointer z-20 hover:bg-orange-600 transition-colors"
              >
                <img src={ArrowRight} alt="Next" className="w-5 h-5 object-contain" />
              </button>
            </>
          )}
        </div>

        {product.images.length > 1 && (
          <div className="overflow-x-auto">
            <div className="flex gap-2 w-max py-1">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`w-20 h-20 object-contain border cursor-pointer rounded flex-shrink-0 transition-transform duration-300 ${
                    idx === currentIndex
                      ? "border-orange-500 scale-105"
                      : "border-gray-200 scale-100"
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <AiFillStar
              key={i}
              className={i < Math.round(product.rating) ? "text-orange-400" : "text-gray-300"}
            />
          ))}
          <span className="text-gray-600 text-sm ml-2 cursor-pointer">
            {product.rating} Stars ({product.reviews?.length || 0} reviews)
          </span>
        </div>

        <h1 className="text-2xl font-semibold">{product.title}</h1>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-gray-600 text-sm">
          <span>SKU: {product.sku}</span>
          <span>
            Availability:{" "}
            <span className={product.availabilityStatus === "In Stock" ? "text-green-600" : "text-red-600"}>
              {product.availabilityStatus}
            </span>
          </span>
          <span>Brand: {product.brand}</span>
          <span>Category: {product.category}</span>
        </div>

        <div className="flex items-center gap-4 text-lg">
          <span className="text-blue-600 font-semibold">
            ${discountedPrice.toFixed(2)}
          </span>
          <span className="line-through text-gray-400">
            ${product.price}
          </span>
          <span className="bg-yellow-200 text-black text-sm font-medium px-2 py-1 rounded">
            {product.discountPercentage}% OFF
          </span>
        </div>

        {product.storages && (
          <div className="flex items-center gap-2">
            <span className="font-medium w-16">Storage:</span>
            <select className="border px-2 py-1 rounded cursor-pointer">
              {product.storages.map((stor, idx) => (
                <option key={idx}>{stor}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-4 mt-4 h-12">
          {cartItem ? (
            <div className="flex-1 flex h-full rounded overflow-hidden">
              <button className="flex-1 bg-[#FA8232] text-white font-semibold text-lg flex items-center justify-center cursor-pointer" onClick={() => decreaseQty(product.id)}>
                −
              </button>
              <span className="flex-1 text-center bg-gray-100 text-gray-800 font-semibold text-lg flex items-center justify-center">
                {cartItem.quantity}
              </span>
              <button className="flex-1 bg-[#FA8232] text-white font-semibold text-lg flex items-center justify-center cursor-pointer" onClick={() => increaseQty(product.id)}>
                +
              </button>
              </div>
              ) : (
              <button onClick={() => addToCart(product)} className="flex-1 bg-[#FA8232] text-white rounded h-full flex items-center justify-center gap-2 font-semibold hover:bg-orange-600 transition-colors cursor-pointer">
                <img src={AddToCartIcon} alt="Add to Cart" className="w-5 h-5" />
                ADD TO CART
              </button>
            )}
            
            <button className="flex-1 bg-white border border-[#FA8232] rounded h-full text-[#FA8232] font-semibold flex items-center justify-center hover:bg-[#FFF5EB] transition-colors cursor-pointer">
              BUY NOW
            </button>
        </div>


        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1 cursor-pointer">
            <img src={FavouriteIcon} alt="wishlist" className="w-4 h-4" /> Add to Wishlist
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <img src={CompareIcon} alt="compare" className="w-4 h-4" /> Add to Compare
          </div>
        </div>

        <div className="border-t mt-6 pt-4 text-sm text-gray-600">
          100% Guarantee Safe Checkout
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-gray-200 px-2 py-1 rounded cursor-pointer">VISA</span>
            <span className="bg-gray-200 px-2 py-1 rounded cursor-pointer">MasterCard</span>
            <span className="bg-gray-200 px-2 py-1 rounded cursor-pointer">PayPal</span>
            <span className="bg-gray-200 px-2 py-1 rounded cursor-pointer">Apple Pay</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SinglePage;
