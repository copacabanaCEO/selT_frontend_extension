import React from "react";
import "./SubjectToggle.scss";

/**
 * 부모 컴포넌트에서 Props로 전달받은 State입니다.
 * isSubject는 학생의 합격률 조회 종목을 교과인지 종합인지 판단하는 기준이 되는 State 입니다.
 * setIsSubject는 isSubject를 제어하는 setter 입니다.
 */
interface SubjectToggleProps {
  setIsSubject: React.Dispatch<React.SetStateAction<boolean>>;
  isSubject: boolean;
}

function SubjectToggle({ isSubject, setIsSubject }: SubjectToggleProps) {
  /**
   * 학생의 합격률 조회 종목을 교과로 설정하는 함수입니다.
   * onClick 이벤트를 통해서 isSubject State를 true로 설정합니다.
   */
  const handleSubject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubject(true);
  };

  /**
   * 학생의 합격률 조회 종목을 종합으로 설정하는 함수입니다.
   * onClick 이벤트를 통해서 isSubject State를 false로 설정합니다.
   */
  const handleTotal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubject(false);
  };

  return (
    <div className="admissionType">
      <button
        className="admissionToggle"
        onClick={handleTotal}
        style={{
          background: isSubject ? "white" : "#26A58A",
          border: `1px solid ${isSubject ? "white" : "#26A58A"}`,
          color: isSubject ? "#26A58A" : "white",
          transitionDuration: "0.1s",
        }}
      >
        종합
      </button>
      <button
        className="admissionToggle"
        onClick={handleSubject}
        style={{
          background: isSubject ? "#26A58A" : "white",
          border: `1px solid ${isSubject ? "#26A58A" : "white"}`,
          color: isSubject ? "white" : "#26A58A",
          transitionDuration: "0.1s",
        }}
      >
        교과
      </button>
    </div>
  );
}

export default SubjectToggle;
