import React from "react";
import { useState } from "react";
import Form from "./Form/Form";
import Result from "./Result/Result";
import "./Main.scss";

function Main() {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [result, setResult] = useState<{
    예측결과: number;
    진단결과: { college: string; college_percentage: number; major: string };
    피드백: string;
  }>({
    예측결과: 97.18985698889139,
    진단결과: {
      college: "가천대",
      college_percentage: 99.999999991,
      major: "약학과",
    },
    피드백: "묻고 따블로 가",
  });
  return (
    <div className="main">
      <div className="outer">
        <div className="inner">
          <header className="header">
            <h1 className="header_h1">셀티</h1>
            <span className="header_span">수시 합격예측</span>
          </header>
          {!showResult ? (
            <Form
              setShowResult={setShowResult}
              setResult={setResult}
              setName={setName}
            />
          ) : (
            <Result result={result} setShowResult={setShowResult} name={name} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
