import React from "react";
import { useParams } from "react-router-dom";
import ResultInfo from "../ResultInfo/ResultInfo";
import "./Shared.scss";

/**
 * useParams로 넘겨받은 변수입니다.
 * 각 값들은 결과페이지의 공유하기 버튼을 통해 생성된 링크의 쿼리스트링에서 도출됩니다.
 * name은 합격률을 조회한 학생의 이름입니다.
 * collegePercentage는 희망대학, 희망학과의 합격률입니다.
 * feedback은 해당 합격률을 기준으로 서버에서 전달해주는 첨언문구입니다.
 */
interface ParamTypes {
  name: string;
  collegePercentage: number;
  feedback: string;
}

function Shared() {
  const { name, collegePercentage, feedback } =
    useParams() as unknown as ParamTypes;

  return (
    <div className="shared">
      <div className="outer">
        <div className="inner">
          <div className="header">
            <h1 className="headerH1">셀티</h1>
            <span className="headerSpan">수시 합격예측</span>
          </div>
          <div className="result">
            <ResultInfo
              name={name}
              collegePercentage={Number(collegePercentage)}
              feedback={feedback}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shared;
