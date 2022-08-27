import React from 'react';

import { Col, Button, Form } from 'react-bootstrap';

const CheckButton = (props) => {
  return (
    <Form.Group className={`${props.className} mb-3`}>
      <Col>
        <Button
          variant="primary"
          className="me-3"
          onClick={() => props.submitHandler(props.project?.id)}
        >
          확인
        </Button>
        <Button variant="secondary" onClick={props.cancelHandler}>
          취소
        </Button>
      </Col>
    </Form.Group>
  );
};

export default CheckButton;
