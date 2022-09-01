import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/index.css";
import { useTheme } from "../../components/darkmode/themeProvider";
import * as Api from "../../api";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import Anchor from "../UI/Anchor";
import LatestViews from "../UI/LatestViews";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const ThemeMode = useTheme();
  const theme = ThemeMode[0];

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }
    Api.get("userlist").then((res) => setUsers(res.data));
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
            {console.log(isEmpty, searchData?.length)}
            {!isEmpty ? (
              users.map((user) => (
                <>
                  <UserCard key={user.id} user={user} isNetwork />
                </>
              ))
            ) : searchData?.length === 0 ? (
              <div
                className="nodata"
                style={{
                  width: "1300px",
                }}
                id={theme == "light" ? "blight" : "bdark"}
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
        <Col md="2">
          <Anchor />
          <LatestViews />
        </Col>
      </Container>
    </div>
  );
}

export default Network;
