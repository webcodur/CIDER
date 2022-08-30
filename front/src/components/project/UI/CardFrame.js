import React, { useState, useEffect, useContext } from 'react';
import * as Api from '../../../api';

import AuthContext from '../stores/AuthContext';
import CardElement from '../CardElement';
import AddForm from './AddForm';
import AddButton from './AddButton';
import ErrorModal from './ErrorModal';
import { Card } from 'react-bootstrap';

const CardFrame = ({ portfolioOwnerId, isEditable }) => {
  const context = useContext(AuthContext);
  const USER_ENDPOINT = 'users';
  const DATA_ENDPOINT = 'project';
  const [data, setData] = useState([]);

  const getUserInfo = async (userEndpoint, portfolioOwnerId) => {
    try {
      const getUser = await Api.get(userEndpoint, portfolioOwnerId);
      const userInfo = { ...getUser.data };

      if (!userInfo.id) {
        throw new Error('유저 데이터에 문제가 있습니다.');
      }

      return userInfo;
    } catch (err) {
      context.setModalText(err.message);
    }
  };

  const getFetchedData = async (dataEndpoint, userId) => {
    try {
      const getData = await Api.get(dataEndpoint, userId);
      const fetchedData = [...getData.data];

      return fetchedData;
    } catch (err) {
      context.setModalText(err.message);

      if (err.message.includes('iterable')) {
        context.setModalText('프로젝트 데이터에 문제가 있습니다.');
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
      {context.modalText && <ErrorModal />}
      <Card className="mb-2 ms-3 mr-5">
        <Card.Body>
          <Card.Title>프로젝트</Card.Title>
          <CardElement
            DATA_ENDPOINT={DATA_ENDPOINT}
            isEditable={isEditable}
            data={data}
            callFetch={callFetch}
          />
          {isEditable && <AddButton />}
          {context.isAdding && (
            <AddForm callFetch={callFetch} DATA_ENDPOINT={DATA_ENDPOINT} />
          )}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default CardFrame;
