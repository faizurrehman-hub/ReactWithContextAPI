import React, { createContext, useEffect, useState } from "react";
import axios from "./Axios";

export const ProductContext = createContext();

const context = (props) => {
  const [products, setProduct] = useState(null);

  const getProducts = async () => {
    try {
        const data = await axios("/products");
        setProduct(data.data);
    }
    catch(error){
        console.log(error)
    }
  }

  useEffect(() => {
    getProducts();
  },[]);
  return (
    <ProductContext.Provider value={[products,setProduct]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default context;
