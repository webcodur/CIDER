import React, { useContext, useState, useRef } from 'react';
import * as Api from '../../../api';

import AuthContext from '../stores/AuthContext';
import { Col, Button, Overlay, Tooltip } from 'react-bootstrap';
import '../../styles/tooltip.css';

const EditDeleteButton = (props) => {
  const context = useContext(AuthContext);
  const [isConfirm, setConfirm] = useState(false);
  const target = useRef(null);

  const checkDelete = async (id) => {
    const timer = () => setTimeout(() => setConfirm(false), 2000);

    if (isConfirm) {
      clearTimeout(timer);
      setConfirm(false);
      await confirmDelete(id);
    }

    timer();

    setConfirm(true);
  };

  const confirmDelete = async (id) => {
    await Api.delete(props.DATA_ENDPOINT, id);
    await props.callFetch();
  };

  const getIdList = (id) => {
    context.setEditIdList((prevState) =>
      context.editIdList.includes(id) ? prevState : [...prevState, id]
    );
  };

  return (
    <Col className="col-lg-1">
      <Button
        variant="outline-info"
        size="sm"
        className="me-1 mb-1 mr-3"
        onClick={() => {
          getIdList(props.project.id);
        }}
      >
        편집
      </Button>
      <Button
        variant="outline-danger"
        size="sm"
        className="mr-3 btn-sm"
        ref={target}
        onClick={() => checkDelete(props.project.id)}
      >
        삭제
      </Button>
      <Overlay target={target.current} show={isConfirm} placement="left">
        {(props) => <Tooltip {...props}>정말 삭제하시겠습니까?</Tooltip>}
      </Overlay>
    </Col>
  );
};

export default EditDeleteButton;
