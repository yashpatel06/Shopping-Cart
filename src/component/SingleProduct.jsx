import React from "react";
import { useLocation } from "react-router-dom";

const SingleProduct = () => {
  const { state } = useLocation();
  console.log(state);
  const { x } = state;

  console.log(x);

  return (
    <div className=" mt-14 max-w-screen-lg mx-auto items-center   ">
      <div
        className=" justify-between w-[90%] p-5 shadow-2xl mx-auto rounded-lg  "
        key={x.id}
      >
        <img className=" h-[20%] w-[20%] mx-auto pt-5" src={x.image} />
        <div className="flex-col pt-5">
          <h1 className="text-2xl text-center font-bold">{x.title}</h1>
          <p className="text-center py-5 text-xl font-semibold">{x.category}</p>
          <p className="text-base font-medium text-start mx-2">
            {x.description}
          </p>
          <p className="text-lg gap-2 flex justify-center text-center font-bold py-5">
            <span>Price</span>${x.price}
          </p>

          <button className="bg-orange-600 w-full hover:bg-orange-500  text-white p-3 text-lg font-bold rounded-lg ">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
