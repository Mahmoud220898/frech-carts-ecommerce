import { useContext, useState } from "react";
import { StoreContext } from "../../Context/storeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSpinner, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useMutaionCart from "../../Hook/useMutaionCart";
import { addtocartapi } from "../../api/CartApi";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

export default function ProductItem({ product }) {
  const { setCounter, addToCart, setTotal, addToWishlist } =
    useContext(StoreContext);
  const { mutate: additem, status } = useMutaionCart(addtocartapi);

  const [loading, setLoading] = useState(false);
  const [beat, setBeat] = useState(false);
  const [flag, setFlag] = useState(false);

  if (status === "pending")
    return (
      <>
        <Loader />
      </>
    );

  if (status === "success") toast.success("item added successfully");

  if (status === "error") toast.error("Error, item not added");

  async function addProductToCart(productId) {
    setLoading(true);
    const data = await addToCart(productId);
    if (data.status == "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
      setTotal(data.data.totalCartPrice);
      setLoading(false);
    }
  }

  function handleWishlistClick() {
    setFlag(!flag);
  }

  async function addProductToWishlist(productId) {
    const data = await addToWishlist(productId);
    if (data.status === "success") {
      setBeat(true);
      toast.success("Product added to wishlist");
    }
  }

  return (
    <>
      <div className="mt-20 dark:bg-gray-700 ng product relative w-[20%] max-lg:w-[28%] max-md:w-[45%] max-sm:w-[100%] flex flex-col items-start justify-center m-6 p-3 rounded-lg cursor-pointer border border-[#f0f3f2] shadow-md mt-8">
        <div className="absolute right-2 top-2 bg-white-800 rounded-3xl bg-white dark:bg-none border-2 dark:bg-black px-2 py-1 shadow-md">
          <button onClick={() => addProductToWishlist(product._id)}>
            <i
              onClick={handleWishlistClick}
              className={
                flag
                  ? "fas fa-heart text-red-600 "
                  : "fas fa-heart-crack text-gray-800 dark:text-white"
              }
              text-2xl
            ></i>
          </button>
        </div>
        <Link to={`/productDetails/${product?._id}`}>
          <img
            src={product.imageCover}
            className="rounded-lg w-[100%] self-center max-sm:w-[100%] max-md:w-[100%] max-lg:w-[100%]"
            alt="brands"
          />
          <span className="text-main font-semibold self-start text-xl flex mt-4 justify-center">
            {product.category.name}
          </span>
          <h5 className="title self-start text-lg flex mt-3 dark:text-white">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h5>
          <div className="flex items-start justify-start w-full mb-2 ">
            <div className="title text-md text-nowrap dark:text-white">
              {product.price}{" "}
              <span className="font-bold dark:text-black"> EGP</span>
            </div>
            <div className="title text-md text-nowrap ml-auto font-semibold dark:text-white">
              <FontAwesomeIcon icon={faStar} className="rating-color me-1" />
              {product.ratingsAverage}
            </div>
          </div>
        </Link>
        <button
          onClick={() => {
            additem(product._id);
          }}
          className="btn-accent rounded-md p-2 w-full font-bold flex-shrink-0 text-[#fff] bg-main"
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
