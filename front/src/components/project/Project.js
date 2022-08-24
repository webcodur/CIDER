import { Card, Button } from 'react-bootstrap';

const Project = (props) => {
  return (
    <Card className="mb-2 ms-3 mr-5">
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Button
            className="btn btn-primary"
            onClick={props.setIsEditing}
          >
            +
          </Button>
        </div> 
      </Card.Body>
    </Card>
  );
};

export default Project;
