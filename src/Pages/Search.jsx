import React from "react";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import SearchArea from "./SearchArea";
import { FaRobot } from "react-icons/fa";
import axios from "axios";
import Loader from "./../Components/Loader";

const Search = ({
  setSearch,
  setSearched,
  setApiResponse,
  data,
  setData,
  loading,
  setLoading,
}) => {
  const handleTextChange = (event) => {
    setData({
      ...data,
      search: event.target.value,
    });
  };

  const handleAcademicToggle = () => {
    setData({
      ...data,
      academic: !data.academic,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const dat = JSON.stringify({
        keyword: data.search,
        limit: "20",
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.gyanibooks.com/search_publication/",
        headers: {
          "Content-Type": "application/json",
        },
        data: dat,
      };

      const response = await axios.request(config);
      setApiResponse(response?.data?.data);
      // console.log(response?.data?.data);
      setSearched(true);
    } catch (error) {
      console.log(error);
      setApiResponse(null);
    }
    setLoading(false);
  };
  return (
    <SearchArea setSearch={setSearch}>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-[90vh] flex flex-col gap-2 md:gap-6 items-center justify-center">
          <div className="flex items-center gap-2">
            <FaRobot color="gray" className="text-[20vw] sm:text-6xl" />
            <p className="text-xl md:text-4xl text-gray-400 font-light">
              QuillBot
            </p>
            <p className="text-xl md:text-4xl text-gray-400 font-medium">
              Search
            </p>
          </div>
          <div className=" text-4xl relative">
            <TextField
              color="success"
              id="outlined-basic"
              label="Search"
              variant="outlined"
              className="w-[90vw]"
              value={data.search}
              onChange={handleTextChange}
            />
            <div className="inline absolute right-4 top-1">
              <FormControlLabel
                value="start"
                control={<Switch color="success" />}
                label="Academic"
                labelPlacement="start"
                className="text-gray-400"
                onChange={handleAcademicToggle}
              />
            </div>
            <div className="flex items-center justify-center mt-10">
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={handleSubmit}
              >
                Search the Web
              </Button>
            </div>
          </div>
        </div>
      )}
    </SearchArea>
  );
};

export default Search;
