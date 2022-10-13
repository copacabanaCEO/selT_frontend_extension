import React from "react";
import { useState } from "react";
import Form from "./Form/Form";
import Result from "./Result/Result";
import "./Main.scss";
import Logo from "../../image/seltiLogo.png";

/**
 * 결과 페이지와 정보 입력 페이지를 선택적으로 렌더링하는 부모 컴포넌트 입니다.
 */
function Main() {
  /**
   * showResult는 자식 컴포넌트의 렌더링을 결정하는 State입니다.
   * result는 정보입력 페이지에서 formEvent를 통해서 호출된 API의 반환값이 저장되는 State입니다.
   */
  const [showResult, setShowResult] = useState<boolean>(false);
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
              result={result}
            />
          ) : (
            <Result result={result} setShowResult={setShowResult} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
