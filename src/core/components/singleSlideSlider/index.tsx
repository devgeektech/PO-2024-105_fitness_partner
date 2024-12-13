import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
export default function SingleSlideSlider() {
  return (
    <Swiper
      spaceBetween={30}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src={"/assets/img/slideOne.jpg"} className="w-100 h-auto" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={"/assets/img/slideOne.jpg"} className="w-100 h-auto" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={"/assets/img/slideOne.jpg"} className="w-100 h-auto" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={"/assets/img/slideOne.jpg"} className="w-100 h-auto" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={"/assets/img/slideOne.jpg"} className="w-100 h-auto" />
      </SwiperSlide>
    </Swiper>
  );
}
