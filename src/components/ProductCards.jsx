import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // 1. Import Link here
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
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <h2 className="text-[#191C1F] font-semibold text-[20px] md:text-[24px] leading-[28px] md:leading-[32px]">
            Best Deals
          </h2>

          <div className="flex items-center justify-center rounded px-3 h-[36px] bg-[#F3DE6D] text-black text-[13px] md:text-[14px] leading-[20px] font-normal w-fit">
            {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
          </div>
        </div>

        <Link to="/shop" className="text-blue-600 font-semibold hover:underline text-sm md:text-base w-fit">
          Browse All Products →
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[300px] xl:w-[340px] flex-shrink-0">
          <BigProductCard product={products[0]} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 flex-1">
          {products.slice(1).map((product) => (
            <SmallProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCards;