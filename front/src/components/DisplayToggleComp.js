import React from 'react';
import displayToggleButton from '../styles/displayToggleButton.css'

const DisplayToggleComp = () => {

  const displayToggler = (e) => {
    e.preventDefault();
    const firstTargetElement = document.querySelector('.toggleTarget');

    if (firstTargetElement.classList.contains('display-none')) {
      const targetElement = document.querySelectorAll('.toggleTarget');
      targetElement.forEach((ele) => {ele.classList.remove('display-none')});
      const editButton = document.querySelector('#editbutton');
      editButton.innerText = '✏️';
    } 
    
    else {
      const targetElement = document.querySelectorAll('.toggleTarget');
      targetElement.forEach((ele) => {ele.classList.add('display-none')});
      const editButton = document.querySelector('#editbutton');
      editButton.innerText = '👀';
    }
  };

  return (
    <>
    <button
      id="editbutton"
      className='displayToggleButtonStyle'
      onClick={displayToggler}
      style={{displayToggleButton}}
      >
      ✏️
      </button>
    </>
    
  )
}

export default DisplayToggleComp;