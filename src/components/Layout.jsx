import React from "react";
import { useScrollRestoration } from "../hooks/useScrollRestoration";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  useScrollRestoration();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 pt-[160px] lg:pt-[180px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;