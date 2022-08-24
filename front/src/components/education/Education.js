import {Card} from "react-bootstrap";
import React from "react";
import {useState} from "react";
import EducationForm from "./EducationForm";
import EducationCard from "./EducationCard";

const Education = ({
                       isEditable,
                       setIsEditFormEditing,
                       isEditFormEditing,
                   }) => {

    const [isAdding, setIsAdding] = useState(false);
    const toggleAddEducationForm = () => {
        setIsAdding(!isAdding);
    };

    const [educations, setEducations] = useState([]);

    // 추가 - 확인 함수
    const confirmAddEducation = (targetEducation) => {
        // TODO : 학교이름, 전공 유효성 검사
        targetEducation.id = Date.now();
        const resultEducations = [...educations, targetEducation];
        setEducations([...resultEducations]);
        setIsAdding(false);
    };

    const cancelAddEducation = () => {
        setIsAdding(false);
    };

    return (
        <Card className="mb-2 ms-3 mr-5 ">
            <Card.Body>
                <Card.Title>학력</Card.Title>
                <EducationCard educations={educations} setEducations={setEducations}/>
            </Card.Body>

            <div style={{display: "flex", justifyContent: "center"}}>
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
                            schoolName: "",
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
