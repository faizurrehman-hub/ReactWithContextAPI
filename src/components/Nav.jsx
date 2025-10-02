import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";
export const Nav = () => {
  const [products] = useContext(ProductContext);

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  const color = () => {
    return `rgba(${(Math.random()* 255).toFixed()}, ${(Math.random()* 255).toFixed()}, ${(Math.random()* 255).toFixed()},0.4)`
  }
 

  return (
    <>
      <nav className="h-full w-[15%] bg-zinc-50 p-4 flex flex-col items-center">
        <a className="py-2 px-3 font-semibold mb-3 border-2 border-red-300 text-red-300 rounded-md">
          Add New Product
        </a>
        <hr className="w-[80%] " />
        <h1 className="text-xl font-semibold">Category filter</h1>

        <div className="w-[100%] mt-3">
          {distinct_category.map((c, i) => (
            <Link key={i} to={`/?category=${c}`} className="flex items-center gap-1 mb-2 text-sm">
              <span style={{backgroundColor: color()}} className="h-[13px] w-[13px] rounded-full "></span>
              {c}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
export default Nav;
