import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useFetch from "../hooks/useFetch";
import "../css/CategoriesSection.css";
import ArrowLeft from "../assets/HomeImages/ArrowLeft.png";
import ArrowRight from "../assets/HomeImages/ArrowRight.png";

function CategoriesSection() {
  const { data, loading, error } = useFetch("products/categories");

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10">Error loading categories</p>;

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 md:py-12 relative">
      <h1 className="text-center text-[#191C1F] font-semibold text-[22px] sm:text-[26px] md:text-[32px] leading-[30px] sm:leading-[34px] md:leading-[40px] mb-5 md:mb-8">
        Shop with Categories
      </h1>

      <div className="relative">
        <Swiper
          loop={true}
          centeredSlides={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          modules={[Navigation]}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 2.5, spaceBetween: 12 },
            640: { slidesPerView: 3, spaceBetween: 14 },
            768: { slidesPerView: 3.5, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 18 },
            1280: { slidesPerView: 5, spaceBetween: 20 },
            1440: { slidesPerView: 6, spaceBetween: 20 },
          }}
        >
          {data.map((category, index) => (
            <SwiperSlide key={index} className="flex justify-center justify-center">
              <div className="relative w-[135px] h-[105px] sm:w-[155px] sm:h-[120px] md:w-[180px] md:h-[140px] lg:w-[200px] lg:h-[160px] border border-gray-200 flex items-center justify-center bg-white rounded-lg cursor-pointer overflow-hidden group transition-shadow hover:shadow-md">
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#FA8232] rounded-tr-full rounded-br-full origin-bottom-left circle-hover"></div>

                <span className="relative text-center text-[13px] sm:text-[14px] md:text-[16px] font-medium text-gray-900 group-hover:text-white transition-colors duration-500 px-2">
                  {category.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-prev-custom absolute top-1/2 -left-2 md:-left-5 z-20 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[#FA8232] rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-[#e06a00] transition-colors">
          <img src={ArrowLeft} alt="Previous" className="w-4 h-4 md:w-5 md:h-5" />
        </div>

        <div className="swiper-button-next-custom absolute top-1/2 -right-2 md:-right-5 z-20 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[#FA8232] rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-[#e06a00] transition-colors">
          <img src={ArrowRight} alt="Next" className="w-4 h-4 md:w-5 md:h-5" />
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
