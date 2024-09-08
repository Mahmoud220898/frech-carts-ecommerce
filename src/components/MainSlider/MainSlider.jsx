import React, { useEffect, useState } from "react";
import styles from "./MainSlider.module.css";
import Slider from "react-slick";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  let [count, setCount] = useState(0);
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
  };

  useEffect(() => {}, []);
  return (
    <div className="row  px-20 pt-20 rounded-lg">
      <div className="w-3/4">
        <Slider {...settings}>
          <img
            src={slider1}
            alt=""
            className="h-[600px] rounded-l-lg"
            srcset=""
          />
          <img
            src={slider2}
            alt=""
            className="h-[600px] rounded-l-lg"
            srcset=""
          />
          <img
            src={slider3}
            alt=""
            className="h-[600px] rounded-l-lg"
            srcset=""
          />
        </Slider>
      </div>
      <div className="w-1/4">
        <img
          src={slider2}
          alt=""
          className="h-[300px] rounded-tr-lg "
          srcset=""
        />
        <img
          src={slider3}
          alt=""
          className="h-[300px] rounded-br-lg"
          srcset=""
        />
      </div>
    </div>
  );
}
