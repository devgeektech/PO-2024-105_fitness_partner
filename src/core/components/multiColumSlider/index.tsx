import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import './style.scss';

import { Navigation } from 'swiper/modules';
import ClassesCard from '../classesCard';

export default function MultiColumnSlider() {
  return (
    <div>
      <Swiper
        slidesPerView={4}
        spaceBetween={24}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
            300: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
            575: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            991: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiperMultiColumn"
      >
        <SwiperSlide>
            <ClassesCard/>
        </SwiperSlide>
        <SwiperSlide><ClassesCard/></SwiperSlide>
        <SwiperSlide><ClassesCard/></SwiperSlide>
        <SwiperSlide><ClassesCard/></SwiperSlide>
        <SwiperSlide><ClassesCard/></SwiperSlide>
        <SwiperSlide><ClassesCard/></SwiperSlide>
        <SwiperSlide><ClassesCard/></SwiperSlide>
        <SwiperSlide><ClassesCard/></SwiperSlide>
        <SwiperSlide><ClassesCard/></SwiperSlide>
      </Swiper>
    </div>
  );
}
