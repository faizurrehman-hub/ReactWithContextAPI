import axios from "./utils/Axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./components/Loading";

export const Detail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(null);

  const getSingleProsuct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProsuct();
  }, []);
  return products ? (
    <>
      <div className="h-screen w-[70%]  mx-auto p-[10%] flex items-center justify-between gap-10">
        <img
          className="object-contain h-[85%] w-[50%]"
          src={products.image}
          alt=""
        />
        <div className="content">
          <h1 className=" title text-3xl font-semibold mb-2">
           {products.title}
          </h1>
          <h3 className=" category text-zinc-400 mb-2">{products.category}</h3>
          <h2 className="text-2xl font-semibold mb-1 text-red-500">${products.price} </h2>
          <p className="mb-5 text-xs">
           {products.description}
          </p>
          <Link className="py-2 px-3 font-semibold mb-3 border-2 border-blue-300 text-blue-300 mr-5 rounded-md">
            Edit
          </Link>
          <Link className="py-2 px-3 font-semibold mb-3 border-2 border-red-300 text-red-300 rounded-md">
            Delete
          </Link>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Detail;
