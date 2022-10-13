import React, { useState } from "react";
import guage from "../../image/guage.png";
import "./ResultInfo.scss";

/**
 * 부모 컴포넌트에서 Props로 전달받은 State입니다
 * name은 합격률을 조회한 학생의 이름입니다.
 * collegePercentage는 희망대학, 희망학과의 합격률입니다.
 * feedback은 해당 합격률을 기준으로 서버에서 전달해주는 첨언문구입니다.
 */
interface Props {
  name: string;
  collegePercentage: number;
  feedback: string;
}

function ResultInfo({ collegePercentage, feedback, name }: Props) {
  /**
   * resultPercentage는 페이지 내의 합격률 게이지 rotate제어하는 State입니다.
   * 초기값 0에서 setTimeout을 통해서 Props의 collegePercentage를 할당받고 transition을 연출합니다.
   */
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
