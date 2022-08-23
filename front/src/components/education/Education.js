import { Card } from "react-bootstrap";
import { useState } from "react";
import EducationForm from "./EducationForm";
const Education = (isEditable) => {
  const [education, setEducation] = useState([]);
  console.log(isEditable);

  function addForm() {
    setEducation(education.concat(<EducationForm />));
  }

  return (
    <Card className="mb-2 ms-3 mr-5 ">
      <Card.Body>
        <Card.Title>학력</Card.Title>
        {education}
      </Card.Body>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          margin: "0 0 1rem 0",
        }}
      >
        {isEditable ? (
          <button className="btn btn-primary" onClick={addForm}>
            +
          </button>
        ) : (
          ""
        )}
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
