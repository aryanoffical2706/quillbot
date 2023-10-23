import "./App.css";
import Home from "./Pages/Home";
import { useState } from "react";
import Search from "./Pages/Search";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Searched from "./Pages/Searched";

function App() {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [search, setSearch] = useState(false);
  const [data, setData] = useState({
    search: "", // Initialize the search input with the provided value
    academic: false,
    select: "",
  });
  const isOpenAccessTrue = apiResponse?.filter(
    (item) => item?.isOpenAccess === true
  );
  const isOpenAccessFalse = apiResponse?.filter(
    (item) => item?.isOpenAccess === false
  );
  return (
    <div className="h-auto">
      <Routes>
        <Route
          path="/"
          element={
            !search ? (
              <Home setSearch={setSearch} />
            ) : !searched ? (
              <Search
                setSearch={setSearch}
                setSearched={setSearched}
                setApiResponse={setApiResponse}
                data={data}
                setData={setData}
                loading={loading}
                setLoading={setLoading}
              />
            ) : (
              <Searched
                setSearch={setSearch}
                search={search}
                setSearched={setSearched}
                setApiResponse={setApiResponse}
                apiResponse={
                  apiResponse === null
                    ? []
                    : data?.academic === true
                    ? isOpenAccessTrue
                    : isOpenAccessFalse
                }
                data={data}
                setData={setData}
                loading={loading}
                setLoading={setLoading}
              />
            )
          }
        />
        {/* <Route
          path="/search"
          element={<Searched setSearch={setSearch} search={search} />}
        /> */}
      </Routes>
      {/* <Test /> */}
    </div>
  );
}

export default App;
