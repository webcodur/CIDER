import React, { useState } from 'react';

const ErrorModalContext = React.createContext({
  modalText: '',
  setModalText: () => {},
});

export const ErrorModalContextProvider = (props) => {
  const [modalText, setModalText] = useState('');

  return (
    <ErrorModalContext.Provider
      value={{
        modalText,
        setModalText,
      }}
    >
      {props.children}
    </ErrorModalContext.Provider>
  );
};

export default ErrorModalContext;
