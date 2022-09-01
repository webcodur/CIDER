import React, { useState, useContext } from 'react';
import * as Api from '../../../api';

import AuthContext from '../stores/AuthContext';
import CheckButton from './CheckButton';
import { Form, Col, FloatingLabel } from 'react-bootstrap';
import styles from '../../../styles/anime.css';

const AddForm = (props) => {
  const context = useContext(AuthContext);
  const [dataValues, setDataValues] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const DATA_ENDPOINT = 'project';

  const setProjectValues = (e) => {
    const { name, value } = e.target;
    setDataValues({ ...dataValues, [name]: value });
  };

  const checkProjectValues = (projectValues) => {
    const startDay = projectValues.startDay.split('-').join('');
    const endDay = projectValues.endDay.split('-').join('');

    if (
      !projectValues.startDay ||
      !projectValues.endDay ||
      !projectValues.title ||
      !projectValues.content
    ) {
      setIsEmpty(true);
      return;
    }

    if (startDay - endDay > 0) {
      alert('시작 날짜와 종료 날짜를 제대로 적어주세요.');
      return false;
    }

    if (startDay > 99991231 || endDay > 99991231) {
      alert('연도는 네자리를 넘을 수 없습니다.');
      return false;
    }

    return true;
  };

  const callPost = async () => {
    if (!checkProjectValues(dataValues)) {
      return;
    }

    try {
      await Api.post(DATA_ENDPOINT, dataValues);
      await props.callFetch();
      context.setIsAdding(false);
    } catch (err) {
      context.setModalText('데이터 전송에 실패했습니다.');
    }
  };

  const setIsAddingFalse = () => {
    context.setIsAdding(false);
  };

  return (
    <Form className="toggleTarget">
      <Form.Group>
        {isEmpty && (
          <div className="text-danger text-center" style={{ styles }}>
            <span id="anime">빈 값이 있습니다.</span>
          </div>
        )}
        <FloatingLabel
          label="프로젝트 제목"
          className="mt-3 mb-3"
          style={{ color: 'black' }}
        >
          <Form.Control
            name="title"
            type="text"
            placeholder="프로젝트 제목"
            onChange={setProjectValues}
            maxlength="20"
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mt-3">
        <FloatingLabel
          label="상세 내역"
          className="mb-3"
          style={{ color: 'black' }}
        >
          <Form.Control
            name="content"
            type="text"
            placeholder="상세 내역"
            onChange={setProjectValues}
            maxlength="400"
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mt-3 row">
        <Col className="col-auto">
          <Form.Control
            type="date"
            name="startDay"
            onChange={setProjectValues}
          />
        </Col>
        <Col className="col-auto">
          <Form.Control type="date" name="endDay" onChange={setProjectValues} />
        </Col>
      </Form.Group>
      <CheckButton
        className={'mt-3 text-center'}
        submitHandler={callPost}
        cancelHandler={setIsAddingFalse}
      />
    </Form>
  );
};

export default AddForm;
