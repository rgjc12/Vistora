import React from "react";
import { useSwiper } from "swiper/react";

import { ChevronLeft, ChevronRight } from "lucide-react";

function SwiperButtons() {
  const swiper = useSwiper();
  return (
    <div className="z-20  w-full m-auto top-auto bottom-4 inset-10 flex items-center justify-center gap-24 p-4">
      <button
        onClick={() => swiper.slidePrev()}
        className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-xl"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-xl"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export default SwiperButtons;
