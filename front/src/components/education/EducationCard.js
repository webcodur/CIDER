import React, {useState} from "react";
import "../../../src/index.css";
import EducationEditForm from "./EducationEditForm";
function EducationCard({
  educations,
  setIsEditFormEditing,
  addEducation,
  setEducations,
  isEditFormEditing,
}) {
  console.log(setIsEditFormEditing);
  // console.log(educations[0].schoolName);

  const [targetIndex, setTargetIndex] = useState(-1);

  // 편집
  const editEducation = (index) => {
    console.log(isEditFormEditing, educations, index);
    if(isEditFormEditing && targetIndex === index) {
      setIsEditFormEditing(false);
      setTargetIndex(-1);
    } else {
      setIsEditFormEditing(true);
      setTargetIndex(index);
    }
  }

  return (
    <div>
      <div>
        {educations.map((educations, index) => {
          return (
            <p key={index}>
              <div className="align-items-center row margin_tb10">
                <div className="col">
                  <div>{educations.schoolName}</div>
                  <div>
                    {educations.major}({educations.position})
                  </div>
                </div>
                <div
                  className="col-lg-1 col"
                  style={{ width: "150px", height: "35px", display: "flex" }}
                >
                  <button
                    type="button"
                    className="mr-3 btn btn-outline-info btn-sm"
                    onClick={() => editEducation(index)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    className="mr-3 btn btn-outline-info btn-sm"
                  >
                    삭제
                  </button>
                </div>
              </div>
              {isEditFormEditing && (index === targetIndex) ? (
                <EducationEditForm
                  setIsEditFormEditing={setIsEditFormEditing}
                  addEducation={addEducation}
                  setEducations={setEducations}
                  educations={educations}
                />
              ) : null}
            </p>
          );
        })}
        {/* <div>{educations[0].schoolName}</div>
        <div>{educations[0].major}</div> */}
      </div>
    </div>
  );
}

export default EducationCard;
