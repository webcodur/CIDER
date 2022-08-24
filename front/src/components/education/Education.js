import { Card } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import EducationForm from "./EducationForm";

import EducationCard from "./EducationCard";
const Education = ({
  isEditable,
  setIsEditing,
  isEditing,
  setIsEditFormEditing,
  isEditFormEditing,
}) => {
  const [educations, setEducations] = useState([
    {
      schoolName: "엘리스코딩학교1",
      major: "컴퓨터공학과",
      position: "학사졸업",
    },
    {
      schoolName: "엘리스코딩학교2",
      major: "컴퓨터공학과",
      position: "학사졸업",
    },
    {
      schoolName: "엘리스코딩학교3",
      major: "컴퓨터공학과",
      position: "학사졸업",
    },
    {
      schoolName: "엘리스코딩학교4",
      major: "컴퓨터공학과",
      position: "학사졸업",
    },
  ]);

  const addEducation = (text) => {
    const newEducations = [...educations, { text }];
    setEducations(newEducations);
  };

  function addForm() {
    console.log(educations);
    setIsEditing(true);
  }
  // console.log(setIsEditFormEditing);

  return (
    <Card className="mb-2 ms-3 mr-5 ">
      <Card.Body>
        <Card.Title>학력</Card.Title>

        <EducationCard
          educations={educations}
          setIsEditFormEditing={setIsEditFormEditing}
          addEducation={addEducation}
          setEducations={setEducations}
          isEditFormEditing={isEditFormEditing}
        />
        {/* {isEditFormEditing ? (
          <EducationEditForm
            setIsEditFormEditing={setIsEditFormEditing}
            addEducation={addEducation}
            setEducations={setEducations}
            educations={educations}
          />
        ) : null} */}
      </Card.Body>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {isEditable ? (
          <button className="btn btn-primary" onClick={addForm}>
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
        {isEditing ? (
          <EducationForm
            setIsEditing={setIsEditing}
            addEducation={addEducation}
            setEducations={setEducations}
            educations={educations}
          />
        ) : null}
      </div>
    </Card>
  );
};

// function Education({ isEditable }) {
//   // useState 훅을 통해 isEditing 상태를 생성함.
//   const [isEditing, setIsEditing] = useState(false);
//   // useState 훅을 통해 user 상태를 생성함.
//   const [user, setUser] = useState(null);

//   // useEffect(() => {
//   //   // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
//   //   Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
//   // }, [portfolioOwnerId]);

//   return (
//     <>
//       {isEditing ? (
//         <UserEditForm
//           user={user}
//           setIsEditing={setIsEditing}
//           setUser={setUser}
//         />
//       ) : (
//         <UserCard
//           user={user}
//           setIsEditing={setIsEditing}
//           isEditable={isEditable}
//         />
//       )}
//     </>
//   );
// }
export default Education;
