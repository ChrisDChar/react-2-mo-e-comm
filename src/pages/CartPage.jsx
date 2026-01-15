import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import XCircle from "../assets/HomeImages/XCircle.png";
import XCircleHover from "../assets/HomeImages/XCircleHover.png";

function CartPage() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    cartSubtotal,
  } = useCart();

  const [hoveredItem, setHoveredItem] = useState(null);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gray-100 rounded-full p-8 mb-6 animate-bounce">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L4 18l.7 5.2m7.3-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v3" />
            </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't made your choice yet.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#FA8232] text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 transform hover:-translate-y-1"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <div className="lg:col-span-8 flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            Shopping Cart
            <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
              {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
            </span>
          </h2>
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1">
            <span>← Continue Shopping</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {cartItems.map((item) => {
            const price = item.price - (item.price * item.discountPercentage) / 100;
            const subTotal = price * item.quantity;
            const originalPrice = item.price;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="grid grid-cols-12 items-center px-6 py-6 gap-5 border-b border-gray-100 hover:bg-orange-50/30 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div className="col-span-1 flex items-center justify-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 active:scale-90 group-hover:text-red-400"
                    title="Remove item"
                  >
                    {hoveredItem === item.id ? (
                       <img src={XCircleHover} className="w-5 h-5" />
                    ) : (
                       <img src={XCircle} className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="col-span-6 flex items-center gap-4">
                  <div className="relative overflow-hidden rounded-lg bg-gray-50 border border-gray-200 p-1.5 w-20 h-20 group-hover:border-blue-400 transition-colors duration-300">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Link
                      to={`/single/${item.id}`}
                      className="text-base font-bold text-gray-800 hover:text-blue-600 line-clamp-1 transition-colors duration-200 cursor-pointer max-w-[200px] sm:max-w-[300px]"
                    >
                      {item.title}
                    </Link>
                    <span className="text-xs text-gray-400 mt-1">SKU: {item.id}</span>
                  </div>
                </div>

                <div className="col-span-2 flex flex-col justify-center">
                  <div className="bg-blue-50/50 border border-blue-100 rounded-lg px-2 py-1 text-center min-w-[80px]">
                    <span className="text-lg font-bold text-blue-600">
                      ${price.toFixed(2)}
                    </span>
                    {item.discountPercentage > 0 && (
                      <span className="text-xs text-gray-400 line-through block mt-0.5">
                        ${originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-span-3 flex items-center justify-center sm:justify-start">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-10 w-full max-w-[140px]">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 font-bold text-sm flex items-center justify-center transition-colors cursor-pointer w-8 h-full"
                    >
                      −
                    </button>
                    <span className="flex-1 bg-white text-gray-800 font-bold text-base flex items-center justify-center cursor-default w-8 h-full border-x border-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 font-bold text-sm flex items-center justify-center transition-colors cursor-pointer w-8 h-full"
                    >
                      +
                    </button>
                  </div>
                </div>                
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
            Order Summary
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">${cartSubtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600 text-sm">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="flex justify-between text-gray-600 text-sm">
              <span>Discount</span>
              <span className="text-gray-400">-$0.00</span>
            </div>

            <div className="flex justify-between font-bold text-lg text-gray-900 pt-4 border-t border-gray-100 mt-2">
              <span>Total</span>
              <span className="text-blue-600">${cartSubtotal.toFixed(2)}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="w-full bg-[#FA8232] text-white py-3.5 font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 mt-6"
          >
            Proceed to Checkout
            <span>→</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Apply Coupon</h3>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Coupon code"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#FA8232] focus:ring-1 focus:ring-orange-100 transition-all"
            />
            <button className="w-full bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors cursor-pointer py-2.5">
              Apply Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;