import AwardEditForm from './AwardEditForm';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import * as Api from '../../api';
import { useState, useContext, useRef, useEffect } from 'react';
import { UserStateContext } from '../../App';
import displayToggleCss from '../../styles/displayToggle.css';
import '../../styles/tooltip.css';

const AwardCard = (props) => {
  const userState = useContext(UserStateContext);
  const [isEditing, setIsEditing] = useState(false);
  const [eleID, setEleID] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const target = useRef(null);

  const id = userState?.user?.id;
  const arr = props.arr;
  const setArr = props.setArr;
  const idx = props.idx;

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
    await Api.delete('award', eleID);
    const getRes = await Api.get('awards', id);
    const datas = getRes.data;
    let dataArr = [];

    dataArr = datas.map((ele) => [ele.id, ele.title, ele.description]);
    props.setArr(dataArr);
  };

  const checkDelete = async (e) => {
    if (isConfirm) {
      await confirmDelete(e);
    }
    setConfirm(true);
  };

  return (
    <div className="row" id={arr[idx][0]}>
      <div className="col">
        <div> {arr[idx][1]}</div>
        <div> {arr[idx][2]}</div>
      </div>
      {props.isEditable && (
        <div className="col">
          <Button
            css={{ displayToggleCss }}
            variant="btn float-end btn-outline-danger mt-3 toggleTarget"
            onClick={checkDelete}
            ref={target}
          >
            삭제
          </Button>
          <Overlay target={target.current} show={isConfirm} placement="left">
            {<Tooltip>정말 삭제하시겠습니까?</Tooltip>}
          </Overlay>
          <Button
            css={{ displayToggleCss }}
            variant="btn float-end btn-outline-info mt-3 toggleTarget"
            onClick={openEditForm}
          >
            편집
          </Button>
        </div>
      )}
      {isEditing && (
        <AwardEditForm
          eleID={eleID}
          arr={arr}
          setArr={setArr}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default AwardCard;
