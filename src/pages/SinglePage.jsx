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

  const [activeTab, setActiveTab] = useState("description");

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
      <div className="space-y-4">
        <div className="relative w-full h-[450px] bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center overflow-hidden group">
          <img
            src={product.images[currentIndex]}
            alt={product.title}
            className={`object-contain h-[85%] transition-all duration-500 ${fade ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          />
          {product.images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#FA8232] backdrop-blur-sm p-3 rounded-full shadow-lg text-gray-600 hover:bg-[#E06620] transition-all duration-300 z-20 cursor-pointer"
              >
                <img src={ArrowLeft} alt="Previous" className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#FA8232] backdrop-blur-sm p-3 rounded-full shadow-lg text-gray-600 hover:bg-[#E06620] transition-all duration-300 z-20 cursor-pointer"
              >
                <img src={ArrowRight} alt="Next" className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {product.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-20 h-20 object-contain border-2 rounded-xl flex-shrink-0 transition-all duration-300 ${
                  idx === currentIndex
                    ? "border-orange-500 shadow-md scale-101 bg-white cursor-pointer"
                    : "border-transparent hover:border-gray-200 cursor-pointer"
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex text-orange-400 text-lg">
            {[...Array(5)].map((_, i) => (
              <AiFillStar
                key={i}
                className={i < Math.round(product.rating) ? "text-orange-400" : "text-gray-200"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium cursor-pointer hover:text-orange-500 transition-colors">
            ({product.reviews?.length || 0} Customer Reviews)
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.title}</h1>

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Brand:</span>
            <span className="text-gray-900 font-medium">{product.brand}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">SKU:</span>
            <span className="text-gray-900 font-medium">{product.sku}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Availability:</span>
            <span className={`font-medium ${product.availabilityStatus === "In Stock" ? "text-green-600" : "text-red-500"}`}>
              {product.availabilityStatus}
            </span>
          </div>
        </div>

        <div className="flex items-end gap-4">
          <span className="text-4xl font-bold text-blue-600">
            ${discountedPrice.toFixed(2)}
          </span>
          <span className="text-xl text-gray-400 line-through mb-1">
            ${product.price}
          </span>
          <span className="bg-orange-100 text-orange-600 text-sm font-bold px-3 py-1 rounded-full mb-2">
            -{product.discountPercentage}% OFF
          </span>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm border-b border-gray-100 pb-4">
          {product.description}
        </p>

        <div className="flex items-center gap-4">
          {cartItem ? (
            <div className="flex-1 h-14 rounded-xl overflow-hidden border border-gray-200 shadow-sm flex">
              <button className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 font-semibold text-xl flex items-center justify-center transition-colors cursor-pointer" onClick={() => decreaseQty(product.id)}>
                −
              </button>
              <span className="flex-1 bg-white text-gray-800 font-semibold text-xl flex items-center justify-center border-x border-gray-200 cursor-default">
                {cartItem.quantity}
              </span>
              <button className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 font-semibold text-xl flex items-center justify-center transition-colors cursor-pointer" onClick={() => increaseQty(product.id)}>
                +
              </button>
            </div>
          ) : (
            <button 
              onClick={() => addToCart(product)} 
              className="flex-1 h-14 bg-[#FA8232] text-white rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-3 font-bold text-lg hover:bg-orange-600 hover:shadow-orange-500/40 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <img src={AddToCartIcon} alt="Add to Cart" className="w-5 h-5" />
              ADD TO CART
            </button>
          )}
          
          <button className="flex-1 h-14 bg-white border-2 border-[#FA8232] text-[#FA8232] rounded-xl font-bold text-lg hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
            BUY NOW
          </button>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="p-2 rounded-full bg-gray-50 group-hover:bg-red-50 transition-colors">
               <img src={FavouriteIcon} alt="wishlist" className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <span className="group-hover:text-red-500 transition-colors">Add to Wishlist</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors">
              <img src={CompareIcon} alt="compare" className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <span className="group-hover:text-blue-500 transition-colors">Add to Compare</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-2 border border-gray-100">
          <div className="flex justify-between items-center mb-3">
             <span className="font-semibold text-gray-700">Guaranteed Safe Checkout</span>
          </div>
          <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
            <span className="bg-white px-3 py-1.5 rounded border border-gray-200 text-xs font-bold">VISA</span>
            <span className="bg-white px-3 py-1.5 rounded border border-gray-200 text-xs font-bold">MasterCard</span>
            <span className="bg-white px-3 py-1.5 rounded border border-gray-200 text-xs font-bold">PayPal</span>
            <span className="bg-white px-3 py-1.5 rounded border border-gray-200 text-xs font-bold">Apple Pay</span>
          </div>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 mt-12">
        <div className="flex flex-wrap gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
          {[
            { id: "description", label: "Description" },
            { id: "additional", label: "Additional Information" },
            { id: "specification", label: "Specification" },
            { id: "reviews", label: `Reviews (${product.reviews?.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-base font-medium cursor-pointer transition-all duration-300 relative ${
                activeTab === tab.id
                  ? "text-orange-500"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-t-full transition-all duration-300"></span>
              )}
            </button>
          ))}
        </div>

        <div className="py-2 min-h-[300px]">
          {activeTab === "description" && (
            <div className="text-gray-700 leading-8 text-lg font-light">
              {product.description}
            </div>
          )}

          {activeTab === "additional" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <h4 className="font-bold text-gray-900 mb-2">Shipping Information</h4>
                <p className="text-sm text-gray-600">{product.shippingInformation}</p>
              </div>
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <h4 className="font-bold text-gray-900 mb-2">Return Policy</h4>
                <p className="text-sm text-gray-600">{product.returnPolicy}</p>
              </div>
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <h4 className="font-bold text-gray-900 mb-2">Warranty</h4>
                <p className="text-sm text-gray-600">{product.warrantyInformation}</p>
              </div>
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <h4 className="font-bold text-gray-900 mb-2">Minimum Order</h4>
                <p className="text-sm text-gray-600">{product.minimumOrderQuantity} items</p>
              </div>
            </div>
          )}

          {activeTab === "specification" && (
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              {[
                { label: "Brand", value: product.brand },
                { label: "SKU", value: product.sku },
                { label: "Stock", value: product.stock },
                { label: "Weight", value: `${product.weight} kg` },
                { label: "Dimensions", value: `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm` },
                { label: "Barcode", value: product.meta?.barcode },
                { label: "Return Policy", value: product.returnPolicy },
              ].map((spec, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="text-gray-500 font-medium text-sm uppercase tracking-wide">{spec.label}</span>
                  <span className="col-span-2 text-gray-900 font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.reviews?.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{review.reviewerName}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <AiFillStar
                              key={i}
                              className={i < review.rating ? "text-orange-400 text-sm" : "text-gray-300 text-sm"}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">"{review.comment}"</p>
                  </div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 text-center py-12 bg-gray-50 rounded-2xl">
                  <p className="text-gray-500 text-lg font-medium">No reviews yet.</p>
                  <p className="text-gray-400 text-sm mt-1">Be the first to review this product!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SinglePage;