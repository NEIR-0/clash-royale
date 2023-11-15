import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../component/navbar";
function MainFeatures() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default MainFeatures;
