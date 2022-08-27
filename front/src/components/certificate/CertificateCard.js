import CertificateEditForm from './CertificateEditForm'
import { Button } from 'react-bootstrap';
import * as Api from "../../api";
import { useState, useContext } from 'react';
import { UserStateContext } from "../../App";

const CertificateCard = ( props ) => {

  const userState = useContext(UserStateContext);
  const id = userState.user.id;

  const [isEditing, setIsEditing] = useState(false)
  const [eleID, setEleID]         = useState(false)

  const arr    = props.arr    // [수상, 상세, 시간ID]
  const setArr = props.setArr
  const idx    = props.idx

  const 편집 = (e) => {
    setEleID(e.target.parentNode.parentNode.id)
    setIsEditing(true)
  }

  const 삭제 = async (e) => {
    // DELETE
    const eleID = e.target.parentNode.parentNode.id
    console.log(eleID)

    await Api.delete("certificates", eleID);

    // GET
    const getRes = await Api.get("certificates", id);
    const datas = getRes.data
    let dataArr = []
    dataArr = datas.map(ele=>[ele.id, ele.title, ele.content, ele.day])
    props.setArr(dataArr)
  }

  return (
    <div className='row' id={arr[idx][0]}>
      <div className='col'>
        <div>{arr[idx][1]}</div>
        <div>{arr[idx][2]}</div>
        <div>{arr[idx][3]}</div>
      </div>
      <div className='col'>
        <Button variant="btn float-end btn-outline-info mt-3" onClick={삭제}>삭제</Button>
        <Button variant="btn float-end btn-outline-info mt-3" onClick={편집}>편집</Button>
      </div>
      <div className='mt-3'></div>
      {isEditing && 
        (
          <CertificateEditForm 
          eleID={eleID} 
          arr={arr} 
          setArr={setArr}
          isEditing={isEditing}
          setIsEditing={setIsEditing}/>
        )
      }
  </div>
);
}

export default CertificateCard;
