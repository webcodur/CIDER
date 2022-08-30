import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";
import { Container, Row, Col } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import SideBar from "../darkmode/SideBar";

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
    <div style={{ display: "inline-flex" }}>
      <SearchBar></SearchBar>
      <Container fluid>
        <Row
          xs="auto"
          className="jusify-content-center"
          // style={{ display: "flex", justifyContent: "center" }}
        >
          {users.map((user) => (
            <>
              <UserCard key={user.id} user={user} isNetwork />
            </>
          ))}

        </Row>
      </Container>
      <div style={{ width: "15%" }}></div>
    </div>
  );
}

export default Network;
