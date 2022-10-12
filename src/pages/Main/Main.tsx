import React from "react";
import { useState } from "react";
import Form from "./Form/Form";
import Result from "./Result/Result";
import "./Main.scss";
import Logo from "../../image/seltiLogo.png";

function Main() {
  const [showResult, setShowResult] = useState<boolean>(true);
  const [name, setName] = useState<string>("뚱이");
  const [result, setResult] = useState<{
    예측결과: number;
    진단결과: { college: string; college_percentage: number; major: string };
    피드백: string;
  }>({
    예측결과: 77.18985698889139,
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
            <img className="headerLogo" src={Logo} alt="logo" />
          </header>
          {!showResult ? (
            <Form
              setShowResult={setShowResult}
              setResult={setResult}
              setName={setName}
              result={result}
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
