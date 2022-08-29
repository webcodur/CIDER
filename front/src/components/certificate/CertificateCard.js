import CertificateEditForm from "./CertificateEditForm";
import { Button, Overlay, Tooltip} from "react-bootstrap";
import * as Api from "../../api";
import { useState, useContext, useRef, useEffect } from "react";
import { UserStateContext } from "../../App";
import displayToggleCss from "../../styles/displayToggle.css";
import '../../styles/tooltip.css';

const CertificateCard = (props) => {
  const userState = useContext(UserStateContext);
  const id = userState?.user?.id;

  const [isEditing, setIsEditing] = useState(false);
  const [eleID, setEleID] = useState(false);

  const arr = props.arr; // arr : [수상, 상세, 시간ID]
  const setArr = props.setArr;
  const idx = props.idx;
  
  // 2클릭 삭제
  const [isConfirm, setConfirm] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfirm(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isConfirm]);
  // ~~~~~~~~
  
  // 카드 편집기 열기 (CertificateEditForm 컴포넌트)
  const openEditForm = (e) => {
    setEleID(e.target.parentNode.parentNode.id);
    setIsEditing(true);
  };

  // 카드 삭제
  const confirmDelete = async (e) => {
    const eleID = e.target.parentNode.parentNode.id;
    await Api.delete("certificates", eleID);

    const getRes = await Api.get("certificates", id);
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
    <div className="row" id={arr[idx][0]}>
      <div className="col">
        <div>{arr[idx][1]}</div>
        <div>{arr[idx][2]}</div>
        <div>{arr[idx][3]}</div>
      </div>
      
      {props.isEditable &&(
        <div className="col">
          
          <Button css={{displayToggleCss}} variant="btn float-end btn-outline-danger mt-3 toggleTarget" onClick={checkDelete} ref={target}>
            삭제
          </Button>

          <Overlay target={target.current} show={isConfirm} placement="left">
            {<Tooltip>정말 삭제하시겠습니까?</Tooltip>}
          </Overlay>

          <Button css={{displayToggleCss}} variant="btn float-end btn-outline-info mt-3 toggleTarget" onClick={openEditForm}>
            편집
          </Button>

        </div>
      )}

      <div className="mt-3"></div>
      {isEditing && (
        <CertificateEditForm
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

export default CertificateCard;
