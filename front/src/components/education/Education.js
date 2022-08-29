import { Card } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import EducationForm from "./EducationForm";
import EducationCard from "./EducationCard";
import { UserStateContext } from "../../App";
import * as Api from "../../api";

const Education = ({ isEditable, portfolioOwnerId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const toggleAddEducationForm = () => {
    setIsAdding(!isAdding);
  };

  const [educations, setEducations] = useState([]);
  const userState = useContext(UserStateContext);
  let educationid = "";
  if (userState?.user) {
    educationid = userState.user.id ? userState.user.id : null;
  }
  const confirmAddEducation = (targetEducation) => {
    const resultEducations = [...educations, targetEducation];
    setEducations([...resultEducations]);
    setIsAdding(false);
  };

  const cancelAddEducation = () => {
    setIsAdding(false);
  };
  useEffect(() => {
    Api.get(
      "educations",
      portfolioOwnerId ? portfolioOwnerId : educationid
    ).then((res) => setEducations(res.data));
  }, [portfolioOwnerId]);
  return (
    <Card className="mb-2 ms-3 mr-5 ">
      <Card.Body>
        <Card.Title>학력</Card.Title>
        <EducationCard
          educations={educations}
          setEducations={setEducations}
          isEditable={isEditable}
        />
      </Card.Body>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {isEditable ? (
          <button
            className="btn btn-primary toggleTarget"
            onClick={toggleAddEducationForm}
          >
            +
          </button>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          margin: "0 0 1rem 0",
        }}
      >
        {isAdding ? (
          <EducationForm
            onConfirm={confirmAddEducation}
            onCancel={cancelAddEducation}
            education={{
              id: null,
              school: "",
              major: "",
              position: "재학중",
            }}
          />
        ) : null}
      </div>
    </Card>
  );
};

export default Education;
