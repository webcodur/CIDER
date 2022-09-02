import { Col, Card } from "react-bootstrap";
import EditDeleteButton from "./EditDeleteButton";
import "../../../styles/index.css";
const ListForm = (props) => {
  return (
    <div className="mb-4">
      <div className="align-items-center row">
        <Col id="widthx" style={{ width: "584px" }}>
          {props.project.title} <br />
          <span className="text-muted">{props.project.content}</span> <br />
          <span className="text-muted">{`${
            props.project.startDay.split("T")[0]
          } ~ ${props.project.endDay.split("T")[0]}`}</span>
        </Col>
        {props.isEditable && (
          <EditDeleteButton
            project={props.project}
            callFetch={props.callFetch}
          />
        )}
      </div>
    </div>
  );
};

export default ListForm;
