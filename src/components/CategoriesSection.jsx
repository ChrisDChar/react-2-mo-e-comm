import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useFetch from "../hooks/useFetch";
import "../css/CategoriesSection.css";

function CategoriesSection() {
  const { data, loading, error } = useFetch("products/categories");

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10">Error loading categories</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 relative">
      <h1
        className="text-center text-[#191C1F] font-semibold text-[32px] leading-[40px] mb-8"
        style={{ fontFamily: "Public Sans" }}
      >
        Shop with Categories
      </h1>
      <div className="relative">
        <Swiper
          slidesPerView={6}
          spaceBetween={20}
          slidesPerGroup={1}
          centeredSlides={true}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          modules={[Navigation]}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
            1440: { slidesPerView: 6 },
          }}
        >
          {data.map((category, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="relative w-[205px] h-[160px] border border-gray-200 flex items-center justify-center bg-white rounded-lg cursor-pointer overflow-hidden group">
                
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#FA8232] rounded-tr-full rounded-br-full transform scale-100 origin-bottom-left circle-hover"></div>
                
                <span className="relative text-center text-lg font-medium text-gray-900 group-hover:text-white transition-colors duration-500">
                  {category.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev-custom absolute top-1/2 -left-5 z-20 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-[#FA8232] hover:text-white transition-colors">
          <span className="text-xl font-bold">&#10094;</span>
        </div>
        <div className="swiper-button-next-custom absolute top-1/2 -right-5 z-20 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-[#FA8232] hover:text-white transition-colors">
          <span className="text-xl font-bold">&#10095;</span>
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
