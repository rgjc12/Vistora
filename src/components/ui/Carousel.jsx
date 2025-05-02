import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles
import "swiper/css";
// core version + navigation, pagination modules:
// import Swiper and modules styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import SwiperButtons from "./SwiperButtons";

import "../../styles/index.css";

function Carousel({ slideList }) {
  return (
    <div className="relative w-full p-2">
      <Swiper
        className="flex flex-col"
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {slideList &&
          slideList.map((review) => (
            <SwiperSlide>
              <div className="relative p-6 border border-border-color rounded-lg">
                <blockquote className="text-gray-700">
                  <p className="mb-4 text-lg italic">"{review.text}"</p>
                  <footer className="font-medium text-primary">
                    {review.author}
                    <br />
                    <span className="text-gray-500 text-sm">
                      {review.authorDetails}
                    </span>
                  </footer>
                </blockquote>
              </div>
            </SwiperSlide>
          ))}

        <SwiperButtons />
      </Swiper>
    </div>
  );
}

export default Carousel;
