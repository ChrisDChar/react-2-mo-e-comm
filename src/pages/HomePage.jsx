import React, { useMemo } from "react";
import HeroSection from "../components/HeroSection";
import ProductCards from "../components/ProductCards";
import CategoriesSection from "../components/CategoriesSection";
import useFetch from "../hooks/useFetch";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoCards from "../components/PromoCards";

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

  if (loading) return <p className="text-center py-12">Loading...</p>;
  if (error) return <p className="text-center py-12 text-red-500">Failed to load categories</p>;

  return (
    <main className="pt-[140px]">
      <HeroSection />
      <ProductCards />
      <CategoriesSection categories={categories} />
      <FeaturedProducts />
      <PromoCards />
    </main>
  );
}

export default HomePage;
