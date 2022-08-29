import React, { useState, useContext } from 'react';
import * as Api from '../../../api';

import AuthContext from '../stores/AuthContext';
import CheckButton from './CheckButton';
import { Form, Col, FloatingLabel } from 'react-bootstrap';

const EditForm = (props) => {
  const context = useContext(AuthContext);
  const [dataValues, setDataValues] = useState({});

  const setProjectValues = (e) => {
    const { name, value } = e.target;
    setDataValues({ ...dataValues, [name]: value });
  };

  const confirmEdit = async (projectId) => {
    const editedValues = {
      ...dataValues,
    };

    context.setEditIdList(context.editIdList.filter((id) => id !== projectId));

    try {
      await Api.patch(props.DATA_ENDPOINT, projectId, editedValues);
      await props.callFetch();
    } catch (err) {
      context.setModalText('데이터 수정에 실패했습니다.');
    }
  };

  const deleteIdFromIdList = () => {
    context.setEditIdList(
      context.editIdList.filter((id) => id !== props.project.id)
    );
  };

  return (
    <Form>
      <Form.Group>
        <FloatingLabel label="프로젝트 이름" className="mt-3 mb-3">
          <Form.Control
            name="title"
            type="text"
            onChange={setProjectValues}
            defaultValue={props.project.title}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mt-3">
        <FloatingLabel label="상세 내역" className="mb-3">
          <Form.Control
            name="content"
            type="text"
            onChange={setProjectValues}
            defaultValue={props.project.content}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mt-3 row">
        <Col className="col-auto">
          <Form.Control
            name="startDay"
            type="date"
            onChange={setProjectValues}
            defaultValue={props.project.startDay}
          />
        </Col>
        <Col className="col-auto">
          <Form.Control
            name="endDay"
            type="date"
            onChange={setProjectValues}
            defaultValue={props.project.endDay}
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
