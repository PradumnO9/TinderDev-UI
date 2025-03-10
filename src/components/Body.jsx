import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
  return (
    <div>
      <div className="min-h-[90vh]">
        <NavBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
