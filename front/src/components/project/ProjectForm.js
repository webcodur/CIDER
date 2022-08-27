import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import styles from "./project.css";

const ProjectForm = (props) => {
  const userState = useContext(UserStateContext);

  const [project, setProject] = useState("");
  const [details, setDetails] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (project === "" || details === "" || startDay === "" || endDay === "") {
      setIsEmpty(false);
      return;
    } else {
      setIsEmpty(true);
    }

    // projectObj 생성
    const projectObj = {
      title: project,
      content: details,
      startDay: startDay,
      endDay: endDay,
    };

    // POST
    await Api.post("projects", projectObj);

    // GET
    const getRes = await Api.get("projects", userState.user.id);
    const datas = getRes.data;
    let dataArr = [];
    dataArr = datas.map((ele) => [
      ele.id,
      ele.title,
      ele.content,
      ele.startDay,
      ele.endDay,
    ]);
    props.setArr(dataArr);

    // 제출 시 입력창 초기화
    setProject("");
    setDetails("");
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="projectID">
                <Form.Label></Form.Label>
                {!isEmpty && (
                  <div className="text-danger text-center" style={{ styles }}>
                    <span id="anime">빈 값이 있습니다.</span>
                  </div>
                )}
                <Form.Control
                  type="text"
                  autoComplete="on"
                  value={project}
                  placeholder="프로젝트 제목"
                  onChange={(e) => setProject(e.target.value)}
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

              <Form.Group controlId="startDayID">
                <Form.Label></Form.Label>
                <Form.Control
                  type="date"
                  autoComplete="on"
                  value={startDay}
                  onChange={(e) => setStartDay(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="endDayID">
                <Form.Label></Form.Label>
                <Form.Control
                  type="date"
                  autoComplete="on"
                  value={endDay}
                  onChange={(e) => setEndDay(e.target.value)}
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

export default ProjectForm;
