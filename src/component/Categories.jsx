import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((categories) => setCategories(categories));
  }, []);

  return (
    <nav className="bg-gray-800">
      <hr />
      <ul className="flex justify-between mx-10   py-5 text-lg font-semibold text-white">
        {categories.map((x) => (
          <li key={x}>
            <Link to={`/${x}`}>{x}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
