import React from "react";
import { useNavigate } from "react-router-dom";
import ExceptionImage from "../../image/exceptionImage.png";
import "./Exception.scss";

/**
 * 서버와 통신중 States 코드 400이상을 응답받은 경우에 이동되는 페이지입니다.
 */
function Exception() {
  const navigate = useNavigate();
  return (
    <div className="exception">
      <img src={ExceptionImage} alt="exception" />
      <button className="goToMain" onClick={() => navigate("/main")}>
        돌아가기
      </button>
    </div>
  );
}

export default Exception;
