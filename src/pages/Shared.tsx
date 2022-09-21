import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import guage from "../image/guage.png";
import { useParams, useNavigate } from "react-router-dom";
function Shared() {
  const navigate = useNavigate();
  const { name, college_percentage, feedback } = useParams();
  const [resultPercentage, setResultPercentage] = useState<number>(0);
  setTimeout(function () {
    college_percentage && setResultPercentage(Number(college_percentage));
  }, 1000);
  useEffect(() => {
    shareKakao();
  }, []);

  const shareKakao = () => {
    let link = `https://www.copacabana.co.kr/shared/${name}/${college_percentage}/${feedback}`;
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

  return (
    <div className="App">
      <div className="outer">
        <div className="inner">
          <div className="header">
            <h1>셀티</h1>
            <span>수시 합격예측</span>
          </div>

          <div className="result">
            <div className="indicator">
              <img src={guage} />

              <div
                id="needle1"
                style={{
                  rotate: `${((resultPercentage - 50) * 9) / 5}deg`,
                  transitionDuration: "1.5s",
                }}
              />
            </div>
            <div className="result-text">
              <span>{name}님의 합격가능성은</span>
              <span>{resultPercentage.toFixed(2)}% 입니다</span>
              <span>{feedback}</span>
            </div>
            <div>
              <Button
                onClick={() => {
                  navigate("/");
                }}
              >
                다시하기
              </Button>
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
        </div>
      </div>
    </div>
  );
}

export default Shared;
