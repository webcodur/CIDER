import { Card, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { UserStateContext } from '../../App';
import AwardCard from './AwardCard';
import AwardForm from './AwardForm';
import * as Api from '../../api';
import displayToggleCss from '../../styles/displayToggle.css';

const Award = ({ isEditable, paramsUserId }) => {
  const userState = useContext(UserStateContext);
  let id = '';

  if (userState?.user) {
    id = userState.user.id ? userState.user.id : null;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const getRes = await Api.get('award', paramsUserId ? paramsUserId : id);
    const datas = getRes.data;
    let dataArr = [];

    dataArr = datas.map((ele) => [ele.id, ele.title, ele.description]);
    setArr(dataArr);
  }

  return (
    <Card className="mb-2 ms-3 mr-5">
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
            {isEditable && (
              <Button
                className="btn btn-primary toggleTarget"
                onClick={() => setIsEditing(true)}
              >
                +
              </Button>
            )}
          </div>
        </div>
        {isEditing && (
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
