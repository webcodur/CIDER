import React, { useState, useEffect, useContext } from 'react';
import * as Api from '../../../api';

import AuthContext from '../stores/AuthContext';
import ErrorModalContext from '../../stores/ErrorModalContext';

import CardElement from '../CardElement';
import AddForm from './AddForm';
import AddButton from './AddButton';
import { Card } from 'react-bootstrap';
import { useTheme } from '../../darkmode/themeProvider';
import '../../../../src/styles/index.css';

const CardFrame = ({ portfolioOwnerId, isEditable }) => {
  const context = useContext(AuthContext);
  const errorModalContext = useContext(ErrorModalContext);
  const USER_ENDPOINT = 'users';
  const DATA_ENDPOINT = 'projects';
  const ThemeMode = useTheme();
  const theme = ThemeMode[0];
  const [data, setData] = useState([]);

  const getUserInfo = async (userEndpoint, portfolioOwnerId) => {
    try {
      const getUser = await Api.get(userEndpoint, portfolioOwnerId);
      const userInfo = { ...getUser.data };

      if (!userInfo.id) {
        throw new Error('프로젝트 유저 데이터에 문제가 발생했습니다.');
      }

      return userInfo;
    } catch (err) {
      errorModalContext.setModalText(
        `${err.message} // 프로젝트 유저 데이터를 불러오는 과정에서 문제가 발생했습니다.`
      );
    }
  };

  const getFetchedData = async (dataEndpoint, userId) => {
    try {
      const getData = await Api.get(dataEndpoint, userId);
      const fetchedData = [...getData.data];

      return fetchedData;
    } catch (err) {
      errorModalContext.setModalText(
        `${err.message} // 프로젝트 데이터를 불러오는 과정에서 문제가 발생했습니다.`
      );

      if (err.message.includes('iterable')) {
        errorModalContext.setModalText(
          `${err.message} // 프로젝트 데이터에 문제가 발생했습니다.`
        );
      }

      const fetchedData = [];
      return fetchedData;
    }
  };

  const callFetch = async () => {
    const userInfo = await getUserInfo(USER_ENDPOINT, portfolioOwnerId);
    const fetchedData = await getFetchedData(DATA_ENDPOINT, userInfo.id);

    setData(fetchedData);
  };

  useEffect(() => {
    callFetch();
  }, []);

  return (
    <React.Fragment>
      <Card className="mb-2 ms-3 mr-5" id={theme == 'light' ? 'light' : 'dark'}>
        <Card.Body>
          <Card.Title>프로젝트</Card.Title>
          <CardElement
            isEditable={isEditable}
            data={data}
            callFetch={callFetch}
          />
          {isEditable && <AddButton />}
          {context.isAdding && <AddForm callFetch={callFetch} />}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default CardFrame;
