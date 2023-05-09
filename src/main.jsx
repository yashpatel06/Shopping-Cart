import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./component/Login.jsx";
import Home from "./component/Home.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SingleProduct from "./component/SingleProduct";
import FromCategorie from "./component/FromCategorie";
import MainLayout from "./layout/mainlayout";
import AuthLayout from "./layout/authlayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/SingleProduct/:title" element={<SingleProduct />} />
        <Route path="/:category" element={<FromCategorie />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
