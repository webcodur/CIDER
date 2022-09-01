import React, { useState, useContext } from 'react';
import * as Api from '../../../api';

import AuthContext from '../stores/AuthContext';
import ErrorModalContext from '../../stores/ErrorModalContext';
import CheckButton from './CheckButton';
import { Form, Col, FloatingLabel } from 'react-bootstrap';
import styles from '../../../styles/anime.css';

const EditForm = (props) => {
  const context = useContext(AuthContext);
  const errorModalContext = useContext(ErrorModalContext);
  const [dataValues, setDataValues] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const DATA_ENDPOINT = 'project';

  const setProjectValues = (e) => {
    const { name, value } = e.target;
    setDataValues({ ...dataValues, [name]: value });
  };

  const checkProjectValues = (projectValues) => {
    const startDay = projectValues.startDay?.split('-').join('');
    const endDay = projectValues.endDay?.split('-').join('');

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

  const confirmEdit = async (projectId) => {
    const editedValues = {
      ...dataValues,
    };

    if (!checkProjectValues(editedValues)) {
      return;
    }

    context.setEditIdList(context.editIdList.filter((id) => id !== projectId));

    try {
      await Api.patch(DATA_ENDPOINT, projectId, editedValues);
      await props.callFetch();
    } catch (err) {
      errorModalContext.setModalText(
        `${err.message} // 프로젝트 데이터를 수정하는 과정에서 문제가 발생했습니다.`
      );
    }
  };

  const deleteIdFromIdList = () => {
    context.setEditIdList(
      context.editIdList.filter((id) => id !== props.project.id)
    );
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
          label="프로젝트 이름"
          className="mt-3 mb-3"
          style={{ color: 'black' }}
        >
          <Form.Control
            name="title"
            type="text"
            onChange={setProjectValues}
            defaultValue={props.project.title}
            maxlength="20"
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mt-3">
        <FloatingLabel
          label="상세 내역"
          className="mb-3 "
          style={{ color: 'black' }}
        >
          <Form.Control
            name="content"
            type="text"
            onChange={setProjectValues}
            defaultValue={props.project.content}
            maxlength="400"
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mt-3 row">
        <Col className="col-auto">
          <Form.Control
            name="startDay"
            type="date"
            onChange={setProjectValues}
            defaultValue={props.project.startDay.split('T')[0]}
          />
        </Col>
        <Col className="col-auto">
          <Form.Control
            name="endDay"
            type="date"
            onChange={setProjectValues}
            defaultValue={props.project.endDay.split('T')[0]}
          />
        </Col>
      </Form.Group>
      <CheckButton
        className={'mt-3 text-center'}
        submitHandler={confirmEdit}
        cancelHandler={deleteIdFromIdList}
        project={props.project}
      />
    </Form>
  );
};

export default EditForm;
