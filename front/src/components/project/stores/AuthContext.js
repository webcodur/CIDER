import React, { useState } from 'react';

const AuthContext = React.createContext({
  editIdList: [],
  setIdList: () => {},
  isAdding: false,
  setIsAdding: () => {},
});

export const AuthContextProvider = (props) => {
  const [editIdList, setEditIdList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAdding,
        setIsAdding,
        editIdList,
        setEditIdList,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
