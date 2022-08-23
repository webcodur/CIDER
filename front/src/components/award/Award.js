import { Card, Button } from "react-bootstrap";

const Award = ({ setIsEditing }) => {
  return (
    <Card className="mb-2 ms-3 mr-5">
      <Card.Body>
        <Card.Title>수상 이력</Card.Title>
      </Card.Body>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          margin: "0 0 1rem 0",
        }}
      >
        <Button className="btn btn-primary" onClick={setIsEditing}>
          +
        </Button>
      </div>
    </Card>
  );
};

export default Award;
