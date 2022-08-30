import React from "react";
import displayToggleButton from "../styles/displayToggleButton.css";
import imgEye from "../img/eye.png";
import imgPencil from "../img/pencil.png";
import { useContext } from "react";
import { UserStateContext } from "../App";

const DisplayToggleComp = (props) => {
  const userState = useContext(UserStateContext);
  const 기존ID = userState?.user?.id;
  const 접속ID = props.portfolioOwnerId;

  const displayToggler = (e) => {
    e.preventDefault();
    const targetElement = document.querySelectorAll(".toggleTarget");

    if (기존ID === 접속ID) {
      // 감상 => 편집
      if (props.isEditable === false) {
        targetElement.forEach((ele) => {
          ele.classList.remove("display-none");
        });
        props.setIsEditable(true);
      }
      // 편집 => 감상
      if (props.isEditable === true) {
        targetElement.forEach((ele) => {
          ele.classList.add("display-none");
        });
        props.setIsEditable(false);
      }
    } else {
      alert("asdf");
    }
  };

  return (
    <>
      <div
        id="editButton"
        className="displayToggleButtonStyle"
        style={{ displayToggleButton }}
      >
        {props.isEditable ? (
          <img
            id="pencil"
            alt="pencil"
            width="50px"
            src={imgPencil}
            onClick={displayToggler}
          ></img>
        ) : (
          <img
            id="eye"
            alt="eye"
            width="50px"
            src={imgEye}
            onClick={displayToggler}
          ></img>
        )}
      </div>
    </>
  );
};

export default DisplayToggleComp;
