// import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import AwardCard from "./AwardCard";
import AwardForm from "./AwardForm";


const Award = ({ isEditable }) => {
  
  const [isEditing, setIsEditing] = useState(false)
  const [arr, setArr] = useState([])

  return (
    <Card className="mb-2 ms-3 mr-5">
      <Card.Body>
        <Card.Title>수상 이력</Card.Title>
        <AwardCard arr={arr} setArr={setArr}></AwardCard>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            margin: '0 0 1rem 0',
          }}
        >
          <Button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
            style={!isEditable?{display:'none'}:{display:'block'}}
          >
            +
          </Button>
        </div>

        {isEditing && 
        <AwardForm
          arr = {arr}
          setArr = {setArr}
          isEditing = {isEditing}
          setIsEditing = {setIsEditing}
          >
        </AwardForm>
        }
      </Card.Body>
    </Card>
  );
};

export default Award;