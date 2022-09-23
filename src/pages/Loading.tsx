import React from "react";
import LoadingImg from "../image/loading.gif";

function Loading() {
  return (
    <div className="Loading">
      <img src={LoadingImg} alt="Loading" />
    </div>
  );
}

export default Loading;
