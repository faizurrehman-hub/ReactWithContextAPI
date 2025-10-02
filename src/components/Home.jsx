import React, { useContext, useEffect, useState } from "react";
import { Nav } from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/Axios";

export const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  const [filterProducts, setfilterProduct] = useState(null);

  const getProductsCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilterProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filterProducts || category == "undefined") setfilterProduct(products);

    if (category != "undefined") getProductsCategory();
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="h-screen w-[85%]  p-8 flex flex-wrap gap-4 overflow-y-auto overflow-x-hidden">
        {filterProducts &&
          filterProducts.map((p, i) => (
            <Link
              key={i}
              to={`/Detail/${p.id}`}
              className="card w-[18%] h-[40vh]  border-2 p-4 flex flex-col items-center justify-center shadow-md "
            >
              <div
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
                className="image hover:scale-110 h-[80%] mb-3 w-full  bg-contain bg-no-repeat bg-center "
              ></div>
              <h1 className=" title hover:text-blue-800">{p.title}</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};
export default Home;
