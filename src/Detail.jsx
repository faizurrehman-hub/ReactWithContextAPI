import axios from "./utils/Axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./components/Loading";
import { useContext } from "react";
import { ProductContext } from "./utils/Context";

export const Detail = () => {
  const [products, setproducts] = useContext(ProductContext);
  const { id } = useParams();
  const [product, setproduct] = useState(null);
  const navigate = useNavigate();

  // const getSingleProsuct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setProduct(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (!product) {
      setproduct(products.filter((p) => p.id == id)[0]);
    }
    // getSingleProsuct();
  }, []);

  const productDeleteHandler = (id) => {
    const FilterProduct = products.filter((p) => p.id !== id);
    setproducts(FilterProduct);
    localStorage.setItem("products", JSON.stringify(FilterProduct));
    navigate("/");
  };

  return product ? (
    <>
      <div className="h-screen w-[70%]  mx-auto p-[10%] flex items-center justify-between gap-10">
        <img
          className="object-contain h-[85%] w-[50%]"
          src={product.image}
          alt=""
        />
        <div className="content">
          <h1 className=" title text-3xl font-semibold mb-2">
            {product.title}
          </h1>
          <h3 className=" category text-zinc-400 mb-2">{product.category}</h3>
          <h2 className="text-2xl font-semibold mb-1 text-red-500">
            ${product.price}{" "}
          </h2>
          <p className="mb-5 text-xs">{product.description}</p>
          <Link to={`/edit/${product.id}`} className="py-2 px-3 font-semibold mb-3 border-2 border-blue-300 text-blue-300 mr-5 rounded-md">
            Edit
          </Link>
          <button
            onClick={() => productDeleteHandler(product.id)}
            className="py-2 px-3 font-semibold mb-3 border-2 border-red-300 text-red-300 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Detail;
