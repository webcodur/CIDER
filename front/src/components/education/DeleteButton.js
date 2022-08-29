import React, { useContext, useState, useRef, useEffect } from "react";
import * as Api from "../../api";

// import AuthContext from "../stores/AuthContext";
import { Col, Button, Overlay, Tooltip } from "react-bootstrap";
// import "../styles/tooltip.css";

const DeleteButton = ({ educationid, onRemove }) => {
  const [isConfirm, setConfirm] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfirm(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isConfirm]);

  const checkDelete = async (id) => {
    if (isConfirm) {
      await onRemove(id);
    }

    setConfirm(true);
  };

  // const confirmDelete = async (id) => {
  //   await Api.delete(props.DATA_ENDPOINT, id);
  //   await props.callFetch();
  // };

  // const getIdList = (id) => {
  //   context.setEditIdList((prevState) =>
  //     context.editIdList.includes(id) ? prevState : [...prevState, id]
  //   );
  // };

  return (
    <Col className="col-lg-1">
      <Button
        variant="outline-danger"
        size="sm"
        className="mr-3 btn-sm"
        ref={target}
        onClick={() => checkDelete(educationid)}
      >
        삭제
      </Button>

      <Overlay target={target.current} show={isConfirm} placement="left">
        <Tooltip>정말 삭제하시겠습니까?</Tooltip>
      </Overlay>
    </Col>
  );
};

export default DeleteButton;
