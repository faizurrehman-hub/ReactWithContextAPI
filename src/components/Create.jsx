import React, { useState } from "react";
import { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

  const addProductHandler = (e) => {
    e.preventDefault();
    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("Each and every field must have atleast 4 characters");
      return;
    }
    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setproducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]));
    toast.success("Product added successfully");
    navigate("/");
  };
  // console.log(products);
  return (
    <form
      onSubmit={addProductHandler}
      className="h-screen w-screen flex flex-col  items-center p-[5%]"
    >
      <h1 className="text-3xl  w-1/2  mb-4  p-[5px]">Add new product</h1>
      <input
        className="text-2xl bg-zinc-100 w-1/2 mb-4 rounded-md p-[5px]"
        type="text"
        placeholder="title"
        onChange={(e) => {
          settitle(e.target.value);
        }}
        value={title}
      />
      <input
        className="text-2xl bg-zinc-100 w-1/2  mb-4 rounded-md p-[5px]"
        type="url"
        placeholder="image link"
        onChange={(e) => {
          setimage(e.target.value);
        }}
        value={image}
      />
      <div className="flex w-1/2 gap-7 justify-between">
        <input
          className="text-2xl bg-zinc-100 w-1/2 mb-4 rounded-md p-[5px]"
          type="text"
          placeholder="category"
          onChange={(e) => {
            setcategory(e.target.value);
          }}
          value={category}
        />
        <input
          className="text-2xl bg-zinc-100 w-1/2  mb-4 rounded-md p-[5px]"
          type="number"
          placeholder="price"
          onChange={(e) => {
            setprice(e.target.value);
          }}
          value={price}
        />
      </div>
      <textarea
        className="text-2xl bg-zinc-100 w-1/2  mb-4 rounded-md p-[5px]"
        rows="5"
        placeholder="enter product description here..."
        onChange={(e) => {
          setdescription(e.target.value);
        }}
        value={description}
      ></textarea>
      <div className="w-1/2 flex justify-start">
        <button className=" py-2 px-3 font-semibold mb-3 border-2 border-red-300 text-red-300 rounded-md">
          Add New Product
        </button>
      </div>
    </form>
  );
};

export default Create;
