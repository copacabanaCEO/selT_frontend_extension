import React, { Dispatch, SetStateAction, useEffect } from "react";
import Button from "@mui/material/Button";
import ResultInfo from "../../../components/ResultInfo/ResultInfo";
import "./Result.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  setShowResult: Dispatch<SetStateAction<boolean>>;
  result: {
    예측결과: number;
    진단결과: { college: string; college_percentage: number; major: string };
    피드백: string;
  };
}
function Result({ setShowResult, result }: Props) {
  const { 예측결과, 피드백, 진단결과 } = result;
  const navigate = useNavigate();

  const shareKakao = () => {
    let link = `https://www.copacabana.co.kr/shared/${예측결과}/${피드백}`;

    window.Kakao.Link.createDefaultButton({
      container: "#kakao-link-btn",
      objectType: "feed",
      content: {
        title: "셀티_입시예측서비스",
        description: "#수능 #입시 #내신 #나는몇점?",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/fileupload-909fd.appspot.com/o/Capture.JPG?alt=media&token=7880752b-3380-41bb-861d-3322cd0bb4a1",
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            webUrl: link,
          },
        },
        {
          title: "앱으로 보기",
          link: {
            mobileWebUrl: link,
          },
        },
      ],
    });
  };

  useEffect(() => {
    shareKakao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="result">
      <ResultInfo
        name={"뚱이"}
        collegePercentage={예측결과}
        feedback={피드백}
      />
      <div className="resultButtonWrap">
        <Button className="resultButton" onClick={() => setShowResult(false)}>
          {" "}
          다시하기{" "}
        </Button>
        <Button
          id="kakao-link-btn"
          className="resultButton"
          onClick={shareKakao}
        >
          공유하기{" "}
          <img
            id="kakao-link-btn"
            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
            alt="카카오링크 보내기 버튼"
            style={{ width: "1.3rem", marginLeft: "5px" }}
          />
        </Button>
        <button
          className="resultButton"
          onClick={() => navigate("/recommend", { state: 진단결과 })}
        >
          추천 학교 {<br />} 학과 보러가기
        </button>
      </div>
    </div>
  );
}

export default Result;
