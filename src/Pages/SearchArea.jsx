import React from "react";
import { AiOutlineClose, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { BiNotepad } from "react-icons/bi";
import { PiQuotesBold } from "react-icons/pi";
import { VscGlobe } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { BsBookmark } from "react-icons/bs";
import { useState } from "react";
const SearchArea = ({ setSearch, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center w-full px-2 md:px-10 border-b-2">
        <div className="flex text-md sm:text-2xl gap-4 sm:gap-16 items-center ">
          <div className="flex items-center text-green-400">
            <VscGlobe className="mt-1 " />
            Research
          </div>
          <BiNotepad className="hover:text-green-400 transition-all hover:cursor-pointer" />
          <PiQuotesBold className="hover:text-green-400 transition-all hover:cursor-pointer" />
        </div>
        <button
          onClick={() => {
            if (location.pathname.split("/")[1] === "") {
              setSearch(false);
            } else {
              setSearch(false);
              navigate("/");
            }
          }}
        >
          <AiOutlineClose className="my-4 text-[5vw] md:text-4xl text-green-700 hover:text-red-400 transition-all" />
        </button>
      </div>
      {children}
      <div
        className="fixed bottom-0 mx-auto left-[0.5vw] cursor-pointer w-[98vw] bg-white rounded-t-xl flex flex-col items-center py-2 px-8 text-xl border-t-4 border-x-4 border-green-700"
        onClick={() => setBookmark(!bookmark)}
      >
        <div
          className={`flex ${
            bookmark ? "justify-end" : "justify-between"
          } w-full`}
        >
          {!bookmark && (
            <div className="flex gap-2 items-center  hover:text-green-400 transition-all">
              <BsBookmark />
              Bookmark
            </div>
          )}
          {bookmark ? (
            <AiOutlineDown className="cursor-pointer hover:text-green-400 transition-all" />
          ) : (
            <AiOutlineUp className="cursor-pointer hover:text-green-400 transition-all" />
          )}
        </div>
        <div
          className={`${
            bookmark ? "flex flex-col sm:flex-row gap-4" : "hidden"
          }`}
        >
          <p>Bookmark1</p>
          <p>Bookmark1</p>
          <p>Bookmark1</p>
          <p>Bookmark1</p>
          <p>Bookmark1</p>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
