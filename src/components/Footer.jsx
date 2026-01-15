import React from "react";
import Logo from "../assets/HomeImages/FooterLogo.png";
import GooglePlay from "../assets/HomeImages/FooterPlayStore.png";
import AppStore from "../assets/HomeImages/FooterAppStore.png";

const Footer = () => {
  const topCategories = [
    "Computer & Laptop",
    "SmartPhone",
    "Headphone",
    "Accessories",
    "Camera & Photo",
    "TV & Homes",
  ];

  const quickLinks = [
    "Shop Product",
    "Shopping Cart",
    "Wishlist",
    "Compare",
    "Track Order",
    "Customer Help",
    "About Us",
  ];

  const popularTags = [
    "Game",
    "iPhone",
    "TV",
    "Asus Laptops",
    "Macbook",
    "SSD",
    "Graphics Card",
    "Power Bank",
    "Smart TV",
    "Speaker",
    "Tablet",
    "Microwave",
    "Samsung",
  ];

  return (
    <footer className="bg-[#191C1F] text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-10">
          
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 2xl:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={Logo}
                alt="Clicon Logo"
                className="w-[40px] h-[40px] object-contain"
              />
              <h2 className="text-2xl font-bold">CLICON</h2>
            </div>

            <p className="text-sm text-gray-400 mb-1">Customer Support:</p>
            <p className="font-semibold mb-3 text-lg text-white">(629) 555-0129</p>

            <p className="text-sm text-gray-400 leading-relaxed">
              4517 Washington Ave. <br />
              Manchester, Kentucky 39495
            </p>

            <p className="mt-2 underline cursor-pointer text-sm text-yellow-500 hover:text-yellow-400 transition">
              info@kinbo.com
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Top Category</h3>
            <ul className="space-y-3">
              {topCategories.map((cat) => (
                <li
                  key={cat}
                  className="text-gray-400 cursor-pointer text-sm transition-all duration-300 hover:text-white hover:translate-x-1"
                >
                  {cat}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-yellow-500 cursor-pointer font-medium text-sm hover:text-yellow-400 transition">
              Browse All Product →
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li
                  key={link}
                  className="text-gray-400 cursor-pointer text-sm transition-all duration-300 hover:text-white hover:translate-x-1"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Download App</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-[#303639] px-4 py-3 rounded cursor-pointer hover:bg-[#3d4448] transition min-w-[170px] border border-transparent hover:border-gray-600">
                <img
                  src={GooglePlay}
                  alt="Google Play"
                  className="w-[32px] h-[32px] object-contain flex-shrink-0"
                />
                <div className="leading-tight whitespace-nowrap">
                  <p className="text-[10px] text-gray-400">Get it now</p>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#303639] px-4 py-3 rounded cursor-pointer hover:bg-[#3d4448] transition min-w-[170px] border border-transparent hover:border-gray-600">
                <img
                  src={AppStore}
                  alt="App Store"
                  className="w-[32px] h-[32px] object-contain flex-shrink-0"
                />
                <div className="leading-tight whitespace-nowrap">
                  <p className="text-[10px] text-gray-400">Get it now</p>
                  <p className="text-sm font-semibold">App Store</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Popular Tag</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 border border-gray-600 rounded-full text-[11px] text-center cursor-pointer transition-all duration-300 bg-transparent hover:bg-yellow-500 hover:text-black hover:border-yellow-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-xs gap-4">
          <p>Kinbo eCommerce Template © 2021. Design by Templatecookie</p>
          <div className="flex gap-4">
             <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
             <span className="hover:text-white cursor-pointer transition">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;