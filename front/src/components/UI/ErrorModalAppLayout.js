import React, { useContext } from 'react';
import { UserStateContext } from '../../App';
import ErrorModal from './ErrorModal';
import ErrorModalContext from '../stores/ErrorModalContext';

const AppLayout = ({ children }) => {
  const errorModalContext = useContext(ErrorModalContext);
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;

  return (
    <>
      {isLogin && errorModalContext.modalText && <ErrorModal />}
      {children}
    </>
  );
};

export default AppLayout;
