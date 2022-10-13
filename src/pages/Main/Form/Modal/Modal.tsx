import React, {
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import GradeInput from "./GradeInput/GradeInput";
import "./Modal.scss";
import SideBar from "./SideBar/SideBar";

interface Props {
  onClickToggleModal: () => void;
  testScore1: {
    국U: number;
    국S: number;
    수U: number;
    수S: number;
    영U: number;
    영S: number;
    사U: number;
    사S: number;
    과U: number;
    과S: number;
  };
  testScore2: {
    국U: number;
    국S: number;
    수U: number;
    수S: number;
    영U: number;
    영S: number;
    사U: number;
    사S: number;
    과U: number;
    과S: number;
  };
  testScore3: {
    국U: number;
    국S: number;
    수U: number;
    수S: number;
    영U: number;
    영S: number;
    사U: number;
    사S: number;
    과U: number;
    과S: number;
  };
  testScore4: {
    국U: number;
    국S: number;
    수U: number;
    수S: number;
    영U: number;
    영S: number;
    사U: number;
    사S: number;
    과U: number;
    과S: number;
  };
  testScore5: {
    국U: number;
    국S: number;
    수U: number;
    수S: number;
    영U: number;
    영S: number;
    사U: number;
    사S: number;
    과U: number;
    과S: number;
  };
  testScore6: {
    국U: number;
    국S: number;
    수U: number;
    수S: number;
    영U: number;
    영S: number;
    사U: number;
    사S: number;
    과U: number;
    과S: number;
  };
  setTestScore1: Dispatch<
    SetStateAction<{
      국U: number;
      국S: number;
      수U: number;
      수S: number;
      영U: number;
      영S: number;
      사U: number;
      사S: number;
      과U: number;
      과S: number;
    }>
  >;
  setTestScore2: Dispatch<
    SetStateAction<{
      국U: number;
      국S: number;
      수U: number;
      수S: number;
      영U: number;
      영S: number;
      사U: number;
      사S: number;
      과U: number;
      과S: number;
    }>
  >;
  setTestScore3: Dispatch<
    SetStateAction<{
      국U: number;
      국S: number;
      수U: number;
      수S: number;
      영U: number;
      영S: number;
      사U: number;
      사S: number;
      과U: number;
      과S: number;
    }>
  >;
  setTestScore4: Dispatch<
    SetStateAction<{
      국U: number;
      국S: number;
      수U: number;
      수S: number;
      영U: number;
      영S: number;
      사U: number;
      사S: number;
      과U: number;
      과S: number;
    }>
  >;
  setTestScore5: Dispatch<
    SetStateAction<{
      국U: number;
      국S: number;
      수U: number;
      수S: number;
      영U: number;
      영S: number;
      사U: number;
      사S: number;
      과U: number;
      과S: number;
    }>
  >;
  setTestScore6: Dispatch<
    SetStateAction<{
      국U: number;
      국S: number;
      수U: number;
      수S: number;
      영U: number;
      영S: number;
      사U: number;
      사S: number;
      과U: number;
      과S: number;
    }>
  >;
}

function Modal({
  onClickToggleModal,
  testScore1,
  setTestScore1,
  testScore2,
  setTestScore2,
  testScore3,
  setTestScore3,
  testScore4,
  setTestScore4,
  testScore5,
  setTestScore5,
  testScore6,
  setTestScore6,
}: PropsWithChildren<Props>) {
  const [click, setClick] = useState(1);

  return (
    <div className="modalContainer">
      <div className="dialogBox">
        <div className="dialogInner">
          <SideBar setClick={setClick} click={click} />
          <GradeInput
            click={click === 1}
            testScore={testScore1}
            setTestScore={setTestScore1}
          />
          <GradeInput
            click={click === 2}
            testScore={testScore2}
            setTestScore={setTestScore2}
          />
          <GradeInput
            click={click === 3}
            testScore={testScore3}
            setTestScore={setTestScore3}
          />
          <GradeInput
            click={click === 4}
            testScore={testScore4}
            setTestScore={setTestScore4}
          />
          <GradeInput
            click={click === 5}
            testScore={testScore5}
            setTestScore={setTestScore5}
          />
          <GradeInput
            click={click === 6}
            testScore={testScore6}
            setTestScore={setTestScore6}
          />
        </div>
        <div className="buttonWrap">
          <button className="avgSubmit">submit</button>
        </div>
      </div>
      <div
        className="backDrop"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </div>
  );
}

export default Modal;
