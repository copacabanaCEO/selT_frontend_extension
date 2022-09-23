import React, { Dispatch, SetStateAction, useEffect } from "react";
import Button from "@mui/material/Button";
import ResultInfo from "../components/ResultInfo";

interface Props {
  setShowResult: Dispatch<SetStateAction<boolean>>;
  result: { college_percentage: number; feedback: string };
  name: string;
}
function Result({ setShowResult, result, name }: Props) {
  const { college_percentage, feedback } = result;

  const shareKakao = () => {
    let link = `https://www.copacabana.co.kr/shared/${name}/${result.college_percentage}/${result.feedback}`;

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
  }, []);

  return (
    <div className="result">

      <ResultInfo
        name={name}
        college_percentage={Number(college_percentage)}
        feedback={feedback}
      />
      <div>
        <Button onClick={() => setShowResult(false)}> 다시하기 </Button>
        <Button onClick={shareKakao} id="kakao-link-btn">
          공유하기{" "}
          <img
            id="kakao-link-btn"
            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
            alt="카카오링크 보내기 버튼"
            style={{ width: "1.3rem", marginLeft: "5px" }}
          />
        </Button>
      </div>
    </div>
  );
}

export default Result;
