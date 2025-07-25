import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const Layout = () => {
  return (
    <div className="w-full mx-auto">
      <Navbar />
      <Banner />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
