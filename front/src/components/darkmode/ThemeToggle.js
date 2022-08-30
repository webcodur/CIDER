import styled from "styled-components";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { UserStateContext } from "../../App";
import { useNavigate } from "react-router-dom";
function ThemeToggle({ toggle, mode }) {
  const [watchs, setWatchs] = useState();
  const navigate = useNavigate();
  let origins = localStorage.getItem("recentlyView1");
  const userState = useContext(UserStateContext);
  let id = null;
  if (id) {
    id = userState.user.id;
  }

  const setWatchsFunc = useCallback(() => {
    setWatchs(JSON.parse(origins));
    console.log("callback");
  }, []);

  useEffect(() => {
    setWatchsFunc();
    setWatchs(JSON.parse(origins));
  }, [origins]);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          zindex: "999999",
          bottom: "40%",
          right: "3%",
          background: "white",
          width: "180px",
          height: "280px",

          border: `1px solid rgba(0,0,0,.125)`,
        }}
      >
        <div style={{ justifyContent: "center", display: "flex" }}>
          최근 본 포트폴리오
        </div>
        <div
          style={{
            marginLeft: "30%",
            marginTop: "16px",
            height: "65%",
            justifyContent: "center",
          }}
        >
          {watchs &&
            watchs.map((watch) => {
              return (
                <div
                  onClick={() => navigate(`/users/${watch.id}`)}
                  style={{ marginBottom: "10px" }}
                >
                  {watch.name}
                </div>
              );
            })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ToggleWrapper onClick={toggle} mode={mode}>
            {mode === "dark" ? "🌚" : "🌝"}
          </ToggleWrapper>
        </div>
      </div>
    </div>
  );
}
export default ThemeToggle;
const ToggleWrapper = styled.button`
  position: fixed;
  z-index: 999999;
  bottom: 4%;
  right: 3%;

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
console.log(ToggleWrapper);
