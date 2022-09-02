import React from 'react';
import { useTheme } from './darkmode/themeProvider';
import '../../src/styles/index.css';
import { useContext } from 'react';
import { UserStateContext } from '../App';
import { Button } from 'react-bootstrap';

const DisplayToggleComp = (props) => {
  const userState = useContext(UserStateContext);
  const 기존ID = userState?.user?.id;
  const 접속ID = props.portfolioOwnerId;
  const ThemeMode = useTheme();
  const theme = ThemeMode[0];

  const displayToggler = (e) => {
    e.preventDefault();
    const targetElement = document.querySelectorAll('.toggleTarget');

    if (기존ID === 접속ID) {
      // 감상 => 편집
      if (props.isEditable === false) {
        targetElement.forEach((ele) => {
          ele.classList.remove('display-none');
        });
        props.setIsEditable(true);
      }
      // 편집 => 감상
      if (props.isEditable === true) {
        targetElement.forEach((ele) => {
          ele.classList.add('display-none');
        });
        props.setIsEditable(false);
      }
    } else {
      alert('asdf');
    }
  };
  return (
    <Button
      style={{ border: 'none' }}
      onClick={displayToggler}
      variant="outline-info"
      size="sm"
    >
      {props.isEditable ? '🕶️ 감상 모드' : '✏️ 편집 모드'}
    </Button>
  );
};

export default DisplayToggleComp;
