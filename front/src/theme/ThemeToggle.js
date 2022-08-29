import styled from "styled-components";
import React, { useState, useContext } from "react";
import { UserStateContext } from "../App";
function ThemeToggle({ toggle, mode }) {
  let [watchItem, setWatch] = useState([]);
  let origin = localStorage.getItem("recentlyView1");
  // origin = JSON.parse(origin);
  // setWatch(origin);
  const userState = useContext(UserStateContext);
  const id = null;
  if (id) {
    id = userState.user.id;
  }
  console.log(id, "idd");
  console.log(origin, "origin");

  return (
    <div
      style={{
        position: "fixed",
        zindex: "999999",
        bottom: "40%",
        right: "3%",
        background: "white",
        width: "180px",
        height: "280px",
        display: "flex",
        justifyContent: "center",
        alignItems: "end",
        border: `1px solid rgba(0,0,0,.125)`,
      }}
    >
      <ToggleWrapper onClick={toggle} mode={mode}>
        {mode === "dark" ? "🌚" : "🌝"}
      </ToggleWrapper>
    </div>
  );
}
export default ThemeToggle;
const ToggleWrapper = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  border: ${(props) => props.theme.borderColor};
  font-size: 20px;
  margin-bottom: 10px;
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
