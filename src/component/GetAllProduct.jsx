import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Loader } from "../assets/loading.svg";
import axios from "axios";

const GetAllProduct = () => {
  const [getProduct, setGetProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productIds, setProductIds] = useState(new Set());
  const [allProductsLoaded, setallProductsLoaded] = useState(false);

  const nav = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/products?per_page=10&_page=${page}&sparkline=false`
      );
      const newProducts = response.data.reduce((acc, product) => {
        if (!productIds.has(product.id)) {
          acc.push(product);
          productIds.add(product.id);
        }
        return acc;
      }, []);
      setGetProduct((prevProducts) => [...prevProducts, ...newProducts]);

      if (response.data.length === 0) {
        setallProductsLoaded(true);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = async () => {
    if (
      !loading &&
      !allProductsLoaded &&
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
      }, 1000);
    }
  };

  // if (loading) {
  //   return (
  //     <h1 className="justify-center flex  ">
  //       <Loader />
  //     </h1>
  //   );
  // }

  return (
    <>
      <div className="grid grid-cols-3 gap-5  mx-10 py-5">
        {getProduct.map((x) => (
          <div
            onClick={() => {
              nav(`/SingleProduct/${x.title}`, {
                state: { x },
              });
            }}
            className=" grid grid-rows-1  shadow-2xl rounded-lg hover:scale-105 hover:duration-500 "
            key={x.id}
          >
            <img className="w-[50%] mx-auto py-5" src={x.image} />
            <div className="mb-5">
              <h1 className="text-lg text-center font-bold">{x.title}</h1>
              <p className="text-center py-5 text-lg font-semibold">
                {x.category}
              </p>
              <p className="text-base text-start mx-2">{x.description}</p>

              <p className="text-lg  gap-5 flex justify-center text-center font-bold py-5">
                <h1>Price </h1>${x.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      {loading && !allProductsLoaded && (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
};

export default GetAllProduct;
