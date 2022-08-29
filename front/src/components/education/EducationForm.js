import React, { useState, useContext } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import '../../../src/index.css';
import { UserStateContext } from '../../App';
import * as Api from '../../api';
import styles from '../../styles/anime.css';

const EducationForm = ({ onConfirm, onCancel, education, byEditbtn }) => {
  const [targetEducation, setTargetEducation] = useState({
    ...education,
  });
  const userState = useContext(UserStateContext);
  const id = userState.user.id;

  const [isEmpty, setIsEmpty] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTargetEducation({
      ...targetEducation,
      [name]: value,
    });
  };
  const editedValues = {
    ...targetEducation,
    // id,
  };
  const handleConfirm = async (e) => {
    e.preventDefault();
    const targetElement = document.querySelectorAll('.toggleTarget');
    if (targetEducation.school === '' || targetEducation.major === '') {
      setIsEmpty(false);
      return;
    } else {
      setIsEmpty(true);
    }
    try {
      // "user/register" 엔드포인트로 post요청함.
      // console.log(targetEducation.school, targetEducation.major);
      // if (targetEducation.school === "" || targetEducation.major === "") {
      //   return console.log("빈 값은 입력이 불가 합니다.");
      // }

      if (!byEditbtn) {
        //수정이 아닌 경우
        onConfirm({ ...targetEducation });
        await Api.post('educations', {
          ...targetEducation,
          id,
        }).then((res) => onConfirm(res.data));
      } //수정인 경우
      else {
        await Api.patch(`educations`, education.id, editedValues).then((res) =>
          onConfirm(res.data)
        );
      }
      // 로그인 페이지로 이동함.
    } catch (err) {
      console.log('학력 등록에 실패하셨습니다.', err);
    }
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Container>
      <Form className="margin10">
        {!isEmpty && (
          <div className="text-danger text-center" style={{ styles }}>
            <span id="anime">빈 값이 있습니다.</span>
          </div>
        )}
        <input
          className="form-control"
          placeholder="학교 이름"
          name="school"
          value={targetEducation.school}
          onChange={handleChange}
        ></input>
        <br />
        <input
          className="form-control"
          placeholder="전공"
          name="major"
          value={targetEducation.major}
          onChange={handleChange}
        ></input>
        <br />
        <div className="mb-3 mt-3">
          <div className="form-check form-check-inline">
            <input
              name="position"
              type="radio"
              id="radio-add-1"
              className="form-check-input"
              value="재학중"
              checked={targetEducation.position === '재학중'}
              onChange={handleChange}
            ></input>
            <label title="" htmlFor="radio-add-1" className="form-check-label">
              재학중
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              name="position"
              type="radio"
              id="radio-add-2"
              className="form-check-input"
              value="학사졸업"
              checked={targetEducation.position === '학사졸업'}
              onChange={handleChange}
            ></input>
            <label title="" htmlFor="radio-add-2" className="form-check-label">
              학사졸업
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              name="position"
              type="radio"
              id="radio-add-3"
              className="form-check-input"
              value="석사졸업"
              checked={targetEducation.position === '석사졸업'}
              onChange={handleChange}
            ></input>
            <label title="" htmlFor="radio-add-3" className="form-check-label">
              석사졸업
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              name="position"
              type="radio"
              id="radio-add-4"
              className="form-check-input"
              value="박사졸업"
              checked={targetEducation.position === '박사졸업'}
              onChange={handleChange}
            ></input>
            <label title="" htmlFor="radio-add-4" className="form-check-label">
              박사졸업
            </label>
          </div>
        </div>
        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button
              variant="primary ms-3 float-right"
              type="submit"
              onClick={handleConfirm}
            >
              확인
            </Button>
            <Button variant="secondary ms-3 float-right" onClick={handleCancel}>
              취소
            </Button>
            <br></br>
            <br></br>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default EducationForm;
