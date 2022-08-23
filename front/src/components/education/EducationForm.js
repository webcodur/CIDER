import { Form } from "react-bootstrap";
import "../../../src/index.css";
const EducationForm = (setIsEditing) => {
  return (
    <Form className="margin10">
      <input className="inputwidth margin_b10" placeholder="학교 이름"></input>
      <br />
      <input className="inputwidth margin_b10" placeholder="전공"></input>
      <br />
      <label className="margin_r5">
        <input value="재학중" type="Radio" /> 재학중
      </label>
      <label className="margin_r5">
        <input value="학사졸업" type="Radio" /> 학사졸업
      </label>
      <label className="margin_r5">
        <input value="석사졸업" type="Radio" /> 석사졸업
      </label>
      <label className="margin_r5">
        <input value="박사졸업" type="Radio" /> 박사졸업
      </label>
      <br />
      <div className="flex_center">
        <button variant="primary" type="submit" className="me-3">
          확인
        </button>
        <button variant="secondary" onClick={() => setIsEditing(false)}>
          취소
        </button>
      </div>
    </Form>
  );
};
export default EducationForm;
