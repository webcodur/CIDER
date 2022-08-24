import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";

const AwardForm = (
    props
  ) => {

  // const [arr, setArr] = useState([])
  const [awards, setAwards]   = useState('')
  const [details, setDetails] = useState('')
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 빈 값에 대해선 작업하지 않음
    if((awards)===''){return}
    
    // 입력값에서 배열 만들기
    const dt = new Date()
    const timeID = dt.getTime()
    
    console.log(timeID)
    const 현재값 = [awards, details, timeID]
    props.setArr((기존값) => [현재값, ...기존값]);

    // 제출 시 입력창 초기화
    setAwards('')
    setDetails('')
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>


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
                    onSubmit={handleSubmit}
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
};

export default AwardForm;
