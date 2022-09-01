import styled from 'styled-components';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { UserStateContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import '../../../src/styles/index.css';
import { useTheme } from '../darkmode/themeProvider';
import { Row, Col } from 'react-bootstrap';

const LatestViews = () => {
  const [watchs, setWatchs] = useState();
  const navigate = useNavigate();
  const ThemeMode = useTheme();
  const theme = ThemeMode[0];
  let origins = localStorage.getItem('recentlyView1');
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

  return (
    <ToggleBoxWrapper id={theme == 'light' ? 'light' : 'dark'}>
      <span className="mb-4" style={{ fontWeight: 'bold' }}>
        최근 본 포트폴리오
      </span>
      <ul
        className="mt-2"
        style={{
          listStyleType: 'circle',
          textAlign: 'left',
          display: 'inline-block',
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
    </ToggleBoxWrapper>
  );
};

const ToggleBoxWrapper = styled.button`
  position: fixed;
  z-index: 999999;
  bottom: 40%;
  right: 4.5%;

  background-color: ${(props) => props.theme.bgColor};
  border: ${(props) => props.theme.borderColor};

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 280px;
  border-radius: 30px;

  border: 1px solid rgba(0, 0, 0, 0.125);

  box-shadow: ${(props) =>
    props.mode === 'dark'
      ? '0px 5px 10px rgba(40, 40, 40, 1), 0px 2px 4px rgba(40, 40, 40, 1)'
      : '0 5px 10px rgba(100, 100, 100, 0.01), 0 2px 4px rgba(100, 100, 100, 0.05)'};
`;

export default LatestViews;
