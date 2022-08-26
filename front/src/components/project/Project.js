import { Card, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { UserStateContext } from "../../App";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import * as Api from "../../api";

const Project = ({isEditable}) => {
  const userState = useContext(UserStateContext);
  const id = userState.user.id;

  const [isEditing, setIsEditing] = useState(false)
  const [arr, setArr] = useState([])
  
  useEffect(() => {
    getData()
  }, []);

  async function getData(){
    const getRes = await Api.get("projects", id);
    const datas = getRes.data
    let dataArr = []
    dataArr = datas.map(ele=>[ele.id, ele.title, ele.content, ele.startDay, ele.endDay])
    setArr(dataArr)
  }

  return (
    <Card className="mb-2 ms-3 mr-5">
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
          {arr.map((ele, idx)=>{
            return <>
              <ProjectCard 
                key={ele}  
                arr={arr} 
                idx={idx}
                setArr={setArr}>
              </ProjectCard>
            </>
          })}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
            style={!isEditable?{display:'none'}:{display:'block'}}
          >
            +
          </Button>
        </div>
        {isEditing && 
        <ProjectForm
          arr = {arr}
          setArr = {setArr}
          isEditing = {isEditing}
          setIsEditing = {setIsEditing}
          >
        </ProjectForm>
        }
      </Card.Body>
    </Card>
  );

};

export default Project;