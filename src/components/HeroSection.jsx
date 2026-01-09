import React from "react";
import Xbox from "../assets/HeroImages/xbox.png";
import Pixel from "../assets/HeroImages/phone.png";
import Buds from "../assets/HeroImages/buds.png";
import Delivery from "../assets/HeroImages/FastestDelivery.png";
import Return from "../assets/HeroImages/24HoursReturn.png";
import Payment from "../assets/HeroImages/CreditCard.png";
import Support from "../assets/HeroImages/Support247.png";

function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-[#F2F4F5] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-md">
          <div className="flex items-center text-sm font-bold text-blue-600 mb-3">
            <span className="w-8 h-px bg-blue-600" />
            <span className="px-2">THE BEST PLACE TO PLAY</span>
            <span className="w-8 h-px bg-blue-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Xbox Consoles
          </h1>

          <p className="text-gray-600 mb-6">
            Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.
          </p>

          <button className="group bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2">
            Shop Now
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        <div className="relative mt-6 md:mt-0">
          <img src={Xbox} alt="xbox" className="w-72" />
          <div className="absolute -top-4 -right-4 bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-semibold">
            $299
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="relative bg-black rounded-xl p-10 text-white overflow-hidden">
          <div className="relative z-10">
            <p className="text-yellow-400 text-sm mb-1">SUMMER SALES</p>
            <h3 className="text-lg font-semibold mb-4">
              New Google Pixel 6 Pro
            </h3>

            <button className="group bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-sm inline-flex items-center gap-2">
              Shop Now
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>

          <img
            src={Pixel}
            alt="pixel"
            className="absolute bottom-0 right-0 w-40"
          />

          <div className="absolute top-5 right-4 bg-yellow-400 text-black text-xs px-3 py-2 rounded">
            29% OFF
          </div>
        </div>

        <div className="bg-white rounded-xl p-10 flex items-center justify-between shadow">
          <img src={Buds} alt="buds" className="w-40 object-cover" />

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Xiaomi FlipBuds Pro
            </h3>
            <p className="text-blue-600 font-semibold mb-4">$299 USD</p>

            <button className="group bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm inline-flex items-center gap-2">
              Shop Now
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow">
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="flex items-center gap-3 px-4 border-r border-gray-200">
            <img src={Delivery} alt="Delivery" className="w-8" />
            <div>
              <p className="font-semibold text-sm">Fastest Delivery</p>
              <p className="text-xs text-gray-500">Delivery in 24H</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 border-r border-gray-200">
            <img src={Return} alt="Return" className="w-8" />
            <div>
              <p className="font-semibold text-sm">24 Hours Return</p>
              <p className="text-xs text-gray-500">100% money-back</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 border-r border-gray-200">
            <img src={Payment} alt="Payment" className="w-8" />
            <div>
              <p className="font-semibold text-sm">Secure Payment</p>
              <p className="text-xs text-gray-500">Your money is safe</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4">
            <img src={Support} alt="Support" className="w-8" />
            <div>
              <p className="font-semibold text-sm">Support 24/7</p>
              <p className="text-xs text-gray-500">Live contact/message</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
