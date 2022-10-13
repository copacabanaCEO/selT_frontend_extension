import React, { Dispatch, SetStateAction } from "react";
import "./GradeInput.scss";

interface Props {
  click: boolean;
  testScore: {
    국U: number;
    국S: number;
    수U: number;
    수S: number;
    영U: number;
    영S: number;
    사U: number;
    사S: number;
    과U: number;
    과S: number;
  };
  setTestScore: Dispatch<
    SetStateAction<{
      국U: number;
      국S: number;
      수U: number;
      수S: number;
      영U: number;
      영S: number;
      사U: number;
      사S: number;
      과U: number;
      과S: number;
    }>
  >;
}

function GradeInput({ click, testScore, setTestScore }: Props) {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setTestScore({ ...testScore, [`${name}`]: value });
  };

  return (
    <form
      className="gradeInput"
      style={{ display: `${click ? "flex" : "none"}` }}
    >
      <div className="avgInput" id="subject">
        <div className="avgInputInner" id="line"></div>
        <div className="avgInputInner">국어</div>
        <div className="avgInputInner">수학</div>
        <div className="avgInputInner">영어</div>
        <div className="avgInputInner">사회</div>
        <div className="avgInputInner">과학</div>
      </div>
      <div className="avgInput">
        <div className="avgInputInner" id="number">
          단위수
        </div>
        <div className="avgInputInner">
          <input
            className="numbersInput"
            type="number"
            name="국U"
            value={testScore.국U}
            onChange={handleInput}
          ></input>
        </div>
        <div className="avgInputInner">
          <input
            className="numbersInput"
            type="number"
            name="수U"
            value={testScore.수U}
            onChange={handleInput}
          ></input>
        </div>
        <div className="avgInputInner">
          <input
            className="numbersInput"
            type="number"
            name="영U"
            value={testScore.영U}
            onChange={handleInput}
          ></input>
        </div>
        <div className="avgInputInner">
          <input
            className="numbersInput"
            type="number"
            name="사U"
            value={testScore.사U}
            onChange={handleInput}
          ></input>
        </div>
        <div className="avgInputInner">
          <input
            className="numbersInput"
            type="number"
            name="과U"
            value={testScore.과U}
            onChange={handleInput}
          ></input>
        </div>
      </div>
      <div className="avgInput">
        <div className="avgInputInner" id="avgInputInnerConer">
          성적
        </div>
        <div className="avgInputInner">
          <input
            className="scoreInput"
            type="number"
            name="국S"
            value={testScore.국S}
            onChange={handleInput}
          ></input>
        </div>
        <div className="avgInputInner">
          <input
            className="scoreInput"
            type="number"
            name="수S"
            value={testScore.수S}
            onChange={handleInput}
          ></input>
        </div>
        <div className="avgInputInner">
          <input
            className="scoreInput"
            type="number"
            name="영S"
            value={testScore.영S}
            onChange={handleInput}
          ></input>
        </div>
        <div className="avgInputInner">
          <input
            className="scoreInput"
            type="number"
            name="사S"
            value={testScore.사S}
            onChange={handleInput}
          ></input>
        </div>
        <div className="avgInputInner">
          <input
            className="scoreInput"
            type="number"
            name="과S"
            value={testScore.과S}
            onChange={handleInput}
          ></input>
        </div>
      </div>
    </form>
  );
}

export default GradeInput;
