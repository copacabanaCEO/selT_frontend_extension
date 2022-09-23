import React from "react";
import { useParams } from "react-router-dom";
import ResultInfo from "../components/ResultInfo";

interface ParamTypes {
  name: string;
  college_percentage: number;
  feedback: string;
}

function Shared() {
  const { name, college_percentage, feedback } =
    useParams() as unknown as ParamTypes;

  return (
    <div className="App">
      <div className="outer">
        <div className="inner">
          <div className="header">
            <h1>셀티</h1>
            <span>수시 합격예측</span>
          </div>
          <div className="result">
            <ResultInfo
              name={name}
              college_percentage={Number(college_percentage)}
              feedback={feedback}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shared;
