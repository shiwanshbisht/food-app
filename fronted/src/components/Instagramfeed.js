import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Instagramfeed = () => {
  const [media, setMedia] = useState([]);
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;
  useEffect(() => {
    axios
      .get(`${backendurl}/instagram`)
      .then((response) => {
        setMedia(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching Instagram media:", error);
      });
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="p-5">
      <Slider {...settings}>
        {Array.isArray(media) &&
          media.map((item) => (
            <div
              key={item.id}
              className="relative rounded-lg overflow-hidden shadow-md"
            >
              {item.media_type === "CAROUSEL_ALBUM" && (
                <img
                  src={
                    Array.isArray(item.media_url)
                      ? item.media_url[0]
                      : item.media_url
                  }
                  className="w-full h-auto object-cover rounded-lg"
                  alt="Instagram media"
                />
              )}
              {item.media_type === "IMAGE" && (
                <img
                  src={
                    Array.isArray(item.media_url)
                      ? item.media_url[0]
                      : item.media_url
                  }
                  className="w-full h-auto object-cover rounded-lg"
                  alt="Instagram media"
                />
              )}
              {item.media_type === "VIDEO" && (
                <video controls className="w-full h-auto rounded-lg">
                  <source src={item.media_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Instagramfeed;
