import React from "react";
import { useParams } from "react-router-dom";
import ResultInfo from "../ResultInfo/ResultInfo";
import "./Shared.scss";

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
