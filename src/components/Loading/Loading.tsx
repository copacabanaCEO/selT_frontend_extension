import React from "react";
import LoadingImg from "../../image/loading.gif";
import "./Loading.scss";

/**
 * 합격률 조회 함수를 호출한 뒤 API의 응답을 기다리는 사이 화면에 출력되는 컴포넌트입니다.
 */
function Loading() {
  return (
    <div className="loading">
      <img className="loadingImage" src={LoadingImg} alt="Loading" />
    </div>
  );
}

export default Loading;
