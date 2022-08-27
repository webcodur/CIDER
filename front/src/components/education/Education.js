import { Card } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import EducationForm from "./EducationForm";
import EducationCard from "./EducationCard";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
const Education = ({ isEditable, paramsUserId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const toggleAddEducationForm = () => {
    setIsAdding(!isAdding);
  };

  const [educations, setEducations] = useState([]);
  const userState = useContext(UserStateContext);
  let educationid = "";
  if (userState?.user) {
    // 로그아웃을 했을경우 값을 넣어주기
    educationid = userState.user.id ? userState.user.id : null;
  }
  const confirmAddEducation = (targetEducation) => {
    // TODO : 학교이름, 전공 유효성 검사
    // targetEducation.id = Date.now();
    const resultEducations = [...educations, targetEducation];
    setEducations([...resultEducations]);
    console.log(...educations, targetEducation);
    setIsAdding(false);
  };

  const cancelAddEducation = () => {
    setIsAdding(false);
  };
  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    //paramsUserId  = 선택한 유저 아이디 가져오기, 선택한 유저가 없다면 로그인한 사람의 id 값으로 세팅
    Api.get("educations", paramsUserId ? paramsUserId : educationid).then(
      (res) => setEducations(res.data)
    );
  }, [paramsUserId]);
  console.log("educations", paramsUserId, educationid);
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
          <button className="btn btn-primary" onClick={toggleAddEducationForm}>
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
