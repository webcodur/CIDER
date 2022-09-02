import React, { useContext, useState, useRef, useEffect } from 'react';
import * as Api from '../../../api';

import AuthContext from '../stores/AuthContext';
import ErrorModalContext from '../../stores/ErrorModalContext';
import { Col, Button, Overlay, Tooltip } from 'react-bootstrap';
import '../../../styles/tooltip.css';

const EditDeleteButton = (props) => {
  const context = useContext(AuthContext);
  const errorModalContext = useContext(ErrorModalContext);
  const [isConfirm, setConfirm] = useState(false);
  const target = useRef(null);
  const DATA_ENDPOINT = 'project';

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfirm(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isConfirm]);

  const checkDelete = async (id) => {
    if (isConfirm) {
      await confirmDelete(id);
    }

    setConfirm(true);
  };

  const confirmDelete = async (id) => {
    try {
      await Api.delete(DATA_ENDPOINT, id);
      await props.callFetch();
    } catch (err) {
      errorModalContext.setModalText(
        `${err.message} // 프로젝트 데이터를 삭제하는 과정에서 문제가 발생했습니다.`
      );
    }
  };

  const getEditIdList = (id) => {
    context.setEditIdList((prevState) =>
      context.editIdList.includes(id) ? prevState : [...prevState, id]
    );
  };

  return (
    <Col className="col-lg-1">
      <Button
        variant="outline-info toggleTarget"
        size="sm"
        className="me-1 mb-1 mr-3"
        onClick={() => {
          getEditIdList(props.project.id);
        }}
      >
        편집
      </Button>
      <Button
        variant="outline-danger toggleTarget"
        size="sm"
        className="mr-3 btn-sm"
        ref={target}
        onClick={() => checkDelete(props.project.id)}
      >
        삭제
      </Button>
      <Overlay target={target.current} show={isConfirm} placement="left">
        {(props) => (
          <Tooltip className="red-tooltip" {...props}>
            정말 삭제하시겠습니까?
          </Tooltip>
        )}
      </Overlay>
    </Col>
  );
};

export default EditDeleteButton;
