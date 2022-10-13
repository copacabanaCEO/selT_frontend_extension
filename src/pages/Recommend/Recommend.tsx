import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Recommend.scss";

interface RecommendList {
  college: string;
  major: string;
  college_percentage: number;
}

function Recommend() {
  const location = useLocation();
  const recommendList = location.state;
  const [sortValue, setSortValue] = useState(1);
  const navigate = useNavigate();

  const sortByUni = (a: RecommendList, b: RecommendList) => {
    return a.college < b.college ? -1 : a.college > b.college ? 1 : 0;
  };

  const sortByMajor = (a: RecommendList, b: RecommendList) => {
    return a.major < b.major ? -1 : a.major > b.major ? 1 : 0;
  };

  const sortByPercentage = (b: RecommendList, a: RecommendList) => {
    return a.college_percentage < b.college_percentage
      ? -1
      : a.college_percentage > b.college_percentage
      ? 1
      : 0;
  };

  return (
    <div className="recommend">
      <div className="recommendInner">
        <button className="goToMain" onClick={() => navigate("/main")}>
          {"< 돌아가기"}
        </button>
        <div className="recommendHeaderUnderLine">
          <span className="recommendHeader">추천리스트</span>
        </div>
        <div className="recommendFilter">
          <button
            className="recommendFilterButton"
            onClick={() => setSortValue(3)}
            style={{
              borderBottom: `${sortValue === 3 ? "3px solid #26a58a" : "none"}`,
              padding: `${
                sortValue === 3 ? "5px 5px 7px 5px" : "5px 5px 10px 5px"
              }`,
            }}
          >
            학교명
          </button>
          <button
            className="recommendFilterButton"
            onClick={() => setSortValue(2)}
            style={{
              borderBottom: `${sortValue === 2 ? "3px solid #26a58a" : "none"}`,
              padding: `${
                sortValue === 2 ? "5px 5px 7px 5px" : "5px 5px 10px 5px"
              }`,
            }}
          >
            학과명
          </button>
          <button
            className="recommendFilterButton"
            onClick={() => setSortValue(1)}
            style={{
              borderBottom: `${sortValue === 1 ? "3px solid #26a58a" : "none"}`,
              padding: `${
                sortValue === 1 ? "5px 5px 7px 5px" : "5px 5px 10px 5px"
              }`,
            }}
          >
            합격률
          </button>
        </div>
        <div className="recommendListWrap">
          {recommendList
            .sort(
              sortValue === 1
                ? sortByPercentage
                : sortValue === 2
                ? sortByMajor
                : sortByUni
            )
            .map(
              (
                { college, major, college_percentage }: RecommendList,
                index: number
              ) => {
                return (
                  <div className="recommendList" key={index}>
                    <div className="recommendListUni">{college}</div>
                    <div className="recommendListMajor">{major}</div>
                    <div className="recommendListPercentage">
                      <div
                        className="recommendListPercentageInner"
                        style={{
                          width: `${college_percentage.toFixed(2)}%`,
                        }}
                      />
                      <span className="recommendListPercentageText">
                        {college_percentage.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              }
            )}
        </div>
      </div>
    </div>
  );
}

export default Recommend;

const mockData = [
  { college: "가가대", major: "사사과", college_percentage: 92.123 },
  { college: "나나대", major: "마마과", college_percentage: 93.123 },
  { college: "다다대", major: "다다과", college_percentage: 94.123 },
  { college: "라라대", major: "가가과", college_percentage: 95.123 },
  { college: "마마대", major: "나나과", college_percentage: 96.123 },
  { college: "바바대", major: "라라과", college_percentage: 97.123 },
  { college: "사사대", major: "바바과", college_percentage: 98.123 },
  { college: "아아대", major: "아아과", college_percentage: 99.123 },
];
