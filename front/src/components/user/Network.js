import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStateContext } from '../../App';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/index.css';
import * as Api from '../../api';
import UserCard from './UserCard';
import SearchBar from './SearchBar';
import Anchor from '../UI/Anchor';

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!userState.user) {
      navigate('/login');
      return;
    }
    Api.get('userlist').then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <div>
      <SearchBar
        setSearchData={setSearchData}
        setIsEmpty={setIsEmpty}
      ></SearchBar>
      <Container fluid>
        <Col md="10">
          <Row xs="auto" className="jusify-content-center">
            {searchData?.length === 0 && !isEmpty ? (
              users.map((user) => (
                <>
                  <UserCard key={user.id} user={user} isNetwork />
                </>
              ))
            ) : searchData?.length === 0 ? (
              <div
                className="nodata"
                style={{
                  width: '1300px',
                }}
              >
                검색 결과가 없습니다
              </div>
            ) : (
              searchData.map((user) => (
                <>
                  <UserCard key={user.id} user={user} isNetwork />
                </>
              ))
            )}
          </Row>
        </Col>
        <Anchor />
      </Container>
      <div style={{ width: '15%' }}></div>
    </div>
  );
}

export default Network;
