import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 메인 페이지의 라우팅 경로가 "/main"으로 지정되어 있기때문에
 * 루트경로인 "/"으로 접근할시 "/main"으로 리다이렉팅 해주는 페이지입니다.
 */
export default function GoToMain() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/main");
  }, [navigate]);
}
