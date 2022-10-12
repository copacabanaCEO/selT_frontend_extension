import React, { Dispatch, SetStateAction } from "react";
import "./SideBar.scss";

interface Props {
  click: number;
  setClick: Dispatch<SetStateAction<number>>;
}

function Sidebar({ click, setClick }: Props) {
  return (
    <div className="sideBar">
      <button
        className="sideBarInner"
        id="firstInner"
        onClick={() => setClick(1)}
        style={{
          backgroundColor: `${click === 1 ? "white" : "#a0dacd"}`,
        }}
      >
        1 - 1
      </button>
      <button
        className="sideBarInner"
        onClick={() => setClick(2)}
        style={{ backgroundColor: `${click === 2 ? "white" : "#a0dacd"}` }}
      >
        1 - 2
      </button>
      <button
        className="sideBarInner"
        onClick={() => setClick(3)}
        style={{ backgroundColor: `${click === 3 ? "white" : "#a0dacd"}` }}
      >
        2 - 1
      </button>
      <button
        className="sideBarInner"
        onClick={() => setClick(4)}
        style={{ backgroundColor: `${click === 4 ? "white" : "#a0dacd"}` }}
      >
        2 - 2
      </button>
      <button
        className="sideBarInner"
        onClick={() => setClick(5)}
        style={{ backgroundColor: `${click === 5 ? "white" : "#a0dacd"}` }}
      >
        3 - 1
      </button>
      <button
        className="sideBarInner"
        onClick={() => setClick(6)}
        style={{ backgroundColor: `${click === 6 ? "white" : "#a0dacd"}` }}
      >
        3 - 2
      </button>
    </div>
  );
}

export default Sidebar;
