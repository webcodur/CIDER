import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";

const AwardEditForm = ( props ) => {

  const [awards, setAwards]   = useState('')
  const [details, setDetails] = useState('')
  
  

  const 편집본제출 = async (e) => {
    e.preventDefault();
    console.log('props.htmlID',props.htmlID)
    console.log('awards',awards)

    if((awards)===''){return}

    props.setArr((기존값)=>{
      let temp = 기존값.slice()
      temp.forEach((ele,idx)=>{
        if(ele[2] === (props.htmlID*1)){
          ele[0] = awards
          ele[1] = details
        }
      })
      console.log(temp)
      return temp
    })

    // 제출 시 입력창 초기화
    setAwards('')
    setDetails('')

    // 제출 시 편집창 닫기

  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={편집본제출}>


              <Form.Group controlId="awardsID">
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="on"
                  value={awards}
                  placeholder="수상내역"
                  onChange={(e) => setAwards(e.target.value)}
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


              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button
                    variant="primary ms-3"
                    type="submit"
                    onSubmit={편집본제출}
                  >
                    확인
                  </Button>
                  <Button
                    variant="primary ms-3"
                    onClick={() => props.setIsEditing(false)}
                  >
                    취소
                  </Button>
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