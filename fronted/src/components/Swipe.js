import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

function Swipe() {
  const [testimonialImage, setTestimonialImage] = useState([]);
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;

  useEffect(() => {
    axios
      .get(`${backendurl}/pics`)
      .then((response) => {
        setTestimonialImage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-6 relative z--1">
      <span className="text-gray-500">
        <h1>
          Happy <span className="text-emerald-500">Moments</span>
        </h1>
      </span>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {Array.isArray(testimonialImage) &&
          testimonialImage.map((testImage, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide flex justify-center items-center"
              style={{ width: "300px", height: "300px" }}
            >
              <a
                href={`${backendurl}/${testImage.instaid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full w-full"
              >
                <img
                  src={testImage.image}
                  alt={testImage.name}
                  className="h-full w-full object-cover rounded-md"
                />
              </a>
            </SwiperSlide>
          ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline color-emerald-500"></ion-icon>
          </div>
        </div>
      </Swiper>
    </div>
  );
}

export default Swipe;
