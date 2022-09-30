import React from "react";
import "./SubjectToggle.scss";

interface SubjectToggleProps {
  setIsSubject: React.Dispatch<React.SetStateAction<boolean>>;
  isSubject: boolean;
}

function SubjectToggle({ isSubject, setIsSubject }: SubjectToggleProps) {
  const handleSubject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubject(true);
  };

  const handleTotal = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("iswork?");
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
