import { Col, Card } from 'react-bootstrap';
import EditDeleteButton from './EditDeleteButton';

const ListForm = (props) => {
  return (
    <Card.Text className="mb-4">
      <div className="align-items-center row">
        <Col>
          {props.project.title} <br />
          <span className="text-muted">{props.project.content}</span> <br />
          <span className="text-muted">{`${props.project.startDay} ~ ${props.project.endDay}`}</span>
        </Col>
        {props.isEditable && (
          <EditDeleteButton
            project={props.project}
            callFetch={props.callFetch}
            DATA_ENDPOINT={props.DATA_ENDPOINT}
          />
        )}
      </div>
    </Card.Text>
  );
};

export default ListForm;
