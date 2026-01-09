// components/Layout.jsx
import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="bg-gray-100 text-center py-4 mt-auto">
        Made in Mars.
      </footer>
    </div>
  );
};

export default Layout;
