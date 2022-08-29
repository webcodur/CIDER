import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import styles from "../../styles/anime.css";

const CertificateForm = (props) => {
  const userState = useContext(UserStateContext);

  const [certificate, setCertificate] = useState("");
  const [details, setDetails] = useState("");
  const [day, setDay] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    if (certificate === "" || details === "" || day === "") {
      setIsEmpty(false);
      return;
    } else {
      setIsEmpty(true);
    }
    
    const certificateObj = {
      title: certificate,
      content: details,
      day: day,
    };

    await Api.post("certificates", certificateObj);

    const getRes = await Api.get("certificates", userState.user.id);
    const datas = getRes.data;
    let dataArr = [];
    dataArr = datas.map((ele) => [ele.id, ele.title, ele.content, ele.day]);
    props.setArr(dataArr);

    // 입력창 초기화
    setCertificate("");
    setDetails("");
    setDay("");
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="certificateID">
                <Form.Label></Form.Label>
                {!isEmpty && (
                  <div className="text-danger text-center" style={{ styles }}>
                    <span id="anime">빈 값이 있습니다.</span>
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
                    variant="primary ms-3"
                    type="submit"
                    onSubmit={handleSubmit}
                  >
                    확인
                  </Button>
                  <Button
                    variant="secondary ms-3"
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

export default CertificateForm;
