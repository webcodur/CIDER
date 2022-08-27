import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import styles from './award.css'

const AwardEditForm = ( props ) => {
  const userState = useContext(UserStateContext);
  const id = userState.user.id;

  const [award, setAward] = useState('')
  const [details, setDetails] = useState('')
  const [isMessageNecessary, setIsMessageNecessary] = useState(false)
  
  let isClicked = false;
  let isEmpty = false;

  const 편집본제출 = async (e) => {
    
    e.preventDefault();
    isClicked = true
    isEmpty = (award==='' || details==='') ? true : false
    setIsMessageNecessary(isClicked && isEmpty)
    isClicked = false
    if(isEmpty){
      isEmpty = false
      return
    }

    // UPDATE
    const awardID = props.eleID
    const awardObj = {
      title : award,
      description : details
    }
    const updateRes = await Api.patch("awards", awardID, awardObj);
    console.log('update 직후 response :', updateRes)
    
    // GET
    getData()

    // 제출 시 입력창 초기화
    setAward('')
    setDetails('')

    // 제출 시 편집창 닫기
    props.setIsEditing(false)
  };

  const getData = async () => {
    const getRes = await Api.get("awards", id);
    const datas = getRes.data
    let dataArr = []
    dataArr = datas.map(ele=>[ele.id, ele.title, ele.description])
    props.setArr(dataArr)
  }



  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={편집본제출}>


              <Form.Group controlId="awardID">
                <Form.Label></Form.Label>
                {isMessageNecessary&&(
                <div className='text-danger text-center' style={{styles}}>
                  <span id='anime'>
                    빈 값이 있습니다.
                  </span>
                </div>
                )}
                <Form.Control
                  type="text"
                  autoComplete="on"
                  value={award}
                  placeholder="수상 내역"
                  onChange={(e) => setAward(e.target.value)}
                />
              </Form.Group>


              <Form.Group controlId="detailsID">
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="on"
                  value={details}
                  placeholder="상세 내역"
                  onChange={(e) => setDetails(e.target.value)}
                />
              </Form.Group>


              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button
                    variant="primary ms-3 float-right"
                    type="submit"
                    onSubmit={편집본제출}
                  >
                    확인
                  </Button>
                  <Button
                    variant="secondary ms-3 float-right"
                    onClick={() => props.setIsEditing(false)}
                  >
                    취소
                  </Button>
                  <br></br>
                  <br></br>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AwardEditForm;