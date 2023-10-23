import React from "react";
import SearchArea from "./SearchArea";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { IoIosArrowBack } from "react-icons/io";
import Result from "../Components/Result";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Button from "@mui/material/Button";
import axios from "axios";
import Loader from "./../Components/Loader";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Searched = ({
  setSearch,
  search,
  setSearched,
  setApiResponse,
  apiResponse,
  data,
  setData,
  loading,
  setLoading,
}) => {
  const handleTextChange = (event) => {
    // Handle changes in the text field and update the data state
    setData({
      ...data,
      search: event.target.value,
    });
  };

  const handleAcademicToggle = () => {
    // Handle academic toggle switch change and update the data state
    setData({
      ...data,
      academic: !data.academic,
    });
  };

  const handleChange = (event) => {
    // Handle changes in the Select component and update the data state with the selected value
    setData({
      ...data,
      select: event.target.value,
    });
  };

  const handleButtonClick = async () => {
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
    <SearchArea setSearch={setSearch} search={search}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between items-center mx-10 my-5">
            <button
              className="flex items-center text-xl gap-2 hover:text-green-600 transition-all"
              onClick={() => setSearched(false)}
            >
              <IoIosArrowBack className="mt-1" />
              Back
            </button>
            <div className="flex items-center justify-center sm:flex-row flex-col">
              <div className="w-full sm:w-[8rem] ml-8">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Cite</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data?.select}
                    label="Cite"
                    onChange={handleChange}
                  >
                    <MenuItem value={"IEEE"}>IEEE</MenuItem>
                    <MenuItem value={"MLA 9"}>MLA 9</MenuItem>
                    <MenuItem value={"Harvard"}>Harvard</MenuItem>
                    <MenuItem value={"APA 7"}>APA 7</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <FormControlLabel
                value="start"
                control={
                  <Switch
                    color="success"
                    checked={data.academic}
                    onChange={handleAcademicToggle}
                  />
                }
                label="Academic"
                labelPlacement="start"
                className="text-gray-400"
              />
            </div>
          </div>
          <div className="w-full relative items-center flex gap-4 justify-center">
            <TextField
              color="success"
              id="outlined-basic"
              label="Search"
              variant="outlined"
              className="w-2/3"
              value={data.search}
              onChange={handleTextChange} // Handle text field change
            />
            <Button
              color="success"
              variant="contained"
              className="absolute right-[25vw] sm:right-[12vw] lg:right-[8vw] xl:right-[6vw] 2xl:right-[5vw]"
              onClick={handleButtonClick} // Handle button click
            >
              <BsFillArrowRightCircleFill className="text-base sm:text-3xl" />
            </Button>
          </div>
          <Result
            type={data?.academic ? "Academic" : "Non-Academic"}
            apiResponse={apiResponse}
            academic={data.academic}
          />
        </>
      )}
    </SearchArea>
  );
};

export default Searched;
