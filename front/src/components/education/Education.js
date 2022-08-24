import { Card, Button } from 'react-bootstrap';
import {useState} from 'react'

const Education = (props) => {

  return (
    <Card className="mb-2 ms-3 mr-5">
      <Card.Body>
        <Card.Title>학력</Card.Title>
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

export default Education;
