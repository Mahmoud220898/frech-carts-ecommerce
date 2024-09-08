import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let [apiError, setApiError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {}, []);

  function register(values) {
    setApiError(null);
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        let { data } = res;
        if (data.message == "success") {
          navigate("/login");
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
      name: Yup.string()
        .min(3, "Name shouldn't less than 3 characters")
        .max(10, "Name shouldn't max than 10 characters")
        .required("Required!"),
      email: Yup.string()
        .email("Invalid email, Example@site.com")
        .required("Required!"),
      password: Yup.string()
        .matches(
          /^[A-Z][a-z0-9]{7,15}$/,
          "Password should start with capital letter & at least 7 character"
        )
        .required("Required!"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "rePassword should match password")
        .required("Required!"),
      phone: Yup.string()
        .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Must be egyptian number")
        .required("Required!"),
    });
  };

  let myForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
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
        className="max-w-5xl mx-auto dark:bg-gray-900"
      >
        <div className="text-3xl mt-4 font-semibold dark:bg-gray-900">
          Register Now:
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name :
          </label>
          <input
            type="name"
            name="name"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.name}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your name"
          />
        </div>
        {myForm.errors.name && myForm.touched.name ? (
          <div
            className="p-4 my-2 text-sm text-white rounded-lg bg-red-500 dark:bg-white-800 dark:text-white-800"
            role="alert"
          >
            <span className="font-medium">{myForm.errors.name}</span>
          </div>
        ) : null}

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
            className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white"
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

        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mt-4 mb-1  text-sm font-medium text-gray-900 dark:text-white"
          >
            Repassword :
          </label>
          <input
            type="password"
            name="rePassword"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.rePassword}
            id="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password again"
          />
        </div>
        {myForm.errors.rePassword && myForm.touched.rePassword ? (
          <div
            className="p-4 my-2 text-sm text-white rounded-lg bg-red-500 dark:bg-white-800 dark:text-white-800"
            role="alert"
          >
            <span className="font-medium">{myForm.errors.rePassword}</span>
          </div>
        ) : null}

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone :
          </label>
          <input
            type="tel"
            name="phone"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.phone}
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your phone"
          />
        </div>
        {myForm.errors.phone && myForm.touched.phone ? (
          <div
            className="p-4 my-2 text-sm text-white rounded-lg bg-red-500 dark:text-white-800"
            role="alert"
          >
            <span className="font-medium">{myForm.errors.phone}</span>
          </div>
        ) : null}

        <div className="flex justify-end">
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
              Register
            </button>
          )}
        </div>
      </form>
    </>
  );
}
