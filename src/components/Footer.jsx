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
    <footer className="bg-[#191C1F] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={Logo}
                alt="Clicon Logo"
                className="w-[40px] h-[40px] object-contain"
              />
              <h2 className="text-2xl font-bold">CLICON</h2>
            </div>

            <p className="text-sm text-gray-400 mb-1">Customer Support:</p>
            <p className="font-semibold mb-3">(629) 555-0129</p>

            <p className="text-sm text-gray-400 leading-relaxed">
              4517 Washington Ave.
              <br />
              Manchester, Kentucky 39495
            </p>

            <p className="mt-2 underline cursor-pointer text-sm">
              info@kinbo.com
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">TOP CATEGORY</h3>
            <ul className="space-y-2">
              {topCategories.map((cat) => (
                <li
                  key={cat}
                  className="relative pl-3 text-gray-400 cursor-pointer text-sm transition hover:text-white hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:h-full hover:before:w-[2px] hover:before:bg-yellow-500"
                >
                  {cat}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-yellow-500 cursor-pointer font-medium text-sm">
              Browse All Product →
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">QUICK LINKS</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li
                  key={link}
                  className="relative pl-3 text-gray-400 cursor-pointer text-sm transition hover:text-white hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:h-full hover:before:w-[2px] hover:before:bg-yellow-500"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">DOWNLOAD APP</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-[#303639] px-4 py-2 rounded cursor-pointer min-w-[170px]">
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

              <div className="flex items-center gap-3 bg-[#303639] px-4 py-2 rounded cursor-pointer min-w-[170px]">
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
            <h3 className="font-semibold mb-3 text-sm">POPULAR TAG</h3>
            <div className="grid grid-cols-2 gap-2">
              {popularTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 border border-gray-600 rounded-full text-[11px] text-center cursor-pointer hover:border-yellow-500 hover:text-yellow-500 transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-xs">
          Kinbo eCommerce Template © 2021. Design by Templatecookie
        </div>
      </div>
    </footer>
  );
};

export default Footer;
