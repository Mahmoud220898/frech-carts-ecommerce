import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import ProductItem from "../ProductItem/ProductItem";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let [productDetails, setProductDetails] = useState();
  let [relatedProducts, setRelatedProducts] = useState([]);

  let { id, categoryId } = useParams();

  useEffect(() => {
    getProductDetails();
    getRelatedProducts();
  }, []);
  useEffect(() => {
    getProductDetails();
  }, [id]);

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["Details", id],
    queryFn: getProductDetails,
    gcTime: 4000,
    select: (data) => data?.data.data,
  });
  useEffect(() => {
    setProductDetails(data);
  }, [data]);

  function getRelatedProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        getFilteredData(data.data);
      })
      .catch(({ err }) => console.log(err));
  }

  function getFilteredData(data) {
    let res = data.filter(
      (ele) => ele.category._id == categoryId && ele.id != id
    );
    setRelatedProducts(res);
  }

  return (
    <>
      <div className="row items-center p-20">
        {isLoading ? (
          <div className="w-full flex justify-center h-lvh items-center">
            <HashLoader color="#228B22" size={70} className="spinner" />
          </div>
        ) : (
          <>
            <div className="w-1/4 ">
              <Slider {...settings}>
                {productDetails?.images.map((src) => (
                  <img className="sm:w-full" src={src} alt="" />
                ))}
              </Slider>
            </div>
            <div className="w-3/4 ps-10">
              <h2 className="text-4xl py-6 font-medium text-green-600 dark:text-green-400">
                {productDetails?.title}
              </h2>
              <p className="text-gray-500 font-light text-lg dark:text-gray-300">
                {productDetails?.description}
              </p>
              <span className="mt-8 block text-gray-600 dark:text-gray-300 ">
                {productDetails?.category.name}
              </span>
              <div className="flex justify-between py-3 text-black dark:text-gray-300">
                <span>
                  {productDetails?.price}{" "}
                  <span className="font-bold text-black dark:text-white ms-1">
                    EGP
                  </span>
                </span>
                <span>
                  <i className="fa-solid fa-star text-yellow-500 dark:text-yellow-300"></i>{" "}
                  <span className="text-gray-500">
                    {productDetails?.ratingsAverage}
                  </span>
                </span>
              </div>
              <button className="btn text-white bg-green-600 text-center rounded-lg px-2 py-1 w-full mt-3 mb-1">
                + Add to cart
              </button>
            </div>
          </>
        )}

        <h2 className="text-green-500 text-3xl mt-28 ms-7 mb-3 font-medium">
          Related Products
        </h2>
        <div className="row">
          {relatedProducts.map((product) => (
            <ProductItem product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
