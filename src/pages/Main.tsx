import React from "react";
import { useState } from "react";
import Form from "./Form";
import Result from "./Result";

function Main() {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [result, setResult] = useState<{
    college_percentage: number;
    feedback: string;
  }>({ college_percentage: 97.18985698889139, feedback: "묻고 따블로 가" });
  return (
    <div className="App">
      <div className="outer">
        <div className="inner">
          <div className="header">
            <h1>셀티</h1>
            <span>수시 합격예측</span>
          </div>
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
