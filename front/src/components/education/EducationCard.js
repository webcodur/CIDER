import React, { useState } from "react";
import "../../../src/index.css";
import EducationForm from "./EducationForm";
import * as Api from "../../api";
function EducationCard({ educations, setEducations, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [byEditbtn, setByEditbtn] = useState(false);
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
    // console.log(targetEducation);
    // setEducations();
    cancelEditEducation();
  };

  const cancelEditEducation = () => {
    setIsEditing(false);
    setTargetId(null);
  };

  const onRemove = async (educationid) => {
    // const onRemove = (educationid) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    // console.log("remove: ", educations, education.id, targetEducation);
    setEducations(
      educations.filter((education) => education.id !== educationid)
    );
    // alert(educationid);
    await Api.delete(`educations/${educationid}`);
    console.log("삭제 완료", educationid);
  };

  const EditHandle = () => {
    // toggleEditEducationForm(education.id);
    setByEditbtn(true);
  };

  return (
    <div>
      <div>
        {educations.map((education, index) => {
          return (
            <div key={education.id}>
              {/* <div> */}
              <div className="align-items-center row margin_tb10">
                <div className="col">
                  <div>{education.school}</div>
                  <div>
                    {education.major}({education.position})
                  </div>
                </div>
                {isEditable ? (
                  <div
                    className="col-lg-1 col"
                    style={{ width: "138px", display: "flex" }}
                  >
                    <button
                      type="button"
                      className="mr-3 btn btn-outline-info"
                      onClick={() => {
                        toggleEditEducationForm(education.id);
                        EditHandle();
                      }}
                    >
                      편집
                    </button>
                    <button
                      type="button"
                      className="mr-3 btn btn-outline-info"
                      // className="btn btn-btn float-end btn-outline-info mt-3"
                      onClick={() => onRemove(education.id)}
                      // onClick={onRemove(education.id)}
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
              </div>
              {isEditing && education.id === targetId && (
                <EducationForm
                  education={{
                    ...education,
                  }}
                  onConfirm={confirmEditEducation}
                  onCancel={cancelEditEducation}
                  byEditbtn={byEditbtn}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EducationCard;
