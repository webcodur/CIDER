import React, { useState } from "react";
import "../../../src/index.css";
import EducationForm from "./EducationForm";

function EducationCard({ educations, setEducations }) {
  const [isEditing, setIsEditing] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const toggleEditEducationForm = (id) => {
    if (targetId === id && isEditing) {
      setTargetId(null);
      setIsEditing(false);
    } else {
      setTargetId(id);
      setIsEditing(true);
    }
  };

  // 편집 - 확인 함수
  const confirmEditEducation = (targetEducation) => {
    // TODO : 학교이름, 전공 유효성 검사
    const resultEducations = [...educations];
    resultEducations[
      resultEducations.findIndex(
        (education) => education.id === targetEducation.id
      )
    ] = {
      ...targetEducation,
    };
    setEducations([...resultEducations]);
    cancelEditEducation();
  };

  const cancelEditEducation = () => {
    setIsEditing(false);
    setTargetId(null);
  };

  const onRemove = (id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    // console.log("remove: ", educations, education.id, targetEducation);
    setEducations(educations.filter((education) => education.id !== id));
  };

  return (
    <div>
      <div>
        {educations.map((education, index) => {
          return (
            <p key={education.id}>
              <div className="align-items-center row margin_tb10">
                <div className="col">
                  <div>{education.schoolName}</div>
                  <div>
                    {education.major}({education.position})
                  </div>
                </div>
                <div
                  className="col-lg-1 col"
                  style={{ width: "150px", height: "35px", display: "flex" }}
                >
                  <button
                    type="button"
                    className="mr-3 btn btn-outline-info btn-sm"
                    onClick={() => toggleEditEducationForm(education.id)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    className="mr-3 btn btn-outline-info btn-sm"
                    onClick={() => onRemove(education.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
              {isEditing && education.id === targetId && (
                <EducationForm
                  education={{
                    ...education,
                  }}
                  onConfirm={confirmEditEducation}
                  onCancel={cancelEditEducation}
                />
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default EducationCard;
