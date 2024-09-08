import React, { useContext, useEffect, useState } from "react";
import styles from "./RecentProducts.module.css";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import { useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";
import { CartContext } from "../../Context/CartContext";

export default function RecentProducts() {
  let { addProductToCart } = useContext(CartContext);

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isLoading, data, isError } = useQuery({
    queryKey: ["Products"],
    queryFn: getProducts,
    staleTime: 5000,
    retry: 5,
    retryDelay: 4000,
  });

  function addToCartItem(id) {
    let x = addProductToCart(id);
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center h-lvh items-center">
        <HashLoader color="#228B22" size={70} className="spinner" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full flex justify-center h-lvh items-center">
        <p>Error</p>
      </div>
    );
  }

  return (
    <>
      <div className=" min-h-screen rounded-lg bg-[#fff] dark:bg-gray-900">
        <div>
          <div className="max-w-full flex items-center justify-center flex-wrap py-5">
            <div className="row  flex justify-center">
              {data?.data.data.map((product) => (
                <ProductItem
                  addCart={addToCartItem}
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
