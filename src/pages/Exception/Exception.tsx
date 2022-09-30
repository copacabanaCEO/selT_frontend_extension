import React from "react";
import { useNavigate } from "react-router-dom";
import ExexceptionImage from "../../image/exceptionImage.png";
import "./Exception.scss";

function Exception() {
  const navigate = useNavigate();
  return (
    <div className="exception">
      <img src={ExexceptionImage} alt="exception" />
      <button className="goToMain" onClick={() => navigate("/main")}>
        돌아가기
      </button>
    </div>
  );
}

export default Exception;
