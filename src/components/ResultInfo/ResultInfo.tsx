import React, { useState } from "react";
import guage from "../../image/guage.png";
import "./ResultInfo.scss";

interface Props {
  name: string;
  collegePercentage: number;
  feedback: string;
}

function ResultInfo({ name, collegePercentage, feedback }: Props) {
  const [resultPercentage, setResultPercentage] = useState<number>(0);
  setTimeout(function () {
    collegePercentage && setResultPercentage(collegePercentage);
  }, 1000);

  return (
    <>
      <div className="indicator">
        <img src={guage} alt="collegePercentage" />
        <div
          className="needle"
          style={{
            rotate: `${((resultPercentage - 50) * 9) / 5}deg`,
            transitionDuration: "1.5s",
          }}
        />
      </div>
      <div className="resultText">
        <span>{name}님의 합격가능성은</span>
        <span>{resultPercentage.toFixed(2)}% 입니다</span>
        <span>{feedback}</span>
      </div>
    </>
  );
}

export default ResultInfo;
