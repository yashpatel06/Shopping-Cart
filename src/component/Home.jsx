import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Categories from "./Categories";
import GetAllProduct from "./GetAllProduct";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const token = window.localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <>
      <Categories />
      <GetAllProduct />
      {/* <Cart /> */}
    </>
  );
};

export default Home;
