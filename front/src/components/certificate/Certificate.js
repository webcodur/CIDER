import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { Container, Col, Row, Form} from "react-bootstrap";
import { useState } from 'react';

const Certificate = ({isEditable}) => {

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false)
  const [certificate, setCertificate] = useState('')
  const [details, setDetails] = useState('')
  const [time, setTime] = useState(null)

  const now = new Date();	// 현재 날짜 및 시간
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const nowTime = `${year}/${month}/${date}`

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Card className="mb-2 ms-3 mr-5">
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
            style={!isEditable?{display:'none'}:{display:'block'}}
          >
            +
          </Button>
        </div>
        {isEditing && 
          <Container>
            <Row>
              <Col>
                <Form onSubmit={handleSubmit}>


                  <Form.Group controlId="certificateID">
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="text"
                      autoComplete="on"
                      placeholder='자격증 제목'
                      onChange={(e) => setCertificate(e.target.value)}
                    />
                  </Form.Group>


                  <Form.Group controlId="detailsID">
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="text"
                      autoComplete="on"
                      placeholder='상세내역'
                      onChange={(e) => setDetails(e.target.value)}
                    />
                  </Form.Group>


                  <Form.Group controlId="dateID">
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="date"
                      autoComplete="on"
                      placeholder={nowTime}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </Form.Group>


                    <Form.Group as={Row} className="mt-3 text-center">
                      <Col sm={{ span: 20 }}>
                          <Button variant="primary ms-3" type="submit" onSubmit={handleSubmit}>확인</Button>
                          <Button variant="primary ms-3" onClick={() => setIsEditing(false)}>취소</Button>
                      </Col>
                    </Form.Group>


                </Form> 
              </Col>  
            </Row>
          </Container>
        }
      </Card.Body>
    </Card>
  );
};

export default Certificate;
