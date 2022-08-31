import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Card, Row, Button, Col } from "react-bootstrap";
import React, { useContext } from "react";
import { UserStateContext } from "../../App";
import LikeButton from "../UI/LikeButton";
import { useTheme } from "../darkmode/themeProvider";
import "../../../src/styles/index.css";
function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const ThemeMode = useTheme();
  const theme = ThemeMode[0];
  const id = userState?.user?.id;
  let userstr = "";
  console.log(isNetwork, "net??");
  function recentlyView() {
    let origin = localStorage.getItem("recentlyView1");
    if (!origin) {
      userstr = JSON.stringify([{ name: user?.name, id: user?.id }]);
    } else {
      origin = JSON.parse(origin);
      if (origin.length >= 5) {
        origin.shift();
      }
      userstr = JSON.stringify([...origin, { name: user?.name, id: user?.id }]);
    }
    navigate(`/users/${user.id}`);
    localStorage.setItem("recentlyView1", userstr);
  }

  const str = user?.id ? user.id : id;
  const regex = /[^0-9]/g;
  let result = "";
  if (str) {
    result = str.replace(regex, "");
  }
  const slicenum = result.slice(0, 3);
  const number = parseInt(slicenum);

  return (
    <Card
      className="mb-2 ms-3 mr-5"
      style={{ width: "18rem" }}
      id={theme == "light" ? "light" : "dark"}
    >
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src={`http://placekitten.com/${number}/${number}`}
            // src="http://placekitten.com/200/200" 고정으로 사용하고 싶다면 이렇게 하면 됌
            alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {isEditable && id === user.id && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link className="mt-3" href="#" onClick={recentlyView}>
            포트폴리오
          </Card.Link>
        )}
        <LikeButton user={user} />
      </Card.Body>
    </Card>
  );
}

export default UserCard;

const StyledDiv = styled.div`
  border-radius: 4px;
  border: ${(props) =>
    props.theme === "light" ? "1px solid #31302E" : "1px solid #bbb"};
  color: ${(props) => (props.theme === "light" ? "#31302E" : "#bbb")};
`;
