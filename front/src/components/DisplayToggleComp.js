import React from "react";
import displayToggleButton from "../styles/displayToggleButton.css";
import styled from "styled-components";
import imgEye from "../img/eye.png";
import imgPencil from "../img/pencil.png";
import imgEyeNegative from "../img/eye_negative.png";
import imgPencilNegative from "../img/pencil_negative.png";
import { useTheme } from "./darkmode/themeProvider";
import "../../src/styles/index.css";
import { useContext } from "react";
import { UserStateContext } from "../App";

const DisplayToggleComp = (props) => {
  const userState = useContext(UserStateContext);
  const 기존ID = userState?.user?.id;
  const 접속ID = props.portfolioOwnerId;
  const ThemeMode = useTheme();
  const theme = ThemeMode[0];

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
      <ToggleWrapper
        onClick={displayToggler}
        id="editButton"
        className="displayToggleButtonStyle"
      >
        {props.isEditable ? (
          <img
            id="pencil"
            alt="pencil"
            width="30px"
            src={theme == "light" ? imgPencil : imgPencilNegative}
            // src={imgPencilNegative}
            onClick={displayToggler}
          ></img>
        ) : (
          <img
            id="eye"
            alt="eye"
            width="30px"
            src={theme == "light" ? imgEye : imgEyeNegative}
            onClick={displayToggler}
          ></img>
        )}
      </ToggleWrapper>
      {/* <div
        id="editButton"
        className="displayToggleButtonStyle"
        style={{ displayToggleButton }}
      >
        {props.isEditable ? (
          <img
            id="pencil"
            alt="pencil"
            width="30px"
            src={theme == "light" ? imgPencil : imgPencilNegative}
            // src={imgPencilNegative}
            onClick={displayToggler}
          ></img>
        ) : (
          <img
            id="eye"
            alt="eye"
            width="30px"
            src={theme == "light" ? imgEye : imgEyeNegative}
            onClick={displayToggler}
          ></img>
        )}
      </div> */}
    </>
  );
};

export default DisplayToggleComp;

const ToggleWrapper = styled.button`
  position: fixed;
  z-index: 999999;
  bottom: 4%;
  right: 9.5%;

  background-color: ${(props) => props.theme.bgColor};
  border: ${(props) => props.theme.borderColor};
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  box-shadow: ${(props) =>
    props.mode === "dark"
      ? "0px 5px 10px rgba(40, 40, 40, 1), 0px 2px 4px rgba(40, 40, 40, 1)"
      : "0 5px 10px rgba(100, 100, 100, 0.15), 0 2px 4px rgba(100, 100, 100, 0.15)"};
`;
