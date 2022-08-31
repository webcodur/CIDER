import { Card, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { UserStateContext } from "../../App";
import { useLocation } from "react-router";
import AwardCard from "./AwardCard";
import AwardForm from "./AwardForm";
import * as Api from "../../api";
import { useTheme } from "../darkmode/themeProvider";
import "../../../src/styles/index.css";

const Award = ({ isEditable, paramsUserId }) => {
  const userState = useContext(UserStateContext);
  const id = userState?.user?.id;
  const ThemeMode = useTheme();
  const theme = ThemeMode[0];
  let { state } = useLocation();

  if (state === null || typeof state === "object") {
    state = id;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const getRes = await Api.get("awards", paramsUserId ? paramsUserId : id);
    const datas = getRes.data;
    let dataArr = [];

    dataArr = datas.map((ele) => [ele.id, ele.title, ele.description]);
    setArr(dataArr);
  }

  return (
    <Card className="mb-2 ms-3 mr-5" id={theme == "light" ? "light" : "dark"}>
      <Card.Body>
        <Card.Title>수상 이력</Card.Title>
        {arr.map((ele, idx) => {
          return (
            <AwardCard
              key={ele}
              arr={arr}
              idx={idx}
              setArr={setArr}
              isEditable={isEditable}
            ></AwardCard>
          );
        })}
        <div className="mt-3 text-center mb-4 row">
          <div className="col-sm-20">
            {isEditable && id === state && (
              <Button
                className="btn btn-primary toggleTarget"
                onClick={() => setIsEditing(true)}
              >
                +
              </Button>
            )}
          </div>
        </div>
        {isEditing && id === state && (
          <AwardForm
            arr={arr}
            setArr={setArr}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          ></AwardForm>
        )}
      </Card.Body>
    </Card>
  );
};

export default Award;
