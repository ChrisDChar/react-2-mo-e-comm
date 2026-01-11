import React, { useMemo, useEffect, useState } from "react";
import BigProductCard from "./BigProductCard";
import SmallProductCard from "./SmallProductCards";
import useFetch from "../hooks/useFetch";

function ProductCards() {
  const { data, loading, error } = useFetch("products");

  const products = useMemo(() => {
    if (!data?.products) return [];
    return data.products.slice(0, 9);
  }, [data]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = endDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading || error || products.length < 9) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-[#191C1F] font-semibold text-[24px] leading-[32px]">
            Best Deals
          </h2>

          <div className="flex items-center justify-center rounded px-3 w-[190px] h-[40px] bg-[#F3DE6D] text-black text-[14px] leading-[20px] font-normal">
            {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
          </div>
        </div>

        <button className="text-blue-600 font-semibold hover:underline">
          Browse All Products →
        </button>
      </div>

      <div className="flex gap-0">
        <div className="flex-shrink-0">
          <BigProductCard product={products[0]} />
        </div>

        <div className="grid grid-cols-4 gap-0 flex-1">
          {products.slice(1).map((product) => (
            <SmallProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCards;
