import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import { CounterContext } from "../../Context/CounterContext";
import axios from "axios";
import RecentProducts from "../RecentProducts/RecentProducts";
import Categories from "../Categories/Categories";
import MainSlider from "../MainSlider/MainSlider";
import SecondSlider from "../SecandSlider/SecondSlider";
export default function Home() {
  let [count, setCount] = useState(0);
  let [products, setProducts] = useState([]);
  let { counter } = useContext(CounterContext);

  useEffect(() => {
    getProducts();
  }, []);
  async function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className=" min-h-screen bg-[#fff] dark:bg-gray-900">
        <div className=" text-center dark:bg-gray-900">
          <div className="max-w-full py-5 dark:bg-gray-900">
            <MainSlider />
            <SecondSlider />
            <div className="row p-6">
              <RecentProducts />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
