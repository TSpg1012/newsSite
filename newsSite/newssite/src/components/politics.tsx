import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";

type Props = {};

function Politics({}: Props) {
  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
}

export default Politics;
