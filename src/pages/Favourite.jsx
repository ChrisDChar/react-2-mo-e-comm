import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function Favourite() {
  const { data, loading, error } = useFetch("products");
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
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Wishlist</h2>
      </div>

      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
          <div className="col-span-6">PRODUCTS</div>
          <div className="col-span-2">PRICE</div>
          <div className="col-span-2">STOCK STATUS</div>
          <div className="col-span-2 text-right">ACTIONS</div>
        </div>

        {loading && <p className="p-4">Loading...</p>}
        {error && <p className="p-4">Error loading products</p>}
        {!loading && favouriteProducts.length === 0 && (
          <p className="p-6 text-gray-500">Your wishlist is empty.</p>
        )}

        {favouriteProducts.map((product) => {
          const discounted = (
            product.price -
            (product.price * product.discountPercentage) / 100
          ).toFixed(2);
          const inStock = product.stock > 0;

          return (
            <div
              key={product.id}
              className="grid grid-cols-12 items-center px-4 py-4 border-t border-gray-200"
            >
              <div className="col-span-6 flex items-center gap-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-16 h-16 object-contain cursor-pointer"
                />
                <Link
                  to={`/single/${product.id}`}
                  className="text-sm text-gray-800 hover:text-orange-500 line-clamp-2 cursor-pointer"
                >
                  {product.title}
                </Link>
              </div>

              <div className="col-span-2 flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  ${discounted}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-xs text-gray-400 line-through">
                    ${product.price}
                  </span>
                )}
              </div>

              <div className="col-span-2">
                {inStock ? (
                  <span className="text-green-600 text-sm font-medium">
                    IN STOCK
                  </span>
                ) : (
                  <span className="text-red-500 text-sm font-medium">
                    OUT OF STOCK
                  </span>
                )}
              </div>

              <div className="col-span-2 flex items-center justify-end gap-3">
                <button
                  className={`px-4 py-2 text-xs font-semibold text-white cursor-pointer ${
                    inStock
                      ? "bg-[#FA8232] hover:bg-orange-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!inStock}
                >
                  ADD TO CART
                </button>

                <button
                  onClick={() => removeFromFavourite(product.id)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white cursor-pointer transition"
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
