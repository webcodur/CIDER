import React, { useState, useEffect, useContext } from 'react';
import * as Api from '../../../api';

import AuthContext from '../stores/AuthContext';
import CardElement from '../CardElement';
import AddForm from './AddForm';
import AddButton from './AddButton';
import { Card } from 'react-bootstrap';

const CardFrame = ({ portfolioOwnerId, isEditable }) => {
  const context = useContext(AuthContext);
  const USER_ENDPOINT = 'users';
  const DATA_ENDPOINT = 'projects';
  const [data, setData] = useState([]);

  const getUserInfo = async (userEndpoint, portfolioOwnerId) => {
    const getUser = await Api.get(userEndpoint, portfolioOwnerId);
    const userInfo = { ...getUser.data };

    return userInfo;
  };

  const getFetchedData = async (dataEndpoint, userId) => {
    const getData = await Api.get(dataEndpoint, userId);
    const fetchedData = [...getData.data];

    return fetchedData;
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
  );
};

export default CardFrame;
