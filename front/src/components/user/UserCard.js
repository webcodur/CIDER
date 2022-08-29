import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { UserStateContext } from "../../App";
function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const [saveUser, setSaveUser] = useState();
  let [watchItem, setWatch] = useState([]);
  let watch = [];
  let suser = [];
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const id = userState.user.id;
  let userstr = "";

  function recentlyView() {
    let origin = localStorage.getItem("recentlyView1");
    navigate(`/users/${user.id}`);
    userstr = JSON.stringify({ name: user?.name, id: user?.id });
    localStorage.setItem(
      "recentlyView1",
      origin ? [origin, userstr] : [userstr]
    );
  }

  useEffect(() => {
    watch = localStorage.getItem("recentlyView1");
    if (watch == null) {
      watch = [];
    } else {
      watch = JSON.stringify(watch);
    }
    // user = JSON.parse(user);
    if (user && Array.isArray(user)) {
      // if (user && Array.isArray(user)) {
      userstr = JSON.stringify({ name: user.name, id: user.id });
      // watch.push(user.id, user.name);
    }
    console.log(typeof user);
    if (watch.length <= 3) {
      watch = new Set(watch);
      watch = [...watch];
    }

    setWatch(watch);
  }, []);
  const str = user?.id ? user.id : id;
  const regex = /[^0-9]/g;
  const result = str.replace(regex, "");
  const slicenum = result.slice(0, 3);
  const number = parseInt(slicenum);

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
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

        {isEditable && (
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
      </Card.Body>
    </Card>
  );
}

export default UserCard;
