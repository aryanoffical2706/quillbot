import React from "react";
import Button from "@mui/material/Button";
import { AiOutlineSearch } from "react-icons/ai";

const Home = ({ setSearch }) => {
  return (
    <div>
      {" "}
      <div className="flex items-center justify-center h-screen">
        <Button
          variant="outlined"
          color="success"
          onClick={() => {
            setSearch(true);
          }}
          className="w-[80vw] md:w-[40rem]"
        >
          <div className="flex items-center justify-between gap-4 text-[4vw] sm:text-[3vw]">
            Search
            <AiOutlineSearch className="text-[6vw] sm:text-[5vw]" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Home;
