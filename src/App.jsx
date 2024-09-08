import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import LayOut from "./components/LayOut/LayOut";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import CounterContextProvider from "./Context/CounterContext";
import UserTokenContextProvider from "./Context/UserTokenContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import WishList from "./components/WishList/WishList";
import AllOrders from "./components/AllOrders/AllOrders";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import NotFound from "./components/NotFound/NotFound";
import Address from "./components/Address/Address";
import Products from "./components/Products/Products";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        index: true,
        path: "",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        index: true,
        path: "home",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "products",
        element: (
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoutes>
            <Brands />
          </ProtectedRoutes>
        ),
      },
      {
        path: "address/:id",
        element: (
          <ProtectedRoutes>
            <Address />
          </ProtectedRoutes>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoutes>
            <WishList />
          </ProtectedRoutes>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoutes>
            <AllOrders />
          </ProtectedRoutes>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "forgetPassword/login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "login/forgetPassword",
        element: <ForgetPassword />,
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserTokenContextProvider>
          <CounterContextProvider>
            <CartContextProvider>
              <RouterProvider router={routes}></RouterProvider>
            </CartContextProvider>

            <ReactQueryDevtools></ReactQueryDevtools>
          </CounterContextProvider>
        </UserTokenContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
