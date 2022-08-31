import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import styles from "../../styles/anime.css";
import styled from "styled-components";
import "../../../src/styles/index.css";
import { useTheme } from "../darkmode/themeProvider";

function UserEditForm({ user, setIsEditing, setUser }) {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [description, setDescription] = useState(user?.description);
  const [isEmpty, setIsEmpty] = useState(true);
  const ThemeMode = useTheme();
  const theme = ThemeMode[0];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || description === "") {
      setIsEmpty(false);
      return;
    } else {
      setIsEmpty(true);
    }
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
    });
    const updatedUser = res.data;
    setUser(updatedUser);
    setIsEditing(false);
  };

  const onImgChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
  };

  return (
    <Card className="mb-2" id={theme == "light" ? "light" : "dark"}>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {!isEmpty && (
            <div className="text-danger text-center" style={{ styles }}>
              <span id="anime">빈 값이 있습니다.</span>
            </div>
          )}
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              disabled={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription" className="mb-3">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="userEditProfile">
            <Form.Control
              type="file"
              placeholder="선택된 파일 없음"
              id="formFile"
              // value={}
              onChange={onImgChange}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
