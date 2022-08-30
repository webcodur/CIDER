import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <Container fluid>
      <Row xs="auto" className="jusify-content-center">
        {users.map((user) => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
    </Container>
  );
}

export default Network;
