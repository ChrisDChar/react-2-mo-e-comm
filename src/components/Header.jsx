import React, { useState, useEffect } from "react";

import Twitter from "../assets/HomeImages/twitter.png";
import Facebook from "../assets/HomeImages/facebook.png";
import Pinterest from "../assets/HomeImages/pinterest.png";
import Reddit from "../assets/HomeImages/reddit.png";
import Youtube from "../assets/HomeImages/youtube.png";
import Instagram from "../assets/HomeImages/Instagram.png";
import FavouritePageIcon from "../assets/HomeImages/FavouritePageIcon.png";
import Cart from "../assets/HomeImages/cart.png";
import User from "../assets/HomeImages/user.png";
import Search from "../assets/HomeImages/SearchIcon.png";
import DropDown from "../assets/HomeImages/dropdown.png";
import Phone from "../assets/HomeImages/Phone.png";
import Track from "../assets/HomeImages/MapPinLine.png";
import Compare from "../assets/HomeImages/Compare.png";
import Support from "../assets/HomeImages/CustomerSupport.png";
import Help from "../assets/HomeImages/Info.png";

import { Link } from "react-router-dom";


function Header() {
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [language, setLanguage] = useState("Eng");
  const [currency, setCurrency] = useState("USD");

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-[#1B6392] text-white text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          <p className="opacity-90 text-[14px] leading-[20px]">
            Welcome to Clicon online eCommerce store.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="opacity-80">Follow us:</span>
              <img src={Twitter} alt="twitter" className="w-4 h-4 cursor-pointer hover:opacity-80" />
              <img src={Facebook} alt="facebook" className="w-4 h-4 cursor-pointer hover:opacity-80" />
              <img src={Pinterest} alt="pinterest" className="w-4 h-4 cursor-pointer hover:opacity-80" />
              <img src={Reddit} alt="reddit" className="w-4 h-4 cursor-pointer hover:opacity-80" />
              <img src={Youtube} alt="youtube" className="w-4 h-4 cursor-pointer hover:opacity-80" />
              <img src={Instagram} alt="instagram" className="w-4 h-4 cursor-pointer hover:opacity-80" />
            </div>

            <div className="h-5 w-px bg-white/40" />

            <div className="flex items-center gap-4 relative">
              <div className="relative">
                <button
                  onClick={() => {
                    setLangOpen(!langOpen);
                    setCurrencyOpen(false);
                  }}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  {language}
                  <img src={DropDown} alt="dropdown" className="w-3 h-3" />
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                    {["Eng", "Rus", "Uzb"].map((lang) => (
                      <div
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLangOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => {
                    setCurrencyOpen(!currencyOpen);
                    setLangOpen(false);
                  }}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  {currency}
                  <img src={DropDown} alt="dropdown" className="w-3 h-3" />
                </button>

                {currencyOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                    {["USD", "RUB", "UZS"].map((cur) => (
                      <div
                        key={cur}
                        onClick={() => {
                          setCurrency(cur);
                          setCurrencyOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {cur}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1B6392]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl cursor-pointer">
          <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span>CLICON</span>
          </Link>


          <div className="flex-1 max-w-xl">
            <div className="flex items-center bg-white rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search for anything..."
                className="flex-1 px-4 py-2 text-sm outline-none text-gray-700"
              />
              <button className="px-4 text-gray-500 hover:text-black transition">
                <img src={Search} alt="search" className="w-4 h-4 cursor-pointer" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 text-white">
            <div className="relative cursor-pointer">
              <img src={Cart} alt="cart" className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">2</span>
            </div>

            <img src={FavouritePageIcon} alt="favourite" className="w-5 h-5 cursor-pointer hover:opacity-80" />
            <img src={User} alt="user" className="w-5 h-5 cursor-pointer hover:opacity-80" />
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-medium text-gray-800">All Category</span>
            <img src={DropDown} alt="dropdown" className="w-3 h-3" />
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2 cursor-pointer hover:text-black">
              <img src={Track} alt="track" className="w-4 h-4" />
              <span>Track Order</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-black">
              <img src={Compare} alt="compare" className="w-4 h-4" />
              <span>Compare</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-black">
              <img src={Support} alt="support" className="w-4 h-4" />
              <span>Customer Support</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-black">
              <img src={Help} alt="help" className="w-4 h-4" />
              <span>Need Help</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
            <img src={Phone} alt="phone" className="w-4 h-4" />
            <span>+1-202-555-0104</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
