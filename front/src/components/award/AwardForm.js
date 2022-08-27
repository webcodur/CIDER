import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import styles from "./award.css";

const AwardForm = (props) => {
  const userState = useContext(UserStateContext);

  const [award, setAward] = useState("");
  const [details, setDetails] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  // POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (award === "" || details === "") {
      setIsEmpty(false);
      return;
    } else {
      setIsEmpty(true);
    }

    // awardObj 생성
    const awardObj = {
      title: award,
      description: details,
    };
    console.log("awardObj", awardObj);

    await Api.post("awards", awardObj);

    const res2 = await Api.get("awards", userState.user.id);
    const datas = res2.data;

    console.log("res2333", res2, userState.user.id);
    let dataArr = [];
    dataArr = datas.map((ele) => [ele.id, ele.title, ele.description]);
    props.setArr(dataArr);

    // 제출 시 입력창 초기화
    setAward("");
    setDetails("");
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="awardID">
                <Form.Label></Form.Label>
                {!isEmpty && (
                  <div className="text-danger text-center" style={{ styles }}>
                    <span id="anime">빈 값이 있습니다.</span>
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

export default AwardForm;
