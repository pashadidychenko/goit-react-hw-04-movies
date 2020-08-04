import React from "react";
import Loader from "react-loader-spinner";

const LoaderSpiner = () => {
  return (
    <Loader type="Bars" color="#00BFFF" height={50} width={50} timeout={9000} />
  );
};

export default LoaderSpiner;
