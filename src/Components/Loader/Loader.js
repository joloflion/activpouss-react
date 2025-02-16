import React from "react";
import loader from "../../assests/loader.gif";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center text-center" style={{height:'100vh'}}>
      <Spin spinning />
    </div>
  );
};

export default Loader;
