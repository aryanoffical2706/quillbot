import React from "react";
import { BsThreeDotsVertical, BsBookmark } from "react-icons/bs";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const Result = ({ type, apiResponse }) => {
  return (
    <div className="w-full px-5 sm:px-10 my-5 mb-20 sm:mt-10 gap-2 sm:gap-4 flex flex-col">
      <p className="text-2xl">{type} Result</p>
      <div className="flex flex-col gap-4 sm:gap-8">
        {apiResponse === undefined ? (
          <div className=" flex items-center italic tracking-widest flex-col h-[30vh] text-red-400 justify-center text-base sm:text-xl md:text-3xl">
            <p>No Result</p>
            <p>Or Some Error Occured</p>
            <p className="not-italic text-xs sm:text-base tracking-widest font-extralight">
              Reload Page
            </p>
          </div>
        ) : (
          apiResponse?.map((item, index) => {
            return (
              <div key={index}>
                <Data ind={index} type={type} item={item} />;
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
const Data = ({ type, item, ind }) => {
  // console.log("data api response", item);
  // console.log(item.url);
  return (
    <div
      key={ind}
      className="flex flex-col gap-4 px-4 py-5 rounded-xl drop-shadow-sm border-t-2 border-gray-50 shadow-gray-300 shadow-md"
    >
      <div className="flex justify-end md:justify-between gap-2">
        <p className="hidden md:block text-xs  text-gray-400">{item?.url}</p>
        <div className="flex gap-2 items-center text-green-400 font-semibold text-lg">
          <Button color="success" className="flex gap-2">
            <BsBookmark />
            Bookmark
          </Button>
          <BsThreeDotsVertical className="cursor-pointer" />
        </div>
      </div>
      <div>
        <p className="text-2xl tracking-wider sm:tracking-widest">
          {item?.title}
        </p>
        <p className="italic text-gray-400 text-xs sm:text-sm">
          {item?.journal?.name}
        </p>
        <p className="text-sm sm:text-lg">{item?.abstract}</p>
      </div>
      <div className="flex justify-end sm:justify-between">
        <div className="hidden sm:flex  gap-1 sm:gap-2 text-base">
          {type === "Academic" ? (
            <>
              <p className="text-xs sm:text-base text-blue-600 cursor-pointer">
                Cited by All
              </p>
              <p className="text-xs sm:text-base text-blue-600 cursor-pointer">
                View all version
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex gap-1 sm:gap-2">
          {type === "Academic" ? (
            <>
              <Link to={item?.url} target="_blank">
                <Button variant="outlined" color="success">
                  Cite
                </Button>
              </Link>
              <Link to={item?.openAccessPdf?.url} target="_blank">
                <Button variant="contained" color="success">
                  Explore
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to={item.url} target="_blank">
                <Button variant="contained" color="success">
                  Get Content
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Result;
