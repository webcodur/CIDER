import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import "../../../src/index.css";
const EducationForm = ({
  setIsEditing,
  addEducation,
  setEducations,
  educations,
}) => {
  const [schoolName, setSchoolName] = useState();
  const [major, setMajor] = useState();
  const [position, setPosition] = useState("재학중");
  // setPosition("재학중");
  const idnum = Date.now();
  const handleChange = (e) => {
    console.log(`*****handleChange*****`);
    console.log(`선택한 값 : ${e.target.value}`);

    setPosition(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // // "users/유저id" 엔드포인트로 PUT 요청함.
    // const res = await Api.put(`users/${user.id}`, {
    //   schoolName,
    //   major,
    //   position,
    // });
    // // 유저 정보는 response의 data임.
    // const updatedEducation = res.data;
    // // 해당 유저 정보로 user을 세팅함.
    // setUser(updatedEducation);

    // isEditing을 false로 세팅함.
    // {
    //   setEducations([
    //     {
    //       schoolName: { schoolName },
    //       major: { major },
    //     },
    //   ]);
    // }
    setEducations([
      ...educations,
      {
        schoolName: schoolName,
        major: major,
        position: position,
        id: idnum,
      },
    ]);
    console.log({ ...educations });
    setIsEditing(false);
  };

  return (
    <Form className="margin10" onSubmit={handleSubmit}>
      <input
        className="form-control"
        placeholder="학교 이름"
        value={schoolName}
        onChange={(e) => setSchoolName(e.target.value)}
      ></input>
      <br />
      <input
        className="form-control"
        placeholder="전공"
        value={major}
        onChange={(e) => setMajor(e.target.value)}
      ></input>
      <br />
      <div className="mb-3 mt-3">
        <div className="form-check form-check-inline">
          <input
            name="position"
            type="radio"
            id="radio-add-1"
            class="form-check-input"
            value="재학중"
            onChange={handleChange}
          ></input>
          <label title="" for="radio-add-1" class="form-check-label">
            재학중
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            name="position"
            type="radio"
            id="radio-add-2"
            class="form-check-input"
            value="학사졸업"
            onChange={handleChange}
          ></input>
          <label title="" for="radio-add-2" class="form-check-label">
            학사졸업
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            name="position"
            type="radio"
            id="radio-add-3"
            class="form-check-input"
            value="석사졸업"
            onChange={handleChange}
          ></input>
          <label title="" for="radio-add-3" class="form-check-label">
            석사졸업
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            name="position"
            type="radio"
            id="radio-add-4"
            class="form-check-input"
            value="박사졸업"
            onChange={handleChange}
          ></input>
          <label title="" for="radio-add-4" class="form-check-label">
            박사졸업
          </label>
        </div>
      </div>

      <br />
      {/* <div className="flex_center">
        <button variant="primary" type="submit" className="me-3">
          확인
        </button>
        <button variant="secondary" onClick={() => setIsEditing(false)}>
          취소
        </button>
      </div> */}
      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};
export default EducationForm;
