import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCart } from "../context/CartContext";

function Favourite() {
  const { data, loading, error } = useFetch("products");
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();
  
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

  const products = data?.products || [];
  const favouriteProducts = products.filter((p) => favourites.includes(p.id));

  const removeFromFavourite = (id) => {
    const updated = favourites.filter((item) => item !== id);
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 relative inline-block">
          Wishlist
          <span className="absolute bottom-0 left-0 w-2/3 h-1 bg-[#FA8232] rounded-full"></span>
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        
        <div className="grid grid-cols-12 bg-gray-50/80 px-6 py-4 text-xs font-bold text-gray-500 tracking-wider uppercase border-b border-gray-200">
          <div className="col-span-6">Products</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Stock Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FA8232]"></div>
          </div>
        )}
        
        {error && <p className="p-4 text-center text-red-500 font-medium">Error loading products</p>}
        
        {!loading && favouriteProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <span className="text-6xl mb-4 opacity-50">🛒</span>
            <p className="text-lg font-medium">Your wishlist is empty.</p>
            <Link to="/shop" className="mt-4 text-[#FA8232] hover:underline">Continue Shopping</Link>
          </div>
        )}

        {favouriteProducts.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);

          const discounted = (
            product.price -
            (product.price * product.discountPercentage) / 100
          ).toFixed(2);
          const inStock = product.stock > 0;

          return (
            <div
              key={product.id}
              className="group grid grid-cols-12 items-center px-6 py-5 border-b border-gray-100 hover:bg-orange-50/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="col-span-6 flex items-center gap-4">
                <div className="relative overflow-hidden rounded-lg border border-gray-200 p-1 group-hover:border-[#FA8232] transition-colors duration-300">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-16 h-16 object-contain transform transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <Link
                  to={`/single/${product.id}`}
                  className="text-sm font-medium text-gray-800 hover:text-[#FA8232] line-clamp-2 transition-colors duration-200 cursor-pointer max-w-[80%]"
                >
                  {product.title}
                </Link>
              </div>

              <div className="col-span-2 flex flex-col justify-center">
                <span className="text-base font-bold text-gray-900">
                  ${discounted}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-xs text-gray-400 line-through">
                    ${product.price}
                  </span>
                )}
              </div>

              <div className="col-span-2 flex items-center">
                {inStock ? (
                  <span className="px-2.5 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full uppercase tracking-wide">
                    In Stock
                  </span>
                ) : (
                  <span className="px-2.5 py-1 text-xs font-bold text-red-700 bg-red-100 rounded-full uppercase tracking-wide">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="col-span-2 flex items-center justify-end gap-3">
                {cartItem ? (
                  <div className="flex-1 h-9 w-14 rounded-lg overflow-hidden border border-gray-200 shadow-sm flex">
                    <button className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 font-semibold text-sm flex items-center justify-center transition-colors cursor-pointer" onClick={() => decreaseQty(product.id)}>
                      −
                    </button>
                    <span className="flex-1 bg-white text-gray-800 font-semibold text-sm flex items-center justify-center border-x border-gray-200 cursor-default">
                      {cartItem.quantity}
                    </span>
                    <button className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 font-semibold text-sm flex items-center justify-center transition-colors cursor-pointer" onClick={() => increaseQty(product.id)}>
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className={`px-4 py-2 text-xs font-bold text-white rounded-lg shadow-sm transition-all duration-200 active:scale-95 ${
                      inStock
                        ? "bg-[#FA8232] hover:bg-orange-600 hover:shadow-md"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                    disabled={!inStock}
                  >
                    ADD TO CART
                  </button>
                )}

                <button
                  onClick={() => removeFromFavourite(product.id)}
                  className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 active:scale-90 group-hover:text-red-400"
                  title="Remove from wishlist"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Favourite;