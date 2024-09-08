import AuthNavbar from "../AuthNavbar/AuthNavbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <>
      <AuthNavbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default AuthLayout;
