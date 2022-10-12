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
    국U: string;
    국S: string;
    수U: string;
    수S: string;
    영U: string;
    영S: string;
    사U: string;
    사S: string;
    과U: string;
    과S: string;
  };
  testScore2: {
    국U: string;
    국S: string;
    수U: string;
    수S: string;
    영U: string;
    영S: string;
    사U: string;
    사S: string;
    과U: string;
    과S: string;
  };
  testScore3: {
    국U: string;
    국S: string;
    수U: string;
    수S: string;
    영U: string;
    영S: string;
    사U: string;
    사S: string;
    과U: string;
    과S: string;
  };
  testScore4: {
    국U: string;
    국S: string;
    수U: string;
    수S: string;
    영U: string;
    영S: string;
    사U: string;
    사S: string;
    과U: string;
    과S: string;
  };
  testScore5: {
    국U: string;
    국S: string;
    수U: string;
    수S: string;
    영U: string;
    영S: string;
    사U: string;
    사S: string;
    과U: string;
    과S: string;
  };
  testScore6: {
    국U: string;
    국S: string;
    수U: string;
    수S: string;
    영U: string;
    영S: string;
    사U: string;
    사S: string;
    과U: string;
    과S: string;
  };
  setTestScore1: Dispatch<
    SetStateAction<{
      국U: string;
      국S: string;
      수U: string;
      수S: string;
      영U: string;
      영S: string;
      사U: string;
      사S: string;
      과U: string;
      과S: string;
    }>
  >;
  setTestScore2: Dispatch<
    SetStateAction<{
      국U: string;
      국S: string;
      수U: string;
      수S: string;
      영U: string;
      영S: string;
      사U: string;
      사S: string;
      과U: string;
      과S: string;
    }>
  >;
  setTestScore3: Dispatch<
    SetStateAction<{
      국U: string;
      국S: string;
      수U: string;
      수S: string;
      영U: string;
      영S: string;
      사U: string;
      사S: string;
      과U: string;
      과S: string;
    }>
  >;
  setTestScore4: Dispatch<
    SetStateAction<{
      국U: string;
      국S: string;
      수U: string;
      수S: string;
      영U: string;
      영S: string;
      사U: string;
      사S: string;
      과U: string;
      과S: string;
    }>
  >;
  setTestScore5: Dispatch<
    SetStateAction<{
      국U: string;
      국S: string;
      수U: string;
      수S: string;
      영U: string;
      영S: string;
      사U: string;
      사S: string;
      과U: string;
      과S: string;
    }>
  >;
  setTestScore6: Dispatch<
    SetStateAction<{
      국U: string;
      국S: string;
      수U: string;
      수S: string;
      영U: string;
      영S: string;
      사U: string;
      사S: string;
      과U: string;
      과S: string;
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
