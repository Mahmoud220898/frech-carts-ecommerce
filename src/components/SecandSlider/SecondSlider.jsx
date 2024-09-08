import Slider from "react-slick";
import axios from "axios";
import { useEffect, useState } from "react";

function SecondSlider() {
  const [categories, setCategories] = useState([]);

  const settings = {
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 4,
    autoplay: true,
    speed: 3500,
    autoplaySpeed: 4000,
  };

  useEffect(() => {
    async function getCategories() {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    }

    getCategories();
  }, []);

  return (
    <>
      <div className="my-5 px-5">
        <h2 className="text-start text-lg mt-10 mb-6 font-semibold text-green-700 dark:text-white">
          Show popular categories :
        </h2>
        <Slider {...settings}>
          {categories.map((category) => (
            <img
              key={category._id}
              className="w-full h-[150px] max-sm:h-[80px] flex-shrink-0 "
              src={category.image}
            />
          ))}
        </Slider>
      </div>
      <div className="max-sm:px-6 max-md:px-4 max-lg:px-10 text-start">
        {categories
          .map((item) => (
            <span
              key={item._id}
              className=" text-green-700 px-6 font-semibold dark:text-white mx-[24px]  max-sm:mx-[4px] max-sm:text-xs"
            >
              {item.name}
            </span>
          ))
          .splice(0, 8)}
      </div>
    </>
  );
}

export default SecondSlider;
