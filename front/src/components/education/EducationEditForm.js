import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import "../../../src/index.css";
const EducationEditForm = ({
  setIsEditFormEditing,
  addEducation,
  setEducations,
  educations,
}) => {
  console.log(educations);
  const [schoolName, setSchoolName] = useState(educations[index].schoolName);
  const [major, setMajor] = useState();
  const [position, setPosition] = useState();

  console.log();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEducations([
      ...educations,
      {
        schoolName: schoolName,
        major: major,
      },
    ]);
    console.log({ ...educations });
    setIsEditFormEditing(false);
  };

  // position = {
  //   selectValue: "재학중",
  // };

  const handleChange = (e) => {
    console.log(`*****handleChange*****`);
    console.log(`선택한 값 : ${e.target.value}`);

    setPosition({
      selectValue: e.target.value,
    });
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
            // checked={educations[0].position === "재학중"}
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
            // checked={educations[0].position === "학사졸업"}
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
            // checked={educations[0].position === "석사졸업"}
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
            // checked={educations[0].position === "박사졸업"}
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
          <Button
            variant="secondary"
            onClick={() => setIsEditFormEditing(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};
export default EducationEditForm;
