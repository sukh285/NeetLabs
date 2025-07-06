import React from "react";
import moduleName from "module";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="w-full mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
