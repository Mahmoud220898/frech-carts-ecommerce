import React, { useContext, useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserTokenContext } from "../../Context/UserTokenContext";
import isForget from "../ForgetPassword/ForgetPassword";
import ForgetPassword from "../ForgetPassword/ForgetPassword";

export default function Login() {
  let [apiError, setApiError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let tokenContext = useContext(UserTokenContext);

  let navigate = useNavigate();
  useEffect(() => {}, []);

  function login(values) {
    setApiError(null);
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        let { data } = res;
        if (data.message == "success") {
          localStorage.setItem("token", data.token);
          tokenContext.setToken(data.token);
          navigate("/home");
        } else {
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message);
        setIsLoading(false);
      });
  }

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string()
        .email("Invalid email, Example@site.com")
        .required("Required!"),
      password: Yup.string()
        .matches(
          /^[A-Z][a-z0-9]{7,15}$/,
          "Password should start with capital letter & at least 7 character"
        )
        .required("Required!"),
    });
  };

  let myForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      {apiError && (
        <div
          className="flex items-center p-4 lg:mx-64 my-5 text-sm text-yellow-800 rounded-2xl bg-yellow-50 dark:bg-red-700 dark:text-yellow-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div>
            <span className="font-medium">{apiError} !!!</span>
          </div>
        </div>
      )}

      <form
        onSubmit={myForm.handleSubmit}
        className="max-w-5xl pt-12 pb-12 mx-auto"
      >
        <div className="text-3xl mt-4 font-semibold dark:text-green-600 pb-12">
          Login ...
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-green-600 pb-2 "
          >
            Email :
          </label>
          <input
            type="email"
            name="email"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.email}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>
        {myForm.errors.email && myForm.touched.email ? (
          <div
            className="p-4 my-2 text-sm text-white rounded-lg bg-red-500 dark:bg-white-800 dark:text-white-800"
            role="alert"
          >
            <span className="font-medium">{myForm.errors.email}</span>
          </div>
        ) : null}

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-green-600 pb-2"
          >
            Password :
          </label>
          <input
            type="password"
            name="password"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.password}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password "
          />
        </div>
        {myForm.errors.password && myForm.touched.password ? (
          <div
            className="p-4 my-2 text-sm text-white rounded-lg bg-red-500 dark:bg-white-800 dark:text-white-800"
            role="alert"
          >
            <span className="font-medium">{myForm.errors.password}</span>
          </div>
        ) : null}
        <div class="flex items-start mb-10">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="mt-2 w-4 h-9 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
            <label
              for="remember"
              class="ms-2 text-sm text-gray-900 dark:text-gray-300 font-semibold"
            >
              {" "}
              Remember me
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <Link
            rel="stylesheet"
            to="forgetPassword"
            onClick={ForgetPassword}
            className="dark:text-white text-xl font-medium text-blue-900"
          >
            {" "}
            Forget your password ..?{" "}
          </Link>
          {isLoading ? (
            <button className="disabled text-white bg-gray-700  font-medium rounded-lg text-sm sm:w-auto px-16 py-2 mt-5 text-center">
              {" "}
              <i className="fa fa-spinner fa-spin"></i>{" "}
            </button>
          ) : (
            <button
              disabled={isLoading}
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-11 py-2 mt-5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Login
            </button>
          )}
        </div>
      </form>
    </>
  );
}
