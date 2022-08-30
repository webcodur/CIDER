import CertificateEditForm from './CertificateEditForm';
import { Button, Overlay, Tooltip, Card, Col } from 'react-bootstrap';
import * as Api from '../../api';
import { useState, useContext, useRef, useEffect } from 'react';
import { UserStateContext } from '../../App';
import displayToggleCss from '../../styles/displayToggle.css';
import '../../styles/tooltip.css';
import { useLocation } from "react-router";

const CertificateCard = (props) => {
  const userState = useContext(UserStateContext);
  const id = userState?.user?.id;

  const [isEditing, setIsEditing] = useState(false);
  const [eleID, setEleID] = useState(false);

  const arr = props.arr;
  const setArr = props.setArr;
  const idx = props.idx;

  const [isConfirm, setConfirm] = useState(false);
  const target = useRef(null);

  let { state } = useLocation();
  if (state === null || typeof state === "object") {
    state = id;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfirm(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isConfirm]);

  const openEditForm = (e) => {
    setEleID(e.target.parentNode.parentNode.id);
    setIsEditing(true);
  };

  const confirmDelete = async (e) => {
    const eleID = e.target.parentNode.parentNode.id;
    await Api.delete('certificate', eleID);

    const getRes = await Api.get('certificates', id);
    const datas = getRes.data;
    let dataArr = [];
    dataArr = datas.map((ele) => [ele.id, ele.title, ele.content, ele.day]);
    props.setArr(dataArr);
  };

  const checkDelete = async (e) => {
    if (isConfirm) {
      await confirmDelete(e);
    }
    setConfirm(true);
  };

  return (
    <>
      <Card.Text className="mb-4">
        <div className="align-items-center row" id={arr[idx][0]}>
          <Col>
            {arr[idx][1]} <br />
            <span className="text-muted">{arr[idx][2]}</span> <br />
            <span className="text-muted">{arr[idx][3]}</span>
          </Col>
          {(props.isEditable && id === state) &&(
            <Col className="col-lg-1">
              <Button
                css={{ displayToggleCss }}
                variant="outline-info"
                onClick={openEditForm}
                className="me-1 mb-1 mr-3 toggleTarget"
                size="sm"
              >
                편집
              </Button>
              <Button
                css={{ displayToggleCss }}
                variant="outline-danger"
                onClick={checkDelete}
                ref={target}
                className="mr-3 btn-sm toggleTarget"
                size="sm"
              >
                삭제
              </Button>
              <Overlay
                target={target.current}
                show={isConfirm}
                placement="left"
              >
                {<Tooltip>정말 삭제하시겠습니까?</Tooltip>}
              </Overlay>
            </Col>
          )}
        </div>
      </Card.Text>
      {(isEditing && id===state) &&(
        <CertificateEditForm
          eleID={eleID}
          arr={arr}
          setArr={setArr}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
};

export default CertificateCard;
