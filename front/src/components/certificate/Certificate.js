import { Card, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { UserStateContext } from "../../App";
import CertificateCard from "./CertificateCard";
import CertificateForm from "./CertificateForm";
import * as Api from "../../api";

const Certificate = ({isEditable}) => {
  const userState = useContext(UserStateContext);
  const id = userState.user.id;

  const [isEditing, setIsEditing] = useState(false)
  const [arr, setArr] = useState([])

  useEffect(() => {
    getData()
  }, []);

  async function getData(){
    console.log('id',id)
    const getRes = await Api.get("certificates", id);
    const datas = getRes.data
    let dataArr = []
    dataArr = datas.map(ele=>[ele.id, ele.title, ele.content, ele.day])
    setArr(dataArr)
  }

  return (
    <Card className="mb-2 ms-3 mr-5">
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        {arr.map((ele, idx)=>{
          return <>
            <CertificateCard 
              key={ele}  
              arr={arr} 
              idx={idx}
              setArr={setArr}>
            </CertificateCard>
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
        <CertificateForm
          arr = {arr}
          setArr = {setArr}
          isEditing = {isEditing}
          setIsEditing = {setIsEditing}
          >
        </CertificateForm>
        }
      </Card.Body>
    </Card>
  );
};

export default Certificate;
