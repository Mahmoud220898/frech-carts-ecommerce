import React from "react";
import useQueryCart from "../../Hook/useQueryCart";
import {
  cleardata,
  getcartapi,
  updatecartapi,
  deletcartapi,
} from "../../api/CartApi";
import Loader from "../Loader/Loader";
import useMutationCart from "../../Hook/useMutaionCart";
import emptycart from "../../assets/images/emptycart.png";
import Model from "../Model/Model";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Cart() {
  const { isError, error, isLoading, data } = useQueryCart(
    "getcartapi",
    getcartapi
  );
  const { mutate: delmutate, status: delstatus } =
    useMutationCart(deletcartapi);
  const { mutate: updatemutate, status: upstatus } =
    useMutationCart(updatecartapi);
  const { mutate: clearmutate, status: clearstatus } =
    useMutationCart(cleardata);

  const deletenote = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2ecf36",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearmutate();
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
        });
      }
    });
  };
  if (clearstatus == "success") toast.success("Clear all done");
  if (isError)
    return <img src={emptycart} alt="emptycart" className="  mx-auto"></img>;

  if (delstatus === "error")
    return <h2 className="text-red-600 text-5xl">{error}</h2>;
  if (delstatus === "success") toast.success("item deleted successfully");
  if (upstatus === "pending" || delstatus === "pending" || isLoading)
    return <Loader></Loader>;
  return (
    <>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {data?.data?.numOfCartItems? 
     <> 
      <span className=" z-50 fixed transition-all duration-1000 -top-[0.5%] left-[62%] bottom-[94%] hover:bottom-[88%] text-white bg-gradient-to-br from-yellow-400 to-green-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-b text-sm px-5 py-2.5 text-center me-2 mb-2">
        Total Price : {data?.data?.data?.totalCartPrice} EGP
      </span>
    </> : ''}
      {data?.data?.numOfCartItems ? (
        <div className="relative pt-20 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.data?.products.map((ele) => (
                <tr
                  key={ele?.product?._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-10">
                    <img
                      src={ele?.product?.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Apple Watch"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {ele?.product?.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          {
                            ele?.count == 1
                              ? delmutate(ele?.product?._id)
                              : updatemutate({
                                  id: ele?.product?._id,
                                  count: ele?.count
                                    ? ele?.count - 1
                                    : ele?.count,
                                });
                          }
                        }}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div className=" ">
                        <div className=" w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                          {ele?.count}{" "}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          {
                            ele?.count == ele?.product?.quantity
                              ? ele?.count
                              : updatemutate({
                                  id: ele?.product?._id,
                                  count: ele?.count + 1,
                                });
                          }
                        }}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {ele?.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        delmutate(ele?.product?._id);
                      }}
                      className="font-medium bg-red-800 text-white p-5"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => {
              deletenote();
            }}
            type="button"
            className="z-50 fixed transition-all duration-1000  -top-[0.5%]  left-[20%] bottom-[94%] hover:bottom-[88%] text-white bg-gradient-to-br from-red-800 to-red-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-b text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <i className="fas fa-trash-can"></i> Clear All{" "}
          </button>
        </div>
      ) : (
        <h2 className="text-center text-red-600"> NO Items IN The Cart </h2>
      )}

      <Model id={data?.data?.data?._id} clear={clearmutate}></Model>
    </>
  );
}
