import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavourite } from "../context/FavouriteContext";

import Twitter from "../assets/HomeImages/Twitter.png";
import Facebook from "../assets/HomeImages/Facebook.png";
import Pinterest from "../assets/HomeImages/Pinterest.png";
import Reddit from "../assets/HomeImages/Reddit.png";
import Youtube from "../assets/HomeImages/Youtube.png";
import Instagram from "../assets/HomeImages/Instagram.png";
import FavouritePageIcon from "../assets/HomeImages/FavouritePageIcon.png";
import Cart from "../assets/HomeImages/Cart.png";
import User from "../assets/HomeImages/User.png";
import Search from "../assets/HomeImages/SearchIcon.png";
import DropDown from "../assets/HomeImages/dropdown.png";
import Phone from "../assets/HomeImages/Phone.png";
import Track from "../assets/HomeImages/MapPinLine.png";
import Compare from "../assets/HomeImages/Compare.png";
import Support from "../assets/HomeImages/CustomerSupport.png";
import Help from "../assets/HomeImages/Info.png";

function Header() {
  const location = useLocation();
  const { cartCount } = useCart();
  const { favourites } = useFavourite();

  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [language, setLanguage] = useState("Eng");
  const [currency, setCurrency] = useState("USD");
  const [showHeader, setShowHeader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we are on sticky pages
      const isStickyPage = 
        location.pathname.startsWith("/single") || 
        location.pathname === "/cart" || 
        location.pathname === "/favourite";

      // If sticky, always show header
      if (isStickyPage) {
        setShowHeader(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Normal scroll behavior
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Force header show on route change
  useEffect(() => {
    const isStickyPage = 
      location.pathname.startsWith("/single") || 
      location.pathname === "/cart" || 
      location.pathname === "/favourite";

    if (isStickyPage) {
      setShowHeader(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchQuery}`
        );
        const data = await res.json();
        setSearchResults(data.products || []);
      } finally {
        setSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-[#1B6392] text-white text-sm hidden lg:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          <p className="opacity-90 text-[14px] leading-[20px]">
            Welcome to Clicon online eCommerce store.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="opacity-80">Follow us:</span>
              <img src={Twitter} className="w-4 h-4 cursor-pointer" />
              <img src={Facebook} className="w-4 h-4 cursor-pointer" />
              <img src={Pinterest} className="w-4 h-4 cursor-pointer" />
              <img src={Reddit} className="w-4 h-4 cursor-pointer" />
              <img src={Youtube} className="w-4 h-4 cursor-pointer" />
              <img src={Instagram} className="w-4 h-4 cursor-pointer" />
            </div>

            <div className="h-5 w-px bg-white/40" />

            <div className="flex items-center gap-4 relative">
              <div className="relative">
                <button
                  onClick={() => {
                    setLangOpen(!langOpen);
                    setCurrencyOpen(false);
                  }}
                  className="flex items-center gap-1"
                >
                  {language}
                  <img src={DropDown} className="w-3 h-3" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg">
                    {["Eng", "Rus", "Uzb"].map((lang) => (
                      <div
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLangOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
                  className="flex items-center gap-1"
                >
                  {currency}
                  <img src={DropDown} className="w-3 h-3" />
                </button>
                {currencyOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg">
                    {["USD", "RUB", "UZS"].map((cur) => (
                      <div
                        key={cur}
                        onClick={() => {
                          setCurrency(cur);
                          setCurrencyOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3 md:py-4 flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold text-lg md:text-xl"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span>CLICON</span>
          </Link>

          <div className="w-full md:flex-1 md:max-w-xl relative order-3 md:order-none">
            <div className="flex items-center bg-white rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-1.5 md:px-4 md:py-2 text-sm outline-none text-gray-700"
              />
              <button className="px-3 md:px-4">
                <img src={Search} className="w-4 h-4" />
              </button>
            </div>

            {searchQuery && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-md mt-1 max-h-72 overflow-y-auto z-50">
                {searchLoading && <p className="p-3 text-sm">Searching...</p>}
                {!searchLoading && searchResults.length === 0 && (
                  <p className="p-3 text-sm">No results found</p>
                )}
                {searchResults.map((item) => (
                  <Link
                    to={`/single/${item.id}`}
                    key={item.id}
                    onClick={() => setSearchQuery("")}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100"
                  >
                    <img src={item.thumbnail} className="w-10 h-10 rounded" />
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs">${item.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 md:gap-6 text-white">
            <Link to="/cart" className="relative">
              <img src={Cart} className="w-5 h-5 md:w-6 md:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#1B6392] text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/favourite" className="relative">
              <img src={FavouritePageIcon} className="w-5 h-5" />
              {favourites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#1B6392] text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold shadow-md">
                  {favourites.length}
                </span>
              )}
            </Link>

            <img src={User} className="w-5 h-5 cursor-pointer hidden sm:block" />

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <img src={DropDown} className="w-5 h-5 rotate-90" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-2 md:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">All Category</span>
            <img src={DropDown} className="w-3 h-3" />
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <img src={Track} className="w-4 h-4" />
              <span>Track Order</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={Compare} className="w-4 h-4" />
              <span>Compare</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={Support} className="w-4 h-4" />
              <span>Customer Support</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={Help} className="w-4 h-4" />
              <span>Need Help</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            <img src={Phone} className="w-4 h-4" />
            <span>+1-202-555-0104</span>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-3 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <img src={Track} className="w-4 h-4" />
              <span>Track Order</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={Compare} className="w-4 h-4" />
              <span>Compare</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={Support} className="w-4 h-4" />
              <span>Customer Support</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={Help} className="w-4 h-4" />
              <span>Need Help</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <img src={Phone} className="w-4 h-4" />
              <span>+1-202-555-0104</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;