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
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link
          to="/"
          className="inline-block px-6 py-3 border border-[#E4E7E9] text-[#475156] cursor-pointer"
        >
          Return to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 border border-[#E4E7E9] rounded bg-white">
        <div className="px-6 py-4 border-b border-[#E4E7E9] font-semibold text-lg">
          Shopping Cart
        </div>

        <div className="grid grid-cols-12 px-6 py-3 text-sm bg-[#E4E7E9] text-[#475156]">
          <div className="col-span-5">Products</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-2 text-right">Sub-Total</div>
        </div>

        {cartItems.map((item) => {
          const price = item.price - (item.price * item.discountPercentage) / 100;
          const subTotal = price * item.quantity;

          return (
            <div
              key={item.id}
              className="grid grid-cols-12 px-6 py-4 items-center border-b border-[#E4E7E9]"
            >
              <div className="col-span-5 flex items-center gap-4">
                <img
                  src={hoveredItem === item.id ? XCircleHover : XCircle}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => removeFromCart(item.id)}
                  className="w-5 h-5 cursor-pointer"
                />
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <span className="text-sm font-medium text-[#191C1F]">
                  {item.title}
                </span>
              </div>

              <div className="col-span-2 text-center text-sm text-[#475156]">
                ${price.toFixed(2)}
              </div>

              <div className="col-span-3 flex items-center justify-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="w-8 h-8 border border-[#E4E7E9] cursor-pointer"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="w-8 h-8 border border-[#E4E7E9] cursor-pointer"
                >
                  +
                </button>
              </div>

              <div className="col-span-2 text-right font-medium text-[#191C1F]">
                ${subTotal.toFixed(2)}
              </div>
            </div>
          );
        })}

        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E4E7E9]">
          <Link
            to="/"
            className="px-6 py-2 border border-[#E4E7E9] text-[#475156] cursor-pointer"
          >
            ← Return to shop
          </Link>

          <button className="px-6 py-2 border border-[#E4E7E9] text-[#475156] cursor-pointer">
            Update cart
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="border border-[#E4E7E9] rounded bg-white p-6">
          <h3 className="font-semibold text-lg mb-4">Cart Totals</h3>

          <div className="flex justify-between text-sm mb-3 text-[#475156]">
            <span>Sub-total</span>
            <span>${cartSubtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm mb-3 text-[#475156]">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="flex justify-between text-sm mb-3 text-[#475156]">
            <span>Discount</span>
            <span>$0.00</span>
          </div>

          <div className="flex justify-between font-semibold text-base border-t border-[#E4E7E9] pt-3 mb-4">
            <span>Total</span>
            <span>${cartSubtotal.toFixed(2)}</span>
          </div>

          <button className="w-full bg-[#FA8232] text-white py-3 font-semibold cursor-pointer">
            Proceed to Checkout →
          </button>
        </div>

        <div className="border border-[#E4E7E9] rounded bg-white p-6">
          <h3 className="font-semibold mb-3">Coupon Code</h3>
          <input
            type="text"
            placeholder="Email address"
            className="w-full border border-[#E4E7E9] px-3 py-2 mb-3 text-sm"
          />
          <button className="w-full bg-[#2DA5F3] text-white py-2 cursor-pointer">
            Apply Coupon
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
