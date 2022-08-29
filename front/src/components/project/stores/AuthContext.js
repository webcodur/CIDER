import React, { useState } from 'react';

const AuthContext = React.createContext({
  editIdList: [],
  setIdList: () => {},
  isAdding: false,
  setIsAdding: () => {},
  modalText: '',
  setModalText: () => {},
});

export const AuthContextProvider = (props) => {
  const [editIdList, setEditIdList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [modalText, setModalText] = useState('');

  return (
    <AuthContext.Provider
      value={{
        isAdding,
        setIsAdding,
        editIdList,
        setEditIdList,
        modalText,
        setModalText,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
