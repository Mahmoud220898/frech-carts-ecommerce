import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import axios from "axios";
import Slider from "react-slick";
export default function Categories() {
  let [categories, setCategories] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
  };

  useEffect(() => {
    getCategories();
  }, []);
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => setCategories(data.data))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className=" min-h-screen bg-[#fff] pt-20 px-8 dark:bg-gray-900">
        <div className=" text-center">
          <div className="max-w-full flex items-center justify-center flex-wrap py-5">
            {categories.map((category, i) => (
              <div
                key={i}
                className="dark:bg-gray-600 w-[23%] max-lg:w-[29%] max-md:w-[45%] max-sm:w-[100%] grid place-items-center border border-[#f0f3f2] rounded product m-2 shadow-md cursor-pointer"
              >
                <img
                  className="w-[300px] h-[300px] mb-2 "
                  src={category.image}
                  alt="categories"
                />
                <div className=" w-full p-2 title border border-[#f0f3f2]">
                  <h2 className="dark:text-white">{category.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
