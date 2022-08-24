import AwardEditForm from './AwardEditForm'
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const AwardCard = ( props ) => {
  
const [isEditing, setIsEditing] = useState(false)
const [htmlID, setHtmlID] = useState(false)

  const arr    = props.arr    // [수상, 상세, 시간ID]
  const setArr = props.setArr
  const idx    = props.idx

  const 편집하기 = (e) => {
    setHtmlID(e.target.parentNode.id)
    setIsEditing(true)
  }
  
  const 삭제하기 = (e) => {
    const text = e.target.parentNode.id
    setArr((기존값) => {
      let temp = 기존값.slice()
      temp.forEach((ele,idx) => {
        if(ele[2] === text*1){
          temp.splice(idx, 1)
        }
      });
      return temp
    })
  }

  return (
    <div id={arr[idx][2]}>
      <div> {arr[idx][0]}</div>
      <div> {arr[idx][1]}</div>
      <Button variant="btn btn-outline-info" onClick={편집하기} >편집</Button>
      <Button variant="btn btn-outline-info" onClick={삭제하기}> 삭제</Button>
      {isEditing && 
      (
        <AwardEditForm 
        htmlID={htmlID} 
        arr={arr} 
        setArr={setArr}
        isEditing={isEditing}
        setIsEditing={setIsEditing}/>
      )
    }
    </div>
  )
}

export default AwardCard;