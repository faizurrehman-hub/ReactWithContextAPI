import { nanoid } from "nanoid";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { useEffect } from "react";

const Edit = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const { id } = useParams();
  const [product, setproduct] = useState({
    title: "",
    image: "",
    description: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  //   console.log(products)
  const changeHandler = (e) => {
    // console.log(e.target.name, e.target.value);
    setproduct({ ...product, [e.target.name]: e.target.value });
  };
  const addProductHandler = (e) => {
    e.preventDefault();
    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Each and every field must have atleast 4 characters");
      return;
    }
    const pi = products.findIndex((p) => p.id == id);
    const copyData = [...products];
    copyData[pi] = { ...products[pi], ...product };
    // console.log(product, pi);

    setproducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    navigate(-1);
    // console.log(copyData);
  };

  return (
    <form
      onSubmit={addProductHandler}
      className="h-screen w-screen flex flex-col  items-center p-[5%]"
    >
      <h1 className="text-3xl  w-1/2  mb-4  p-[5px]">Edit product details</h1>
      <input
        className="text-2xl bg-zinc-100 w-1/2 mb-4 rounded-md p-[5px]"
        type="text"
        placeholder="title"
        onChange={changeHandler}
        name="title"
        value={product && product.title}
      />
      <input
        className="text-2xl bg-zinc-100 w-1/2  mb-4 rounded-md p-[5px]"
        type="url"
        placeholder="image link"
        onChange={changeHandler}
        name="image"
        value={product && product.image}
      />
      <div className="flex w-1/2 gap-7 justify-between">
        <input
          className="text-2xl bg-zinc-100 w-1/2 mb-4 rounded-md p-[5px]"
          type="text"
          placeholder="category"
          onChange={changeHandler}
          name="category"
          value={product && product.category}
        />
        <input
          className="text-2xl bg-zinc-100 w-1/2  mb-4 rounded-md p-[5px]"
          type="number"
          placeholder="price"
          onChange={changeHandler}
          name="price"
          value={product && product.price}
        />
      </div>
      <textarea
        className="text-2xl bg-zinc-100 w-1/2  mb-4 rounded-md p-[5px]"
        rows="5"
        placeholder="enter product description here..."
        onChange={changeHandler}
        name="description"
        value={product && product.description}
      ></textarea>
      <div className="w-1/2 flex justify-start">
        <button className=" py-2 px-3 font-semibold mb-3 border-2 border-red-300 text-red-300 rounded-md">
          Save changes
        </button>
      </div>
    </form>
  );
};

export default Edit;
