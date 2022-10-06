import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoToMain() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/main");
  }, [navigate]);
}
