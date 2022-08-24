import AwardForm from './AwardForm'


const AwardCard = ( props ) => {
  
  const 편집하기 = (e) => {
    // e.target.parentNode 
    return (
      <div>Hello world</div>
    )
    // return <AwardForm></AwardForm>
  }
  
  const 삭제하기 = (e) => {
    // arr 값만 수정하면 HTML 요소를 고칠 필요 없음
    const idValue = e.target.parentNode.id
    props.setArr((기존값) => {
      let temp = 기존값.slice()
      temp.forEach((ele,idx) => {
        if(ele[2] == idValue){
          temp.splice(idx, 1)
        }
      });
      return temp
    })
  }

  console.log('props.arr',props.arr)

  return <>
    {props.arr.map((ele, idx) => {
      return (
        <div id={ele[2]}>
          <div>수상내역 : {ele[0]}</div>
          <div>상세내역 : {ele[1]}</div>
          <button onClick={편집하기}>편집</button>
          <button onClick={삭제하기}>삭제</button>
        </div>
      )
    })}
  </>
}

export default AwardCard;