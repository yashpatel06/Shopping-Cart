import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FromCategorie = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  console.log(category);
  const [getCategorie, setGetCategorie] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((getCategorie) => setGetCategorie(getCategorie));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-5 justify-between mx-10 py-5  ">
      {getCategorie.map((x) => (
        <div
          className=" grid grid-rows-1 shadow-2xl rounded-lg hover:scale-105 hover:duration-500 "
          onClick={() => {
            navigate(`/SingleProduct/:${x.title}`, {
              state: { x },
            });
          }}
          key={x.id}
        >
          <img className="w-[50%] mx-auto py-5" src={x.image} />
          <div className="">
            <h1 className="text-lg text-center font-bold">{x.title}</h1>
            <p className="text-center py-5 text-lg font-semibold">
              {x.category}
            </p>
            <p className="text-base text-start mx-2">{x.description}</p>
            <p className="text-lg text-center font-bold py-5">{x.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FromCategorie;
