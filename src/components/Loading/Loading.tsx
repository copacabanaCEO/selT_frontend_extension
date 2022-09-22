import React from "react";
import LoadingImg from "../../image/loading.gif";
import "./Loading.scss";

function Loading() {
  return (
    <div className="loading">
      <img className="loading_image" src={LoadingImg} alt="Loading" />
    </div>
  );
}

export default Loading;
