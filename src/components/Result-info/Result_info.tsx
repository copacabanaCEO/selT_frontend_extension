import React, { useState } from "react";
import guage from "../../image/guage.png";
import "./Result_info.scss";

interface Props {
  name: string;
  college_percentage: number;
  feedback: string;
}

function ResultInfo({ name, college_percentage, feedback }: Props) {
  const [resultPercentage, setResultPercentage] = useState<number>(0);
  setTimeout(function () {
    college_percentage && setResultPercentage(college_percentage);
  }, 1000);

  return (
    <>
      <div className="indicator">
        <img src={guage} alt="college_percentage" />
        <div
          className="needle"
          style={{
            rotate: `${((resultPercentage - 50) * 9) / 5}deg`,
            transitionDuration: "1.5s",
          }}
        />
      </div>
      <div className="result_text">
        <span>{name}님의 합격가능성은</span>
        <span>{resultPercentage.toFixed(2)}% 입니다</span>
        <span>{feedback}</span>
      </div>
    </>
  );
}

export default ResultInfo;
