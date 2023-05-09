import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Loader } from "../assets/loading.svg";

const GetAllProduct = () => {
  const [getProduct, setGetProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const nav = useNavigate();

  const getProductData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/products`);
      const data = await res.json();
      setGetProduct(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  if (loading) {
    return (
      <h1 className="justify-center flex my-52  ">
        <Loader />
      </h1>
    );
  }

  return (
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
          <div className="">
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
  );
};

export default GetAllProduct;
