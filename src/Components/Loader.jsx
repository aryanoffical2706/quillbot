import React from "react";

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white rounded-full border-t-2 border-r-2 border-black h-10 w-10 animate-spin" />
    </div>
  );
};

export default Loader;
