import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import styles from './certificate.css'

const CertificateEditForm = ( props ) => {
  const userState = useContext(UserStateContext);

  const [certificate, setCertificate] = useState('')
  const [details, setDetails] = useState('')
  const [day, setDay] = useState('')
  const [isMessageNecessary, setIsMessageNecessary] = useState(false)
  
  let isClicked = false;
  let isEmpty = false;

  const 편집본제출 = async (e) => {
    
    e.preventDefault();
    isClicked = true
    isEmpty = (certificate==='' || details==='' || day === '') ? true : false
    setIsMessageNecessary(isClicked && isEmpty)
    isClicked = false
    if(isEmpty){
      isEmpty = false
      return
    }
    
    // UPDATE
    const certID = props.eleID
    const obj = {
      title : certificate,
      content : details,
      day : day,
    }
    console.log(props.eleID, props.eleID)
    console.log(obj)
    const updateRes = await Api.patch("certificates", certID, obj);
    console.log('update 직후 response :', updateRes)
    
    // GET
    getData()

    // 제출 시 입력창 초기화
    setCertificate('')
    setDetails('')
    setDay('')

    // 제출 시 편집창 닫기
    props.setIsEditing(false)
  };

  const getData = async () => {
    const getRes = await Api.get("certificates", userState.user.id);
    const datas = getRes.data
    let dataArr = []
    dataArr = datas.map(ele=>[ele.id, ele.title, ele.content, ele.day])
    props.setArr(dataArr)
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={편집본제출}>


              <Form.Group controlId="certID">
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
                  value={certificate}
                  placeholder="자격증 제목"
                  onChange={(e) => setCertificate(e.target.value)}
                />
              </Form.Group>


              <Form.Group controlId="detailsID">
                <Form.Label></Form.Label>
                  <Form.Control
                  type="text"
                  autoComplete="on"
                  value={details}
                  placeholder="상세내역"
                  onChange={(e) => setDetails(e.target.value)}
                />
              </Form.Group>


              <Form.Group controlId="dayID">
                <Form.Label></Form.Label>
                <Form.Control
                  type="date"
                  autoComplete="on"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
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

export default CertificateEditForm;