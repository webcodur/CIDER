import React, { useState, useContext, useEffect, useCallback } from "react";
import { UserStateContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "../../../src/styles/index.css";
import { useTheme } from "../darkmode/themeProvider";

const LatestViews = () => {
  const [watchs, setWatchs] = useState();
  const navigate = useNavigate();
  const ThemeMode = useTheme();
  const theme = ThemeMode[0];
  let origins = localStorage.getItem("recentlyView1");
  const userState = useContext(UserStateContext);
  let id = null;

  if (id) {
    id = userState.user.id;
  }

  const setWatchsFunc = useCallback(() => {
    setWatchs(JSON.parse(origins));
  }, []);

  useEffect(() => {
    setWatchsFunc();
    setWatchs(JSON.parse(origins));
  }, [origins]);
  console.log(theme);
  return (
    <div
      className={
        theme == "light" ? "sideBox hide light " : "sideBox hide dark "
      }
    >
      <span className="mb-4" style={{ fontWeight: "bold" }}>
        최근 본 포트폴리오
      </span>
      <ul
        className="mt-2"
        style={{
          listStyleType: "circle",
          textAlign: "left",
          display: "inline-block",
        }}
      >
        {watchs &&
          watchs.map((watch, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  navigate(`/users/${watch.id}`, { state: watch.id });
                }}
                className="cursor_test"
              >
                {watch.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default LatestViews;
