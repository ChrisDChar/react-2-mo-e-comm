import React, { useMemo, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ProductCards from "../components/ProductCards";
import CategoriesSection from "../components/CategoriesSection";
import useFetch from "../hooks/useFetch";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoCards from "../components/PromoCards";
import NewProductSection from "../components/NewProductSection";
import Newsletter from "../components/Newsletter";
import { restoreScrollPosition } from "../hooks/useScrollRestoration";

function HomePage() {
  const { data: categoryListData, loading, error } = useFetch("products/category-list");

  const categories = useMemo(() => {
    if (!categoryListData) return [];
    return categoryListData.map((cat, index) => ({
      id: index,
      name: cat,
      image: `https://dummyjson.com/image/250x160?text=${encodeURIComponent(cat)}`,
    }));
  }, [categoryListData]);

  useEffect(() => {
    if (!loading && categoryListData) {
      const id = requestAnimationFrame(() => {
        const timer = setTimeout(() => {
          restoreScrollPosition("/");
        }, 50);
        return () => clearTimeout(timer);
      });
      return () => cancelAnimationFrame(id);
    }
  }, [loading, categoryListData]);

  if (loading) return <p className="text-center py-12">Loading...</p>;
  if (error) return <p className="text-center py-12 text-red-500">Failed to load categories</p>;

  return (
    <main>
      <HeroSection />
      <ProductCards />
      <CategoriesSection categories={categories} />
      <FeaturedProducts />
      <PromoCards />
      <NewProductSection />
      <Newsletter />
    </main>
  );
}

export default HomePage;
