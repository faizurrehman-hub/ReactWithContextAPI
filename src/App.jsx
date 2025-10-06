import React from "react";
import { Home } from "./components/Home";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Detail } from "./Detail";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  const { search, pathname } = useLocation();
  // console.log(search, pathname);

  return (
    <>
      <div className="h-screen w-full flex  ">
        {(pathname !== "/" || search.length > 0) && (
          <Link
            to="/"
            className=" absolute text-red-500 left-[17%] top-[-0.5%] text-sm flex items-center justify-center h-[5%] rounded-md px-1"
          >
            Home
          </Link>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/Detail/:id" element={<Detail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
