import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { UserStateContext } from "../../App";
function ThemeToggle({ toggle, mode }) {
  const [watchs, setWatchs] = useState();
  let origins = localStorage.getItem("recentlyView1");
  // origins = JSON.parse(origin);
  // setWatchs(JSON.parse(origins));
  // console.log(watchs);
  const userState = useContext(UserStateContext);
  let id = null;
  if (id) {
    id = userState.user.id;
  }

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    const setWatchsFunc = () => {
      setWatchs(JSON.parse(origins));
      console.log("ggggf", watchs, JSON.parse(origins));
    };
    setWatchsFunc();
  }, []);
  // console.log(watchs, JSON.parse(origins));

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
            marginTop: "20px",
            height: "65%",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {watchs ? watchs[1].name : ""}
          {/* {watchs.map((watch) => {
            <name watchName={watch.name} />;
            <div>{watch.name}</div>;
            {
              console.log(watch.name, "wwwwwwwwwwwwwwww");
            }
          })} */}
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
