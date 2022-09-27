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
          background: isSubject ? "white" : "green",
          border: `1px solid ${isSubject ? "white" : "green"}`,
          color: isSubject ? "green" : "white",
          transitionDuration: "0.1s",
        }}
      >
        종합
      </button>
      <button
        className="admissionToggle"
        onClick={handleSubject}
        style={{
          background: isSubject ? "green" : "white",
          border: `1px solid ${isSubject ? "green" : "white"}`,
          color: isSubject ? "white" : "green",
          transitionDuration: "0.1s",
        }}
      >
        교과
      </button>
    </div>
  );
}

export default SubjectToggle;
